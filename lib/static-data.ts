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
  languages: ["영어 일상 회화 가능", "TOEIC 920 (2022.7 - 2024.7 만료)"],
  profileImage: "/profile.png",
  en: {
    title: "Operations Manager Focused on Customer Experience & Data",
    intro:
      "An Operations Manager who leads service issue analysis and improvement and sets customer-centred operating strategy. I design the customer journey end to end, so the experience holds from the moment someone first hears about a service to the moment they leave it.\n\n" +
      "I contact customers directly to find out what is not working, then drive those fixes through the team and the product — so the value of the product actually reaches the people using it.\n\n" +
      "And I use AI to cut the routine work, which buys back the hours to spend on customers.",
    education: "Kyung Hee University — Geography / Journalism & Communications",
    certifications: ["SQLD (Dec 15, 2023)"],
    languages: ["Conversational English", "TOEIC 920 (Jul 2022 – Jul 2024, expired)"],
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
      "서비스 관련 고객 문의 진행",
      "운영 정책 설계",
      "서비스 운영 효율화 / 자동화 작업",
      "서비스 모니터링 대시보드 기획 및 구축",
      "고객 현황 모니터링 대시보드 구축",
      "고객 경험 개선 액션 진행",
    ],
    en: {
      tasks: [
        "Handling customer inquiries related to the service",
        "Operational policy design",
        "Service operations efficiency and automation",
        "Service monitoring dashboard planning and development",
        "Customer status monitoring dashboard development",
        "Customer experience improvement initiatives",
      ],
    },
  },
];

