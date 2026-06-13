import type { CareerItem, Project, SkillItem, PersonInfo, CompanyKey } from "./types";

export const personInfo: PersonInfo = {
  name: "김현욱",
  title: "고객 경험과 데이터를 보는 Operation Manager (6년차)",
  email: "hyunuk1245@naver.com",
  phone: "010-2515-5238",
  intro:
    "6년차 서비스 오퍼레이터로서, 서비스 이슈 분석 및 개선을 주도하며 고객 중심의 운영 전략을 수립해왔습니다. 고객 경험을 위한 고객 여정의 전반적인 경험을 설계하면서 서비스 인지부터 종료까지 만족스러운 경험을 제공하기 위해 노력했습니다. 고객이 갖고 있는 불편사항을 직접 컨택하면서 불편한 부분을 확인, 이에 대한 개선점을 팀 내, 제품을 통해 이끌어내면서 제품의 가치를 고객이 모두 느낄 수 있도록 만들었습니다. 고객에 보다 집중할 수 있도록 AI를 활용하여 업무 효율을 달성했습니다.",
  education: "경희대학교 지리학/언론정보학",
  educationPeriod: "2014.03 - 2020.02",
  certifications: ["SQLD (23.12.15)"],
  languages: ["영어 회화 베이직", "TOEIC 920 (2022.7 - 2024.7 만료)"],
};

