# 포트폴리오 세션 인계 문서 (2026-08-29 갱신)

> 이전 판(2026-08-18)의 노션 구조 설명은 **일부 무효**입니다. 아래 4절이 최신입니다.

---

## 0. 지금 당장 알아야 할 것

- **아무것도 push하지 않았습니다.** 전부 로컬에만 있습니다.
  - `main` → `origin/main` 대비 **18 커밋 앞섬**
  - `claude/notion-mcp-portfolio-content-qu562q` → **13 커밋 앞섬**
  - 두 브랜치는 **트리가 동일**합니다 (`git diff main <feature>` 결과 없음)
- **`main`에 push하면 Vercel이 즉시 프로덕션 배포합니다.** 사용자 승인 후에만 하세요.
- 빌드 · 타입체크 · 디자인 디텍터 모두 클린 상태로 커밋돼 있습니다.

```bash
cd "C:/Users/hyunu/OneDrive/Desktop/claude/포트폴리오/port"
npm run dev        # http://localhost:3000
npm run build      # dev 서버를 반드시 먼저 끌 것 (6절 함정 참고)
```

---

## 1. 저장소 / 배포

- 저장소: `wuugi/port`
- 배포: **Vercel** — https://wuugi-port.vercel.app/
- **Vercel은 `main` 브랜치만 감시**
- **모든 변경은 `main`과 `claude/notion-mcp-portfolio-content-qu562q` 양쪽에 반영**
  - 이번 세션 방식: `main`에서 작업 → `git branch -f claude/notion-mcp-portfolio-content-qu562q main`
- git identity는 **이 저장소에만**(`--local`) `wuugi <104419293+wuugi@users.noreply.github.com>` 설정. 전역은 건드리지 않음

---

## 2. 확정된 디자인 원칙

제품 사실은 저장소 루트 **`PRODUCT.md`**(신규)에 있습니다. 디자인 규칙은 아래가 최신입니다.

### 색 — 의미는 두 가지뿐
```
클레이(clay) = 액션 · 링크 · 활성 상태
초록(green)  = 성과 · 결과
그 외 전부   = 중립 (회사 · 스킬 카테고리는 텍스트 라벨이 담당)
```
- 회사별/카테고리별 색은 **제거됨**. 이전 teal/blue 조합은 OKLab 지각거리 **Δ0.088**로 식별 임계선(약 0.09) 아래였음
- 팔레트는 `app/globals.css` **한 곳에만** 존재. 컴포넌트에 하드코딩된 색 없음
- **대비는 측정값**: 본문·보조 텍스트 WCAG **AAA(7:1 이상)**, 나머지 4.5:1 이상, 전체 최저 **5.6:1**
- 검증 스크립트는 임시 폴더에 있었고 저장소에 없음. 팔레트를 바꾸면 OKLCH→sRGB→WCAG 재계산 필요

### 형태 — 문제는 박스 개수, 모서리가 아님
- 사용자가 반복해 지적한 "AI 같다"의 실체는 **패널마다 동일한 1px 카드가 캔버스에 떠 있는 것**(대시보드 위젯 문법)
- **모서리를 둥글게 하면 역효과** — 캔버스 위 둥근 카드가 바로 전형적인 SaaS/AI 템플릿 언어. **90도 유지**
- 방향: 카드를 걷어내고 **헤어라인 + 여백**으로 구조를 만든다. 카드는 **진짜 떠 있어야 하는 것(모달)에만**

### 한글 타이포
- `body`에 `word-break: keep-all` + `overflow-wrap: break-word` (globals.css)
  - 없으면 "SQL 기 / 반 모니터링"처럼 단어 중간에서 끊김
- **`ch` 단위 금지** — 라틴 "0" 기준이라 한글에서 훨씬 넓어짐. `rem` 고정폭 사용

---

## 2-B. 페이지 구조 — 탭 전환에서 **한 페이지 스크롤**로 변경 (2026-08-29)

