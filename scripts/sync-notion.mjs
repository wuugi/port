#!/usr/bin/env node
/**
 * Pulls project text and images out of Notion once, at author time, and writes
 * them into the repository. The site then ships as static files.
 *
 *   npm run sync:notion            report + write
 *   npm run sync:notion -- --dry   report only, writes nothing
 *
 * Why not fetch at request time: Notion's image URLs are signed and expire in
 * about an hour, so a live page had to call Notion on every visit purely to
 * re-sign them. That put an external API in the path of every visitor for
 * content that changes a few times a year. Here the images are downloaded once
 * and served from /public, and a Notion outage cannot reach the site.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_JSON = path.join(ROOT, "lib", "projects.generated.json");
const IMAGE_DIR = path.join(ROOT, "public", "projects");
const NOTION_VERSION = "2022-06-28";
const MAX_IMAGES = 3;
const DRY = process.argv.includes("--dry");

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

// ── property mapping ───────────────────────────────────────────────────────
// Notion property names are authored by hand and drift (English, Korean, with
// or without separators). Every accepted spelling is tried rather than assuming
// one, and the names actually seen are printed so a rename is visible here
// instead of showing up as a blank field on the site.

const seenProps = new Set();

function pick(props, ...names) {
  for (const n of names) if (props?.[n]) return props[n];
  return undefined;
}
const plain = (arr) => (arr ?? []).map((t) => t.plain_text).join("");
const text = (p) => plain(p?.rich_text);
const lines = (s) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const multi = (p) => (p?.multi_select ?? []).map((m) => m.name);

/** Notion ids are dashed UUIDs; the authored `notionUrl` carries bare 32 hex. */
function bareId(value) {
  const m = String(value ?? "").replace(/-/g, "").match(/([a-f0-9]{32})/i);
  return m ? m[1].toLowerCase() : null;
}

function mapTranslation(props) {
  const title = text(pick(props, "Title EN", "Title_EN", "TitleEN", "제목 영문"));
  const summary = text(pick(props, "Summary EN", "Summary_EN", "요약 영문"));
  const role = text(pick(props, "Role EN", "Role_EN", "역할 영문"));
  const result = text(pick(props, "Result EN", "Result_EN", "결과 영문"));
  const background = text(pick(props, "Background EN", "Background_EN", "배경 영문"));
  const problem = text(pick(props, "Problem EN", "Problem_EN", "문제 영문"));
  const processText = text(pick(props, "Process EN", "Process_EN", "프로세스 영문"));
  const fullResult = text(pick(props, "FullResult EN", "FullResult_EN", "전체결과 영문"));
  const tags = multi(pick(props, "Tags EN", "Tags_EN"));

  if (!title && !summary && !role && !result) return undefined;

  return {
    title,
    summary,
    role,
    result,
    tags: tags.length ? tags : undefined,
    background: background || undefined,
    problem: problem || undefined,
    process: processText ? lines(processText) : undefined,
    fullResult: fullResult || undefined,
  };
}

function mapPage(page, company) {
  const props = page.properties ?? {};
  for (const name of Object.keys(props)) seenProps.add(name);
  const processText = text(pick(props, "Process", "프로세스"));

  return {
    notionPageId: bareId(page.id),
    company,
    title: plain(pick(props, "title", "Name", "이름")?.title),
    period: text(pick(props, "Period", "기간")),
    summary: text(pick(props, "Summary", "요약")),
    role: text(pick(props, "Role", "역할")),
    result: text(pick(props, "Result", "결과")),
    tags: multi(pick(props, "Tags", "태그")),
    background: text(pick(props, "Background", "배경")) || undefined,
    problem: text(pick(props, "Problem", "문제")) || undefined,
    process: processText ? lines(processText) : undefined,
    fullResult: text(pick(props, "FullResult", "전체결과")) || undefined,
    notionUrl: page.url || undefined,
    en: mapTranslation(props),
  };
}

