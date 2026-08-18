# 포트폴리오 세션 인계 문서 (2026-08-18)

## 저장소 / 배포 정보
- 저장소: `wuugi/port`
- 배포: Vercel — `https://wuugi-port.vercel.app/`
- **Vercel은 `main` 브랜치만 감시해서 배포함**
- 코드 추적용 피처 브랜치: `claude/notion-mcp-portfolio-content-qu562q`
- **모든 변경사항은 반드시 `main`과 `claude/notion-mcp-portfolio-content-qu562q` 두 브랜치 모두에 푸시해야 함**

## ⚠️ 중요: 이 사이트는 노션과 자동 연동되지 않습니다

사용자가 "노션에 있는 정보가 자동으로 사이트에 노출되는 구조 아니었냐"고 질문했는데, **아닙니다.**

### 실제 구조
- 모든 프로젝트/커리어/자기소개 텍스트는 `lib/static-data.ts`에 **하드코딩**되어 있음
- 즉, 노션 페이지 내용을 수정해도 사이트 텍스트에는 반영되지 않음. 텍스트를 바꾸려면 **`lib/static-data.ts`를 직접 수정하고 git push**해야 함

### 현재 실제로 노션과 연결되어 있는 부분 (이미지만)
텍스트와 달리 **프로젝트 이미지는 부분적으로 노션에서 실시간으로 가져오는 구조**가 이미 구현되어 있음. 동작 방식:

1. `components/v1/ProjectsPanel.tsx` (라인 84~93)
   - 최초 렌더링 시 `lib/static-data.ts`의 `projectsData`(하드코딩 텍스트)를 그대로 화면에 표시
   - `useEffect`에서 클라이언트가 `/api/notion/projects`를 fetch → 응답이 오면 `rawProjects` state를 교체(리렌더링). 즉 첫 페인트는 정적 데이터, 이후 노션 이미지가 붙은 데이터로 교체되는 2단계 구조
   - `components/v2/ProjectsSection.tsx`도 같은 패턴 사용 여부는 미확인 — 필요 시 확인할 것

2. `app/api/notion/projects/route.ts` (Next.js Route Handler, `dynamic = "force-dynamic"`으로 매 요청마다 실행)
   - `getStaticProjects()`로 `static-data.ts`의 프로젝트 배열을 가져옴 (텍스트는 항상 이 정적 데이터가 base)
   - `process.env.NOTION_TOKEN`이 없으면 그대로 `{ projects: staticProjects, source: "static" }` 반환하고 끝
   - 토큰이 있으면 각 프로젝트의 `notionUrl` 필드(예: `https://app.notion.com/p/1fc8937a33b180d59937f2a226db9d5d`)에서 정규식 `/\/p\/([a-f0-9]{32})/`로 노션 페이지 ID를 추출
   - 그 페이지 ID로 `GET https://api.notion.com/v1/blocks/{pageId}/children` 호출 → 페이지 내 `type: "image"` 블록만 최대 3개까지 URL 수집
   - 이미지가 있으면 `{ ...project, images: [...] }` 형태로 프로젝트 객체에 `images` 배열을 붙여서 반환 (`source: "notion"`)
   - **즉 여기서 가져오는 건 오직 이미지 URL뿐이고, title/summary/result 등 텍스트 필드는 절대 건드리지 않음**

3. `lib/notion.ts`의 `fetchProjects()` 함수
   - `@notionhq/client` SDK로 노션 **데이터베이스**를 쿼리해서 title/period/summary/role/result/tags/background/problem/process/fullResult 등 텍스트 전체를 노션 프로퍼티에서 파싱해오는 함수가 **이미 작성되어 있음** (`static-data.ts`의 `notionDatabaseIds`가 바로 이 함수에 넘길 database_id 용도로 정의된 것으로 보임)
   - **하지만 이 함수는 코드베이스 어디서도 호출되지 않는 죽은 코드(dead code)임** — grep 결과 `fetchProjects`를 import/호출하는 곳이 없음
   - 즉 "노션 DB에서 텍스트까지 통채로 자동으로 가져오는" 기능은 이미 절반쓸 구현되어 있으나 실제 라우트에 연결만 안 되어 있는 상태. 이걸 `app/api/notion/projects/route.ts`에서 호출하도록 배선하면 텍스트까지 자동 동기화가 가능해질 수 있음 (아래 "다음 세션" 항목 참고)

4. `app/api/notion/debug/route.ts`
   - 특정 페이지 ID(`1418937a33b180a0be91dd0c447a1c8a`, 마이다스 구 프로젝트 하나)의 블록 목록과 이미지 블록을 확인하는 디버그용 엔드포인트. 프로덕션 로직에는 영향 없음

5. 환경변수
   - `.env.local.example`에 `NOTION_TOKEN=your_notion_integration_token_here` 정의되어 있음
   - **Vercel 프로덕션에 이 값이 실제로 설정되어 있는지는 이번 세션에서 확인하지 못함.** 설정되어 있어야 위 이미지 자동 fetch가 동작하고, 없으면 `/api/notion/projects`가 항상 정적 데이터만 반환함 (`source: "static"`)

