import type { CareerItem, Project, SkillItem, PersonInfo, CompanyKey } from "./types";

export const personInfo: PersonInfo = {
  name: "김현욱",
  nameEn: "Kim Hyun Uk",
  title: "고객 경험과 데이터를 보는 Operation Manager",
  email: "hyunuk1245@naver.com",
  phone: "010-2515-5238",
  // Authored in Notion (자기소개 페이지). Paragraphs are split on a blank line.
  intro:
    "서비스 이슈 분석 및 개선을 주도하며 고객 중심의 운영 전략을 수립해온 Operation Manager입니다. 고객 여정 전반을 설계하면서 서비스 인지부터 종료까지 만족스러운 경험을 제공하기 위해 노력했습니다.\n\n" +
    "고객이 갖고 있는 불편사항을 직접 컨택해 확인하고, 그 개선점을 팀과 제품을 통해 이끌어내면서 제품의 가치를 고객이 온전히 느낄 수 있도록 만들었습니다.\n\n" +
    "AI를 활용해 업무 효율을 높이고, 그렇게 확보한 시간을 다시 고객에게 쓸 수 있는 환경을 만들었습니다.",
  education: "경희대학교 지리학/언론정보학",
  educationPeriod: "2014.03 - 2020.02",
  certifications: ["SQLD (23.12.15)"],
  languages: ["영어 일상 회화 가능", "OPIc IH (2026.09)"],
  profileImage: "/profile.png",
  en: {
    title: "Operations Manager Focused on Customer Experience & Data",
    intro:
      "An Operations Manager who leads service issue analysis and improvement and sets customer-centred operating strategy. I design the customer journey end to end, so the experience holds from the moment someone first hears about a service to the moment they leave it.\n\n" +
      "I contact customers directly to find out what is not working, then drive those fixes through the team and the product — so the value of the product actually reaches the people using it.\n\n" +
      "And I use AI to cut the routine work, which buys back the hours to spend on customers.",
    education: "Kyung Hee University — Geography / Journalism & Communications",
    certifications: ["SQLD (Dec 15, 2023)"],
    languages: ["Conversational English", "OPIc IH (Sep 2026)"],
  },
};

export const careerData: CareerItem[] = [
  {
    company: "마이다스인",
    companyKey: "midas",
    period: "2021.1 – 2023.5",
    tasks: [
      "웹 신규 서비스 전략 기획",
      "VOC 기반 서비스 개선안 기획",
      "고객 지원 자동화 플로우 개선",
      "시나리오봇 응대율 개선 프로젝트 진행",
      "데이터 분석 기반 응대 프로세스 개선",
    ],
    en: {
      tasks: [
        "New web service strategy planning",
        "Service improvement planning based on VOC",
        "Customer support automation flow improvement",
        "Chatbot response rate improvement project",
        "Response process improvement based on data analysis",
      ],
    },
  },
  {
    company: "자비스앤빌런즈 (삼쩜삼)",
    companyKey: "jarvis",
    period: "2023.6 – 2025.8",
    tasks: [
      "서비스 모니터링 (서비스 이용, 신청, 세무신고)",
      "운영 정책 수립 및 관리",
      "서비스 이슈 발생 대응 / 쿼리 빌드를 통한 이슈 대상자 직접 추출 및 처리 방향 결정",
      "고객향 메시지 내용 기획 (알림톡, 서비스 내 문구)",
      "서비스 만족도 조사 데이터 대시보드 기획 및 제작 (R 활용 코딩)",
      "고객 페인 포인트 서비스 개선안 기획",
      "SQL 활용 서비스 모니터링 대시보드 생성",
      "서비스 오픈 및 클렌징 담당",
    ],
    en: {
      tasks: [
        "Service monitoring (usage, applications, tax filing)",
        "Operational policy establishment and management",
        "Service issue response / extracting affected users via query build and determining resolution direction",
        "Customer-facing message planning (KakaoTalk notifications, in-service copy)",
        "Service satisfaction survey dashboard planning and development (R coding)",
        "Customer pain point–driven service improvement planning",
        "SQL-based service monitoring dashboard creation",
        "Service launch and data cleansing",
      ],
    },
  },
  {
    company: "플렉스",
    companyKey: "flex",
    period: "2026.1",
    tasks: [
      "요금제 개편 전환 로직 설계 및 고객 안내 프로세스 기획·운영",
      "리드 메시지 분기 체계 설계 및 담당 AM 자동 지정 로직 구축",
      "운영 정책 설계",
      "백오피스 기능 기획 및 설계",
      "서비스 운영 효율화 / 자동화 작업",
      "서비스 모니터링 대시보드 기획 및 구축",
      "고객 현황 모니터링 대시보드 구축",
      "고객 경험 개선 액션 진행",
      "서비스 관련 고객 문의 대응",
    ],
    en: {
      tasks: [
        "Pricing-plan migration logic design, and the customer notice process that went with it",
        "Lead message routing design, with the owning AM assigned automatically",
        "Operational policy design",
        "Back-office feature planning and design",
        "Service operations efficiency and automation",
        "Service monitoring dashboard planning and development",
        "Customer status monitoring dashboard development",
        "Customer experience improvement initiatives",
        "Handling customer inquiries related to the service",
      ],
    },
  },
];