// ── images ─────────────────────────────────────────────────────────────────

async function pageImageUrls(token, pageId) {
  const data = await notion(token, `blocks/${pageId}/children?page_size=50`);
  const urls = [];
  for (const block of data.results ?? []) {
    if (block.type !== "image") continue;
    const url = block.image?.file?.url || block.image?.external?.url;
    if (url) urls.push(url);
    if (urls.length >= MAX_IMAGES) break;
  }
  return urls;
}

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
  await fs.writeFile(path.join(IMAGE_DIR, file), Buffer.from(await res.arrayBuffer()));
  return `/projects/${file}`;
}

// ── run ────────────────────────────────────────────────────────────────────

async function main() {
  const token = await loadToken();
  if (!token) {
    console.error(
      "NOTION_TOKEN is not set.\n" +
      "Put it in .env.local as NOTION_TOKEN=secret_... (see .env.local.example),\n" +
      "or export it for one run. Nothing was written."
    );
    process.exit(1);
  }

  const databases = JSON.parse(
    await fs.readFile(path.join(ROOT, "lib", "notion-databases.json"), "utf8")
  );

  const projects = [];
  for (const [company, databaseId] of Object.entries(databases)) {
    const data = await notion(token, `databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify({ sorts: [{ timestamp: "created_time", direction: "descending" }] }),
    });
    const mapped = (data.results ?? []).map((page) => mapPage(page, company));
    // A page whose title and summary are both empty means the schema did not
    // match. Keeping it would write blanks over good authored text.
    const usable = mapped.filter((p) => p.title?.trim() && p.summary?.trim());
    console.log(
      `${company.padEnd(7)} ${String(usable.length).padStart(2)} usable / ${mapped.length} pages` +
        (usable.length < mapped.length
          ? "   <- some pages have no Title or Summary the parser recognises"
          : "")
    );
    projects.push(...usable);
  }

  if (projects.length === 0) {
    console.error("\nNo usable pages in any database. Refusing to write an empty file.");
    console.error("Property names seen in Notion: " + [...seenProps].join(", "));
    process.exit(1);
  }

  const withEn = projects.filter((p) => p.en).length;
  console.log(`\ntext    ${projects.length} projects, ${withEn} with English`);
  if (withEn < projects.length) {
    console.log("        the rest keep the English already in lib/static-data.ts");
  }

  if (!DRY) await fs.mkdir(IMAGE_DIR, { recursive: true });

  let imageCount = 0;
  for (const project of projects) {
    if (!project.notionPageId) continue;
    let urls = [];
    try {
      urls = await pageImageUrls(token, project.notionPageId);
    } catch (err) {
      console.warn(`        ! images for ${project.title}: ${err.message}`);
      continue;
    }
    if (DRY) {
      imageCount += urls.length;
      continue;
    }
    const saved = [];
    for (const [i, url] of urls.entries()) {
      try {
        saved.push(await download(url, `${project.notionPageId}-${i + 1}`));
      } catch (err) {
        console.warn(`        ! ${project.title} image ${i + 1}: ${err.message}`);
      }
    }
    if (saved.length) project.images = saved;
    imageCount += saved.length;
  }
  console.log(`images  ${imageCount} ${DRY ? "found" : "downloaded into public/projects/"}`);

  console.log(`\nNotion properties seen: ${[...seenProps].sort().join(", ")}`);

  if (DRY) {
    console.log("\n--dry: nothing written.");
    return;
  }

  const payload = { syncedAt: new Date().toISOString(), projects };
  await fs.writeFile(OUT_JSON, JSON.stringify(payload, null, 2) + "\n");
  console.log("\nwrote   lib/projects.generated.json");
  console.log("Commit lib/projects.generated.json and public/projects/ to publish.");
}

main().catch((err) => {
  console.error("\nSync failed, nothing written:", err.message);
  process.exit(1);
});
