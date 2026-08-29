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
- All text — career, projects, skills, About — is authored in **`lib/static-data.ts`**,
  Korean and English together. The deployed site calls no external API.
- **Notion holds the raw working notes**, one page per project under a template
  (요약 / 역할 / 성과 / 시기 → 배경·문제 → 진행 과정 → 결과). Its databases carry a single
  `이름` property; everything else lives in the page body, and there is no English
  anywhere in it. Confirmed against the live workspace on 2026-08-29.
- **Decided (2026-08-29):** the sync moves only what is mechanical. `npm run sync:notion`
  downloads page images into `public/projects/` and records their measured dimensions in
  `lib/projects.generated.json`; `--text` prints each page's body as the raw material for
  a content update. Turning notes into bilingual copy stays an editorial pass done in a
  session and reviewed as a diff — syncing Notion's text directly would trade edited
  prose for bullet memos and leave the English silently behind.
- Image URLs from Notion are signed and expire within the hour, which is why a copy in
  the repository is the only way to show them.
- `NOTION_TOKEN` is needed **locally, to run the sync**. It is no longer read at
  runtime, so it is not required in Vercel. The integration is connected to the three
  project databases, the About page, the skills database and the template page;
  sharing inherits, so connecting a parent page covers everything beneath it.
- The `/v2` route and `components/v2/` have been **removed**.

## Brand Commitments

- Name: 김현욱 / Kim Hyun Uk.
- Title: "고객 경험과 데이터를 보는 Operation Manager", as authored on the Notion About
  page. **No years-of-experience claim in the title:** Notion states 총 5년 3개월, so the
  earlier "(6년차)" / "6-Year" overstated it in English.
- Company names as authored. Korean keeps **자비스앤빌런즈 (삼쩜삼)** — 삼쩜삼 is the
  recognisable service brand and must not be dropped for brevity. English uses
  Midas-in / Jarvis & Villains / Flex.

## Evidence on Hand

- Three companies with dated tenures and responsibility lists (마이다스인 2021.1–2023.5,
  자비스앤빌런즈 2023.6–2025.8, 플렉스 2026.1–present).
- Twelve projects — 플렉스 2, 자비스앤빌런즈 7, 마이다스인 3 — each with summary, role and
  result; most with background / problem / process / fullResult; all in KO and EN.
- Fourteen skills across data / tools / process, with self-assessed levels. The levels
  order the list and band it into 주력 / 실무 활용 / 사용 경험; neither the number nor a
  bar is shown, because a self-rating cannot support that precision.
- SQLD (2023.12.15); TOEIC 920, stated honestly as expired (2024.7).
- `public/profile.png` — the only image asset in the repository.
- Project images come from the Notion pages and are checked into `public/projects/`
  by the sync script; none are hand-authored.
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