export const careerData: CareerItem[] = [
  {
    company: "마이다스인",
    companyKey: "midas",
    period: "2021.1 - 2023.5",
    color: "green",
    tasks: [
      "웹 신규 서비스 전략 기획",
      "VOC 기반 서비스 개선안 기획",
      "고객 지원 자동화 플로우 개선",
      "시나리오봇 응대율 개선 프로젝트 진행",
      "데이터 분석 기반 응대 프로세스 개선",
    ],
  },
  {
    company: "자비스앤빌런즈 (삼쩜삼)",
    companyKey: "jarvis",
    period: "2023.6 - 2025.8",
    color: "amber",
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
  },
  {
    company: "플렉스",
    companyKey: "flex",
    period: "2026.1 - 재직중",
    color: "purple",
    tasks: [
      "서비스 관련 고객 문의 진행",
      "운영 정책 설계",
      "서비스 운영 효율화 / 자동화 작업",
      "서비스 모니터링 대시보드 기획 및 구축",
      "고객 현황 모니터링 대시보드 구축",
      "고객 경험 개선 액션 진행",
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: "proj-flex-1",
    title: "[비즈니스 액션] 요금제 전환 프로젝트",
    company: "flex",
    period: "2026.04 - 2026.07",
    summary:
      "비즈니스 목표 달성을 위한 요금제 개편 간 요금제 조류, 요금 적용 과정 로직 설정 및 전환 작업, 고객 안내 및 대응 프로세스 기획 및 진행",
    role: "로직 설정 및 고객 안내 프로세스 기획, 운영 담당",
    result: "NDR 118%로 상승 전환, 이탈율 10% 이하 유지",
    tags: ["비즈니스 액션", "요금제", "고객 안내"],
    background:
      "비즈니스 목표 달성을 위한 요금 인상 필요성 대두. 단순 요금 인상을 넘어 요금 체계에 대한 변화 진행 (기능 중심 → 요금제 형태로 전환)",
    problem:
      "과금 체계의 전반적인 변화로 고객이 체감하는 변화가 크게 다가올 수 있으며, 높은 인상율의 고객 발생. 고객 안내 프로세스 전무",
    process: [
      "요금제 종류 및 변경 시점 파악 - 요금제별 제공 기능 확인, 고객 안내 프로세스 구축을 위한 변경 시점 파악",
      "엣지 케이스 체크 - 유효 계약이 있는 케이스, 파트너 서비스 케이스 등 정리, 비즈니스 목표와 고객 경험 사이의 밸런스 조율",
      "고객 안내 프로세스 결정 - 안내 일정, 안내 방법, 안내 메시지 내용 설정, 이용 약관 변경 관련 안내 메일 작성 및 전송",
      "데이터 연동, 대시보드 제작 협업 요청 - 요금제 전환 정보 확인 및 안내 프로세스 자동화를 위한 데이터 연동 요청",
      "연간 계약 프로세스 설정 - AM 미타겟 대상 (SMB) 연간 계약 진행 프로세스 구축, 계약서/견적서 생성 자동화",
    ],
    fullResult:
      "레거시 코드에 따른 요금제 전환 간 발생한 여러 문제 해결. 각 엣지 케이스별 직접 검토, 변경 로직 확정. NDR 118%로 상승 전환, 이탈 관리 진행 중",
  },
  {
    id: "proj-flex-2",
    title: "[운영 프로세스 개선] 리드 메시지 채널",
    company: "flex",
    period: "2026.01 - 2026.02",
    summary:
      "기존 고객/잠재 고객 구분없이 리드 메시지가 수신되던 부분을 분기 기준 설정, 작업 진행",
    role: "기획 및 테스트",
    result: "AM 담당 고객사 자동 안내, 업셀링 기회 창출, 재계약 성사 달성",
    tags: ["운영 개선", "자동화", "CX"],
    background:
      "리드폼 수집 간 기존, 잠재 고객 여부에 대한 분리를 진행하지 않아 불필요한 컨택 포인트 발생",
    problem:
      "기존 고객임에도 신규 영업팀에서 이력 확인 없이 고객 컨택 진행. 담당 AM이 아닌 다른 담당자와 소통 후 이관되는 경험으로 고객 경험 저하",
    process: [
      "메시지 내용 및 채널 정리 - 각 액션별 메시지 구조, 발송되는 내용 확인, 발송 채널 및 분리 기준 확인",
      "AM 니즈 체크 - 메시지 내 필요한 정보 체크, 필수 정보·선택 정보 체크 후 메시지 구조 설계",
      "메시지 내용 기획 및 발송 로직 기획 - 메시지 구조, 내용, 하이퍼 링크 변수 기획, 신규/기존 채널의 분기 조건 설정",
      "개발 부서 협업 요청 및 QA - 기획안 바탕 개발 부서 협업 요청, PRD 배포 후 QA 진행",
    ],
    fullResult:
      "AM 담당 고객 또는 AM 배정 필요 고객의 액션 팔로업 체계 구축. 리드 메시지 수집 시 AM 터치를 통한 라포 형성 - 해당 컨택을 바탕으로 챔피언 확인 및 재계약 컨택 진행을 통한 재계약 성사 달성",
  },
  {
    id: "proj-jarvis-1",
    title: "[신규 서비스 운영] 신규 테스트 서비스 라이브",
    company: "jarvis",
    period: "2025.05 - 2025.06",
    summary: "신규 세무 서비스 라이브를 위한 운영 준비 및 서비스 운영",
    role: "운영 가능성 검토, 이슈 케이스 검토, 서비스 운영 준비",
    result: "안정적인 서비스 런칭 및 운영 안착",
    tags: ["신규 서비스", "운영", "세무"],
    process: [
      "서비스 콘텐츠 검토 및 운영 가능성 분석",
      "이슈 케이스 정리 및 대응 매뉴얼 작성",
      "운영 가능성 및 이슈 케이스 검토, 서비스 운영 준비",
      "서비스 오픈 후 모니터링 및 이슈 대응",
    ],
  },
  {
    id: "proj-midas-1",
    title: "[신규 서비스 운영] 신규 서비스 런칭 운영 준비 및 서비스 운영",
    company: "midas",
    period: "2022.03 - 2022.08",
    summary: "웹 신규 서비스 런칭 운영 준비 및 안정적 서비스 운영",
    role: "운영 프로세스 확립, 서비스 운영",
    result: "운영 프로세스 확립을 통한 서비스 안정적 랜딩 기여",
    tags: ["신규 서비스", "운영", "기획"],
    process: [
      "서비스 운영 프로세스 설계",
      "운영 매뉴얼 및 가이드라인 작성",
      "서비스 오픈 후 안정화 모니터링",
    ],
  },
];

export const skillsData: SkillItem[] = [
  { name: "SQL", level: 90, category: "data" },
  { name: "R", level: 65, category: "data" },
  { name: "Python", level: 50, category: "data" },
  { name: "Google Analytics", level: 75, category: "data" },
  { name: "Notion", level: 95, category: "tool" },
  { name: "Figma", level: 55, category: "tool" },
  { name: "JIRA", level: 80, category: "tool" },
  { name: "Zendesk", level: 75, category: "tool" },
  { name: "Slack", level: 90, category: "tool" },
  { name: "서비스 기획", level: 85, category: "process" },
  { name: "운영 정책 수립", level: 90, category: "process" },
  { name: "VOC 분석", level: 88, category: "process" },
  { name: "데이터 기반 의사결정", level: 82, category: "process" },
];

export const notionDatabaseIds: Record<CompanyKey, string> = {
  flex: "2c18937a-33b1-8062-9bb7-f6b87d2c07d0",
  jarvis: "e53d13ad-2b54-4e91-8762-b1ed55ae8dc1",
  midas: "1418937a-33b1-8095-a29c-e7d62223648d",
};

export function getStaticProjects(company?: CompanyKey): Project[] {
  if (!company) return projectsData;
  return projectsData.filter((p) => p.company === company);
}

export const companyLabels: Record<CompanyKey, string> = {
  flex: "플렉스",
  jarvis: "자비스앤빌런즈",
  midas: "마이다스인",
};
