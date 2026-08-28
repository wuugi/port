# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers, recruiters, and prospective team leads evaluating 김현욱 for
service-operations / operations-management roles.

Two audiences are equally primary (confirmed): **domestic Korean employers and
international / English-speaking employers.** Neither language is a courtesy
translation — both are first-class.

Reading situation: a short, scanning read, usually alongside a résumé, often
before any conversation has happened. The reader is deciding whether this person
is worth a call.

## Product Purpose

A personal portfolio presenting six years of service-operations work as
**evidence**: career history across three companies, twelve projects each with a
problem → process → result narrative, and a skills inventory.

Success is that a reader grasps who he is and what he has actually delivered
without having to read everything.

## Positioning

Not a résumé restated as a web page. Each project leads with a concrete operational
outcome (NDR 118% 달성, 관련 문의 95% 감소, 이슈 후처리 대상 25% 감소 …) and is backed by a
full case narrative — 배경 / 문제 인식 / 진행 과정 / 결과.

The evidence here is operational metrics and decision-making, not visual artifacts.
That is what distinguishes it from a designer's or developer's portfolio, and it is
what the presentation must serve.

## Operating Context

- Repository: `wuugi/port`
- Deployed on **Vercel** — https://wuugi-port.vercel.app/
- **Vercel deploys only from `main`.** Changes must be pushed to both `main` and
  `claude/notion-mcp-portfolio-content-qu562q`.
- Content is authored and maintained in **Notion**; Notion is the reference for
  which projects exist and what they say.
- The site itself offers a KO/EN toggle and a dark/light theme toggle, the latter
  persisted to `localStorage`.

## Capabilities and Constraints

- Next.js 14 (App Router), React 18, TypeScript, Tailwind 3.
- Server rendering is available on Vercel, which `next/image` optimization depends
  on; `sharp` is installed for it.
- Career / project / skills text is currently **hardcoded in `lib/static-data.ts`**.
  Editing Notion does not change site text today.
- `/api/notion/projects` attaches **images only** at runtime, resolved from each
  project's `notionUrl`. It never overwrites text fields, and returns
  `source: "static"` when `NOTION_TOKEN` is absent.
- `lib/notion.ts → fetchProjects()` already parses full project text from a Notion
  database but is **not wired to any route** (dead code).
- **Decided:** move to full Notion text sync by wiring `fetchProjects()`, making the
  Notion DB the single source of truth. Blocked on confirming the Notion database
  property names match what the parser expects.
- **Decided:** the `/v2` route — a second, unrelated implementation (indigo/slate,
  no dark mode, no i18n) — is slated for **removal**. Not yet executed.
- **Unverified:** whether `NOTION_TOKEN` is set in Vercel production. Without it,
  no Notion images ever appear in production.

## Brand Commitments

- Name: 김현욱 / Kim Hyun Uk.
- Title: "고객 경험과 데이터를 보는 Operation Manager (6년차)".
- Company names as authored. Korean keeps **자비스앤빌런즈 (삼쩜삼)** — 삼쩜삼 is the
  recognisable service brand and must not be dropped for brevity. English uses
  Midas-in / Jarvis & Villains / Flex.

## Evidence on Hand

- Three companies with dated tenures and responsibility lists (마이다스인 2021.1–2023.5,
  자비스앤빌런즈 2023.6–2025.8, 플렉스 2026.1–present).
- Twelve projects — 플렉스 2, 자비스앤빌런즈 7, 마이다스인 3 — each with summary, role and
  result; most with background / problem / process / fullResult; all in KO and EN.
- Thirteen skills across data / tools / process, with self-assessed levels. These are
  shown as relative bars; the numeric percentages are deliberately not displayed
  because self-rating cannot support that precision.
- SQLD (2023.12.15); TOEIC 920, stated honestly as expired (2024.7).
- `public/profile.png` — the only image asset in the repository.
- Project images live **only in Notion** and are fetched at runtime; there are none
  in static data.
- **Absent:** testimonials, references, client logos, third-party metrics, press.
  Future work must not fabricate any of these.

## Product Principles

1. **Outcome first.** Every project leads with what changed, not what was done.
2. **Both languages are first-class.** Nothing may render in the wrong language, and
   no string may be assembled from concatenated fragments that only work in Korean.
3. **Readability governs.** Measured contrast beats expression; when they conflict,
   contrast wins.
4. **Claims stay verifiable.** No invented metrics, endorsements, or false precision.
5. **Notion is the content source of record.** The site should not become a second
   place where copy is authored.

## Accessibility & Inclusion

- Bilingual KO/EN, Korean as the primary authoring language.
- Body and secondary text meet **WCAG AAA (≥7:1)** against both canvas and card in
  both themes; all colour roles clear 4.5:1. Lowest measured pair: 5.88:1.
- Colour never carries meaning alone — every colour-coded company, category, and
  status also carries a text label.
- A `prefers-reduced-motion` path exists and reduces spatial travel while preserving
  state-carrying feedback.