export const projectsData: Project[] = [
  // FLEX
  {
    id: "proj-flex-3",
    title: "고객사 설문 발송 툴 기획·개발",
    company: "flex",
    period: "2026.08",
    summary:
      "설문 응답을 사람이 손으로 대조하던 과정을 없애기 위해, 프리필 링크를 자체 생성하는 도구를 기획하고 직접 만들어 사내에 배포했습니다.",
    role: "프로세스 기획 및 프로덕트 개발",
    result: "응답 매핑 100% 자동화, 외부 CRM 발송 툴 의존 제거",
    tags: ["프로세스 기획", "프로덕트 개발", "자동화"],
    background:
      "고객 만족도 설문을 진행하기로 결정하면서, 여러 서비스의 담당자가 각자 다른 양식으로 설문을 발송하는 상황이 드러났습니다.",
    problem:
      "설문지 구성이 담당자마다 달라 응답 데이터를 하나로 맞추기 어려웠고, 고객이 인적 정보를 정확히 적지 않으면 응답을 누구의 것인지 특정할 수 없어 분석 자체가 불가능해졌습니다.",
    process: [
      "문제 정의 — 단순한 수작업 리소스 문제가 아니라, 응답한 건이 누구의 것인지 파악할 수 없다는 점이 본질임을 확인",
      "대안 비교 — 구글 폼 프리필과 서드파티 솔루션을 보안 검토 소요, API 활용 자유도, 응답 수정 가능성 기준으로 비교",
      "구글 폼으로 결정 — 보안 검토 지연과 API 제약을 피해 빠르게 진행하기로 하고, 설문 링크를 넣으면 프리필 문항 ID를 자동 추출해 링크를 만들어 주는 사이트를 기획",
      "구현 — 설문 생성과 메일 발송을 한 화면에서 처리하도록 묶고, AI 코딩 도구로 설계 논의와 구현을 진행해 로컬 테스트 후 사내 배포",
      "시연·의견 수집 — 사용 부서에 가이드 문서를 공유하고 전체 프로세스를 시연, 이미지 삽입과 발송 주체 변경 등 요구사항을 추가 반영",
      "최종 배포 — 요구사항 반영과 가독성 개선 후 사내 서버에 배포",
    ],
    fullResult:
      "필요 정보를 암호화해 설문에 미리 채우고 제출 후 자동 복호화하는 구조로, 응답과 고객을 잇는 매핑률 100%를 달성했습니다. 외부 메일 발송 CRM 툴에 대한 의존을 없애면서 반송 메일 문제도 함께 해소했습니다.",
    notionUrl: "https://app.notion.com/p/3ca8937a33b1806d9995d0ea5bfdcb06",
    en: {
      title: "Customer Survey Delivery Tool",
      summary:
        "Removed the manual reconciliation behind customer surveys by designing and building an in-house tool that generates pre-filled survey links, then shipping it internally.",
      role: "Process design and product development",
      result: "Response mapping fully automated; external CRM sending tool no longer needed",
      tags: ["Process Design", "Product Development", "Automation"],
      background:
        "The decision to run a customer satisfaction survey surfaced the fact that each service owner was sending their own survey in their own format.",
      problem:
        "Because the forms differed by owner, responses could not be reconciled into one dataset — and whenever a customer mistyped their details, there was no way to tell whose answer it was, which made analysis impossible.",
      process: [
        "Defining the problem — Establishing that this was not a manual-effort problem but an identification one: a response could not be tied back to the customer who gave it",
        "Comparing options — Weighing Google Forms pre-fill against third-party tools on security review time, API freedom, and whether respondents could edit pre-filled values",
        "Choosing Google Forms — Avoiding security-review delay and API limits, then designing a site that takes a survey link, extracts the pre-fill field IDs automatically, and generates the links",
        "Building it — Combining survey creation and mail delivery into a single screen, developing it with AI coding tools, and deploying internally after local testing",
        "Demo and feedback — Sharing a usage guide with the teams, walking through the whole process, and adding requested features such as inline images and a switchable sending account",
        "Final release — Shipping to the internal server after the requested changes and a readability pass",
      ],
      fullResult:
        "Required details are encrypted into the pre-filled survey and decrypted automatically on submission, which ties every response to the right customer. Dropping the external CRM mail tool also removed the bounced-mail problem that came with it.",
    },
  },
  {
    id: "proj-flex-1",
    title: "요금제 전환 프로젝트",
    company: "flex",
    period: "2026.04 – 2026.07",
    summary:
      "요금 체계를 기능 중심에서 요금제 형태로 전환하며, 전환 로직 설계와 고객 안내 프로세스를 처음부터 구축했습니다.",
    role: "전환 로직 설계, 고객 안내 프로세스 기획·운영",
    result: "NDR 118% 달성, 이탈율 10% 이하 유지",
    tags: ["비즈니스 액션", "요금제 개편", "고객 안내"],
    background:
      "비즈니스 목표 달성을 위한 요금 인상 필요성이 대두되었고, 단순 인상을 넘어 기능 중심 → 요금제 형태로의 체계 전환이 결정되었습니다.",
    problem:
      "서비스 런칭 후 첫 대대적인 과금 체계 변화로 고객 체감 충격이 클 수 있었고, 상위 기능 이용 고객은 요금이 크게 오르는 케이스가 발생했습니다. 고객 사전 안내 프로세스 자체가 전무한 상태였습니다.",
    process: [
      "요금제 종류 및 변경 시점 파악 — 요금제별 제공 기능 확인, 고객 안내 프로세스 구축을 위한 변경 시점 정의",
      "엣지 케이스 체크 — 유효 계약·파트너 서비스 등 기존 정책 유지 시 문제가 생기는 케이스 정리, 비즈니스 목표와 고객 경험 사이의 밸런스 조율 및 각 케이스별 적용 로직 결정",
      "고객 안내 프로세스 수립 — 안내 일정·방법·메시지 내용 설계, 이용 약관 변경 안내 메일 작성·발송, 문의 회신 워크플로우 설정",
      "데이터 연동·대시보드 협업 — 요금제 전환 정보 확인 및 안내 자동화를 위한 데이터 연동 요청(DA팀), 시뮬레이션 데이터 검증용 대시보드 제작",
      "연간 계약 프로세스 구축 — SMB 대상 연간 계약 진행 프로세스 수립, 계약서·견적서 생성 자동화, 이탈 위험 고객 협상 리드",
    ],
    fullResult:
      "레거시 코드에 따른 요금제 전환 간 발생한 여러 엣지 케이스를 직접 검토하고 변경 로직을 확정했습니다. 주요 약관 변경 사전 안내 및 요금제 전환을 완료했고, NDR 118%로 상승 전환, 이탈율 목표치 유지 중입니다.",
    notionUrl: "https://app.notion.com/p/36b8937a33b180cc8f31f3cd9919dd82",
    en: {
      title: "Pricing Plan Migration Project",
      summary:
        "Led the full redesign of the billing structure from feature-based to a subscription plan model, building the migration logic and customer communication process from scratch.",
      role: "Migration logic design, customer communication process planning & operations",
      result: "NDR 118% achieved, churn rate kept below 10%",
      tags: ["Business Action", "Plan Restructure", "Customer Communication"],
      background:
        "A need arose to raise prices to meet business targets, and leadership decided to go beyond a simple price hike — restructuring from feature-based billing to a subscription plan model.",
      problem:
        "As the first major billing overhaul since launch, there was significant risk of customer shock. Some high-feature users faced substantial price increases, and there was zero pre-existing customer communication process.",
      process: [
        "Identifying plan types and transition timing — Reviewing features per plan; defining transition timing to build the customer communication process",
        "Checking edge cases — Cataloguing scenarios where legacy policies (active contracts, partner services) would cause issues; balancing business goals against customer experience; defining per-case logic",
        "Establishing the customer communication process — Designing notification schedules, channels, and message content; drafting and sending terms-of-service change notification emails; setting up inquiry response workflows",
        "Data integration & dashboard collaboration — Requesting data pipeline from the DA team to verify plan migration and enable notification automation; building a simulation data validation dashboard",
        "Building the annual contract process — Establishing the annual contract flow for SMB customers; automating contract and quote generation; leading negotiations with at-risk churn accounts",
      ],
      fullResult:
        "Personally reviewed and finalized the migration logic for numerous edge cases caused by legacy code. Completed major terms changes and plan migration. NDR rose to 118%; churn rate remains within target.",
    },
  },
  {
    id: "proj-flex-2",
    title: "리드 메시지 채널 분기 개선",
    company: "flex",
    period: "2026.01 – 2026.02",
    summary:
      "기존·잠재 고객 구분 없이 수신되던 리드 메시지에 분기 기준을 도입해, 불필요한 이중 컨택을 차단하고 업셀링 기회를 확보했습니다.",
    role: "프로세스 기획·테스트",
    result: "AM 담당 고객 자동 안내 실현, 재계약 성사",
    tags: ["운영 개선", "자동화", "CX"],
    background:
      "리드폼 수집 시 기존 고객과 잠재 고객을 구분하지 않아 신규 영업팀과 AM팀이 동일 고객을 중복 컨택하는 상황이 반복됐습니다.",
    problem:
      "기존 고객에게 이력 확인 없이 신규 영업팀이 컨택 후 AM으로 이관되는 경험이 누적되어 고객 신뢰도가 저하되고, AM이 업셀링 기회를 놓치는 구조적 문제가 있었습니다.",
    process: [
      "메시지 채널 현황 정리 — 각 액션별 메시지 구조·발송 채널·분리 기준 파악",
      "AM 니즈 체크 — 메시지 내 필수·선택 정보 체크 후 메시지 구조 설계",
      "발송 로직 기획 — 신규·기존 채널 분기 조건 설정, 메시지 구조·내용·하이퍼링크 변수 기획",
      "개발 협업 및 QA — 기획안 기반 개발 요청, PRD 배포 후 메시지 내용·분기 QA 진행",
    ],
    fullResult:
      "AM 담당 고객·AM 배정 필요 고객의 액션 팔로업 체계가 구축되었습니다. 리드 수집 시 AM 터치를 통한 라포 형성이 가능해졌고, 챔피언 확인 및 재계약 컨택을 통해 실 재계약 성사로 이어졌습니다.",
    notionUrl: "https://app.notion.com/p/3498937a33b180d1a478ce45a805aa56",
    en: {
      title: "Lead Message Channel Routing Improvement",
      summary:
        "Introduced branching logic to differentiate existing vs. prospective customers in lead message routing, eliminating redundant double-contacts and unlocking upsell opportunities.",
      role: "Process planning & QA",
      result: "Automated AM-managed customer notifications; renewal deal closed",
      tags: ["Operations Improvement", "Automation", "CX"],
      background:
        "Lead form submissions were not segmented by existing vs. new customers, causing the new sales team and Account Management team to repeatedly contact the same customer.",
      problem:
        "Existing customers were repeatedly contacted by the new sales team without history checks before being handed off to AM, eroding trust and causing AM to miss upsell opportunities.",
      process: [
        "Auditing message channels — Mapping the message structure, sending channels, and segmentation criteria for each action type",
        "Checking AM requirements — Reviewing required vs. optional fields in messages, then designing the message structure",
        "Planning send logic — Defining branch conditions for new vs. existing customer channels; designing message structure, content, and hyperlink variables",
        "Dev collaboration & QA — Filing development requests based on the plan; running QA on message content and branching logic after PRD deployment",
      ],
      fullResult:
        "Built a follow-up system for AM-assigned customers and those needing AM assignment. AM touch points now enable rapport-building from the lead stage, and champion identification plus renewal outreach led to actual contract renewals.",
    },
  },

  // JARVIS
  {
    id: "proj-jarvis-1",
    title: "신규 환급 서비스 런칭 운영",
    company: "jarvis",
    period: "2023.10 – 2024.05",
    summary:
      "신규 환급 서비스의 운영 정책을 처음부터 설계하고, SQL 기반 모니터링 체계를 구축해 안정적인 서비스 랜딩을 이끌었습니다.",
    role: "서비스 운영 담당자 (운영 정책·모니터링·이슈 대응 전담)",
    result: "서비스 안정 랜딩 기여, 신규 서비스 매출 비중 20.13%",
    tags: ["신규 서비스", "운영 정책", "SQL"],
    background:
      "기존 삼쩜삼의 신규 환급 서비스 런칭을 앞두고 운영 정책·알림톡·이슈 대응 체계가 없는 상태에서 준비가 필요했습니다.",
    problem:
      "신규 서비스라 선례가 없어 대상자 판단 기준, 결제·환불 정책, 엣지 케이스 처리 방식을 모두 직접 정의해야 했습니다.",
    process: [
      "서비스 내용 파악 및 운영 정책 설정 — 대상자 판단·결제·환불·엣지 케이스·어드민 처리 절차 수립",
      "서비스 운영 모니터링 대시보드 구축 — 서비스 플로우 정상 데이터 파악, 비정상 로그 추적 쿼리 빌드, 고객 여정 데이터 대시보드 제작",
      "서비스 운영 — 제출 서류 검토, 서비스 이슈 라이징, 운영 개선 사항 PM 전달, 고객 경험 개선 아이데이션",
    ],
    fullResult:
      "운영 프로세스 확립을 통한 안정적 서비스 랜딩에 기여했으며, 신규 서비스 이용을 통한 매출 기여 비중 20.13%를 달성했습니다.",
    notionUrl: "https://app.notion.com/p/1418937a33b180a0be91dd0c447a1c8a",
    en: {
      title: "New Refund Service Launch Operations",
      summary:
        "Designed the operational policies for a new refund service from scratch and built an SQL-based monitoring system, contributing to a stable service landing.",
      role: "Service operations lead (operational policy, monitoring, and issue response)",
      result: "Contributed to stable service landing; new service revenue share at 20.13%",
      tags: ["New Service", "Operations Policy", "SQL"],
      background:
        "With the launch of a new refund service on 삼쩜삼 approaching, there were no operational policies, KakaoTalk notification templates, or issue response procedures in place.",
      problem:
        "With no precedent to draw from, we had to define eligibility criteria, payment/refund policies, and edge case handling entirely from scratch.",
      process: [
        "Service research & policy setting — Establishing eligibility criteria, payment, refund, edge case handling, and admin processing procedures",
        "Service monitoring dashboard build — Mapping normal service flow data, building queries to trace abnormal logs, creating customer journey data dashboards",
        "Service operations — Reviewing submitted documents, surfacing service issues, relaying improvements to PM, ideating on customer experience enhancements",
      ],
      fullResult:
        "Contributed to a stable service launch by establishing the full operations process. Achieved a 20.13% revenue contribution share from the new service.",
    },
  },
  {
    id: "proj-jarvis-2",
    title: "즉시환급 테스트 서비스 운영",
    company: "jarvis",
    period: "2025.03 – 2025.04",
    summary:
      "환급 대기 기간에 대한 고객 불만을 해소하기 위한 즉시환급 테스트 서비스를 운영하며 행정·운영 한계점을 실증했습니다.",
    role: "신규 서비스(즉시환급) 운영 담당 — 고객 플로우 기획, 모니터링 체계 구축, 이슈 처리",
    result: "운영 이슈 사전 대비 체계 구축, 서비스 기획 방향 전환 근거 마련",
    tags: ["신규 서비스", "운영", "SQL", "대시보드"],
    background:
      "삼쩜삼 신고 시점과 환급금 지급 시점 간 약 2개월 차이에 대한 고객 불만이 지속되었고, 경쟁사 증가에 따른 경쟁력 확보가 필요했습니다.",
    problem:
      "선지급 후 환수 구조로 인한 회수 리스크가 있었고, 고객 어뷰징·세무서 행정 처리 미흡 등 운영 불확실성이 높은 상황이었습니다.",
    process: [
      "서비스 방향 기획 — 환급금 선지급 시 회수 가능 방법 확인, 세무 행정 절차 내 가능 여부 연구",
      "테스트 서비스 결정 — 전체 대상자 진행 시 회수 리스크를 고려해 일부 대상 테스트 서비스로 진행",
      "운영 가능성·이슈 케이스 검토 — 입금 대상자 판단·입금 방법 등 운영 가능 여부 체크, 엣지 케이스별 사전 대응 방안 마련, SQL 대시보드 제작(Redash)",
      "운영 서버 배포 및 모니터링 — 결제·서비스 완료 여부 모니터링, 이슈 발생 추적",
      "크리티컬 이슈 대응 — 금액 계산 로직 오류 확인 후 서비스 임시 차단, 로직 수정 요청·QA 진행",
      "테스트 결과 분석 — 환수율 60%, 행정 처리 문제 확인 후 서비스 방향 전환 근거 마련",
    ],
    fullResult:
      "선환급 후 환수율 60% 달성. 고객 어뷰징 케이스 10%, 세무서 오처리 90%를 확인하며 현 구조의 수익성 한계를 실증했습니다. 해당 결과를 바탕으로 신규 서비스 기획 방향 전환의 근거가 되었고, 운영 모니터링 체계 중요성을 확인해 이후 서비스 운영에 반영했습니다.",
    notionUrl: "https://app.notion.com/p/2138937a33b180b5b062fcb1a9e64a59",
    en: {
      title: "Instant Refund Test Service Operations",
      summary:
        "Operated a test service for instant refunds designed to address customer complaints about waiting periods, empirically validating administrative and operational limitations.",
      role: "New service (instant refund) operations — customer flow planning, monitoring setup, issue handling",
      result: "Built proactive issue response system; provided evidence to redirect the service roadmap",
      tags: ["New Service", "Operations", "SQL", "Dashboard"],
      background:
        "Ongoing customer complaints about the ~2-month gap between 삼쩜삼's filing date and refund disbursement created pressure, and growing competition made competitive differentiation necessary.",
      problem:
        "The advance-payment / clawback structure carried collection risk, and operational uncertainty was high due to potential user abuse and inconsistent tax authority processing.",
      process: [
        "Service direction planning — Researching clawback methods for advance payments; studying feasibility within tax admin procedures",
        "Test service decision — Given clawback risk from a full rollout, decided to run a limited-audience test service",
        "Feasibility & edge case review — Checking operational viability (eligibility criteria, disbursement methods); preparing per-case contingency plans; building SQL dashboards (Redash)",
        "Production deployment & monitoring — Monitoring payment status and service completion; tracking issue occurrence",
        "Critical issue response — Confirmed a payment calculation logic error; temporarily blocked the service, filed a fix request, and ran QA",
        "Test result analysis — Confirmed 60% clawback rate; identified 10% user abuse and 90% tax authority processing errors, establishing grounds to redirect the service roadmap",
      ],
      fullResult:
        "60% clawback rate achieved. Confirmed 10% user abuse and 90% tax authority processing errors, empirically demonstrating the profitability limits of the current structure. Results became the basis for redirecting the new service roadmap; monitoring best practices were incorporated into subsequent operations.",
    },
  },
  {
    id: "proj-jarvis-3",
    title: "백오피스 기능 고도화",
    company: "jarvis",
    period: "2024.07 – 2025.05",
    summary:
      "서비스 변경에 따라 누적된 백오피스 기능 부재 문제를 리스트업·기획·개발 리딩하여 운영 업무 효율을 50% 향상시켰습니다.",
    role: "백오피스 기능 개선 기획 및 개발 리딩",
    result: "운영 업무 효율 50% 향상, BE 리소스 확보",
    tags: ["서비스 개선", "백오피스", "운영 효율화"],
    background:
      "신규 서비스 추가·기존 서비스 로직 변경 등이 반복되며 백오피스 기능이 누락된 채 운영되었고, BE 개발자가 단순 확인 업무까지 처리해야 하는 상황이 발생했습니다.",
    problem:
      "백오피스 미지원으로 인해 단순 확인·보정 처리 시 이전 대비 리드 타임이 300% 이상 소요되며 업무 효율이 급감하고 고객 불만이 증가했습니다.",
    process: [
      "개선 필요 사항 리스트업 — 서비스 기능 추가에 따른 필수 기능 확인, 운영 간 필요 기능·개선 필요 로직 파악, 우선순위 체크 후 HIGH 이상만 최종 선정",
      "개선안 기획 — 개선 아이템별 초기 기획 진행, 필요 스펙·버튼 동작 정의",
      "개발 논의 및 리딩 — PM과 개발 일정·담당 논의, 필수·후순위 티켓 재선정 후 개발 리딩",
      "개발 현황 확인·QA — STG 배포 건 QA 진행, 정상 작동·오작동 여부 체크 후 전달",
    ],
    fullResult:
      "전체 아이템 중 필수 아이템 개선·배포 완료. 백오피스 기능 개선을 통해 운영 업무 효율 50% 향상, 단순 확인·보정 처리를 위한 BE 리소스를 확보했습니다.",
    notionUrl: "https://app.notion.com/p/2278937a33b1802e9009c523b9560ab4",
    en: {
      title: "Back-Office Feature Upgrade",
      summary:
        "Systematically identified accumulated back-office gaps caused by service changes, led planning and development, and improved operational efficiency by 50%.",
      role: "Back-office improvement planning and development lead",
      result: "50% improvement in operational efficiency; freed up back-end engineering resources",
      tags: ["Service Improvement", "Back-Office", "Operations Efficiency"],
      background:
        "Repeated new service additions and logic changes left the back-office missing key features, requiring back-end engineers to handle routine verification tasks.",
      problem:
        "Lack of back-office support caused lead time for routine checks and corrections to increase by 300%+, sharply degrading operational efficiency and increasing customer complaints.",
      process: [
        "Listing improvements — Identifying required features from service additions; cataloguing needed functions and logic fixes from operations; shortlisting to HIGH priority and above",
        "Planning improvements — Initial planning for each improvement item; defining required specs and button behaviors",
        "Dev discussion & lead — Discussing schedule and ownership with PM; re-prioritizing tickets to essential/deferred; leading development",
        "Dev status check & QA — Running QA on STG-deployed items; checking correct vs. incorrect behavior and feeding back",
      ],
      fullResult:
        "Completed deployment of all essential items. Back-office improvements delivered a 50% gain in operational efficiency and freed back-end engineering resources from routine verification tasks.",
    },
  },
  {
    id: "proj-jarvis-4",
    title: "서비스 신뢰도 하락 이슈 해결",
    company: "jarvis",
    period: "2025.04 – 2025.05",
    summary:
      "서비스 전환 시 고객이 오인하는 장기 known 이슈를 SQL·알림톡 자동화로 선제 해결해, 관련 문의를 95% 감소시켰습니다.",
    role: "개선안 기획 및 고객 안내 액션 실행",
    result: "관련 문의 95% 감소, PG사 민원 80% 감소",
    tags: ["데이터 분석", "SQL", "고객 안내", "자동화"],
    background:
      "세금 신고 기간에 따라 서비스가 클로징·오픈되는 구조에서, 재진입 시 기존 이용 내역이 아닌 신규 이용으로 판단되어 고객이 '이용료를 사취당했다'고 오인하는 이슈가 반복되었습니다.",
    problem:
      "서비스 신뢰도 하락 및 부정 바이럴이 확산되고 있었으나 개발 리소스 부족·사이드 이펙트 우려로 근본적 수정이 어려운 상황이었습니다.",
    process: [
      "이슈 상황 정의 — 불만 인입의 90%가 서비스 전환 후 미대상자 안내를 받은 고객임을 확인",
      "대상자 구체화 — DB명·속성명으로 이슈 처리 대상자를 코드 형태로 정의",
      "개선 방향 3가지 기획 — BE 로직 수정 / FE 화면 개선 / 운영 자체 해결 방안 비교 분석",
      "방향 결정 및 실행 — FE 개선 + 운영 자체 선안내 병행 결정. SQL 쿼리로 대상자 판단 로직 빌드, 알림톡 발송 트리거를 운영계 DB에 직접 구축해 대상자 발생 시 자동 발송",
      "FE 배포·알림톡 운영 — 5월 말 미대상자 화면에 이전 이용 내역 진입점 노출, 4월 말부터 실시간 알림톡 자동 발송 운영",
    ],
    fullResult:
      "해당 이슈 불만·문의 작년 대비 95% 감소 (상위 5% 인입율 → 하위 5%). 환불 대응 불가한 PG사 등 대외 민원 80% 감소. 중요 대응 리소스를 확보했습니다.",
    notionUrl: "https://app.notion.com/p/2108937a33b18017bc67ca551f9705a6",
    en: {
      title: "Resolving Service Trust Decline Issue",
      summary:
        "Pre-emptively resolved a long-standing known issue causing customers to misinterpret service transitions through SQL and KakaoTalk automation, reducing related inquiries by 95%.",
      role: "Improvement planning and customer communication execution",
      result: "95% reduction in related inquiries; 80% reduction in external payment processor complaints",
      tags: ["Data Analysis", "SQL", "Customer Communication", "Automation"],
      background:
        "The service's seasonal close/reopen structure caused returning customers to appear as new users, leading them to believe they had been fraudulently charged — a recurring and damaging issue.",
      problem:
        "Service trust was declining and negative word-of-mouth was spreading, but a root code fix was blocked by resource constraints and side-effect concerns.",
      process: [
        "Defining the issue — Confirmed 90% of complaints came from customers who received non-target notifications after a service transition",
        "Identifying affected users — Defined the affected population in query form using DB names and attribute names",
        "Planning 3 improvement approaches — Comparing BE logic fix / FE screen improvement / operations-led workaround",
        "Decision & execution — Chose FE improvement + proactive operations-led pre-notification in parallel; built user identification query logic via SQL; wired notification send triggers directly to the operations DB for automatic dispatch",
        "FE deployment & notification operations — Exposed previous usage entry point on the non-target screen at end of May; ran real-time automatic KakaoTalk notifications starting end of April",
      ],
      fullResult:
        "Complaints and inquiries for this issue dropped 95% YoY (from top 5% to bottom 5% of inbound). External complaints to payment processors dropped 80%. Recovered critical response capacity for the team.",
    },
  },
  {
    id: "proj-jarvis-5",
    title: "크리티컬 노운 이슈 해결 (오신고 문제 해결)",
    company: "jarvis",
    period: "2025.04 – 2025.05",
    summary:
      "부양가족 오신고 장기 노운 이슈에 대해 SQL 쿼리 기반 대상자 추출 및 알림톡 자동 발송 체계를 구축해 선제적으로 대응했습니다.",
    role: "이슈 원인 분석, SQL 쿼리 빌드, 알림톡 자동화 구축, 이슈 처리 프로세스 설정",
    result: "이슈 후처리 대상 25% 감소, 재정 리스크 약 10억 감소",
    tags: ["데이터 분석", "SQL", "알림톡 자동화", "운영 프로세스"],
    background:
      "삼쩜삼 이용 중 요건에 맞지 않은 부양가족을 포함해 신고하는 오신고 케이스가 지속 발생, 귀책 주장으로 서비스 신뢰도 하락 및 대외 민원이 발생했습니다.",
    problem:
      "부양가족 소득 요건 사전 확인이 불가한 구조적 한계로 근본적 해결이 어려웠고 재정 손실·민원이 반복됐습니다.",
    process: [
      "데이터 확인 및 DB 적재 요청 — 모니터링용 신규 테이블 요청, 경고 메시지 추출, 연결 키 세팅",
      "이상 데이터 추출 쿼리 빌드 — 경고 메시지 발송 대상·연도·유형 추출",
      "오신고 대상자 안내 메시지 설정 — 신고 유형별 3가지 버전 알림톡 기획",
      "API 활용 알림톡 자동 발송 세팅 — 대상자 발생 시 자동 알림톡 발송 API 트리거",
      "환불·상담 처리 방향 결정 — 환불 불가 케이스 정책, 고객센터 처리 방향 정의",
      "이슈 발생 및 환불율 모니터링 대시보드 제작 — 대상자 발생율·환불 여부 모니터링",
    ],
    fullResult:
      "오신고에 따른 이슈 후처리 대상 25% 감소. 재정 리스크 약 10억 감소 (환불 + 대납 비용). 안정적 서비스 운영 기반 마련.",
    notionUrl: "https://app.notion.com/p/1fc8937a33b180d59937f2a226db9d5d",
    en: {
      title: "Critical Known Issue Resolution (Erroneous Tax Filing)",
      summary:
        "Built a proactive response system for a long-standing erroneous dependent declaration issue using SQL-based automated user extraction and KakaoTalk notification automation.",
      role: "Root cause analysis, SQL query build, notification automation setup, issue processing workflow design",
      result: "25% reduction in post-issue processing targets; ~1B KRW financial risk reduction",
      tags: ["Data Analysis", "SQL", "Notification Automation", "Operations Process"],
      background:
        "Recurring cases of users filing with ineligible dependents on 삼쩜삼 led to blame disputes, eroding service trust and generating external complaints.",
      problem:
        "Structural inability to pre-verify dependent income eligibility made root-cause fixes impossible, leading to repeated financial losses and complaints.",
      process: [
        "Data verification & DB table request — Requested new monitoring table, extracted warning messages, configured join keys",
        "Anomaly extraction query build — Queried affected users, filing years, and error types",
        "Notification message setup — Planned 3 KakaoTalk message versions by filing type",
        "Automated notification via API — Configured API trigger to auto-send notifications when affected users appear",
        "Refund & counseling policy decision — Defined no-refund case policy and customer support handling direction",
        "Monitoring dashboard creation — Built dashboard to track issue occurrence rate and refund status",
      ],
      fullResult:
        "25% reduction in post-issue processing targets. ~1B KRW financial risk reduction (refunds + tax payment coverage). Established a stable service operations foundation.",
    },
  },
  {
    id: "proj-jarvis-6",
    title: "서비스 모니터링 대시보드 제작",
    company: "jarvis",
    period: "2025.04 –",
    summary:
      "삼쩜삼 서비스 주요 지표를 실시간으로 확인할 수 있는 SQL 기반 모니터링 대시보드를 구축해 이슈 대응 속도와 운영 안정성을 높였습니다.",
    role: "운영 지표 선정, SQL 쿼리 빌드, 대시보드 제작 및 알럿 설정",
    result: "메인 시즌 안정적 운영, 실시간 이슈 모니터링 기반 마련",
    tags: ["SQL", "대시보드", "서비스 모니터링", "데이터 분석"],
    process: [
      "서비스 운영 필요 지표 선정 — 결제·환불 금액, 처리 필요 건 실시간 데이터, 탈퇴 유저 추이, 노운 이슈 모니터링 지표 정의",
      "필요 지표 SQL 쿼리 빌드 — 일반 운영 지표 및 노운 이슈 모니터링용 쿼리 작성",
      "대시보드 제작 및 알럿 설정 — 목적별 탭 분류, 크리티컬 이슈 자동 알럿, 자동 리프레시 적용",
    ],
    fullResult:
      "메인 시즌 안정적인 서비스 운영 및 서비스 개선 사항 실시간 파악. 대시보드를 통한 처리 필요 건 확인 및 이슈 모니터링으로 개선 방향성 결정 데이터 기반 마련.",
    notionUrl: "https://app.notion.com/p/1f68937a33b1802a8c58f68718854059",
    en: {
      title: "Service Monitoring Dashboard Build",
      summary:
        "Built an SQL-based real-time monitoring dashboard for 삼쩜삼's key service metrics, improving issue response speed and operational stability.",
      role: "Metric selection, SQL query build, dashboard creation, alert setup",
      result: "Stable operations during main season; real-time issue monitoring foundation established",
      tags: ["SQL", "Dashboard", "Service Monitoring", "Data Analysis"],
      process: [
        "Metric selection — Defined KPIs: payment/refund amounts, real-time pending items, churned user trends, and known issue monitoring metrics",
        "SQL query build — Wrote queries for general operations metrics and known issue monitoring",
        "Dashboard creation & alert setup — Organized tabs by purpose; configured critical issue auto-alerts and auto-refresh",
      ],
      fullResult:
        "Enabled stable service operations during peak season and real-time visibility into service improvements. Dashboard-driven monitoring of pending items and issues established a data foundation for improvement decisions.",
    },
  },
  {
    id: "proj-jarvis-7",
    title: "고객 만족도 조사 개선 및 대시보드 제작",
    company: "jarvis",
    period: "2023.06",
    summary:
      "고객 만족도 조사 문항을 간소화하고 R 기반 대시보드를 구축해, 응답률을 높이고 고객 페인포인트 해결 처리율을 50% 향상시켰습니다.",
    role: "설문 문항 검토·개선, 지표 선정, R shinydashboard 대시보드 개발 및 배포",
    result: "설문 응답률 개선, 고객 Pain Point 해결 처리율 50% 향상",
    tags: ["운영 모니터링", "R", "대시보드", "고객 만족도"],
    process: [
      "기존 고객 만족도 조사 문항 검토 — 수집 및 관리 지표 정의, 불필요한 문항 삭제, 유관 부서 의견 수렴 후 간소화",
      "고객 만족도 조사 지표 선정 — NPS(고객 추천 점수), CES(고객 서비스 편의성 점수), 재이용 여부 지표 확정",
      "대시보드 기획 및 R 코딩 — R shinydashboard 모듈 활용 대시보드 제작, 전사 관리용 사이트 배포",
    ],
    fullResult:
      "고객 만족도 설문 간소화(평균 10문항 → 5문항)를 통한 응답률 개선. 고객 만족도 대시보드를 통한 페인포인트 확인으로 해결 처리율 작년 대비 50% 상승.",
    notionUrl: "https://app.notion.com/p/6813c9f7691540aeb5bad0b7a7902033",
    en: {
      title: "Customer Satisfaction Survey Improvement & Dashboard Build",
      summary:
        "Streamlined the customer satisfaction survey and built an R-based dashboard, improving response rates and boosting pain point resolution rate by 50%.",
      role: "Survey question review & improvement, metric selection, R shinydashboard development and deployment",
      result: "Improved survey response rate; 50% YoY improvement in customer pain point resolution rate",
      tags: ["Operations Monitoring", "R", "Dashboard", "Customer Satisfaction"],
      process: [
        "Survey review — Defined key metrics, removed redundant questions, simplified based on cross-team input",
        "Metric selection — Finalized NPS (Net Promoter Score), CES (Customer Effort Score), and repurchase intent metrics",
        "Dashboard planning & R coding — Built dashboard using R shinydashboard; deployed as a company-wide management site",
      ],
      fullResult:
        "Simplified survey from avg. 10 to 5 questions, improving response rates. Dashboard-driven pain point visibility raised resolution rate 50% YoY.",
    },
  },

  // MIDAS
  {
    id: "proj-midas-1",
    title: "고객 요구사항 기반 기능 개선 및 백로그 해소",
    company: "midas",
    period: "2022.05 – 2022.12",
    summary:
      "누적된 고객 요구사항을 개선 항목으로 정의하고 우선순위를 세워 기능 개선까지 반영, 기존 고객 재계약 기반을 마련했습니다.",
    role: "개선 항목 정의 및 우선순위 수립, 기능 기획, 개발 협업, QA",
    result: "누적 백로그 5건 해소, 기존 고객 재계약 기반 마련",
    tags: ["서비스 개선", "VOC", "백로그 해소", "QA"],
    background:
      "고객사에서 지속적으로 요청해온 개선 항목이 처리되지 못한 채 누적되어 재계약 시점의 리스크로 이어졌습니다.",
    problem:
      "미해결 상태가 길어지면서 고객 불만이 지속적으로 쌓이고 재계약 리스크가 높아졌습니다.",
    process: [
      "요구사항 분류 및 우선순위 수립 — VOC와 고객사 요청을 성격별로 분류, 영향 범위와 처리 난이도를 기준으로 순서 결정",
      "기능 개선 기획 — 개선 항목별 요구사항 정의, 개발 조직과 구현 범위 협의",
      "QA 및 반영 — 개발 완료 건 검증 후 서비스 반영, 고객사 안내",
    ],
    fullResult:
      "오래 남아 있던 요구사항을 정리하고 주요 고객의 백로그 5건을 해소했습니다. 기능 개선 건에 대한 검토-기획-제품 개발 프로세스를 구축하고 기존 고객 재계약 기반을 마련했습니다.",
    notionUrl: "https://app.notion.com/p/3b18937a33b1811f842bc7566475919f",
    en: {
      title: "Customer Requirement–Based Feature Improvement & Backlog Resolution",
      summary:
        "Defined accumulated customer requests as improvement items, prioritized them, and drove them to completion — laying the groundwork for existing customer renewals.",
      role: "Improvement item definition and prioritization, feature planning, dev collaboration, QA",
      result: "5 accumulated backlogs resolved; foundation laid for existing customer renewals",
      tags: ["Service Improvement", "VOC", "Backlog Resolution", "QA"],
      background:
        "Improvement requests repeatedly submitted by customers had gone unaddressed, accumulating as a risk factor at contract renewal time.",
      problem:
        "Prolonged unresolved status caused customer dissatisfaction to compound and renewal risk to rise.",
      process: [
        "Requirement classification & prioritization — Categorized VOC and customer requests by nature; prioritized by impact scope and resolution complexity",
        "Feature improvement planning — Defined requirements per improvement item; negotiated implementation scope with engineering",
        "QA & deployment — Verified completed items and deployed to production; communicated updates to customers",
      ],
      fullResult:
        "Cleared long-standing backlog items and resolved 5 major customer requests. Established a review-planning-development process for improvements and laid the foundation for existing customer renewals.",
    },
  },
  {
    id: "proj-midas-2",
    title: "VOC 기반 개선 운영 및 시나리오봇 응대율 개선",
    company: "midas",
    period: "2021.01 – 2023.05",
    summary:
      "VOC를 데이터 기반으로 추출·분류하고 제품 개선으로 연결하는 체계를 구축했으며, 시나리오봇 응대 구조 개선으로 처리율 13%를 향상시켰습니다.",
    role: "VOC 추출 및 분류, 개선 항목 정의, 업그레이드 플래닝 반영 관리, 시나리오봇 개선",
    result: "상반기 VOC 반영률 62% 달성, 시나리오봇 처리율 13% 개선",
    tags: ["VOC 분석", "시나리오봇", "운영 개선", "데이터 분석"],
    background:
      "시나리오봇으로 상세하게 답변이 제공되는 문의에도 고객이 계속 인입했고, VOC가 응대 단계에서 소진되어 제품 개선으로 이어지지 않는 구조적 문제가 있었습니다.",
    problem:
      "VOC가 개선 항목으로 연결되지 않으며, 시나리오봇이 처리하지 못하고 상담으로 넘어가는 문의가 많아 운영 효율이 저하됐습니다.",
    process: [
      "VOC 데이터 추출 및 분류 — 문의 데이터를 분석해 반복 유형 정리",
      "개선 항목 정의 및 반영 관리 — 제품 개선 항목 도출, 업그레이드 플래닝에 전달 및 반영 여부 추적",
      "시나리오봇 구조 개선 — 봇이 놓치던 문의 유형을 확인하고 응답 시나리오 보완",
    ],
    fullResult:
      "문의 데이터가 제품 개선으로 연결되는 흐름 구축. 시나리오봇 답변 해결율 향상으로 운영 시간 외에도 고객이 정보를 얻을 수 있는 환경 조성. 상반기 VOC 반영률 62% 달성, 시나리오봇 처리율 13% 개선.",
    notionUrl: "https://app.notion.com/p/3b18937a33b181d6a9deec4cc34ffba9",
    en: {
      title: "VOC-Based Improvement Operations & Chatbot Response Rate Improvement",
      summary:
        "Built a system to extract, classify, and route VOC data into product improvements, and improved the scenario bot's handling structure to increase resolution rate by 13%.",
      role: "VOC extraction and classification, improvement item definition, upgrade planning tracking, chatbot improvement",
      result: "62% VOC incorporation rate achieved H1; scenario bot resolution rate improved by 13%",
      tags: ["VOC Analysis", "Scenario Bot", "Operations Improvement", "Data Analysis"],
      background:
        "Customers kept contacting support even for inquiries the scenario bot already answered in detail, and VOC was being consumed at the support layer without flowing into product improvements.",
      problem:
        "VOC was not reaching product improvement cycles, and high bot-to-human handoff rates were degrading operational efficiency.",
      process: [
        "VOC data extraction & classification — Analyzed inquiry data to organize recurring issue types",
        "Improvement item definition & tracking — Identified product improvement items; delivered to upgrade planning and tracked incorporation",
        "Scenario bot restructuring — Identified inquiry types the bot was missing and supplemented response scenarios",
      ],
      fullResult:
        "Established a pipeline from inquiry data to product improvement. Improved bot resolution rate enabled customers to get information outside operating hours. H1 VOC incorporation rate: 62%; scenario bot resolution rate improved by 13%.",
    },
  },
  {
    id: "proj-midas-3",
    title: "대규모 채용 프로젝트 사전 안정성 점검 (QA)",
    company: "midas",
    period: "2021.01 – 2023.05",
    summary:
      "대기업 대규모 채용 오픈 전 QA 시나리오를 설계하고 직접 수행해, 동시 접속 1,000명 이상 규모 채용 프로젝트를 오류 없이 완료했습니다.",
    role: "QA 시나리오 설계 및 수행, 오픈 전 안정성 점검 리드",
    result: "동시 접속 1,000명 이상 채용 프로젝트 오류 없이 종료",
    tags: ["QA", "서비스 안정성", "채용"],
    background:
      "대기업 채용 과정에서 대규모 인원이 동시 접속할 예정이었으나, 배포 전 검증 시간 부족으로 PRD 환경의 안정성 체크가 진행되지 못했습니다.",
    problem:
      "오픈 직후 오류가 발생하면 지원자 이탈과 고객사 신뢰 훼손이 우려되는 상황에서 사전 검증 프로세스가 부재했습니다.",
    process: [
      "사용 흐름 기준 시나리오 설계 — 지원자와 기업 담당자가 실제로 거치는 단계를 기준으로 점검 항목 정리, 영향도가 큰 구간을 우선순위로 배치",
      "QA 수행 및 이슈 정리 — 기능별 검증 진행, 발견한 이슈를 재현 조건과 함께 정리해 개발 조직에 전달",
      "수정 반영 확인 및 오픈 전 최종 점검 — 수정 건 재검증, 오픈 직전 전체 흐름 재확인",
    ],
    fullResult:
      "오픈 전 이슈를 사전에 발견하고 처리하여 서비스 영향 차단. 동시 접속 1,000명 이상 규모의 대기업 채용 프로젝트를 오류 없이 성공적으로 마무리.",
    notionUrl: "https://app.notion.com/p/3b18937a33b181f18940efddfb3c2fd6",
    en: {
      title: "Large-Scale Recruitment Project Pre-Launch Stability Check (QA)",
      summary:
        "Designed and executed QA scenarios before a large enterprise recruitment launch, completing the project error-free with 1,000+ concurrent users.",
      role: "QA scenario design and execution, pre-launch stability check lead",
      result: "Large-scale recruitment project with 1,000+ concurrent users completed without errors",
      tags: ["QA", "Service Stability", "Recruitment"],
      background:
        "A major enterprise client expected large simultaneous user traffic during recruitment, but insufficient pre-deployment verification time meant production stability had not been tested.",
      problem:
        "Errors immediately after launch would risk applicant dropout and damage client trust, yet no pre-verification process existed.",
      process: [
        "Scenario design based on user flow — Mapped actual steps taken by applicants and HR staff; prioritized high-impact checkpoints",
        "QA execution & issue documentation — Verified each function; compiled discovered issues with reproduction conditions and handed off to engineering",
        "Fix verification & final pre-launch check — Re-verified fixes; ran full end-to-end flow confirmation immediately before launch",
      ],
      fullResult:
        "Pre-launch issues were caught and resolved before they could affect the service. Successfully completed a 1,000+ concurrent user enterprise recruitment project without a single error.",
    },
  },
];

/**
 * Mirrors the Notion skills database exactly — names and `level` (its 상태 number)
 * as authored there. Notion lists no process skills, so that category is empty
 * and the panel drops it rather than printing an empty column.
 */
export const skillsData: SkillItem[] = [
  { name: "SQL (Redash / databricks)", level: 80, category: "data" },
  { name: "R", level: 70, category: "data" },
  { name: "Excel (spreadsheet)", level: 90, category: "data" },
  { name: "Claude", level: 90, category: "data" },
  { name: "Slack", level: 90, category: "tool" },
  { name: "Word", level: 80, category: "tool" },
  { name: "Figma", level: 50, category: "tool" },
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