### 진짜 자동 동기화를 만들려면 (아직 미구현)
다음 중 하나의 아키텍처 변경이 필요함:
1. **빌드 타임 동기화 (ISR/SSG)**: Next.js 빌드 시 노션 API를 호출해 `static-data.ts` 역할을 대체하는 데이터를 생성. Vercel 빌드 훅이나 revalidate 주기 설정 필요
2. **런타임 동기화 (SSR)**: 페이지 요청마다 노션 API를 호출해 데이터를 가져옴. 노션 API 레이트 리밋/속도 이슈 고려 필요
3. 두 경우 모두 노션 API 토큰을 Vercel 환경변수에 등록하고, 노션 페이지 스키마(속성명 등)를 코드가 파싱할 수 있는 형태로 표준화해야 함

이 작업은 이번 세션에서 하지 않았음. 사용자가 원하면 다음 세션에서 진행 가능.

## 이번 세션에서 한 작업

### 문제
노션에 있는 프로젝트 정보와 사이트에 노출되는 프로젝트 정보가 달랐음:
- 노션: 자비스 7건, 마이다스 3건
- 사이트(`static-data.ts`): 자비스 4건, 마이다스 4건(오래된/잘못된 데이터)

### 조치
`lib/static-data.ts`를 노션 기준으로 업데이트:

1. **자비스(jarvis) 프로젝트 3건 추가** (`proj-jarvis-5`, `proj-jarvis-6`, `proj-jarvis-7`)
   - 크리티컬 노운 이슈 해결 (오신고 문제 해결)
   - 서비스 모니터링 대시보드 제작
   - 고객 만족도 조사 개선 및 대시보드 제작

2. **마이다스(midas) 프로젝트 4건 → 3건으로 전량 교체** (`proj-midas-1~3`)
   - 고객 요구사항 기반 기능 개선 및 백로그 해소
   - VOC 기반 개선 운영 및 시나리오봇 응대율 개선
   - 대규모 채용 프로젝트 사전 안정성 점검 (QA)

3. **`notionDatabaseIds.midas` 값 갱신**
   - `1418937a-33b1-8095-a29c-e7d62223648d` → `4ee459a1-7b7f-4506-b438-481f29908326`

각 프로젝트는 한글/영문(`en` 필드) 콘텐츠를 모두 포함하며, `background`/`problem`/`process`/`fullResult`/`notionUrl` 등 기존 스키마를 그대로 따름.

### 커밋 내역
- `claude/notion-mcp-portfolio-content-qu562q`: commit `8c999d7` — "feat: sync project data with Notion — add 3 Jarvis projects, replace Midas projects"
- `main`: commit `b05c58e` — "fix: 노션 최신 데이터에 맞춰 프로젝트 목록 업데이트 (자비스 3건 추가, 마이다스 3건 교체)"

두 브랜치 모두 반영 완료. Vercel이 `main` 기준으로 자동 배포함.

## 다음 세션에서 이어서 할 수 있는 일
- [ ] **가장 빠른 다음 스텝**: `lib/notion.ts`의 `fetchProjects()`(이미 텍스트 전체 파싱 로직 구현되어 있으나 미사용)를 `app/api/notion/projects/route.ts`에 연결하면 텍스트까지 노션에서 자동으로 가져오는 구조를 만들 수 있음. 단, 그러려면 노션 데이터베이스의 속성명(Title/Period/Summary/Role/Result/Tags/Background/Problem/Process/FullResult 또는 한글명)이 실제 노션 DB 스키마와 정확히 일치하는지 먼저 확인 필요
- [ ] Vercel 프로덕션 환경변수에 `NOTION_TOKEN`이 설정되어 있는지 확인 (없으면 이미지 자동 fetch조차 동작 안 함 — `source: "static"`으로만 응답)
- [ ] 배포 후 `https://wuugi-port.vercel.app/`에서 자비스/마이다스 신규 프로젝트가 정상 노출되는지, 그리고 노션 이미지가 실제로 붙는지 육안 확인
- [ ] 이전 세션들에서 진행한 UI 변경사항(다크/라이트 팔레트, 커리어 배지, 노션 링크 버튼 제거 등)과 충돌 없는지 확인
- [ ] `components/v2/ProjectsSection.tsx`가 `/api/notion/projects`를 쓰는지, 아니면 정적 데이터만 쓰는지 확인 (이번 세션에서 미확인)

## 작업 시 참고사항 (환경 특이사항)
- 이 원격 환경에서는 `git push`가 자격증명 부재로 실패함 → 항상 `mcp__github__push_files` MCP 툴 사용
- `push_files`로 GitHub에 커밋한 후에는 로컬이 뒤처지므로 `git fetch origin <branch> && git reset --hard origin/<branch>`로 동기화 필요
- PR은 명시적으로 요청받았을 때만 생성