패널을 클릭으로 갈아끼우던 구조를 없애고 다섯 섹션을 한 문서에 쌓았습니다.

- `PortfolioV1.tsx` — `activePanel` 스위치 렌더 제거. `<section id="about|career|projects|skills|contact">` 5개를 헤어라인으로 구분해 나열
- `TopNav.tsx` — 탭이 `<button>` → `<a href="#섹션">`. 딥링크(`/#projects`)가 그대로 동작
  - href만으로는 **이미 그 해시에 있을 때 다시 눌러도 브라우저가 아무것도 안 함**. `onClick`에서 `scrollIntoView()`를 같이 호출해 항상 이동하게 함
- 활성 탭은 클릭이 아니라 **스크롤 위치**가 결정 (`scroll` 리스너, passive). 헤더 아래 80px 선을 지난 마지막 섹션이 현재 섹션이고, 페이지 끝에 닿으면 마지막 섹션(Contact)으로 강제
  - 마지막 섹션은 짧아서 헤더 선까지 절대 못 올라오므로 이 예외가 필요함
- `html { scroll-behavior: smooth }` + 섹션 `scroll-mt-20`(스티키 헤더 회피). reduced-motion에서는 `auto`
- `.panel-enter-next/prev` 애니메이션과 keyframes 삭제 (패널이 더는 교체되지 않음)
- `SkillsPanel` 막대: 마운트 후 100ms 타이머 → **IntersectionObserver**. 이제 접힌 화면 아래에 있으므로 도달했을 때 채워짐

### 이 과정에서 드러난 기존 버그 2개 (회귀 주의)

1. **`body { overflow-x: hidden }`이 스티키 헤더를 죽이고 있었음.** body에 overflow가 걸리면 body가 스크롤 컨테이너가 되고, 그 안의 `position: sticky`는 뷰포트가 아니라 body 기준이 되어 그냥 같이 밀려 올라갑니다. 페이지가 짧을 땐 안 보이던 버그. **overflow-x를 `html`에만 남겼습니다** (html의 값은 뷰포트로 전파되므로 가로 스크롤 차단은 그대로)
2. **모달 스크롤 락이 `document.body`에 걸려 있어 실제로 잠기지 않았음.** 같은 전파 규칙 때문에 뷰포트를 잠그려면 `document.documentElement`에 걸어야 합니다. 수정함. 레이아웃 점프는 기존 `scrollbar-gutter: stable`이 흡수

**검증:** 타입체크·빌드 클린. 브라우저에서 해시 이동, 스티키 헤더 고정(navTop=0), 스크롤 기반 활성 탭, 스킬 막대 도달 시 채워짐, 모달 열림/락/Esc 해제까지 확인. **좁은 화면은 여전히 미검증**(3-4 참고)

---

## 3. 남은 작업 (우선순위)

### 1) Career / Skills 패널 카드 제거 — 바로 착수 가능
About(`components/v1/AboutPanel.tsx`)과 Contact는 **적용 완료**. 같은 방식으로:
- `components/v1/CareerPanel.tsx` — `bg-[var(--bg-card)] border ... p-6 sm:p-10` 래퍼 제거
- `components/v1/SkillsPanel.tsx` — 카테고리 패널 3개의 `bg-card + border` 제거

참고 패턴: `AboutPanel.tsx`의 `<section className="border-t border-[var(--border)] pt-2">`

### 2) 테두리 위계
컨테이너 경계와 구분선이 **같은 굵기·같은 색**(`--border`). 카드를 걷어낸 뒤 구분선용 더 옅은 토큰이 필요할 수 있음.

### 3) 노션 About 연동 — **차단됨** (4-2 참고)

### 4) 모바일 렌더링 미검증
이번 세션 내내 `resize_window`가 실제 뷰포트를 바꾸지 못했고 렌더러가 자주 멈췄습니다.
**좁은 화면 렌더링을 한 번도 눈으로 확인하지 못했습니다.** 반응형 클래스는 작성돼 있으나 검증 필요.

---

