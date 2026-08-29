#!/usr/bin/env node
/**
 * Notion is where the working notes live. The site's copy is edited, bilingual
 * prose that says the same things better, and it lives in lib/static-data.ts.
 * This script does not try to reconcile those — it does the mechanical half.
 *
 *   npm run sync:notion             download images, write the manifest
 *   npm run sync:notion -- --dry    report only, writes nothing
 *   npm run sync:notion -- --text   also print every page's body
 *
 * Images: Notion serves them from signed URLs that expire within the hour, so
 * the only way to show them is to keep a copy. They land in public/projects/
 * and lib/projects.generated.json maps them to a Notion page id.
 *
 * Text: --text prints what each page says, which is the raw material for a
 * content update. The rewrite into Korean and English stays a human decision,
 * made against the diff, rather than a translation the build performs.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_JSON = path.join(ROOT, "lib", "projects.generated.json");
const IMAGE_DIR = path.join(ROOT, "public", "projects");
const NOTION_VERSION = "2022-06-28";
const MAX_IMAGES = 3;
const DRY = process.argv.includes("--dry");
const TEXT = process.argv.includes("--text");

/** .env.local is the same file Next reads; no need for a second place to put the token. */
async function loadToken() {
  if (process.env.NOTION_TOKEN) return process.env.NOTION_TOKEN;
  try {
    const env = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
    const line = env.split(/\r?\n/).find((l) => l.trim().startsWith("NOTION_TOKEN="));
    if (line) return line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
  } catch {
    /* no .env.local; fall through to the error below */
  }
  return null;
}

async function notion(token, endpoint, init = {}) {
  const res = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Notion ${endpoint} -> ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  return res.json();
}

const plain = (arr) => (arr ?? []).map((t) => t.plain_text).join("");

/** Notion ids are dashed UUIDs; the authored `notionUrl` carries bare 32 hex. */
function bareId(value) {
  const m = String(value ?? "").replace(/-/g, "").match(/([a-f0-9]{32})/i);
  return m ? m[1].toLowerCase() : null;
}

function pageTitle(page) {
  for (const prop of Object.values(page.properties ?? {})) {
    if (prop.type === "title") return plain(prop.title);
  }
  return "(untitled)";
}

// ── page bodies ────────────────────────────────────────────────────────────

/** Walks a page including nested children, collecting images and, for --text,
 *  a readable outline. One walk serves both so a page is fetched once. */
async function walk(token, blockId, depth, out) {
  const data = await notion(token, `blocks/${blockId}/children?page_size=100`);
  for (const block of data.results ?? []) {
    if (block.type === "image") {
      const url = block.image?.file?.url || block.image?.external?.url;
      if (url && out.images.length < MAX_IMAGES) out.images.push(url);
      out.lines.push("  ".repeat(depth) + "[image]");
    } else {
      const text = plain(block[block.type]?.rich_text);
      if (text.trim()) {
        const marker = block.type.startsWith("heading")
          ? "#".repeat(Number(block.type.slice(-1))) + " "
          : block.type.endsWith("list_item")
          ? "- "
          : "";
        out.lines.push("  ".repeat(depth) + marker + text);
      }
    }
    if (block.has_children) await walk(token, block.id, depth + 1, out);
  }
  return out;
}

// ── images ─────────────────────────────────────────────────────────────────

async function download(url, destBase) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`image ${res.status}`);
  const type = res.headers.get("content-type") ?? "";
  // The signed URL's own extension is the best hint; content-type is the fallback.
  const fromUrl = path.extname(new URL(url).pathname).toLowerCase();
  const ext = /^\.(png|jpe?g|gif|webp|avif|svg)$/.test(fromUrl)
    ? fromUrl
    : type.includes("png") ? ".png"
    : type.includes("webp") ? ".webp"
    : type.includes("gif") ? ".gif"
    : ".jpg";
  const file = `${destBase}${ext}`;
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(path.join(IMAGE_DIR, file), buffer);

  // These are mostly dashboard screenshots, and they are wide — one was 5:1.
  // Measuring here is what lets the page show the whole shot at its own shape
  // instead of cropping it into a uniform tile, and it reserves the right box
  // so nothing reflows when the image arrives.
  const { width, height } = await sharp(buffer).metadata();
  return { src: `/projects/${file}`, width, height };
}

/** Report-only: which Notion pages the authored data already covers. A regex
 *  over the TypeScript is fine for a printed hint and is never load-bearing. */
