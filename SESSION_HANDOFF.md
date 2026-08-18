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
- `notionDatabaseIds` (같은 파일 하단)는 **이미지를 노션 API에서 가져오는 용도로만** 쓰임 — 텍스트 콘텐츠와 무관
- 즉, 노션 페이지 내용을 수정해도 사이트에는 반영되지 않음. 사이트 텍스트를 바꾸려면 **`lib/static-data.ts`를 직접 수정하고 git push**해야 함

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
- [ ] 실제 노션 → 사이트 자동 동기화 아키텍처 설계/구현 (원하는 경우)
- [ ] 배포 후 `https://wuugi-port.vercel.app/`에서 자비스/마이다스 신규 프로젝트가 정상 노출되는지 육안 확인
- [ ] 이전 세션들에서 진행한 UI 변경사항(다크/라이트 팔레트, 커리어 배지, 노션 링크 버튼 제거 등)과 충돌 없는지 확인

## 작업 시 참고사항 (환경 특이사항)
- 이 원격 환경에서는 `git push`가 자격증명 부재로 실패함 → 항상 `mcp__github__push_files` MCP 툴 사용
- `push_files`로 GitHub에 커밋한 후에는 로컬이 뒤처지므로 `git fetch origin <branch> && git reset --hard origin/<branch>`로 동기화 필요
- PR은 명시적으로 요청받았을 때만 생성