## 4. 노션 연동 — 현재 구조와 차단 지점

### 4-1. 프로젝트 텍스트 동기화 — 배선 완료, **실행 검증 미완**

`lib/notion.ts`의 `fetchProjects()`를 `app/api/notion/projects/route.ts`에 연결했습니다.
단, **통째 교체가 아니라 필드 단위 병합**입니다:

- 노션에 값이 있으면 이김
- **비어 있으면 정적 값을 덮어쓰지 않음** — 속성명 하나 바뀌었다고 라이브 페이지가 백지가 되는 사고 방지
- 노션 호출 실패 시 통째 정적 폴백 (`source: "static-fallback"`)
- 매칭 키: `notionUrl`의 32-hex 대 노션 `page.id`(대시 제거). 12개 프로젝트 전부 `notionUrl` 보유, 양방향 일치 확인함

**파서에 추가한 것:** `en` 속성 파싱(`Summary EN` / `Summary_EN` / `요약 영문` 등 복수 표기 허용), `notionUrl` 반환.

> 이전 파서는 `en`을 **전혀 파싱하지 않았고** `notionUrl`도 반환하지 않았습니다.
> 그대로 배선했다면 **영문 사이트 전체가 한국어로 폴백되고 이미지 연동도 죽었을 것**입니다.

**미검증:** 로컬에 `NOTION_TOKEN`이 없어 **정적 폴백 경로만 테스트**했습니다(12건 · EN 12건 유지 · 잘못된 company 400). **노션 경로는 실행해본 적 없습니다.**

**스키마 확인 방법:** 배포 후 **`/api/notion/debug`** 를 열면 세 DB의 실제 속성명과 파서 기대값 매칭이 JSON으로 나옵니다.
- `korean.matched` — 이 필드만 동기화됨
- `korean.missing` — `lib/static-data.ts` 값 유지
- `english.missing` — EN 미동기화. 노션에 해당 컬럼을 만들면 즉시 동작

> 이 라우트는 예전에 **토큰 앞 12자를 공개 응답에 노출**하고 있었습니다. 제거했습니다.

### 4-2. About(자기소개) 연동 — **차단**

요청받은 페이지:
`https://app.notion.com/p/Operation-Manager-93c43a4bceb5447c85efa680e7e2f61d`

**네 경로 전부 404:** 전체 URL / 대시 UUID / 워크스페이스 검색 / 최근 문서 목록

MCP 인증 상태 (`notion-fetch` id=`self`):
```
User:      김현욱 (hyunuk125@gmail.com)   type: person   <- integration 아님
Workspace: 현욱의 Notion
```

노션 Connections에서 **"Claude"를 찾아도 안 나오는 게 정상**입니다.
추가할 integration이 존재하지 않는 구조(사용자 본인 OAuth)입니다.

**가장 유력한 원인:** 그 페이지가 `현욱의 Notion`이 **아닌 다른 워크스페이스**에 있음.
**사용자에게 확인할 것:** 해당 페이지를 연 상태에서 좌측 상단 워크스페이스 이름이 `현욱의 Notion`인지.

**중요 — 경로가 두 개입니다:**

| | 인증 주체 | 용도 |
|---|---|---|
| MCP | 사용자 본인 계정 | Claude가 읽는 용도 |
| 사이트 | `NOTION_TOKEN` (별도 integration) | 배포된 사이트가 읽는 용도 |

**MCP가 뚫려도 사이트는 못 읽습니다.** 사이트가 읽으려면 `NOTION_TOKEN` integration에도 페이지 공유가 필요합니다.

또한 `personInfo.intro`는 **현재 노션 동기화 대상이 아닙니다.** `lib/notion.ts`는 프로젝트만 파싱하고 `personInfo`는 손대지 않습니다. About 연동에는 새 경로가 필요합니다.

### 4-3. 확인된 사실
- `NOTION_TOKEN`은 Vercel에 **설정돼 있음** (사용자 확인)
- 스킬(`skillsData`)은 노션 동기화 대상이 **아님** — `lib/notion.ts`에 관련 코드 0줄