async function authoredIds() {
  try {
    const src = await fs.readFile(path.join(ROOT, "lib", "static-data.ts"), "utf8");
    return new Set([...src.matchAll(/[a-f0-9]{32}/gi)].map((m) => m[0].toLowerCase()));
  } catch {
    return null;
  }
}

// ── run ────────────────────────────────────────────────────────────────────

async function main() {
  const token = await loadToken();
  if (!token) {
    console.error(
      "NOTION_TOKEN is not set.\n" +
      "Put it in .env.local as NOTION_TOKEN=ntn_... (see .env.local.example).\n" +
      "Nothing was written."
    );
    process.exit(1);
  }

  const databases = JSON.parse(
    await fs.readFile(path.join(ROOT, "lib", "notion-databases.json"), "utf8")
  );
  const authored = await authoredIds();

  const pages = [];
  const unreachable = [];
  for (const [company, databaseId] of Object.entries(databases)) {
    // One database the integration cannot see must not hide the state of the
    // others: the point of a run is finding out which are wired up.
    let data;
    try {
      data = await notion(token, `databases/${databaseId}/query`, {
        method: "POST",
        body: JSON.stringify({ sorts: [{ timestamp: "created_time", direction: "descending" }] }),
      });
    } catch (err) {
      const notShared = err.message.includes("object_not_found");
      console.log(
        `${company.padEnd(7)} -- ${notShared ? "not shared with this integration (or wrong id)" : err.message.slice(0, 90)}`
      );
      unreachable.push({ company, databaseId });
      continue;
    }
    for (const page of data.results ?? []) {
      pages.push({ company, id: bareId(page.id), rawId: page.id, title: pageTitle(page) });
    }
    console.log(`${company.padEnd(7)} ${String(data.results?.length ?? 0).padStart(2)} pages`);
  }

  if (unreachable.length) {
    console.log(
      "\nTo share a database: open it in Notion, ... menu (top right) -> Connections\n" +
      "-> add the integration. Sharing inherits, so a parent page covers everything under it.\n" +
      unreachable.map((u) => `  ${u.company.padEnd(7)} ${u.databaseId}`).join("\n")
    );
  }

  if (pages.length === 0) {
    console.error("\nNo pages read. Nothing written; lib/static-data.ts is untouched.");
    process.exit(1);
  }

  if (!DRY) await fs.mkdir(IMAGE_DIR, { recursive: true });

  const manifest = [];
  let imageCount = 0;
  console.log("");

  for (const page of pages) {
    const known = authored ? authored.has(page.id) : true;
    let body;
    try {
      body = await walk(token, page.rawId, 0, { images: [], lines: [] });
    } catch (err) {
      console.warn(`  ! ${page.title.slice(0, 46)}: ${err.message.slice(0, 70)}`);
      continue;
    }

    const saved = [];
    if (!DRY) {
      for (const [i, url] of body.images.entries()) {
        try {
          saved.push(await download(url, `${page.id}-${i + 1}`));
        } catch (err) {
          console.warn(`  ! ${page.title.slice(0, 40)} image ${i + 1}: ${err.message}`);
        }
      }
    }
    imageCount += DRY ? body.images.length : saved.length;
    if (saved.length) manifest.push({ notionPageId: page.id, images: saved });

    const shapes = saved.map((i) => `${i.width}x${i.height}`).join(" ");
    console.log(
      `${known ? "  " : "NEW "}${page.company.padEnd(7)} ${String(body.images.length).padStart(2)} img  ${page.title.slice(0, 44).padEnd(45)} ${shapes}`
    );
    if (TEXT) console.log(body.lines.map((l) => "      " + l).join("\n") + "\n");
  }

  console.log(`\nimages  ${imageCount} ${DRY ? "found" : "downloaded into public/projects/"}`);
  if (authored) {
    const unmatched = pages.filter((p) => !authored.has(p.id));
    if (unmatched.length) {
      console.log(
        `\n${unmatched.length} Notion page(s) marked NEW are not in lib/static-data.ts yet.\n` +
        "Run with --text to read them, then write the entry (Korean and English together)."
      );
    }
  }

  if (DRY) {
    console.log("\n--dry: nothing written.");
    return;
  }

  await fs.writeFile(
    OUT_JSON,
    JSON.stringify({ syncedAt: new Date().toISOString(), projects: manifest }, null, 2) + "\n"
  );
  console.log("wrote   lib/projects.generated.json");
  console.log("Commit it together with public/projects/ to publish.");
}

main().catch((err) => {
  console.error("\nSync failed, nothing written:", err.message);
  process.exit(1);
});
