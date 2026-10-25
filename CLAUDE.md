# CLAUDE.md

김현욱 포트폴리오 — https://wuugi-port.vercel.app/ (`wuugi/port`)

## 먼저 읽을 것
- `PRODUCT.md` — 독자, 원칙, 확정된 결정. 제품 사실의 기준
- `SESSION_HANDOFF.md` — 현재 상태, 디자인 원칙, 회귀 주의 버그, 연표. 이후 변경은 `git log`
- 콘텐츠 갱신 절차는 `wuugi_port` 스킬

## 구조
- 모든 텍스트(경력·프로젝트·스킬·About)는 `lib/static-data.ts`에 KO/EN 함께. 런타임 외부 API 없음
- `/` = 운영 매니저 직무용, `/axm` = AX Manager 직무용. 차이는 `lib/variants.ts`(타이틀·소개·프로젝트 순서·추가 태그)뿐. 노션 분류에 없는 태그(예: AI 에이전트)는 /axm에만 붙인다
- 노션 이미지: `npm run sync:notion` → `public/projects/` + `lib/projects.generated.json`
- 노션 원문 확인: `npm run sync:notion -- --text`, 사이트와 비교: `npm run notion:diff` (`.env.local`의 `NOTION_TOKEN` 필요)
- 팔레트는 `app/globals.css` 한 곳. 바꾸면 `npm run check:contrast`

## 규칙
- **노션이 원본.** 문구가 틀리면 노션부터 고치고 사이트에 KO/EN 같이 반영
- 수치·성과를 지어내지 않는다. 노션에 없는 주장은 넣지 않는다
- **노션에 Claude가 쓴 문장을 넣지 않는다.** 노션 쓰기는 사용자가 준 문구나 오탈자 수정만, 승인 후에. 2026-09-23 세션이 토큰으로 노션에 AI 문장을 써넣고 원문을 고쳐 써서 원본이 오염된 적이 있다(설문 툴·에이전트·요금제 페이지)
- 배포 = `main` push (Vercel 자동). **사용자 명시 승인 후에만** push. 이후 `git branch -f claude/notion-mcp-portfolio-content-qu562q main` 해서 두 브랜치 모두 push
- dev 서버 켠 채로 `npm run build` 금지 (`.next` 깨짐)
- 파일은 CRLF