---

## 5. 이번 세션에서 고친 실제 버그 (회귀 주의)

1. **`lib/`가 Tailwind content 글롭에 없었음** — `lib/` 안의 클래스 문자열이 CSS로 **전혀 생성되지 않음**. `tailwind.config.ts`에 추가
2. **모달이 애니메이션 래퍼에 갇힘** — transform이 걸린 조상이 `position: fixed`의 containing block이 되어 스크림이 패널 크기로 잘림. `createPortal`로 `document.body`에 이동
3. **EN 무한 렌더 루프 위험** — `tProject()`가 EN에서 **매 렌더 새 객체** 반환. 모달 이펙트를 객체가 아닌 `project.id`에 키잉. 안 그러면 무한 루프 + 포커스 강탈
4. **EN 로케일 누수** — `period` 데이터에 한국어 "재직중"이 박혀 있고 번역 안 됨. 데이터를 `"2026.1"`로 바꾸고 UI가 조합
5. **`navigator.clipboard` 미처리 rejection** — 비보안 출처/권한 거부 시 복사 버튼이 멈춤. try/catch 추가
6. **패널 전환 시 8px 가로 밀림** — 스크롤바 출현. `scrollbar-gutter: stable`
7. **프로필 이미지 1.14MB** — 128px 박스에 921x1152 원본. `next/image` + 실제 intrinsic size(128) 적용으로 **1,193,982 → 3,564 바이트**. 페이지 전체 **1318KB → 161KB**
8. **노션 fetch가 방문할 때마다 재요청** — 패널이 탭 전환마다 언마운트되므로 `useEffect(…, [])`가 매번 실행. 모듈 스코프 캐시로 해결

---

## 6. 작업 함정

- **dev 서버가 켜진 상태로 `npm run build` 하지 말 것.** `.next`를 덮어써서 실행 중인 dev 서버가 깨집니다(CSS가 통째로 사라지거나 `PageNotFoundError`). **이 세션에서 두 번 당했습니다.**
- **스크린샷이 애니메이션 중간 프레임을 잡습니다.** 스킬 바가 12%만 찬 것처럼, 모달이 반투명한 것처럼 보이면 버그가 아니라 전환 중일 수 있습니다. 한 장 더 찍어 확인하세요
- **첫 클릭이 하이드레이션 전에 씹힙니다.** 로드 직후 nav 클릭은 자주 무시됩니다. 한 번 더 클릭
- 셸에서 `node -e`에 정규식/백슬래시를 넣으면 이스케이프가 깨집니다. 스크립트 파일 또는 `sed` 사용
- 파일이 **CRLF**입니다. `\n` 기반 정규식 치환이 실패할 수 있습니다

---

## 7. 삭제된 것

- **`/v2` 전체** (`app/v2/`, `components/v2/` 9개 파일) — 사용자 결정. 다크모드·i18n 미적용의 별도 구현이었음
- `lib/palette.ts` — 회사 색 제거 후 6개 항목이 전부 동일 객체가 되어 순수 간접층으로 전락
- i18n 미사용 문자열 8개, `--co-*` / `--cat-*` / `--accent2-subtle` / `--accent2-line` 토큰
- Contact 소제목, 자기소개 첫 문장(양 언어), 스킬 퍼센트 숫자, "핵심 역량 Top 5" 패널, 경력 타임라인 패널

## 8. 추가된 것

- **`PRODUCT.md`** (저장소 루트) — 제품 사실 기록
- **`sharp`** — 프로덕션 이미지 최적화(libvips). 없으면 Next가 느린 WASM 폴백 사용
- `next.config.mjs`의 `images.remotePatterns` — 노션 S3 이미지용
- 스킬에 **`Claude`** 추가 (데이터 & 분석, level 88) — 저장소 히스토리에 **한 번도 커밋된 적 없었음**(노션에 적어두셨을 가능성. 스킬은 노션 동기화 대상이 아님)
