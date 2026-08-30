#!/usr/bin/env node
/**
 * Puts every Notion page next to the site entry that renders it.
 *
 *   npm run notion:diff              the summary — counts, unmatched, figures
 *   npm run notion:diff -- --full    also print each page's sections in full
 *   npm run notion:diff -- --id <8-hex prefix>   one page only
 *
 * Reading Notion and reading static-data.ts by hand takes about ten minutes and
 * is where the mistakes hide, because the two are shaped differently: Notion is
 * headings and bullets, the site is prose. This does not try to judge whether
 * the prose says the same thing — that is the editorial call. It does the parts
 * a machine is better at:
 *
 *   - which pages exist on each side, and which are unmatched
 *   - which numbers appear on the site but nowhere in the Notion page
 *   - which Notion sections have no obvious counterpart on the site
 *
 * The figure check is the one that earns its keep. A claim like "이탈율 10% 이하
 * 유지" that exists only on the site is unverifiable by the person reading it,
 * and this is a hiring document — every number on it should trace to something
 * the author actually wrote down.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NOTION_VERSION = "2022-06-28";
const FULL = process.argv.includes("--full");
const ONLY = (() => {
  const i = process.argv.indexOf("--id");
  return i > -1 ? process.argv[i + 1]?.toLowerCase() : null;
})();

async function loadToken() {
  if (process.env.NOTION_TOKEN) return process.env.NOTION_TOKEN;
  const env = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
  const line = env.split(/\r?\n/).find((l) => l.trim().startsWith("NOTION_TOKEN="));
  if (!line) throw new Error("NOTION_TOKEN not found in .env.local");
  return line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
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
  if (!res.ok) throw new Error(`${endpoint} -> ${res.status} ${(await res.text()).slice(0, 160)}`);
  return res.json();
}

const plain = (rt) => (rt ?? []).map((t) => t.plain_text).join("");
const bare = (v) => String(v ?? "").replace(/-/g, "").match(/([a-f0-9]{32})/i)?.[1].toLowerCase() ?? null;

/** Flattens a page into readable lines, nested blocks included. */
async function pageLines(token, blockId, depth = 0, out = []) {
  const data = await notion(token, `blocks/${blockId}/children?page_size=100`);
  for (const b of data.results ?? []) {
    if (b.type === "image") out.push({ depth, kind: "image", text: "[image]" });
    else {
      const text = plain(b[b.type]?.rich_text);
      if (text.trim()) {
        out.push({
          depth,
          kind: b.type.startsWith("heading") ? "heading" : b.type.endsWith("list_item") ? "bullet" : "para",
          text: text.trim(),
        });
      }
    }
    if (b.has_children) await pageLines(token, b.id, depth + 1, out);
  }
  return out;
}

/**
 * Numbers as a reader would judge them: percentages, money, counts. Bare years
 * and dates are excluded — a period is not a claim, and including them buried
 * the real findings in noise.
 */
function figures(text) {
  const found = new Set();
  const patterns = [
    /\d[\d,.]*\s*%/g,
    /\d[\d,.]*\s*(억|만원|천만|배|건|명|시간|일|개월|년간)/g,
    /(NDR|MAU|DAU|CS|VOC)\s*\d[\d,.]*/gi,
  ];
  for (const re of patterns) {
    for (const m of text.matchAll(re)) found.add(m[0].replace(/\s+/g, ""));
  }
  return found;
}

/** Pulls each project's authored fields out of the TypeScript without executing it. */
async function siteProjects() {
  // The repo is CRLF; normalise before any newline-anchored matching or the
  // split below silently finds nothing and every page looks unmatched.
  const raw = await fs.readFile(path.join(ROOT, "lib", "static-data.ts"), "utf8");
  const src = raw.replace(/\r\n/g, "\n");
  const start = src.indexOf("export const projectsData");
  const body = src.slice(start, src.indexOf("\nexport const", start + 10));
  const entries = [];
  // Split on the id: line — each entry starts with one and they do not nest.
  const chunks = body.split(/\n  \{\n    id: "/).slice(1);
  for (const chunk of chunks) {
    const id = chunk.slice(0, chunk.indexOf('"'));
    const notionId = bare(chunk.match(/notionUrl: "([^"]*)"/)?.[1]);
    const enIndex = chunk.indexOf("    en: {");
    entries.push({
      id,
      notionId,
      ko: enIndex > -1 ? chunk.slice(0, enIndex) : chunk,
      en: enIndex > -1 ? chunk.slice(enIndex) : "",
    });
  }
  return entries;
}

const token = await loadToken();
const databases = JSON.parse(await fs.readFile(path.join(ROOT, "lib", "notion-databases.json"), "utf8"));
const site = await siteProjects();
const siteById = new Map(site.filter((s) => s.notionId).map((s) => [s.notionId, s]));

console.log(`site: ${site.length} projects (${siteById.size} carry a notionUrl)\n`);

const seen = new Set();
let figureIssues = 0;
let missingEn = 0;

for (const [company, dbId] of Object.entries(databases)) {
  const q = await notion(token, `databases/${dbId}/query`, { method: "POST", body: "{}" });
  for (const page of q.results ?? []) {
    const id = bare(page.id);
    if (ONLY && !id.startsWith(ONLY)) continue;
    const title = Object.values(page.properties ?? {})
      .map((p) => (p.type === "title" ? plain(p.title) : null)).find(Boolean) ?? "(untitled)";
    seen.add(id);

    const lines = await pageLines(token, page.id);
    const notionText = lines.map((l) => l.text).join("\n");
    const entry = siteById.get(id);

    console.log(`\n${"─".repeat(72)}\n${company}  ${title}`);
    console.log(`  notion ${id.slice(0, 8)}   site ${entry ? entry.id : "*** NOT ON SITE ***"}`);

    if (!entry) {
      console.log("  → write an entry for this page");
      continue;
    }

    // Placeholder text left in the template means the page is not finished.
    const placeholder = lines.filter((l) => /^\(.*\)$/.test(l.text) && l.text.length > 8);
    if (placeholder.length) {
      console.log(`  ! unfinished in Notion: ${placeholder.map((p) => p.text.slice(0, 44)).join(" / ")}`);
    }

    const siteFigures = figures(entry.ko);
    const notionFigures = figures(notionText);
    const unsupported = [...siteFigures].filter((f) => !notionFigures.has(f));
    if (unsupported.length) {
      figureIssues += unsupported.length;
      console.log(`  ! on the site, not in Notion: ${unsupported.join("  ")}`);
    }
    const unused = [...notionFigures].filter((f) => !siteFigures.has(f));
    if (unused.length) console.log(`  · in Notion, not on the site: ${unused.join("  ")}`);

    if (!entry.en.trim()) {
      missingEn++;
      console.log("  ! no English block");
    }

    if (FULL) {
      console.log("\n  ── Notion ──");
      for (const l of lines) {
        console.log("  " + "  ".repeat(l.depth) + (l.kind === "heading" ? "# " : l.kind === "bullet" ? "- " : "") + l.text);
      }
    }
  }
}

const orphans = site.filter((s) => s.notionId && !seen.has(s.notionId));
if (orphans.length && !ONLY) {
  console.log(`\n${"─".repeat(72)}\non the site with no Notion page: ${orphans.map((o) => o.id).join(", ")}`);
}

console.log(
  `\n${"─".repeat(72)}\n` +
  `${figureIssues} figure(s) on the site with no source in Notion` +
  `${missingEn ? `, ${missingEn} entr(y/ies) with no English` : ""}.`
);
if (figureIssues) {
  console.log("A number the author never wrote down cannot be checked by the person reading it.");
}
