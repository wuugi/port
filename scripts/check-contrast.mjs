#!/usr/bin/env node
/**
 * Measures every colour pair the site actually renders, in both themes, and
 * fails if one drops below its WCAG minimum.
 *
 *   npm run check:contrast
 *
 * The palette is authored in OKLCH, where lightness is perceptual and the
 * resulting sRGB contrast is not obvious by eye — two colours that look evenly
 * spaced can be a full ratio apart. Every number in the palette comment block
 * of globals.css comes from this script, so changing a token means running it
 * again rather than trusting the previous claim.
 *
 * Pairs are listed by hand because a stylesheet cannot say which foreground
 * lands on which surface; keep this list in step with the components.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CSS = path.join(ROOT, "app", "globals.css");

// ── colour maths ───────────────────────────────────────────────────────────

/** OKLCH -> linear sRGB -> sRGB, per CSS Color 4. */
function oklchToRgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;

  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return lin.map((v) => {
    const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(Math.max(v, 0), 1 / 2.4) - 0.055;
    return Math.min(255, Math.max(0, Math.round(c * 255)));
  });
}

function parseColor(value) {
  const oklch = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i);
  if (oklch) return { rgb: oklchToRgb(+oklch[1], +oklch[2], +oklch[3]), alpha: 1 };
  const rgba = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i);
  if (rgba) return { rgb: [+rgba[1], +rgba[2], +rgba[3]], alpha: rgba[4] === undefined ? 1 : +rgba[4] };
  throw new Error(`cannot parse colour: ${value}`);
}

const composite = (fg, bg) => fg.rgb.map((c, i) => c * fg.alpha + bg.rgb[i] * (1 - fg.alpha));

function luminance([r, g, b]) {
  const f = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(fgRgb, bgRgb) {
  const a = luminance(fgRgb), b = luminance(bgRgb);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

// ── tokens ─────────────────────────────────────────────────────────────────

/** Reads the :root and .light custom-property blocks straight from the stylesheet,
 *  so the check can never drift from what ships. */
async function themes() {
  const css = await fs.readFile(CSS, "utf8");
  const readBlock = (selector) => {
    const start = css.indexOf(selector + " {");
    if (start < 0) throw new Error(`block not found: ${selector}`);
    const body = css.slice(start, css.indexOf("}", start));
    const out = {};
    for (const [, name, value] of body.matchAll(/(--[\w-]+):\s*([^;]+);/g)) out[name] = value.trim();
    return out;
  };
  const dark = readBlock(":root");
  const light = { ...dark, ...readBlock(".light") };

  // One indirection: --accent and --success point at primitives.
  const resolve = (t) => {
    const out = { ...t };
    for (const [k, v] of Object.entries(out)) {
      const ref = v.match(/^var\((--[\w-]+)\)$/);
      if (ref) out[k] = out[ref[1]];
    }
    return out;
  };
  return { dark: resolve(dark), light: resolve(light) };
}

// ── the pairs the site actually renders ────────────────────────────────────

const TEXT = 4.5;   // body text
const LARGE = 3;    // >= 24px, or >= 18.66px bold
const UI = 3;       // focus ring, state indicator

const PAIRS = [
  ["--text", "--bg", TEXT, "body / headings on canvas"],
  ["--text-muted", "--bg", TEXT, "secondary text on canvas"],
  ["--accent", "--bg", TEXT, "links, active nav, title line"],
  ["--success", "--bg", TEXT, "project result line"],
  ["--text", "--bg-card", TEXT, "dialog body"],
  ["--text-muted", "--bg-card", TEXT, "dialog secondary text"],
  ["--accent", "--bg-card", TEXT, "dialog accents"],
  ["--success", "--bg-card", TEXT, "dialog result"],
  ["--accent", "--bg", UI, "focus ring, nav underline"],
  ["--accent", "--bg-card", UI, "focus ring on the dialog"],
  // Dividers are decoration, not a control, so WCAG sets no floor. Reported
  // because a rule that cannot be seen is not doing its job either.
  ["--border", "--bg", 0, "section rule (informational)"],
  ["--rule", "--bg", 0, "row divider (informational)"],
  ["--border", "--bg-card", 0, "dialog edge (informational)"],
];

// ── run ────────────────────────────────────────────────────────────────────

const { dark, light } = await themes();
let failures = 0;
let lowest = { ratio: Infinity };

for (const [name, tokens] of Object.entries({ dark, light })) {
  console.log(`\n${name.toUpperCase()}`);
  for (const [fgToken, bgToken, need, label] of PAIRS) {
    const bg = parseColor(tokens[bgToken]);
    const fg = parseColor(tokens[fgToken]);
    const ratio = contrast(composite(fg, bg), bg.rgb);
    const ok = ratio >= need;
    if (!ok) failures++;
    if (need > 0 && ratio < lowest.ratio) lowest = { ratio, label, theme: name };
    console.log(
      `  ${need === 0 ? "   " : ok ? "ok " : "FAIL"} ${ratio.toFixed(2).padStart(6)}:1` +
      `${need ? `  needs ${need.toFixed(1)}` : "        "}  ${label}`
    );
  }
}

console.log(
  `\nLowest required pair: ${lowest.ratio.toFixed(2)}:1 — ${lowest.label} (${lowest.theme})`
);

if (failures) {
  console.error(`\n${failures} pair(s) below the WCAG minimum.`);
  process.exit(1);
}
console.log("All required pairs pass WCAG AA.");
