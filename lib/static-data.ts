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
      "고객 오입력으로 설문 응답이 매치되지 않던 문제를, 법인명·담당자·이메일·내부 ID를 인코딩한 프리필 링크로 화면 노출 없이 응답과 고객사를 자동 매칭해 해결하고 응답 매핑을 100% 자동화했습니다.",
    role: "프로세스 기획 및 프로덕트 개발",
    result: "고객사 설문 응답 매핑 100% 자동화, 외부 메일 발송 CRM 툴 의존도 제거",
    tags: ["프로세스 기획", "개발"],
    background:
      "고객 만족도 설문 진행이 결정됐고, 타 부서의 니즈에서 시작한 프로젝트입니다.",
    problem:
      "서비스별·담당자별로 설문지 구성이 달라 데이터 매핑이 어려웠습니다. 설문 응답자의 소속 법인을 사람이 수기로 매칭해야 했고, 응답자가 법인명을 비우거나 오탈자를 내면 그 응답은 버려졌습니다. 메일침프로 발송해 마케팅 수신거부 고객은 정보성 설문도 받지 못했고, 마케팅 프로젝트 데이터까지 오염됐습니다.",
    process: [
      "문제점 정의 — 데이터 매핑 문제로 생기는 문제를 정확히 파악하고, 단순한 리소스 문제를 넘어 고객이 응답한 건에 대한 데이터 파악이 사실상 불가능함을 확인",
      "대안 설정 및 비교 — 구글 폼 프리필(별도 보안 검토 불필요, API 활용 자유로움 / 발송 주체별 개별 링크 필요, 프리필 응답 수정 가능)과 서드파티 솔루션(링크 안에 숨긴 ID로 문항에 노출되지 않음 / 보안 검토와 추가 과금 필요) 비교",
      "구글 폼 결정 및 초기 플로우 구현 — 보안 검토 시간 지연과 API 활용 제한을 피해 구글 폼으로 빠르게 진행, 설문 링크 입력 → 프리필 문항 ID 자동 추출 → 입력 값에 따른 링크 자동 산출 구조의 사이트를 기획하고 설문과 메일 발송을 한 사이트에서 구현",
      "기술 구현 — Claude Code로 설계 논의 및 사이트 구현, Apps Script · Activepieces · Agent Skill 연동, 로컬 테스트 후 사내 배포 솔루션으로 웹 배포",
      "부서별 프로토타입 공유 및 요구사항 수렴 — 부서별 프로토타입과 사용 가이드 문서를 공유하고 사용 프로세스 전체를 시연해 의견 요청, 이미지 삽입·이미지 내 링크 삽입과 구글 메일 발송 주체 변경 기능 추가",
      "최종 수정 후 배포 — 요구사항 반영과 사이트 가독성 개선, 내부 로컬 서버 테스트 후 사내 서버에 최종 배포",
    ],
    fullResult:
      "데이터 매핑 작업을 전면 제거하고 고객 응답에 따른 자동 매핑 시스템을 구축해 응답 매핑을 100% 자동화했습니다. CRM 툴을 쓰던 기존 발송 구조의 문제를 해결해 마케팅 메시지와의 충돌로 인한 메일 수신 차단을 막았고, 마케팅 동의 여부와 상관없이 메일을 발송할 수 있게 됐습니다. 설문 결과를 통합 저장하는 DB를 만들어 고객사별 통합 상태를 확인하는 데이터 프로젝트의 기반을 마련했습니다.",
    notionUrl: "https://app.notion.com/p/3ca8937a33b1806d9995d0ea5bfdcb06",
    en: {
      title: "Customer Survey Delivery Tool: Planning and Development",
      summary:
        "Respondents' typos left survey answers unmatched. Encoding company, contact, email and internal ID into a pre-filled link now matches each response to its customer without showing those fields, so mapping is fully automated.",
      role: "Process design and product development",
      result: "Survey response mapping fully automated; no longer dependent on an external CRM mailing tool",
      tags: ["Process Design", "Development"],
      background:
        "The company decided to run a customer satisfaction survey. The project started from another team's request.",
      problem:
        "Each service and each owner used a different survey form, which made the data hard to map. Respondents' companies had to be matched by hand, and any response with the company name left blank or misspelled was thrown away. Surveys went out through Mailchimp, so customers who had opted out of marketing never received even an informational survey, and the sends polluted the marketing team's project data.",
      process: [
        "Defining the problem — Pinning down what the mapping problem caused, and confirming that it was more than a matter of effort: there was effectively no way to know whose response was whose",
        "Comparing options — Google Forms pre-fill (no separate security review, free use of the API / one link per sender, pre-filled answers can be edited) against a third-party tool (IDs hidden in the link, not shown in the form / security review and extra cost)",
        "Choosing Google Forms and building the first flow — Going with Google Forms to avoid security-review delay and API limits; planning a site that takes a survey link, extracts the pre-fill field IDs and generates links from the inputs, with survey creation and mail delivery on one site",
        "Building it — Design discussion and implementation with Claude Code; Apps Script, Activepieces and an Agent Skill wired together; local testing, then web deployment on the internal hosting service",
        "Prototypes per team and requirements — Sharing a prototype and a user guide with each team, demonstrating the whole flow and asking for feedback; adding inline images, links inside images, and a switchable Gmail sender",
        "Final changes and release — Applying the requests and improving readability; testing on a local server, then releasing on the internal server",
      ],
      fullResult:
        "Manual mapping is gone: responses are matched to customers automatically, so response mapping is fully automated. Replacing the CRM-based sending setup stopped blocks caused by clashes with marketing mail, and surveys now go out regardless of marketing consent. Survey results are stored in one database, which lays the groundwork for a data project tracking each customer's overall status.",
    },
  },
  {
    id: "proj-flex-1",
    title: "요금제 전환 프로젝트",
    company: "flex",
    period: "2026.04 – 2026.07",
    summary:
      "비즈니스 목표 달성을 위한 요금제 개편에서 요금제 분류, 요금 적용 로직 설정과 전환 작업, 고객 안내 및 대응 프로세스를 기획하고 진행했습니다.",
    role: "전환 PM — 엣지 케이스 대응·기술 검토·전체 일정 담당, 고객 안내 프로세스 기획·운영 (금액 설정은 회계 결정)",
    result: "NDR 118% 달성, 이탈율 10% 이하 유지, 선납금 약 0.5억 원 확보",
    tags: ["비즈니스 액션"],
    background:
      "비즈니스 목표 달성을 위한 요금 인상 필요성이 대두됐고, 단순 요금 인상을 넘어 기능 중심에서 요금제 형태로 요금 체계를 전환하기로 했습니다. 전환 로직과 고객 안내 프로세스를 처음부터 구축해야 했습니다.",
    problem:
      "서비스 런칭 후 첫 대대적인 과금 체계 변화라 고객이 체감하는 변화가 크고, 사용하지 않은 기능에 대한 과금이라는 부정적인 인식이 생길 수 있었습니다. 상위 요금제 기능을 사용하던 고객은 결제 요금이 크게 증가했고, 사전 안내를 진행하는 기준 프로세스가 없었습니다.",
    process: [
      "요금제 종류·변경 시점 파악 및 부서별 일정 조율 — 영업·개발·회계·법무·운영 협업 구조에서 요금제별 제공 기능 확인, 시행일 기준 역산으로 법무(약정 개정)·개발(개발 가능 일정, QA) 일정 조율",
      "엣지 케이스 체크 — 유효 계약, 파트너 서비스 등 기존 정책을 유지하면 문제가 생기는 케이스 정리, 비즈니스 목표와 고객 경험 사이의 밸런스를 조율해 적용 로직 결정, 확인되는 그레이존 케이스를 전환 로직에 반영",
      "고객 안내 프로세스 결정 — 안내 일정·방법·메시지 내용 설정, 이용 약관 변경 안내 메일 작성 및 전송, 메일 문의 회신 프로세스와 기본 안내 워크플로우 설정, 고객사 이슈 발생 시 대응 정책을 운영 구성원과 함께 설정",
      "데이터 연동·대시보드 제작 협업 요청 — 요금제 전환 정보 확인과 안내 자동화를 위한 데이터 연동 요청(DA), 전체 시뮬레이션 데이터 검증용 대시보드 제작 요청 및 검증",
      "연간 계약 프로세스 설정 — AM 미타겟(SMB) 대상 연간 계약 프로세스 구축, 계약서·견적서 생성 자동화, 이탈 위험 대상 협상 리드",
      "이상 데이터 확인 — Pipedrive나 계약 관리 어드민에 등록이 누락된 계약 건을 로직으로 찾아 일괄 반영, 전환 후 금액이 잘못 들어간 대상을 Metabase로 확인해 일괄 처리",
    ],
    fullResult:
      "레거시 코드로 인해 요금제 전환 중 발생한 여러 문제를 엣지 케이스별로 직접 검토하고 변경 로직을 확정했습니다. 주요 약관 변경을 사전 안내하고 요금제 전환을 진행해 NDR 118%로 상승 전환했고, 이탈 관리 과정에서 연간 계약 전환을 유도해 선납금 약 0.5억 원을 확보했습니다. 이탈율은 10% 이하로 유지해 비즈니스 목표 달성에 기여했습니다.",
    notionUrl: "https://app.notion.com/p/36b8937a33b180cc8f31f3cd9919dd82",
    en: {
      title: "Pricing Plan Migration",
      summary:
        "In a pricing overhaul driven by business targets, planned and ran the plan structure, the logic for applying prices and the migration itself, and the process for notifying and supporting customers.",
      role: "Migration PM — edge cases, technical review and the overall schedule; customer notification process (prices set by finance)",
      result: "NDR 118%; churn kept under 10%; about 50m KRW in prepayments",
      tags: ["Business Action"],
      background:
        "Prices had to rise to meet business targets, and rather than a simple increase the company moved from feature-based billing to plans. The migration logic and the customer notification process had to be built from scratch.",
      problem:
        "As the first major billing change since launch, it would be felt sharply by customers, who could see it as paying for features they did not use. Customers on higher-tier features faced large increases, and there was no standard process for notifying customers in advance.",
      process: [
        "Plans, timing and team schedules — Across sales, engineering, finance, legal and operations: confirming the features in each plan, then working back from the effective date to set legal's terms revision and engineering's build and QA dates",
        "Edge cases — Listing cases that would break under the existing policies, such as active contracts and partner services; balancing business goals against customer experience to decide the logic for each; folding grey-zone cases into the migration logic as they surfaced",
        "Customer notification process — Setting the schedule, channel and message; writing and sending the terms-change email; setting up replies to email inquiries and the basic notification workflow; agreeing with the operations team how to respond to customer issues",
        "Data and dashboard requests — Asking the DA team for a data link to check migration status and automate notices, and for a dashboard to validate the full simulation data",
        "Annual contracts — Building an annual-contract process for SMB customers outside AM coverage, automating contracts and quotes, and leading negotiations with customers at risk of churning",
        "Checking anomalies — Finding contracts missing from Pipedrive or the contract admin by rule and adding them in bulk; finding accounts billed the wrong amount after migration with Metabase and fixing them in bulk",
      ],
      fullResult:
        "Reviewed the problems legacy code caused during migration case by case and settled the change logic. Terms changes were announced in advance and the migration completed; NDR turned upward to 118%. Steering at-risk customers into annual contracts secured about 50m KRW in prepayments, and churn stayed under 10%, contributing to the business target.",
    },
  },
  {
    id: "proj-flex-4",
    title: "모니터링 에이전트 기획·구축",
    company: "flex",
    period: "2026.04 – 2026.05",
    summary:
      "사람이 모니터링하던 AI 상담 데이터를 AI 에이전트가 모니터링·판단하는 시스템을 구축해, 사람이 진행하던 것보다 빠르고 정확한 검수를 달성하고 모니터링 리소스를 주요 프로젝트에 활용할 수 있도록 했습니다.",
    role: "프로세스 기획 및 AI 에이전트 기획, 구성",
    result: "검수 처리 속도 50% 향상, 사람 검수 대비 오판단 20% 감소, 판정 누락 0건",
    tags: ["프로세스 개선", "고객 경험 개선"],
    background:
      "AI 상담 답변이 잘못된 KB를 참조하거나 할루시네이션을 일으키지 않는지 매일 검수가 필요했고, 구성원이 주 단위 로테이션으로 매일 모니터링을 맡았습니다.",
    problem:
      "검수 속도가 인입 속도를 따라가지 못해 오후 8시까지 확인하는 날이 잦았고, 담당자는 그 주 동안 다른 프로젝트에서 빠져야 했습니다. SaaS 모니터링 솔루션은 월 약 20만원의 비용이 들어 ROI 측면에서 가치가 없다고 판단했습니다. 데이터 확인 과정에서 휴먼 에러와 누락이 생겨 모니터링의 목적이 달성되지 못하는 경우도 있었습니다.",
    process: [
      "모니터링 프로세스 구조화 — 현재 진행 중인 모니터링 프로세스를 분석해 단계별 확인 정보, 이상 데이터 확인 시 조치 방법, 팀 내 조치 기준 및 가이드라인으로 구조화",
      "에이전트 KB 학습 구조 설계 — 답변 모델과 같은 환경에서 검수하면 같은 오류를 공유할 수 있어 MCP로 Claude Code에 검수 전용 에이전트를 분리 구축, Intercom API 호출로 KB 데이터를 학습하고 가이드라인·가중치 기반으로 판정 점수 산출, 가이드라인 설정과 자체 웹서치로 할루시네이션 방지",
      "피드백–재학습 루프 설계 — 모니터링 결과 피드백을 Notion MCP로 DB화, 판단 결과 보완 시 정확도 체크 → 응답 데이터 기반 판단 기준 재설계 → 재판단·재학습 결과 리포트 구조 설계",
      "에이전트 및 업무 프로세스 구축 — 세션 토큰과 서브 에이전트 액션의 한계를 고려해 cron 구조로 모니터링 자동화, 데이터 판독 → 판단 결과 보강 → 피드백 → 재학습으로 재판단 로직을 강화하는 에이전트 구축, 결과 활용·피드백 업무 프로세스와 재학습 시 할루시네이션 방지 가이드라인 설정",
      "운영 및 검증 — 점수에 따라 개선 / 양호 / 정확 구간으로 분류해 개선·양호 건만 사람이 검토하고 판정 피드백, 매일 아침 피드백을 재학습에 반영해 가이드라인 보정, 도입 초기에는 사람 검수와 병행하며 결과를 교차 비교해 검증",
    ],
    fullResult:
      "모니터링 업무를 에이전트로 전체 대체했습니다. 검수 처리 속도가 50% 향상돼 업무 시간 내 전건을 처리하게 됐고, 사람 검수 대비 오판단은 20% 감소, 판정 누락은 0건이었습니다. 확보한 리소스를 재배치해 타 프로젝트 리드타임을 10% 단축했습니다.",
    notionUrl: "https://app.notion.com/p/3d48937a33b180dda696d3440123b46e",
    en: {
      title: "Monitoring Agent: Design and Build",
      summary:
        "Built a system in which an AI agent monitors and judges the AI support data people used to review, reaching faster and more accurate review than the manual pass and freeing the monitoring time for main projects.",
      role: "Process design; AI agent design and configuration",
      result: "Review 50% faster; 20% fewer misjudgements than human review; zero missed verdicts",
      tags: ["Process Improvement", "Customer Experience Improvement"],
      background:
        "Every AI support answer had to be checked daily for citing the wrong KB article or hallucinating, and team members took the daily monitoring on a weekly rotation.",
      problem:
        "Review could not keep up with incoming volume, so checks often ran until 8 p.m., and whoever held the rotation dropped out of other projects for the week. A SaaS monitoring product cost about 200,000 KRW a month, which was judged not worth it on ROI. Human error and gaps in the manual check meant the monitoring sometimes missed its purpose.",
      process: [
        "Structuring the monitoring process — Analysing the existing process and writing it down as what to check at each step, what to do when anomalous data appears, and the team's criteria and guidelines",
        "Designing the agent's knowledge base — Building a separate review agent in Claude Code over MCP, since a reviewer in the same environment as the answering model can share its mistakes; learning the KB through Intercom API calls and scoring answers against guidelines and weights; using guidelines and its own web search to prevent hallucination",
        "Designing the feedback–retraining loop — Storing monitoring feedback in a database through Notion MCP; checking accuracy when verdicts are corrected, redesigning the criteria from the response data, and reporting on re-judgement and retraining",
        "Building the agent and the work process — Automating the run on cron within session-token and sub-agent limits; an agent that reads data, reinforces its verdicts, takes feedback and retrains; a team process for using results and giving feedback, and guidelines against hallucination when criteria change",
        "Running and validating — Sorting answers into needs-work / fair / accurate by score, with people reviewing only the first two and feeding back on the verdict; folding feedback into retraining every morning; running alongside human review at first and cross-checking the two",
      ],
      fullResult:
        "The agent replaced the monitoring work entirely. Review ran 50% faster, so every item was cleared within working hours, with 20% fewer misjudgements than human review and zero missed verdicts. Reassigning the freed time cut other projects' lead time by 10%.",
    },
  },
  {
    id: "proj-flex-2",
    title: "리드 메시지 채널 분기 개선",
    company: "flex",
    period: "2026.01 – 2026.02",
    summary:
      "기존 고객과 잠재 고객 구분 없이 수신되던 리드 메시지에 분기 기준을 설정해, 담당 AM 자동 지정으로 불필요한 이중 컨택을 방지하고 업셀링 기회를 창출했습니다.",
    role: "기획 및 테스트",
    result: "AM 담당 고객사 자동 안내, 재계약 성사",
    tags: ["운영 프로세스 개선"],
    background: "리드폼 수집 시 기존 고객과 잠재 고객 여부를 분리하지 않았습니다.",
    problem:
      "기존 고객임에도 신규 영업팀이 이력 확인 없이 컨택한 뒤 AM으로 이관하는 일이 생겼고, 컨택 포인트가 나뉘면서 AM이 업셀링 등의 컨택 기회를 놓쳤습니다. 담당 AM이 아닌 다른 담당자와 소통한 뒤 이관되는 경험은 고객에게 관리받지 못한다는 느낌을 줬습니다.",
    process: [
      "메시지 내용 및 채널 정리 — 각 액션별 메시지 구조와 발송 내용, 발송 채널과 분리 기준 확인",
      "AM 니즈 체크 — 메시지에 필요한 정보를 필수·선택으로 나눠 메시지 구조 설계",
      "메시지 내용 및 발송 로직 기획 — 메시지 구조·내용·하이퍼링크 변수 기획, 신규 채널 / 기존 채널 분기 조건 설정",
      "개발 부서 협업 요청 및 QA — 기획안을 바탕으로 개발 협업을 요청하고 개발 과정 모니터링, PRD 배포 후 메시지 내용과 분기 테스트",
    ],
    fullResult:
      "AM 담당 고객과 AM 배정이 필요한 고객의 액션 팔로업 체계를 구축했습니다. 리드 메시지 수집 시 AM이 먼저 컨택해 라포를 형성했고, 이 컨택을 바탕으로 챔피언을 확인하고 재계약 컨택을 진행해 재계약을 성사시켰습니다.",
    notionUrl: "https://app.notion.com/p/3498937a33b180d1a478ce45a805aa56",
    en: {
      title: "Lead Message Channel Routing",
      summary:
        "Set routing rules for lead messages that arrived without distinguishing existing from prospective customers, so the assigned AM is set automatically, double contact is avoided, and upsell opportunities open up.",
      role: "Planning and testing",
      result: "Automatic notice to the assigned AM's accounts; a renewal closed",
      tags: ["Operations Process Improvement"],
      background: "Lead-form submissions were not separated into existing and prospective customers.",
      problem:
        "Existing customers were contacted by the new-business sales team without a history check and then handed over to AM, and with contact split this way AM missed chances such as upsells. Talking to someone other than their own AM before being handed over left customers feeling unmanaged.",
      process: [
        "Mapping messages and channels — Checking the message structure and content for each action, the sending channels, and how they were split",
        "Checking AM needs — Sorting the information a message needs into required and optional, then designing the message structure",
        "Planning content and send logic — Planning the structure, content and hyperlink variables; setting the conditions that route to the new or existing channel",
        "Engineering request and QA — Requesting the build from the plan and following its progress; testing message content and routing after production release",
      ],
      fullResult:
        "A follow-up system now covers customers with an AM and those needing one. AM reaches out first when a lead message arrives and builds rapport; from that contact, AM identified the champion, pursued the renewal, and closed it.",
    },
  },

  // JARVIS
  {
    id: "proj-jarvis-6",
    title: "서비스 모니터링 대시보드 제작",
    company: "jarvis",
    period: "2025.04 – 2025.06",
    summary:
      "서비스 주요 지표를 확인할 수 있는 데이터 대시보드를 제작하고, 이를 바탕으로 서비스 주요 이슈 발생 시 빠르게 대응했습니다.",
    role: "기획 및 운영",
    result: "메인 시즌 안정적인 서비스 운영, 서비스 개선 사항 실시간 파악",
    tags: ["데이터 가공", "분석"],
    process: [
      "서비스 운영 필요 지표 선정 — 결제·환불 금액(이슈 환불 / 고객 요청 환불 비교), 처리 필요 건 실시간 데이터, 탈퇴 유저 추이(평균 이상 발생 시 사유 확인), 매 시즌 크리티컬했던 이슈의 반복 발생에 대비한 모니터링 지표 설정",
      "필요 지표 확인을 위한 SQL 쿼리 빌드 — SQL 기반 데이터 쿼리와 노운 이슈 모니터링용 쿼리 빌드",
      "쿼리 활용 대시보드 제작, 알럿 설정 — 가시성을 고려한 대시보드 제작, 목적에 따른 탭 분류, 크리티컬 이슈 발생 시 알럿과 자동 리프레시 설정",
    ],
    fullResult:
      "메인 시즌 동안 안정적으로 서비스를 운영하고 서비스 개선 사항을 실시간으로 파악했습니다. 대시보드로 처리 필요 건 수와 일정을 확인했고, 주요 이슈 발생 상황과 메인 이슈 현황을 모니터링해 대응 방안과 개선 방향성을 결정하는 데이터 기반을 마련했습니다.",
    notionUrl: "https://app.notion.com/p/1f68937a33b1802a8c58f68718854059",
    en: {
      title: "Service Monitoring Dashboard",
      summary:
        "Built a data dashboard showing the service's key metrics, and used it to respond quickly when major issues occurred.",
      role: "Planning and operations",
      result: "Stable operation through the main season; service improvements tracked in real time",
      tags: ["Data Processing", "Analysis"],
      process: [
        "Choosing the metrics operations needs — Payment and refund amounts (issue refunds vs. customer-requested refunds), items awaiting processing in real time, account-deletion trends (checking the cause when a day runs above average), and metrics for issues that turned critical in past seasons",
        "SQL queries for those metrics — SQL data queries and queries for monitoring known issues",
        "Dashboard and alerts — A dashboard built for readability, tabs by purpose, alerts on critical issues and automatic refresh",
      ],
      fullResult:
        "The service ran stably through the main season, with improvements tracked in real time. The dashboard showed how many items needed processing and when, and monitoring of major and ongoing issues gave a data basis for deciding responses and the direction of improvements.",
    },
  },
  {
    id: "proj-jarvis-4",
    title: "서비스 오인지에 따른 서비스 신뢰도 하락 이슈 해결",
    company: "jarvis",
    period: "2025.04 – 2025.05",
    summary:
      "서비스 전환 시 발생하는 서비스 오인지로 신뢰도가 하락하던 장기 known 이슈에 대해, 서비스 배포 전 자체 해결 방안으로 SQL 대상자 추출 쿼리와 알림톡 자동 발송 트리거를 빌드해 동일 이슈 불만·문의를 95% 줄였습니다.",
    role: "개선안 기획 및 고객 안내 액션 실행",
    result: "동일 이슈 문의 95% 감소, 불필요한 환불 및 PG사 민원 대응 80% 감소",
    tags: ["데이터 분석", "운영 처리"],
    background:
      "세금 신고 기간에 따라 서비스를 클로징·오픈하는데, 오픈 후 재진입 시 기존 이용 내역이 아닌 신규 이용을 바탕으로 서비스 대상 여부를 판단했습니다.",
    problem:
      "결제와 신고 이후 진행 상황을 확인하러 온 고객이 초기화된 화면을 만났고, '서비스 미대상자' 안내를 오해해 이용료를 사기당했다고 인지했습니다. 서비스 신뢰도 하락과 부정 바이럴이 확산됐습니다.",
    process: [
      "이슈 상황 정의 — 불만 인입의 90%가 서비스 전환 후 대상자가 아니라는 안내를 받은 고객임을 확인 (소액이라도 다른 연도 신고가 가능한 대상은 불만이 아닌 문의로 인입)",
      "대상자 구체화 — 개발자와 명확하게 소통하기 위해 이슈 대상을 고객향 언어가 아닌 DB명·속성명 코드 형태로 정의",
      "개선 방향 기획 — 메인 시즌(5월)까지의 기간과 개발·PD·PM 리소스를 고려해 BE 로직 개선(근본 해결, 큰 개발 리소스와 사이드 이펙트 우려) / FE 화면 개선(빠른 작업, 화면을 자세히 보지 않으면 해결 불가) / 운영 자체 해결(즉시 실행, 알림톡 비용·효율 문제) 세 가지 방향 비교",
      "개선 방향 결정 및 실행 — 유관 부서 미팅 후 FE 개선으로 결정(로직 수정 시 삼쩜삼 전체 서비스 QA 필요, 메인 시즌까지 시간 부족), 주요 문의 시기인 6월 전 5월 말 배포 목표. 배포 딜레이에 대비해 SQL로 대상자 판단 쿼리를 빌드하고, 운영계 DB에서 대상자 발생 시 알림톡 API가 자동 실행되는 트리거를 만들어 선안내 별도 진행",
    ],
    fullResult:
      "4월 말부터 실시간 알림톡을 자동 발송했고, 5월 말에는 원래 없던 이용 내역·신고 내역 진입점을 미대상자 화면에 새로 노출했습니다(이전 시즌 신고 고객의 클릭율 10%). 해당 이슈 불만·문의는 작년 대비 95% 감소했고(작년 6월 인입 카테고리 상위 5% → 올해 하위 5%), 화면 개선보다 알림톡 선안내의 기여가 더 컸습니다. 환불 대응이 불가한 PG사 등 대외 민원은 80% 감소해 중요 대응 리소스를 확보했습니다.",
    notionUrl: "https://app.notion.com/p/2108937a33b18017bc67ca551f9705a6",
    en: {
      title: "Resolving a Trust Issue Caused by Customer Misreading",
      summary:
        "Customers misread the service at each seasonal switch and lost trust in it, a long-standing known issue. Ahead of a product fix, an SQL query and an automatic KakaoTalk trigger cut related complaints and inquiries by 95%.",
      role: "Improvement planning and customer notification",
      result: "Inquiries on the issue down 95%; unnecessary refunds and payment-processor complaints down 80%",
      tags: ["Data Analysis", "Operations Handling"],
      background:
        "The service closes and reopens with each tax-filing period, and on return it judged eligibility from new usage rather than the customer's existing history.",
      problem:
        "Customers who came back to check on a paid, filed return found a reset screen, read the 'not eligible' notice as meaning they had been cheated out of their fee, and trust fell as negative word of mouth spread.",
      process: [
        "Defining the issue — Confirming that 90% of complaints came from customers told after the switch that they were not eligible (those who could still file another year, even for a small amount, came in as questions rather than complaints)",
        "Specifying the affected group — Defining it in database and field names rather than customer-facing language, so engineers knew exactly who was meant",
        "Planning options — Weighing three, given the time to the main season (May) and engineering, PD and PM capacity: fix the back-end logic (a root fix, but heavy work and side-effect risk), change only the front-end screen (fast, but works only if customers read it), or handle it in operations (immediate, but notices cost money and are less effective)",
        "Deciding and executing — After meeting the teams involved, choosing the front-end change (a logic change would need QA across every 삼쩜삼 service, and time to the main season was short), targeting end of May before the June peak; meanwhile building an SQL query to identify affected customers and a trigger in the operations database that calls the KakaoTalk API when one appears, so notices went out ahead of the release",
      ],
      fullResult:
        "Real-time KakaoTalk notices ran from the end of April, and at the end of May the not-eligible screen gained an entry point to past usage and filings that had not existed before (clicked by 10% of customers who filed the previous season). Complaints and inquiries on the issue fell 95% year on year (from the top 5% of last June's inbound categories to the bottom 5% this year), with the advance notices contributing more than the screen change. Outside complaints, such as those to payment processors where refunds could not be handled, fell 80%, freeing capacity for critical work.",
    },
  },
  {
    id: "proj-jarvis-5",
    title: "크리티컬 노운 이슈 해결 (오신고 문제)",
    company: "jarvis",
    period: "2025.04 – 2025.05",
    summary:
      "장기 노운 이슈인 부양가족 오신고에 대해 경고 메시지 수집 DB를 만들고 기존 데이터와 연결해 모니터링 체계를 구축했으며, 이슈 발생 시 고객 자동 안내와 문의·환불 처리 프로세스를 설정해 선제적 대응 기반을 마련했습니다.",
    role: "기획 및 운영",
    result: "이슈 후처리 대상 25% 감소, 재정 리스크 약 10억 감소",
    tags: ["데이터 분석", "운영 처리"],
    background:
      "삼쩜삼 이용 중 요건에 맞지 않는 부양가족을 포함해 신고하는 경우가 생겨 부정확한 세금 신고가 진행됐습니다.",
    problem:
      "부양가족의 소득 요건은 확인할 수 없지만 고객은 삼쩜삼 귀책을 주장해 불필요한 재정적 손실이 발생했고, 대외 이슈로 확대되며 서비스 신뢰도가 하락했습니다.",
    process: [
      "필요 데이터 확인, DB 적재 요청 — 모니터링용 신규 데이터 테이블 적재 요청, 신고 시 발생하는 경고 메시지 추출, 경고 메시지와 기존 신고 데이터를 연결할 키 값 세팅",
      "이상 데이터 추출 쿼리 빌드 — 기존 신고 데이터와 신규 DB로 경고 메시지 발송 대상·연도·유형 추출",
      "오신고 대상자 안내 메시지 설정 — 세무서 검토 시 결과가 변동될 수 있는 대상에게 보낼 알림톡을 신고 유형별 처리 방향에 맞춰 세 가지 버전으로 기획",
      "API 활용 알림톡 자동 발송 세팅 — 쿼리로 대상자가 발생하면 알림톡이 자동 발송되도록 API 트리거 설정",
      "환불·상담 처리 방향 결정 — 환불 진행 불가 케이스 대응 정책, 고객센터 문의 인입 시 정책 설정",
      "이슈 모니터링 대시보드 제작 — 대상자 발생율과 이슈 환불 여부를 모니터링하는 대시보드를 전사에 공유해 이슈 발생율 추이에 따른 개발 방향성 설정 기반 마련",
    ],
    fullResult:
      "오신고에 따른 이슈 후처리 대상이 25% 감소했습니다. 작년 동일 이슈 처리 금액이 최소 40억이었던 것을 기준으로 환불과 대납 비용에서 약 10억 가량의 재정 리스크를 줄였고, 노운 이슈 처리 방향을 설정해 안정적인 서비스 운영 기반을 마련했습니다.",
    notionUrl: "https://app.notion.com/p/1fc8937a33b180d59937f2a226db9d5d",
    en: {
      title: "Resolving a Critical Known Issue (Incorrect Dependant Filings)",
      summary:
        "For the long-standing issue of dependants claimed in error, built a warning database linked to filing data for monitoring, plus automatic customer notices and handling for inquiries and refunds.",
      role: "Planning and operations",
      result: "Cases needing follow-up down 25%; about 1bn KRW less financial risk",
      tags: ["Data Analysis", "Operations Handling"],
      background:
        "Some 삼쩜삼 users included dependants who did not meet the requirements, so returns were filed incorrectly.",
      problem:
        "A dependant's income could not be checked in advance, yet customers held 삼쩜삼 responsible, causing avoidable financial losses; as it became a public issue, trust in the service fell.",
      process: [
        "Data and table request — Requesting a new monitoring table, extracting the warnings raised during filing, and setting a key to join them to existing filing data",
        "Anomaly query — Using existing filings and the new table to extract who received warnings, for which year, and of what type",
        "Customer notices — Planning KakaoTalk messages for customers whose result could change on tax-office review, in three versions to match how each filing type is handled",
        "Automatic sending via API — A trigger that sends the notice automatically when the query finds a new case",
        "Refund and support policy — Policy for cases where a refund is not possible and for related inquiries to customer support",
        "Issue dashboard — A dashboard of case rates and refund status, shared company-wide to guide development priorities as the trend moved",
      ],
      fullResult:
        "Cases needing follow-up after incorrect filings fell 25%. Against at least 4bn KRW spent on the same issue the year before, this reduced financial risk by about 1bn KRW across refunds and covered payments, and settled how the known issue is handled so the service can run stably.",
    },
  },
  {
    id: "proj-jarvis-2",
    title: "즉시환급 테스트 서비스 운영",
    company: "jarvis",
    period: "2025.03 – 2025.04",
    summary:
      "삼쩜삼의 환급 시기 불만을 해소하기 위한 즉시환급 테스트 서비스를 기획·라이브했습니다. 수익성 면에서 좋은 수치를 보이지는 못했지만 세무 처리의 행정적 한계와 문제점을 확인했고, 이를 바탕으로 서비스 기획 방향 전환과 신규 서비스 재오픈 준비의 근거를 마련했습니다.",
    role: "신규 서비스(즉시환급) 운영 담당자 — 고객 플로우 기획, 고객 여정 모니터링 체계 구축, 전체 운영 플로우 구축, 엣지 케이스 및 이슈 사전 대비와 처리",
    result: "수익성 한계 확인으로 서비스 기획 방향 전환 근거 마련, 운영 이슈 사전 대비 체계 구축",
    tags: ["신규 서비스 운영"],
    background:
      "세무 처리는 행정 지연으로 신고 시점에서 약 2개월의 차이가 생기고, 다양한 세무 플랫폼이 시장에 진입하고 있었습니다.",
    problem:
      "삼쩜삼의 귀책이 아닌 세무 처리 딜레이임에도 신고 시점과 환급금 지급 시점의 차이에 대한 고객 불만이 꾸준히 인입됐고, 경쟁사 증가로 경쟁력 확보가 필요했습니다.",
    process: [
      "서비스 방향 기획 — 환급금 선지급 시 회수할 수 있는 방법을 세무 행정 절차 안에서 연구하고 서비스 내 반영 가능 여부 확인",
      "서비스 내 반영 방향성 검토 — 전체 대상자로 진행하면 회수 문제가 생길 수 있어 전체 로직 변경 대신 테스트 서비스로 임시 오픈 결정",
      "운영 가능성 및 이슈 케이스 검토 — 입금 대상자 판단·입금 방법 등 운영 가능 여부 체크, 기존 환급 신고의 이슈 케이스별 대응 방안 마련(대응 불가 대상은 테스트 제외), BPO 전달용 서비스 플로우·대응 안내 문서 제작, Redash로 서비스 여정과 엣지 케이스 모니터링 대시보드 제작",
      "일부 대상 운영 서버 배포 — 결제·서비스 완료 여부와 이슈 발생 모니터링",
      "오류 발생 및 수정 — 금액 계산 로직 오류를 크리티컬 이슈로 확인해 서비스 진입 임시 차단, PM·BE에 수정 요청 후 QA, 이슈 후처리 방안 기획·진행",
      "테스트 결과 확인 — 지급 금액 환수 여부를 체크하고, 세무서 처리 방향과 국세청 행정 가이드라인 사이의 차이를 확인해 기획에 활용한 행정 방안의 유효성이 사실상 없음을 확인",
    ],
    fullResult:
      "선환급금 지급 후 환수율은 60%였고, 미환수 건 중 고객 어뷰징(의도적 오신고, 고액 체납자의 의도적 신고)이 10%, 세무서 오처리가 90%였습니다. 서비스 자체보다 행정적 문제라 단기간 해결이 불가능해, 동일한 기획안으로는 수익성에 도움이 되지 않음을 확인했습니다. 기존에 파악하지 못한 어뷰징 케이스와 세무서 행정 처리의 미흡한 점에 대한 운영 대응안을 마련했고, 오픈 초기 모니터링 대시보드로 이슈를 빠르게 확인해 대응하며 운영 모니터링 체계의 중요성을 확인했습니다.",
    notionUrl: "https://app.notion.com/p/2138937a33b180b5b062fcb1a9e64a59",
    en: {
      title: "Instant Refund Test Service",
      summary:
        "Planned and launched a test service paying refunds immediately. Profitability fell short, but it exposed the administrative limits of tax processing, which became the basis for changing the service plan and preparing a relaunch.",
      role: "Operations owner for the new instant-refund service — customer flow, journey monitoring, the end-to-end operations flow, and preparing for and handling edge cases and issues",
      result: "Profitability limits established as grounds to change the service plan; issue-readiness process in place",
      tags: ["New Service Operations"],
      background:
        "Tax processing runs about two months behind the filing date because of administrative delay, and more tax platforms were entering the market.",
      problem:
        "Customers kept complaining about the gap between filing with 삼쩜삼 and receiving the refund, even though the delay came from tax processing rather than 삼쩜삼, and growing competition made it necessary to stay competitive.",
      process: [
        "Service direction — Researching how an advance refund could be recovered within tax administration procedures, and whether that could be built into the service",
        "Scope — Opening a temporary test service instead of changing the logic for everyone, since recovery problems could follow a full rollout",
        "Feasibility and issue cases — Checking whether operations staff could decide who to pay and how; preparing responses for each known issue case from past refund filings (excluding cases that could not be handled); writing the service flow and response guide for the BPO team; building a Redash dashboard for the service journey and edge cases",
        "Release to a subset of users — Monitoring payment and completion status and any issues",
        "Error and fix — Confirming a critical error in the amount calculation, blocking entry to the service temporarily, requesting the fix from PM and back end, running QA, and planning and carrying out the follow-up",
        "Results — Checking whether paid amounts were recovered, and finding that tax offices' handling differed from the National Tax Service's administrative guidelines, so the administrative route the plan relied on was effectively unusable",
      ],
      fullResult:
        "60% of advance refunds were recovered. Of the unrecovered cases, 10% were customer abuse (deliberate incorrect filings, deliberate filings by large tax debtors) and 90% were processing errors by tax offices. Because the problem was administrative rather than in the service, it could not be fixed quickly, and the same plan would not help profitability. Operational responses were prepared for the abuse cases and the tax-office handling problems found, and catching issues early through the monitoring dashboard showed how much a monitoring setup matters.",
    },
  },
  {
    id: "proj-jarvis-3",
    title: "백오피스 기능 개선 (로직 고도화 및 기능 개선)",
    company: "jarvis",
    period: "2024.07 – 2025.05",
    summary:
      "서비스 운영 업무 효율을 높이기 위해 백오피스 기능 개선 필요 건을 리스트업해 초기 기획을 진행하고, 서비스 고도화에 따른 기능 추가와 로직 오류로 정상 작동하지 않던 기능의 개선 작업을 리딩했습니다. 리드 타임 감소로 운영 업무 효율성을 50% 높였습니다.",
    role: "백오피스 기능 개선 기획 및 작업 리딩",
    result: "운영 업무 효율성 50% 증대, BE 및 운영 리소스 확보",
    tags: ["서비스 개선"],
    background: "신규 서비스 추가, 기존 서비스 로직 변경 등 서비스 변경 사항이 다수 발생했습니다.",
    problem:
      "백오피스가 지원하지 않는 부분은 BE 개발자가 별도로 확인·처리해야 했고, 단순 확인·응대에도 이전 대비 리드 타임이 300% 이상 소요돼 업무 효율이 떨어지고 고객 불만이 늘었습니다.",
    process: [
      "백오피스 개선 필요 사항 리스트업 — 서비스 기능 추가에 따른 필수 기능, 운영에 필요한 기능, 개선 필요 로직을 확인하고 우선순위 HIGH 이상만 최종 기획 아이템으로 선정",
      "개선안 기획 — 개선 아이템 초기 기획, 필요 스펙과 버튼에 따른 동작 정의",
      "개발 관련 논의 — PM과 개발 일정·담당 논의, 필수 반영 티켓과 후순위 티켓을 재선정한 뒤 개발 리딩",
      "개발 상황 확인, QA — 개발 진행 상황 확인, STG 배포 건의 정상 작동·오작동 여부를 체크해 전달",
    ],
    fullResult:
      "전체 아이템 중 필수 아이템의 개선과 배포를 완료했고, 드랍된 아이템은 하반기 개선 아이템으로 선정했습니다. 백오피스 기능 개선으로 업무 효율성을 50% 높이고, 단순 확인·보정 처리에 쓰이던 BE 리소스를 확보했습니다.",
    notionUrl: "https://app.notion.com/p/2278937a33b1802e9009c523b9560ab4",
    en: {
      title: "Back-Office Improvements (Logic and Features)",
      summary:
        "Listed the back-office improvements operations needed, wrote the initial plans, and led the work to add missing features and fix ones broken by logic errors. Shorter lead times raised operational efficiency by 50%.",
      role: "Back-office improvement planning and leading the work",
      result: "Operational efficiency up 50%; back-end and operations time freed",
      tags: ["Service Improvement"],
      background: "New services were added and existing service logic changed many times.",
      problem:
        "Anything the back office did not support had to be checked and handled separately by back-end engineers, and even simple checks and replies took over 300% longer than before, lowering efficiency and raising customer complaints.",
      process: [
        "Listing what to improve — Checking features required by new service functions, features operations needed, and logic to fix, then keeping only HIGH-priority items and above for planning",
        "Planning — Initial plans for each item, with the required specs and what each button should do",
        "Engineering discussion — Agreeing schedule and ownership with PM, re-sorting tickets into must-ship and later, and leading development",
        "Progress and QA — Following development, checking items released to staging for correct behaviour, and reporting back",
      ],
      fullResult:
        "All must-have items were improved and released, and the dropped items were scheduled for the second half. The improvements raised efficiency by 50% and freed the back-end time that had gone to simple checks and corrections.",
    },
  },
  {
    id: "proj-jarvis-1",
    title: "신규 서비스 런칭 운영 준비 및 서비스 운영",
    company: "jarvis",
    period: "2023.10 – 2024.05",
    summary:
      "신규 환급 서비스 런칭을 앞두고 운영 정책 설정과 알림톡 준비를 진행하고, 런칭 이후 서비스 운영을 맡았습니다.",
    role: "프로젝트 서비스 운영 담당자",
    result: "운영 프로세스 확립으로 서비스 안정적 랜딩 기여, 전체 매출 중 20.13% 기여",
    tags: ["신규 서비스 운영"],
    background: "더 많은 환급 제공을 통한 고객 확보를 위해 신규 환급 서비스를 오픈했습니다.",
    problem: "신규 서비스에 따라 기존 환급 절차와 다른 운영 방안이 필요했고, 이에 따른 정책이 전무했습니다.",
    process: [
      "서비스 내용 파악, 운영 정책 설정 — 대상자 판단, 결제 및 환불, 엣지 케이스 대응, 고객센터 응대, 어드민 처리 절차 설정",
      "서비스 운영 모니터링 대시보드 및 쿼리 빌드 — 서비스 플로우 정상 데이터 파악과 비정상 로그 추적 쿼리 빌드, 고객 여정 데이터 대시보드로 특이 데이터를 모니터링해 이슈 리포팅, 노운 이슈 팔로업 쿼리와 알럿 설정, 클렌징 필요 데이터 확인 쿼리 빌드",
      "서비스 운영 — 제출 서류 검토, 서비스 이용 중 발생한 이슈 제기, 운영 개선 필요사항 기획 후 PM 전달, 운영 개선을 통한 고객 경험 개선 아이디어 도출",
    ],
    fullResult:
      "운영 프로세스를 확립해 서비스의 안정적인 랜딩에 기여했고, 신규 서비스 이용을 통해 전체 매출 중 20.13%를 기여했습니다.",
    notionUrl: "https://app.notion.com/p/1418937a33b180a0be91dd0c447a1c8a",
    en: {
      title: "New Service Launch: Operations Preparation and Running",
      summary:
        "Ahead of a new refund service's launch, set the operating policies and prepared the KakaoTalk notices, then ran the service after launch.",
      role: "Service operations owner for the project",
      result: "Contributed to a stable launch through the operations process; 20.13% of total revenue",
      tags: ["New Service Operations"],
      background: "The company opened a new refund service to win customers by offering more refunds.",
      problem: "The new service needed ways of operating that differed from the existing refund process, and there were no policies for it at all.",
      process: [
        "Understanding the service and setting policy — Eligibility, payment and refunds, edge cases, customer-support replies, and admin procedures",
        "Monitoring dashboard and queries — Queries for normal service-flow data and for tracing abnormal logs; a customer-journey dashboard for spotting unusual data and reporting issues; follow-up queries and alerts for known issues; queries for data needing cleanup",
        "Running the service — Reviewing submitted documents, raising issues found in use, planning operational fixes and passing them to PM, and generating ideas to improve the customer experience through operations",
      ],
      fullResult:
        "The operations process contributed to a stable launch, and the new service accounted for 20.13% of total revenue.",
    },
  },
  {
    id: "proj-jarvis-7",
    title: "고객 만족도 조사 개선 및 대시보드 제작",
    company: "jarvis",
    period: "2023.06",
    summary:
      "삼쩜삼 이용 고객 대상 만족도 조사의 설문 내용과 로직을 개선하고, 조사 결과 데이터를 바탕으로 고객 Pain Point 해결을 위한 개선 사항을 도출했습니다.",
    role: "기획 및 운영",
    result: "설문 간소화로 응답률 개선, 고객 Pain Point 해결 처리율 작년 대비 50% 상승",
    tags: ["운영 모니터링"],
    process: [
      "기존 고객 만족도 조사 문항 검토 — 수집·관리 지표 정의, 불필요한 문항 삭제, 유관 부서의 수집 희망 항목을 반영하고 나머지 문항은 삭제 또는 간소화",
      "고객 만족도 조사 지표 선정 — NPS(추천 점수, 상위권 비율 − 하위권 비율), CES(서비스 편의성, 평균 점수), 재이용 여부(신뢰도 판단)",
      "대시보드 기획 및 코딩 — R shinydashboard 모듈로 대시보드를 제작하고 사이트로 배포해 전사 관리 대시보드로 활용",
    ],
    fullResult:
      "고객 만족도 설문을 평균 10문항에서 5문항으로 간소화해 응답률을 개선했고, 고객 만족도 대시보드로 페인포인트를 확인해 고객 Pain Point 해결 처리율이 작년 대비 50% 상승했습니다.",
    notionUrl: "https://app.notion.com/p/6813c9f7691540aeb5bad0b7a7902033",
    en: {
      title: "Customer Satisfaction Survey Improvement and Dashboard",
      summary:
        "Improved the content and logic of the satisfaction survey sent to 삼쩜삼 users, and used the results to identify improvements addressing customers' pain points.",
      role: "Planning and operations",
      result: "Higher response rate from a shorter survey; pain-point resolution rate up 50% year on year",
      tags: ["Operations Monitoring"],
      process: [
        "Reviewing the survey — Defining the metrics to collect and manage, removing unneeded questions, keeping what other teams wanted to collect and cutting or simplifying the rest",
        "Choosing metrics — NPS (likelihood to recommend: share of high scores minus share of low scores), CES (ease of use, as an average), and intent to use again (as a measure of trust)",
        "Dashboard design and code — Built with the R shinydashboard package and deployed as a site used company-wide",
      ],
      fullResult:
        "Cutting the survey from an average of 10 questions to 5 improved the response rate, and the pain points the dashboard surfaced lifted the resolution rate 50% year on year.",
    },
  },

  // MIDAS
  {
    id: "proj-midas-1",
    title: "고객 요구사항 기반 기능 개선 및 백로그 해소",
    company: "midas",
    period: "2022.05 – 2022.12",
    summary: "누적된 고객 요구사항을 개선 항목으로 정의하고 우선순위를 세워 기능 개선까지 반영했습니다.",
    role: "개선 항목 정의 및 우선순위 수립, 기능 기획, 개발 협업, QA",
    result: "누적 백로그 5건 해소, 기존 고객 재계약 기반 마련",
    tags: ["서비스 개선"],
    background: "고객사에서 지속적으로 요청해온 개선 항목이 처리되지 못한 채 누적됐습니다.",
    problem:
      "기존 고객의 요청 사항이 개선되지 않아 고객 불만이 지속적으로 쌓였고, 미해결 상태가 길어지면서 재계약 시점의 리스크로 이어지고 있었습니다.",
    process: [
      "요구사항 분류 및 우선순위 수립 — VOC와 고객사 요청을 성격별로 분류하고 영향 범위와 처리 난이도를 기준으로 순서 결정",
      "기능 개선 기획 — 개선 항목별 요구사항 정의, 개발 조직과 구현 범위 협의",
      "QA 및 반영 — 개발 완료 건 검증 후 서비스 반영, 고객사 안내",
    ],
    fullResult:
      "오래 남아 있던 요구사항을 정리해 주요 고객의 백로그 5건을 해소했고, 기능 개선 건에 대한 검토-기획-제품 개발 프로세스를 구축해 기존 고객 재계약 기반을 마련했습니다.",
    notionUrl: "https://app.notion.com/p/3b18937a33b1811f842bc7566475919f",
    en: {
      title: "Feature Improvements from Customer Requests and Backlog Clearance",
      summary: "Turned accumulated customer requests into defined improvement items, set priorities, and carried them through to shipped features.",
      role: "Defining and prioritising improvement items, feature planning, engineering collaboration, QA",
      result: "5 backlog items cleared; groundwork for existing customers' renewals",
      tags: ["Service Improvement"],
      background: "Improvements customers had asked for repeatedly were piling up unhandled.",
      problem:
        "With existing customers' requests left unaddressed, dissatisfaction kept building, and the longer they stayed open the more they became a risk at renewal.",
      process: [
        "Sorting and prioritising — Grouping VOC and customer requests by type and ordering them by impact and difficulty",
        "Planning — Defining requirements for each item and agreeing scope with engineering",
        "QA and release — Verifying finished work, releasing it, and informing customers",
      ],
      fullResult:
        "Long-standing requests were sorted out and 5 backlog items for key customers cleared. A review–plan–build process for improvements was put in place, laying the groundwork for existing customers' renewals.",
    },
  },
  {
    id: "proj-midas-2",
    title: "VOC 기반 개선 운영 및 시나리오봇 응대율 개선",
    company: "midas",
    period: "2021.01 – 2023.05",
    summary: "VOC를 데이터 기반으로 추출·분류해 개선 항목으로 연결하고, 시나리오봇 응대 구조도 함께 개선했습니다.",
    role: "VOC 추출 및 분류, 개선 항목 정의, 업그레이드 플래닝 반영 관리, 시나리오봇 개선",
    result: "상반기 VOC 반영률 62% 달성, 시나리오봇 처리율 13% 개선",
    tags: ["운영 개선"],
    background: "시나리오봇으로 상세한 답변이 제공되는 건에도 고객 문의 인입이 반복됐습니다.",
    problem:
      "VOC가 응대 단계에서 소진되고 개선 항목으로 이어지지 않았고, 시나리오봇이 처리하지 못하고 상담으로 넘어가는 문의가 많았습니다.",
    process: [
      "VOC 데이터 추출 및 분류 — 문의 데이터를 분석해 반복 유형 정리",
      "개선 항목 정의 및 반영 관리 — 유형별 제품 개선 항목을 도출해 업그레이드 플래닝에 전달하고 반영 여부 추적",
      "시나리오봇 구조 개선 — 봇이 놓치던 문의 유형을 확인하고 응답 시나리오 보완",
    ],
    fullResult:
      "문의 데이터가 제품 개선으로 연결되는 흐름을 만들었고, 시나리오봇의 답변 해결율을 올려 운영 시간이 아니더라도 고객이 원하는 정보를 얻을 수 있는 환경을 조성했습니다. 상반기 VOC 반영률 62%를 달성하고 시나리오봇 처리율을 13% 개선했습니다.",
    notionUrl: "https://app.notion.com/p/3b18937a33b181d6a9deec4cc34ffba9",
    en: {
      title: "VOC-Driven Improvements and Scenario Bot Resolution",
      summary: "Extracted and classified VOC from data and connected it to improvement items, while also improving how the scenario bot handles inquiries.",
      role: "VOC extraction and classification, defining improvement items, tracking them through upgrade planning, scenario bot improvement",
      result: "62% of VOC reflected in H1; scenario bot resolution up 13%",
      tags: ["Operations Improvement"],
      background: "Customers kept contacting support even about questions the scenario bot already answered in detail.",
      problem:
        "VOC was used up at the support stage without turning into improvements, and many inquiries the bot could not handle were passed on to agents.",
      process: [
        "Extracting and classifying VOC — Analysing inquiry data to group recurring types",
        "Defining and tracking improvements — Deriving product improvements by type, passing them to upgrade planning, and tracking whether they shipped",
        "Restructuring the scenario bot — Finding the inquiry types the bot missed and filling in its response scenarios",
      ],
      fullResult:
        "Inquiry data now flows into product improvement, and a higher bot resolution rate lets customers find what they need outside support hours. 62% of VOC was reflected in H1, and the scenario bot's resolution rate improved by 13%.",
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