export const projectsData: Project[] = [
  // FLEX
  {
    id: "proj-flex-3",
    title: "고객사 대상 설문 발송 툴 기획 및 개발",
    company: "flex",
    period: "2026.08",
    summary:
      "고객이 법인명을 잘못 입력하면 설문 응답을 고객사와 맞출 수 없었습니다. 법인명·담당자·이메일·내부 ID를 담은 프리필 링크로 응답이 고객사와 자동 매칭되게 해, 응답 매핑을 100% 자동화했습니다.",
    role: "프로세스 기획 및 프로덕트 개발",
    result: "고객사 설문 응답 매핑 100% 자동화, 외부 메일 발송 CRM 툴 의존도 제거",
    tags: ["프로세스 기획", "개발"],
    background: "고객 만족도 설문을 진행하기로 했고, 다른 부서의 요청으로 시작한 프로젝트입니다.",
    problem:
      "서비스와 담당자마다 설문지 구성이 달라 데이터를 하나로 맞추기 어려웠습니다. 응답자의 소속 법인은 사람이 직접 매칭했는데, 법인명을 비우거나 잘못 쓰면 매칭할 수 없는 응답이 생겼습니다. 발송은 메일침프로 해서 마케팅 수신을 거부한 고객에게는 정보성 설문도 보낼 수 없었고, 마케팅 발송 데이터와 설문 발송 데이터가 섞였습니다.",
    process: [
      "문제점 정의 — 데이터 매핑 문제가 어디서 생기는지 파악. 단순히 손이 많이 가는 문제가 아니라, 누가 응답했는지 사실상 알 수 없는 상태임을 확인",
      "대안 비교 — 구글 폼 프리필은 보안 검토가 필요 없고 API를 자유롭게 쓸 수 있지만, 발송 주체별 링크가 필요하고 응답자가 프리필 값을 고칠 수 있음. 서드파티 솔루션은 ID를 링크에 숨길 수 있지만, 보안 검토와 추가 비용이 필요",
      "구글 폼 결정, 초기 플로우 구현 — 보안 검토 지연과 API 제약을 피하려고 구글 폼 선택. 설문 링크를 넣으면 프리필 문항 ID를 추출하고 입력값으로 링크를 만드는 사이트 기획. 설문 생성과 메일 발송을 한 사이트에 구현",
      "기술 구현 — Claude Code로 설계를 논의하고 사이트 구현. Apps Script, Activepieces, Agent Skill 연동. 로컬 테스트 후 사내 배포 솔루션으로 웹 배포",
      "부서별 프로토타입 공유, 요구사항 반영 — 사용 부서에 가이드 문서를 공유하고 전체 사용 과정을 시연해 의견 수렴. 이미지 삽입, 이미지 내 링크, 구글 메일 발송 주체 변경 기능 추가",
      "최종 수정 후 배포 — 요구사항 반영, 가독성 개선. 내부 서버에서 테스트한 뒤 사내 서버에 배포",
    ],
    fullResult:
      "수작업 매핑이 없어지고 응답 매핑이 100% 자동화됐습니다. CRM 툴 대신 자체 발송으로 바꿔 마케팅 메시지와 겹쳐 메일이 차단되던 문제가 사라졌고, 마케팅 수신 동의와 관계없이 설문을 보낼 수 있게 됐습니다. 설문 결과를 한 DB에 모아, 고객사별 상태를 함께 보는 데이터 프로젝트로 이어갈 수 있게 됐습니다.",
    notionUrl: "https://app.notion.com/p/3ca8937a33b1806d9995d0ea5bfdcb06",
    en: {
      title: "Customer Survey Delivery Tool",
      summary:
        "Mistyped company names left survey responses unmatched. A pre-filled link carrying company, contact, email and internal ID now matches each response automatically, so mapping is fully automated.",
      role: "Process design and product development",
      result: "Survey response mapping fully automated; no longer dependent on an external CRM mailing tool",
      tags: ["Process Design", "Development"],
      background: "The company decided to run a customer satisfaction survey. The work started as a request from another team.",
      problem:
        "Each service and owner used a different survey form, so the data was hard to combine. Respondents' companies were matched by hand, and a blank or misspelled company name meant the response could not be matched. Surveys went out through Mailchimp, so customers who had opted out of marketing could not get even an informational survey, and survey sends were mixed in with marketing send data.",
      process: [
        "Defining the problem — Found where the mapping problem came from. It was not just extra manual work: there was effectively no way to tell who had responded",
        "Comparing options — Google Forms pre-fill needs no security review and allows open API use, but needs one link per sender and lets respondents edit pre-filled values. A third-party tool can hide IDs in the link, but needs a security review and costs extra",
        "Choosing Google Forms, first flow — Chose Google Forms to avoid security-review delays and API limits. Planned a site that takes a survey link, extracts the pre-fill field IDs and builds links from the inputs. Survey creation and mail sending sit on one site",
        "Building it — Designed and built the site with Claude Code. Connected Apps Script, Activepieces and an Agent Skill. Tested locally, then deployed on the internal hosting service",
        "Team prototypes and requests — Shared a user guide with each team, walked through the whole flow and collected feedback. Added images, links inside images and a switchable Gmail sender",
        "Final changes and release — Applied the requests and improved readability. Tested on an internal server, then released",
      ],
      fullResult:
        "Manual mapping is gone and response mapping is fully automated. Sending in-house instead of through the CRM tool ended the blocks caused by overlap with marketing mail, and surveys now reach customers regardless of marketing consent. Results are collected in one database, ready for a data project that looks at each customer's overall status.",
    },
  },
  {
    id: "proj-flex-1",
    title: "요금제 전환 프로젝트",
    company: "flex",
    period: "2026.04 – 2026.07",
    summary:
      "기능 중심 요금 체계를 요금제 형태로 바꾸는 개편에서 요금제 분류, 요금 적용 로직과 전환 작업, 고객 안내·대응 프로세스를 맡았습니다.",
    role: "전환 PM: 엣지 케이스 대응, 기술 검토, 전체 일정 담당 / 고객 안내 프로세스 기획·운영 (금액 설정은 회계 결정)",
    result: "NDR 118% 달성, 이탈율 10% 이하 유지, 선납금 약 0.5억 원 확보",
    tags: ["비즈니스 액션"],
    background:
      "비즈니스 목표를 위해 요금 인상이 필요했고, 단순 인상이 아니라 기능 중심에서 요금제 형태로 요금 체계를 바꾸기로 했습니다.",
    problem:
      "서비스 런칭 후 첫 대규모 과금 변화라 고객이 크게 체감할 수 있었고, 쓰지 않는 기능에 돈을 낸다는 인식이 생길 수 있었습니다. 상위 요금제 기능을 쓰던 고객은 결제 금액이 크게 올랐습니다. 고객에게 미리 안내하는 기준 프로세스도 없었습니다.",
    process: [
      "요금제 종류·변경 시점 파악, 부서별 일정 조율 — 요금제별 제공 기능 확인. 고객 안내 프로세스를 만들기 위해 변경 시점 파악",
      "엣지 케이스 체크 — 유효 계약, 파트너 서비스처럼 기존 정책을 그대로 두면 문제가 생기는 케이스 정리. 비즈니스 목표와 고객 경험 사이에서 케이스별 적용 로직 결정",
      "고객 안내 프로세스 결정 — 안내 일정, 방법, 메시지 설정. 이용 약관 변경 안내 메일 작성·발송. 메일 문의 회신 프로세스, 안내 내부 정책, 기본 안내 워크플로우 설정",
      "데이터 연동·대시보드 협업 요청 — 요금제 전환 정보 확인과 안내 자동화를 위해 DA팀에 데이터 연동 요청. 전체 시뮬레이션 데이터 검증용 대시보드 제작을 요청하고 검증",
      "연간 계약 프로세스 설정 — AM이 담당하지 않는 SMB 고객 대상 연간 계약 프로세스 구축. 계약서·견적서 생성 자동화. 이탈 위험 고객 협상 리드",
      "이상 데이터 확인 — Pipedrive나 계약 관리 어드민에 빠진 계약을 로직으로 찾아 일괄 반영. 전환 후 금액이 잘못 들어간 고객을 Metabase로 찾아 일괄 처리",
    ],
    fullResult:
      "레거시 코드 때문에 전환 중 생긴 문제들을 엣지 케이스별로 직접 검토하고 변경 로직을 확정했습니다. 약관 변경을 미리 안내한 뒤 요금제 전환을 마쳤고, NDR은 118%로 올랐습니다. 이탈 위험 고객을 연간 계약으로 전환해 선납금 약 0.5억 원을 받았고, 이탈율은 10% 이하로 유지했습니다.",
    notionUrl: "https://app.notion.com/p/36b8937a33b180cc8f31f3cd9919dd82",
    en: {
      title: "Pricing Plan Migration",
      summary:
        "In a move from feature-based billing to plans, owned the plan structure, the pricing logic and migration, and the process for notifying and supporting customers.",
      role: "Migration PM: edge cases, technical review and the overall schedule / customer notification process (prices set by finance)",
      result: "NDR 118%; churn kept under 10%; about 50m KRW in prepayments",
      tags: ["Business Action"],
      background:
        "Prices had to rise to meet business targets, and instead of a simple increase the company moved from feature-based billing to plans.",
      problem:
        "It was the first big billing change since launch, so customers would feel it, and some could see it as paying for features they did not use. Customers using higher-tier features faced large increases. There was also no standard process for telling customers in advance.",
      process: [
        "Plans, timing and team schedules — Confirmed the features in each plan and when the change would take effect, to build the notification process around it",
        "Edge cases — Listed cases that would break under existing policies, such as active contracts and partner services. Decided the logic for each, weighing business goals against customer experience",
        "Customer notification — Set the schedule, channel and message. Wrote and sent the terms-change email. Set up replies to email inquiries, internal notification policy and the basic workflow",
        "Data and dashboard requests — Asked the DA team for a data link to check migration status and automate notices, and for a dashboard to check the full simulation data, then reviewed it",
        "Annual contracts — Built an annual-contract process for SMB customers without an AM. Automated contracts and quotes. Led negotiations with customers at risk of leaving",
        "Checking anomalies — Found contracts missing from Pipedrive or the contract admin by rule and added them in bulk. Found accounts charged the wrong amount after migration in Metabase and fixed them in bulk",
      ],
      fullResult:
        "Reviewed each edge case that legacy code caused during migration and settled the change logic. Terms changes were announced in advance and the migration was completed; NDR rose to 118%. Moving at-risk customers to annual contracts brought in about 50m KRW in prepayments, and churn stayed under 10%.",
    },
  },
  {
    id: "proj-flex-4",
    title: "모니터링 에이전트 기획·구축",
    company: "flex",
    period: "2026.04 – 2026.05",
    summary:
      "사람이 하던 AI 상담 답변 검수를 AI 에이전트가 판단하도록 바꿨습니다. 검수가 더 빠르고 정확해졌고, 모니터링에 쓰던 시간을 주요 프로젝트로 돌렸습니다.",
    role: "프로세스 기획 및 AI 에이전트 기획, 구성",
    result: "검수 처리 속도 50% 향상, 사람 검수 대비 오판단 20% 감소, 판정 누락 0건",
    tags: ["프로세스 개선", "고객 경험 개선"],
    background:
      "AI 상담 답변이 잘못된 KB를 참조하거나 할루시네이션을 일으키지 않는지 매일 검수해야 했습니다. 구성원이 주 단위로 돌아가며 맡았습니다.",
    problem:
      "검수 속도가 인입 속도를 따라가지 못해 오후 8시까지 확인하는 날이 많았고, 담당자는 그 주 동안 다른 프로젝트에서 빠졌습니다. SaaS 모니터링 솔루션은 월 약 20만원이라 ROI가 맞지 않았습니다. 사람이 확인하다 보니 실수와 누락이 생겨 모니터링 목적을 달성하지 못할 때도 있었습니다.",
    process: [
      "모니터링 프로세스 구조화 — 기존 모니터링 과정을 분석해 단계별 확인 항목, 이상 데이터 발견 시 조치, 팀 내 조치 기준과 가이드라인으로 정리",
      "에이전트 KB 학습 구조 설계 — 답변 모델과 같은 환경에서 검수하면 같은 오류를 따라갈 수 있어, Claude Code에 MCP로 검수 전용 에이전트를 따로 구축. Intercom API로 KB를 학습하고 가이드라인·가중치로 판정 점수 산출. 가이드라인과 자체 웹서치로 할루시네이션 방지",
      "피드백·재학습 루프 설계 — 모니터링 결과 피드백을 Notion MCP로 DB화. 판정을 보완할 때 정확도를 체크하고, 응답 데이터로 판단 기준을 다시 설계하고, 재판단·재학습 결과를 리포트",
      "에이전트·업무 프로세스 구축 — 세션 토큰과 서브 에이전트 액션 한계를 고려해 cron으로 자동화. 데이터 판독 → 판정 보강 → 피드백 → 재학습 순으로 판단 로직을 강화하는 에이전트 구축. 결과 활용·피드백 업무 프로세스와 재학습 시 할루시네이션 방지 가이드라인 설정",
      "운영 및 검증 — 점수로 개선 / 양호 / 정확 구간을 나누고, 개선·양호 건만 사람이 보고 판정을 피드백. 매일 아침 피드백을 재학습에 반영. 도입 초기에는 사람 검수와 함께 돌려 결과 비교",
    ],
    fullResult:
      "모니터링 업무를 에이전트로 모두 대체했습니다. 검수 속도가 50% 빨라져 업무 시간 안에 전건을 처리했고, 사람 검수보다 오판단이 20% 적었으며 판정 누락은 0건이었습니다. 남은 시간을 다른 프로젝트에 투입해 리드타임을 10% 줄였습니다.",
    notionUrl: "https://app.notion.com/p/3d48937a33b180dda696d3440123b46e",
    en: {
      title: "Monitoring Agent: Design and Build",
      summary:
        "Replaced the manual review of AI support answers with an AI agent that judges them. Review got faster and more accurate, and the hours spent monitoring went back to main projects.",
      role: "Process design; AI agent design and configuration",
      result: "Review 50% faster; 20% fewer misjudgements than human review; no missed verdicts",
      tags: ["Process Improvement", "Customer Experience Improvement"],
      background:
        "AI support answers had to be checked every day for citing the wrong KB article or hallucinating. Team members took it in weekly turns.",
      problem:
        "Review could not keep up with incoming volume, so checks often ran until 8 p.m., and whoever was on rotation left other projects for the week. A SaaS monitoring tool cost about 200,000 KRW a month and did not pay off. Manual checks also missed things, so the monitoring sometimes failed at its job.",
      process: [
        "Structuring the monitoring — Analysed the existing process and wrote it down: what to check at each step, what to do with anomalous data, and the team's criteria and guidelines",
        "Agent knowledge base — A reviewer in the same environment as the answering model can repeat its mistakes, so a separate review agent was built in Claude Code over MCP. It learns the KB through the Intercom API and scores answers against guidelines and weights, with guidelines and its own web search to prevent hallucination",
        "Feedback and retraining loop — Stored monitoring feedback in a database through Notion MCP. Checked accuracy when verdicts were corrected, redesigned the criteria from the data, and reported on re-judgement and retraining",
        "Agent and team process — Automated runs on cron within session-token and sub-agent limits. The agent reads data, reinforces its verdicts, takes feedback and retrains. Set a team process for using results and giving feedback, and guidelines against hallucination when criteria change",
        "Running and checking — Answers are scored into needs-work / fair / accurate, and people review only the first two and give feedback. Feedback goes into retraining every morning. At first the agent ran alongside human review and the results were compared",
      ],
      fullResult:
        "The agent took over the monitoring entirely. Review ran 50% faster, so every item was cleared within working hours, with 20% fewer misjudgements than human review and no missed verdicts. Moving the freed time to other projects cut their lead time by 10%.",
    },
  },
  {
    id: "proj-flex-2",
    title: "리드 메시지 채널 분기 개선",
    company: "flex",
    period: "2026.01 – 2026.02",
    summary:
      "기존 고객과 잠재 고객을 구분하지 않던 리드 메시지에 분기 기준을 넣었습니다. 담당 AM이 자동 지정돼 중복 컨택이 줄었고, 업셀링 기회가 생겼습니다.",
    role: "기획 및 테스트",
    result: "AM 담당 고객사 자동 안내, 재계약 성사",
    tags: ["운영 프로세스 개선"],
    background: "리드폼으로 들어온 고객을 기존 고객과 잠재 고객으로 나누지 않았습니다.",
    problem:
      "기존 고객인데도 신규 영업팀이 이력 확인 없이 연락한 뒤 AM에게 넘기는 일이 있었고, 연락 창구가 나뉘면서 AM이 업셀링 기회를 놓쳤습니다. 고객 입장에서는 담당 AM이 아닌 사람과 이야기하다 넘겨지는 경험이라, 관리받지 못한다고 느낄 수 있었습니다.",
    process: [
      "메시지 내용·채널 정리 — 액션별 메시지 구조와 내용, 발송 채널, 분리 기준 확인",
      "AM 니즈 체크 — 메시지에 들어갈 정보를 필수·선택으로 나눠 구조 설계",
      "메시지·발송 로직 기획 — 메시지 구조, 내용, 하이퍼링크 변수 기획. 신규 채널 / 기존 채널 분기 조건 설정",
      "개발 협업 요청, QA — 기획안으로 개발을 요청하고 진행 상황 확인. PRD 배포 후 메시지 내용과 분기 테스트",
    ],
    fullResult:
      "AM 담당 고객과 AM 배정이 필요한 고객을 따로 팔로업할 수 있게 됐습니다. 리드 메시지가 들어오면 AM이 먼저 연락해 관계를 쌓았고, 이 과정에서 챔피언을 찾아 재계약 논의를 진행해 실제 재계약을 성사시켰습니다.",
    notionUrl: "https://app.notion.com/p/3498937a33b180d1a478ce45a805aa56",
    en: {
      title: "Lead Message Channel Routing",
      summary:
        "Added routing rules to lead messages that did not separate existing from prospective customers. The assigned AM is now set automatically, which cut double contact and opened upsell chances.",
      role: "Planning and testing",
      result: "Automatic notice to the assigned AM's accounts; a renewal closed",
      tags: ["Operations Process Improvement"],
      background: "Lead-form submissions were not split into existing and prospective customers.",
      problem:
        "Existing customers were sometimes contacted by the new-business sales team without a history check and then passed to AM, and with contact split this way AM missed upsell chances. For customers, talking to someone other than their AM before being passed on felt like nobody was looking after them.",
      process: [
        "Messages and channels — Checked the structure and content of each action's message, the sending channels and how they were split",
        "AM needs — Sorted the information a message needs into required and optional, then designed the structure",
        "Content and send logic — Planned the structure, content and hyperlink variables. Set the conditions for routing to the new or existing channel",
        "Engineering request and QA — Requested the build from the plan and followed progress. Tested message content and routing after production release",
      ],
      fullResult:
        "Customers with an AM and those needing one can now be followed up separately. When a lead message arrives the AM reaches out first; through that contact the AM found the champion, pursued the renewal and closed it.",
    },
  },

  // JARVIS
  {
    id: "proj-jarvis-6",
    title: "서비스 모니터링 대시보드 제작",
    company: "jarvis",
    period: "2025.04 – 2025.06",
    summary: "서비스 주요 지표를 보는 데이터 대시보드를 만들고, 이를 보며 주요 이슈에 빠르게 대응했습니다.",
    role: "기획 및 운영",
    result: "메인 시즌 안정적인 서비스 운영, 서비스 개선 사항 실시간 파악",
    tags: ["데이터 가공", "분석"],
    process: [
      "운영 필요 지표 선정 — 결제·환불 금액(이슈 환불과 고객 요청 환불 비교), 처리 필요 건 실시간 데이터, 탈퇴 유저 추이(평균 이상일 때 사유 확인), 매 시즌 크리티컬했던 이슈의 재발 모니터링 지표",
      "SQL 쿼리 빌드 — 운영 지표 쿼리와 노운 이슈 모니터링 쿼리 작성",
      "대시보드 제작, 알럿 설정 — 보기 쉽게 목적별 탭으로 구성. 크리티컬 이슈 알럿과 자동 리프레시 설정",
    ],
    fullResult:
      "메인 시즌 동안 서비스를 안정적으로 운영했고, 개선이 필요한 부분을 실시간으로 확인했습니다. 대시보드로 처리할 건수와 일정을 파악했고, 주요 이슈 현황을 보며 대응 방안과 개선 방향을 정했습니다.",
    notionUrl: "https://app.notion.com/p/1f68937a33b1802a8c58f68718854059",
    en: {
      title: "Service Monitoring Dashboard",
      summary: "Built a data dashboard of the service's key metrics and used it to respond quickly to major issues.",
      role: "Planning and operations",
      result: "Stable operation through the main season; service improvements tracked in real time",
      tags: ["Data Processing", "Analysis"],
      process: [
        "Metrics — Payment and refund amounts (issue refunds vs. customer-requested refunds), items awaiting processing in real time, account deletions (checking the cause on above-average days), and metrics for issues that turned critical in past seasons",
        "SQL queries — Queries for operational metrics and for monitoring known issues",
        "Dashboard and alerts — Tabs by purpose for readability. Alerts on critical issues and automatic refresh",
      ],
      fullResult:
        "The service ran stably through the main season, and areas needing improvement showed up in real time. The dashboard showed how much work was waiting and when, and tracking major issues guided responses and what to improve.",
    },
  },
  {
    id: "proj-jarvis-4",
    title: "서비스 오인지에 따른 서비스 신뢰도 하락 이슈 해결",
    company: "jarvis",
    period: "2025.04 – 2025.05",
    summary:
      "시즌 전환 때마다 고객이 서비스 화면을 오해해 신뢰가 떨어지던 오래된 노운 이슈였습니다. 화면 개선과 별도로 SQL 대상자 추출과 알림톡 자동 발송을 만들어, 같은 이슈의 불만·문의를 95% 줄였습니다.",
    role: "개선안 기획 및 고객 안내 액션 실행",
    result: "동일 이슈 문의 95% 감소, 불필요한 환불 및 PG사 민원 대응 80% 감소",
    tags: ["데이터 분석", "운영 처리"],
    background:
      "세금 신고 기간에 맞춰 서비스를 닫고 다시 열었는데, 다시 열린 뒤에는 기존 이용 내역이 아니라 새 이용 기준으로 대상 여부를 판단했습니다.",
    problem:
      "결제와 신고를 마친 고객이 진행 상황을 확인하러 왔다가 초기화된 화면을 봤고, '서비스 미대상자' 안내를 보고 이용료를 사기당했다고 생각했습니다. 서비스 신뢰도가 떨어지고 부정적인 입소문이 퍼졌습니다.",
    process: [
      "이슈 상황 정의 — 불만의 90%가 전환 후 '대상자 아님' 안내를 받은 고객임을 확인. 소액이라도 다른 연도 신고가 가능한 고객은 불만이 아니라 문의로 들어옴",
      "대상자 구체화 — 개발자와 정확히 소통하려고 대상을 고객 언어가 아닌 DB명·속성명으로 정의",
      "개선 방향 기획 — 메인 시즌(5월)까지 남은 기간과 개발·PD·PM 리소스를 보고 세 가지를 비교. BE 로직 수정은 근본 해결이지만 리소스가 크고 사이드 이펙트 우려. FE 화면 개선은 빠르지만 고객이 화면을 자세히 봐야 해결됨. 운영 자체 해결은 바로 실행할 수 있지만 알림톡 비용과 효율 문제",
      "방향 결정, 실행 — 유관 부서 미팅 후 FE 개선으로 결정(로직을 고치면 삼쩜삼 전체 QA가 필요하고 시즌까지 시간이 부족). 문의가 몰리는 6월 전, 5월 말 배포 목표. 배포가 밀릴 경우에 대비해 SQL로 대상자 판단 쿼리를 만들고, 운영계 DB에 대상자가 생기면 알림톡 API가 실행되는 트리거를 만들어 먼저 안내",
    ],
    fullResult:
      "4월 말부터 실시간 알림톡을 자동 발송했고, 5월 말에는 미대상자 화면에 원래 없던 이용 내역·신고 내역 진입점을 추가했습니다(이전 시즌 신고 고객 클릭율 10%). 같은 이슈의 불만·문의는 작년보다 95% 줄었고(작년 6월 인입 카테고리 상위 5% → 올해 하위 5%), 화면 개선보다 알림톡의 효과가 더 컸습니다. 환불 대응이 안 되는 PG사 민원 등 외부 민원은 80% 줄었습니다.",
    notionUrl: "https://app.notion.com/p/2108937a33b18017bc67ca551f9705a6",
    en: {
      title: "Fixing a Trust Issue from a Misread Screen",
      summary:
        "A long-standing known issue: at every seasonal switch, customers misread the service screen and lost trust. Alongside a screen fix, an SQL query and automatic KakaoTalk notices cut complaints and inquiries about it by 95%.",
      role: "Improvement planning and customer notification",
      result: "Inquiries on the issue down 95%; unnecessary refunds and payment-processor complaints down 80%",
      tags: ["Data Analysis", "Operations Handling"],
      background:
        "The service closed and reopened with each tax-filing period, and after reopening it judged eligibility on new usage rather than the customer's history.",
      problem:
        "Customers who had paid and filed came back to check progress, found a reset screen, and took the 'not eligible' notice to mean they had been cheated out of their fee. Trust fell and negative word of mouth spread.",
      process: [
        "Defining the issue — Found that 90% of complaints came from customers told after the switch that they were not eligible. Those who could still file another year, even for a small amount, came in with questions rather than complaints",
        "Defining the affected group — Described it in database and field names rather than customer language, so engineers knew exactly who was meant",
        "Options — Compared three, given the time to the main season (May) and engineering, PD and PM capacity. A back-end fix solves the root cause but is heavy work with side-effect risk. A front-end change is fast but works only if customers read the screen. Handling it in operations is immediate, but notices cost money and are less effective",
        "Decision and execution — After meeting the teams involved, chose the front-end change (a logic change would need QA across all of 삼쩜삼, and time was short), aiming for end of May before the June peak. In case the release slipped, built an SQL query for affected customers and a trigger in the operations database that calls the KakaoTalk API, so customers were told first",
      ],
      fullResult:
        "Real-time KakaoTalk notices ran from the end of April, and at the end of May the not-eligible screen got an entry point to past usage and filings that had not existed before (clicked by 10% of customers who filed the previous season). Complaints and inquiries about the issue fell 95% year on year (from the top 5% of last June's inbound categories to the bottom 5%), and the notices did more than the screen change. Outside complaints, including those to payment processors that could not handle refunds, fell 80%.",
    },
  },
  {
    id: "proj-jarvis-5",
    title: "크리티컬 노운 이슈 해결 (오신고 문제)",
    company: "jarvis",
    period: "2025.04 – 2025.05",
    summary:
      "오래된 노운 이슈인 부양가족 오신고를 미리 잡기 위해 경고 메시지 DB를 만들어 기존 데이터와 연결하고, 대상 고객 자동 안내와 문의·환불 처리 기준을 정했습니다.",
    role: "기획 및 운영",
    result: "이슈 후처리 대상 25% 감소, 재정 리스크 약 10억 감소",
    tags: ["데이터 분석", "운영 처리"],
    background:
      "삼쩜삼 이용자 중 요건에 맞지 않는 부양가족을 넣어 신고하는 경우가 있어, 세금 신고가 부정확하게 진행됐습니다.",
    problem:
      "부양가족의 소득 요건은 미리 확인할 수 없었지만, 고객은 삼쩜삼 책임이라고 주장했습니다. 불필요한 재정 손실이 생겼고, 외부 이슈로 커지면서 서비스 신뢰도가 떨어졌습니다.",
    process: [
      "필요 데이터 확인, DB 적재 요청 — 모니터링용 신규 테이블 적재 요청. 신고 중 뜨는 경고 메시지 추출. 경고 메시지와 기존 신고 데이터를 잇는 키 값 설정",
      "이상 데이터 추출 쿼리 — 기존 신고 데이터와 신규 테이블로 경고 메시지를 받은 대상, 연도, 유형 추출",
      "대상자 안내 메시지 — 세무서 검토로 결과가 바뀔 수 있는 고객에게 보낼 알림톡을 신고 유형별로 세 가지 버전 기획",
      "알림톡 자동 발송 — 쿼리에서 대상자가 나오면 API로 알림톡이 자동 발송되도록 트리거 설정",
      "환불·상담 처리 기준 — 환불이 불가능한 경우의 대응 정책, 고객센터 문의 대응 정책 설정",
      "이슈 모니터링 대시보드 — 대상자 발생률과 환불 여부를 보는 대시보드를 전사에 공유. 발생 추이를 보고 개발 방향을 정할 수 있게 함",
    ],
    fullResult:
      "오신고로 후처리가 필요한 대상이 25% 줄었습니다. 같은 이슈로 작년에 최소 40억을 처리한 것을 기준으로, 환불과 대납 비용에서 약 10억의 재정 리스크를 줄였습니다. 노운 이슈를 어떻게 처리할지 기준이 생겨 서비스 운영이 안정됐습니다.",
    notionUrl: "https://app.notion.com/p/1fc8937a33b180d59937f2a226db9d5d",
    en: {
      title: "Resolving a Critical Known Issue (Incorrect Dependant Filings)",
      summary:
        "To catch incorrect dependant claims, a long-standing known issue, built a database of filing warnings linked to existing data, with automatic notices to affected customers and rules for inquiries and refunds.",
      role: "Planning and operations",
      result: "Cases needing follow-up down 25%; about 1bn KRW less financial risk",
      tags: ["Data Analysis", "Operations Handling"],
      background: "Some 삼쩜삼 users claimed dependants who did not meet the requirements, so returns were filed incorrectly.",
      problem:
        "Dependants' income could not be checked in advance, yet customers blamed 삼쩜삼. This caused avoidable financial losses, and as it became a public issue, trust in the service fell.",
      process: [
        "Data and table request — Requested a new monitoring table. Extracted the warnings shown during filing. Set a key linking them to existing filing data",
        "Anomaly query — Used existing filings and the new table to extract who got warnings, for which year and of what type",
        "Customer notices — Planned three versions of a KakaoTalk notice, by filing type, for customers whose result could change on tax-office review",
        "Automatic sending — A trigger that sends the notice through the API when the query finds a new case",
        "Refund and support rules — Policy for cases where no refund is possible and for related inquiries to customer support",
        "Issue dashboard — A dashboard of case rates and refund status, shared company-wide so development could respond to the trend",
      ],
      fullResult:
        "Cases needing follow-up after incorrect filings fell 25%. Against at least 4bn KRW spent on the same issue the previous year, this cut about 1bn KRW of financial risk in refunds and covered payments. A clear rule for handling the known issue made operations steadier.",
    },
  },
  {
    id: "proj-jarvis-2",
    title: "즉시환급 테스트 서비스 운영",
    company: "jarvis",
    period: "2025.03 – 2025.04",
    summary:
      "환급까지 오래 걸린다는 불만을 줄이려고 즉시환급 테스트 서비스를 기획하고 오픈했습니다. 수익성은 좋지 않았지만 세무 행정의 한계를 확인했고, 이 결과로 서비스 기획 방향을 바꾸고 재오픈을 준비했습니다.",
    role: "신규 서비스(즉시환급) 운영 담당: 고객 플로우 기획, 고객 여정 모니터링, 전체 운영 플로우 구축, 엣지 케이스·이슈 사전 대비와 처리",
    result: "수익성 한계 확인 후 서비스 기획 방향 전환, 운영 이슈 사전 대응 프로세스 구축",
    tags: ["신규 서비스 운영"],
    background:
      "세무 처리는 행정 지연 때문에 신고 후 약 2개월이 걸렸고, 여러 세무 플랫폼이 시장에 들어오고 있었습니다.",
    problem:
      "삼쩜삼 탓이 아닌 세무 처리 지연인데도, 신고와 환급금 지급 사이의 시간 차에 대한 고객 불만이 계속 들어왔습니다. 경쟁사가 늘어 경쟁력도 필요했습니다.",
    process: [
      "서비스 방향 기획 — 환급금을 먼저 지급할 때 회수할 수 있는 방법을 세무 행정 절차 안에서 조사하고, 서비스에 넣을 수 있는지 확인",
      "반영 방식 검토 — 전체 대상자로 열면 회수 문제가 생길 수 있어, 전체 로직 변경 대신 테스트 서비스로 임시 오픈",
      "운영 가능성·이슈 케이스 검토 — 입금 대상 판단, 입금 방법 등을 운영 인력으로 할 수 있는지 확인. 기존 환급 신고의 이슈 케이스별 대응안 마련(대응이 어려운 대상은 테스트에서 제외). BPO 전달용 서비스 플로우·대응 문서 제작. Redash로 서비스 여정과 엣지 케이스 모니터링 대시보드 제작",
      "일부 대상 운영 서버 배포 — 결제, 서비스 완료 여부, 이슈 발생 모니터링",
      "오류 발생, 수정 — 금액 계산 로직 오류를 크리티컬 이슈로 보고 서비스 진입을 임시 차단. PM·BE에 수정 요청 후 QA, 후처리 진행",
      "테스트 결과 확인 — 지급 금액의 환수 여부 확인. 세무서 처리 방식이 국세청 행정 가이드라인과 달라, 기획에 쓴 행정 방안이 사실상 통하지 않음을 확인",
    ],
    fullResult:
      "선지급한 환급금의 환수율은 60%였습니다. 환수하지 못한 건 중 10%는 고객 어뷰징(의도적 오신고, 고액 체납자의 의도적 신고), 90%는 세무서 오처리였습니다. 서비스가 아니라 행정의 문제라 단기간에 풀 수 없었고, 같은 기획으로는 수익성에 도움이 되지 않는다는 결론을 냈습니다. 이번에 처음 확인한 어뷰징 케이스와 세무서 처리 문제에는 운영 대응안을 만들었고, 오픈 초기 대시보드로 이슈를 빨리 잡으면서 모니터링의 중요성을 확인했습니다.",
    notionUrl: "https://app.notion.com/p/2138937a33b180b5b062fcb1a9e64a59",
    en: {
      title: "Instant Refund Test Service",
      summary:
        "Planned and opened a test service paying refunds immediately, to answer complaints about long waits. Profitability fell short, but it showed the limits of tax administration, which led to a new service plan and a relaunch.",
      role: "Operations owner for the instant-refund service: customer flow, journey monitoring, end-to-end operations, and preparing for and handling edge cases and issues",
      result: "Profitability limits found, leading to a change in the service plan; process for handling issues in advance",
      tags: ["New Service Operations"],
      background:
        "Tax processing took about two months after filing because of administrative delay, and more tax platforms were entering the market.",
      problem:
        "Customers kept complaining about the wait between filing and receiving the refund, even though the delay was in tax processing, not 삼쩜삼. Growing competition also called for an edge.",
      process: [
        "Service direction — Researched how an advance refund could be recovered within tax administration procedures, and whether that could be built into the service",
        "Scope — Recovery problems could follow a full rollout, so a temporary test service was opened instead of changing the logic for everyone",
        "Feasibility and issue cases — Checked whether operations staff could decide who to pay and how. Prepared responses for each known issue case from past refund filings (cases that could not be handled were excluded). Wrote the service flow and response guide for the BPO team. Built a Redash dashboard for the service journey and edge cases",
        "Release to some users — Monitored payment, completion and issues",
        "Error and fix — Treated an amount-calculation error as critical and temporarily blocked entry. Requested the fix from PM and back end, ran QA and handled the follow-up",
        "Results — Checked whether paid amounts were recovered. Tax offices' handling differed from the National Tax Service's guidelines, so the administrative route the plan relied on did not work in practice",
      ],
      fullResult:
        "60% of advance refunds were recovered. Of the rest, 10% was customer abuse (deliberate incorrect filings, deliberate filings by large tax debtors) and 90% was tax-office processing errors. The problem was administrative, not in the service, so it could not be fixed quickly, and the same plan would not help profitability. Responses were prepared for the newly found abuse cases and tax-office problems, and catching issues early through the dashboard showed how much monitoring matters.",
    },
  },
  {
    id: "proj-jarvis-3",
    title: "백오피스 기능 개선 (로직 고도화 및 기능 개선)",
    company: "jarvis",
    period: "2024.07 – 2025.05",
    summary:
      "백오피스에서 개선이 필요한 기능을 정리해 초기 기획을 하고, 서비스 변화에 맞춘 기능 추가와 로직 오류 수정을 이끌었습니다. 리드 타임이 줄어 운영 업무 효율이 50% 올랐습니다.",
    role: "백오피스 기능 개선 기획 및 작업 리딩",
    result: "운영 업무 효율성 50% 증대, BE 및 운영 리소스 확보",
    tags: ["서비스 개선"],
    background: "신규 서비스 추가, 기존 로직 변경 등 서비스 변경이 많았습니다.",
    problem:
      "백오피스에서 지원하지 않는 작업은 BE 개발자가 따로 확인하고 처리해야 했습니다. 단순 확인이나 응대도 전보다 리드 타임이 300% 이상 늘어 업무 효율이 떨어지고 고객 불만이 늘었습니다.",
    process: [
      "개선 필요 사항 리스트업 — 기능 추가로 필요해진 기능, 운영에 필요한 기능, 고쳐야 할 로직 확인. 우선순위 HIGH 이상만 기획 대상으로 선정",
      "개선안 기획 — 아이템별 초기 기획, 필요 스펙과 버튼 동작 정의",
      "개발 논의 — PM과 일정·담당 논의. 필수 티켓과 후순위 티켓을 다시 나눈 뒤 개발 리딩",
      "개발 확인, QA — 진행 상황 확인. STG 배포 건이 제대로 동작하는지 확인 후 전달",
    ],
    fullResult:
      "필수 아이템의 개선과 배포를 마쳤고, 빠진 아이템은 하반기 개선 대상으로 넘겼습니다. 업무 효율은 50% 올랐고, BE 개발자가 단순 확인·보정에 쓰던 시간이 줄었습니다.",
    notionUrl: "https://app.notion.com/p/2278937a33b1802e9009c523b9560ab4",
    en: {
      title: "Back-Office Improvements (Logic and Features)",
      summary:
        "Listed the back-office features that needed work, wrote initial plans, and led the work to add features the changing service needed and fix ones broken by logic errors. Shorter lead times raised operational efficiency by 50%.",
      role: "Back-office improvement planning and leading the work",
      result: "Operational efficiency up 50%; back-end and operations time freed",
      tags: ["Service Improvement"],
      background: "New services were added and existing logic changed many times.",
      problem:
        "Anything the back office did not support had to be checked and handled by back-end engineers. Even simple checks and replies took over 300% longer than before, so efficiency fell and complaints rose.",
      process: [
        "Listing what to fix — Checked features needed for new functions, features operations needed and logic to fix. Kept only HIGH priority and above for planning",
        "Planning — Initial plan for each item, with specs and button behaviour",
        "Engineering discussion — Agreed schedule and owners with PM, re-sorted tickets into must-have and later, and led development",
        "Progress and QA — Followed progress, checked staging releases for correct behaviour and reported back",
      ],
      fullResult:
        "All must-have items were improved and released, and the rest moved to the second half. Efficiency rose 50%, and back-end engineers spent less time on simple checks and corrections.",
    },
  },
  {
    id: "proj-jarvis-1",
    title: "신규 서비스 런칭 운영 준비 및 서비스 운영",
    company: "jarvis",
    period: "2023.10 – 2024.05",
    summary: "신규 환급 서비스 런칭 전에 운영 정책과 알림톡을 준비하고, 런칭 후 서비스 운영을 맡았습니다.",
    role: "프로젝트 서비스 운영 담당",
    result: "운영 프로세스 확립으로 안정적 런칭 기여, 전체 매출의 20.13% 기여",
    tags: ["신규 서비스 운영"],
    background: "더 많은 환급을 제공해 고객을 늘리기 위해 신규 환급 서비스를 열었습니다.",
    problem: "신규 서비스라 기존 환급 절차와 다른 운영 방식이 필요했지만, 관련 정책이 하나도 없었습니다.",
    process: [
      "서비스 파악, 운영 정책 설정 — 대상자 판단, 결제·환불, 엣지 케이스 대응, 고객센터 응대, 어드민 처리 절차",
      "모니터링 대시보드·쿼리 — 정상 플로우 데이터와 비정상 로그 추적 쿼리 작성. 고객 여정 대시보드로 특이 데이터를 보고 이슈 리포팅. 노운 이슈 팔로업 쿼리와 알럿, 클렌징 대상 데이터 확인 쿼리 작성",
      "서비스 운영 — 제출 서류 검토, 이용 중 발생한 이슈 공유, 운영 개선점 기획 후 PM 전달, 고객 경험 개선 아이디어 제안",
    ],
    fullResult: "운영 프로세스를 갖춰 서비스가 안정적으로 자리 잡는 데 기여했고, 신규 서비스가 전체 매출의 20.13%를 차지했습니다.",
    notionUrl: "https://app.notion.com/p/1418937a33b180a0be91dd0c447a1c8a",
    en: {
      title: "New Refund Service Launch Operations",
      summary: "Before a new refund service launched, prepared its operating policies and KakaoTalk notices, then ran the service after launch.",
      role: "Service operations owner",
      result: "Operations process helped the launch go smoothly; 20.13% of total revenue",
      tags: ["New Service Operations"],
      background: "The company opened a new refund service to attract customers by offering more refunds.",
      problem: "The new service needed different operations from the existing refund process, and there were no policies for it.",
      process: [
        "Service and policy — Eligibility, payment and refunds, edge cases, customer-support replies and admin procedures",
        "Monitoring dashboard and queries — Queries for normal flow data and abnormal logs. A customer-journey dashboard for spotting unusual data and reporting issues. Follow-up queries and alerts for known issues, and queries for data needing cleanup",
        "Running the service — Reviewed submitted documents, raised issues found in use, planned operational fixes for PM, and suggested ways to improve the customer experience",
      ],
      fullResult: "The operations process helped the service settle in, and it accounted for 20.13% of total revenue.",
    },
  },
  {
    id: "proj-jarvis-7",
    title: "고객 만족도 조사 개선 및 대시보드 제작",
    company: "jarvis",
    period: "2023.06",
    summary: "삼쩜삼 이용 고객 만족도 조사의 문항과 로직을 고치고, 조사 결과로 고객 Pain Point를 해결할 개선 사항을 찾았습니다.",
    role: "기획 및 운영",
    result: "설문 간소화로 응답률 개선, 고객 Pain Point 해결 처리율 작년 대비 50% 상승",
    tags: ["운영 모니터링"],
    process: [
      "기존 문항 검토 — 수집·관리할 지표 정의, 불필요한 문항 삭제. 유관 부서가 원하는 항목은 남기고 나머지는 삭제하거나 간소화",
      "지표 선정 — NPS(추천 점수, 상위권 비율 − 하위권 비율), CES(서비스 편의성, 평균 점수), 재이용 여부(신뢰도 판단)",
      "대시보드 기획·코딩 — R shinydashboard로 대시보드를 만들어 사이트로 배포, 전사 관리 대시보드로 사용",
    ],
    fullResult: "설문을 평균 10문항에서 5문항으로 줄여 응답률이 올랐습니다. 대시보드로 Pain Point를 확인해 해결 처리율이 작년보다 50% 올랐습니다.",
    notionUrl: "https://app.notion.com/p/6813c9f7691540aeb5bad0b7a7902033",
    en: {
      title: "Customer Satisfaction Survey Improvement and Dashboard",
      summary: "Revised the questions and logic of the 삼쩜삼 customer satisfaction survey, and used the results to find improvements for customers' pain points.",
      role: "Planning and operations",
      result: "Higher response rate from a shorter survey; pain-point resolution rate up 50% year on year",
      tags: ["Operations Monitoring"],
      process: [
        "Reviewing questions — Defined the metrics to collect, removed unneeded questions, kept what other teams wanted and cut or shortened the rest",
        "Metrics — NPS (share of high scores minus share of low scores), CES (ease of use, as an average) and intent to use again (as a sign of trust)",
        "Dashboard — Built with R shinydashboard and deployed as a site used across the company",
      ],
      fullResult: "Cutting the survey from an average of 10 questions to 5 raised the response rate. Pain points found on the dashboard lifted the resolution rate 50% year on year.",
    },
  },

  // MIDAS
  {
    id: "proj-midas-1",
    title: "고객 요구사항 기반 기능 개선 및 백로그 해소",
    company: "midas",
    period: "2022.05 – 2022.12",
    summary: "쌓여 있던 고객 요구사항을 개선 항목으로 정리하고 우선순위를 정해 기능 개선까지 반영했습니다.",
    role: "개선 항목 정의 및 우선순위 수립, 기능 기획, 개발 협업, QA",
    result: "누적 백로그 5건 해소, 기존 고객 재계약 기반 마련",
    tags: ["서비스 개선"],
    background: "고객사가 계속 요청한 개선 항목이 처리되지 못한 채 쌓여 있었습니다.",
    problem: "기존 고객의 요청이 반영되지 않아 불만이 계속 쌓였고, 해결이 늦어질수록 재계약 때 리스크가 됐습니다.",
    process: [
      "요구사항 분류, 우선순위 — VOC와 고객사 요청을 성격별로 나누고 영향 범위와 처리 난이도로 순서 결정",
      "기능 개선 기획 — 항목별 요구사항 정의, 개발 조직과 구현 범위 협의",
      "QA, 반영 — 개발 완료 건 검증 후 서비스 반영, 고객사 안내",
    ],
    fullResult:
      "오래 남아 있던 요구사항을 정리해 주요 고객의 백로그 5건을 해결했습니다. 기능 개선 요청을 검토-기획-개발 순으로 처리하는 프로세스를 만들었고, 기존 고객 재계약의 바탕이 됐습니다.",
    notionUrl: "https://app.notion.com/p/3b18937a33b1811f842bc7566475919f",
    en: {
      title: "Feature Improvements from Customer Requests and Backlog Clearance",
      summary: "Turned piled-up customer requests into improvement items, set priorities and carried them through to shipped features.",
      role: "Defining and prioritising improvement items, feature planning, engineering collaboration, QA",
      result: "5 backlog items cleared; supported existing customers' renewals",
      tags: ["Service Improvement"],
      background: "Improvements customers had asked for repeatedly were piling up.",
      problem: "Existing customers' requests went unaddressed, so dissatisfaction built up, and the longer they stayed open the bigger the risk at renewal.",
      process: [
        "Sorting and priorities — Grouped VOC and customer requests by type and ordered them by impact and difficulty",
        "Planning — Defined requirements for each item and agreed scope with engineering",
        "QA and release — Verified finished work, released it and told customers",
      ],
      fullResult:
        "Long-standing requests were sorted out and 5 backlog items for key customers resolved. A review–plan–build process for improvement requests was set up, which supported existing customers' renewals.",
    },
  },
  {
    id: "proj-midas-2",
    title: "VOC 기반 개선 운영 및 시나리오봇 응대율 개선",
    company: "midas",
    period: "2022.01 – 2022.03",
    summary: "VOC를 데이터로 추출·분류해 개선 항목으로 연결하고, 시나리오봇 응대 구조도 함께 고쳤습니다.",
    role: "VOC 추출 및 분류, 개선 항목 정의, 업그레이드 플래닝 반영 관리, 시나리오봇 개선",
    result: "상반기 VOC 반영률 62% 달성, 시나리오봇 처리율 13% 개선",
    tags: ["운영 개선"],
    background: "시나리오봇이 자세히 답하는 문의인데도 고객 문의가 계속 들어왔습니다.",
    problem: "VOC가 응대 단계에서 끝나고 개선 항목으로 이어지지 않았습니다. 시나리오봇이 처리하지 못해 상담으로 넘어가는 문의도 많았습니다.",
    process: [
      "VOC 데이터 추출·분류 — 문의 데이터를 분석해 반복 유형 정리",
      "개선 항목 정의, 반영 관리 — 유형별 제품 개선 항목을 뽑아 업그레이드 플래닝에 전달하고 반영 여부 추적",
      "시나리오봇 구조 개선 — 봇이 놓치던 문의 유형을 찾아 응답 시나리오 보완",
    ],
    fullResult:
      "문의 데이터가 제품 개선으로 이어지는 흐름이 생겼고, 시나리오봇 답변 해결률이 올라 운영 시간 밖에도 고객이 필요한 정보를 찾을 수 있게 됐습니다. 상반기 VOC 반영률 62%, 시나리오봇 처리율 13% 개선을 달성했습니다.",
    notionUrl: "https://app.notion.com/p/3b18937a33b181d6a9deec4cc34ffba9",
    en: {
      title: "VOC-Driven Improvements and Scenario Bot Resolution",
      summary: "Extracted and classified VOC from data and tied it to improvement items, and reworked how the scenario bot handles inquiries.",
      role: "VOC extraction and classification, defining improvement items, tracking them through upgrade planning, scenario bot improvement",
      result: "62% of VOC reflected in H1; scenario bot resolution up 13%",
      tags: ["Operations Improvement"],
      background: "Customers kept contacting support even about questions the scenario bot already answered in detail.",
      problem: "VOC stopped at the support stage and never became improvements. Many inquiries the bot could not handle went to agents.",
      process: [
        "Extracting and classifying VOC — Analysed inquiry data to group recurring types",
        "Improvement items and tracking — Drew product improvements from each type, passed them to upgrade planning and tracked whether they shipped",
        "Scenario bot — Found the inquiry types the bot missed and filled in its response scenarios",
      ],
      fullResult:
        "Inquiry data now feeds product improvement, and a better bot resolution rate lets customers find answers outside support hours. 62% of VOC was reflected in H1, and the bot's resolution rate improved by 13%.",
    },
  },
];

/**
 * Mirrors the Notion skills database exactly — names and `level` (its 상태 number)
 * as authored there. Notion lists no process skills, so that category is empty
 * and the panel drops it rather than printing an empty column.
 */
export const skillsData: SkillItem[] = [
  { name: "SQL (Redash / Databricks)", level: 80, category: "data" },
  { name: "Python (AI-assisted)", level: 50, category: "data" },
  { name: "R", level: 70, category: "data" },
  { name: "Excel (spreadsheet)", level: 90, category: "data" },
  { name: "Claude", level: 90, category: "data" },
  { name: "Slack", level: 90, category: "tool" },
  { name: "Word", level: 80, category: "tool" },
  { name: "Figma", level: 50, category: "tool" },
  { name: "Claude Code (MCP)", level: 90, category: "tool" },
  { name: "Apps Script", level: 80, category: "tool" },
  { name: "Activepieces", level: 80, category: "tool" },
];

export const companyLabels: Record<CompanyKey, string> = {
  flex: "플렉스",
  jarvis: "자비스앤빌런즈",
  midas: "마이다스인",
};

export const companyLabelsEn: Record<CompanyKey, string> = {
  flex: "Flex",
  jarvis: "Jarvis & Villains",
  midas: "Midas-in",
};
