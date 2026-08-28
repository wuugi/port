import type { Lang, Project, CareerItem, PersonInfo } from "./types";

type CategoryKey = "data" | "tool" | "process";

export interface UiStrings {
  aboutHeading: string;
  careerHeading: string;
  projectsHeading: string;
  skillsHeading: string;
  contactHeading: string;
  email: string;
  phone: string;
  education: string;
  certifications: string;
  languages: string;
  exploreMore: string;
  totalCompanies: (n: number) => string;
  responsibilities: string;
  since: (start: string) => string;
  showMoreTasks: (n: number) => string;
  showMoreTasksFor: (company: string, n: number) => string;
  showLessTasks: string;
  showLessTasksFor: (company: string) => string;
  current: string;
  totalProjects: (n: number) => string;
  noProjects: string;
  summary: string;
  role: string;
  background: string;
  problem: string;
  process: string;
  result: string;
  close: string;
  totalSkills: (n: number) => string;
  categoryLabels: Record<CategoryKey, string>;
  copy: string;
  copied: string;
  experienceLabel: string;
  certLabel: string;
  toeicLabel: string;
  experienceValue: string;
}

export const ui: Record<Lang, UiStrings> = {
  ko: {
    aboutHeading: "자기소개",
    careerHeading: "경력 사항",
    projectsHeading: "프로젝트",
    skillsHeading: "기술 스택 & 역량",
    contactHeading: "연락하기",
    email: "이메일",
    phone: "전화번호",
    education: "학력",
    certifications: "자격증",
    languages: "어학",
    exploreMore: "더 알아보기",
    totalCompanies: (n) => `총 ${n}개 회사`,
    responsibilities: "담당 업무",
    since: (start) => `${start}부터`,
    showMoreTasks: (n) => `업무 ${n}개 더 보기`,
    showMoreTasksFor: (company, n) => `${company} 담당 업무 ${n}개 더 보기`,
    showLessTasks: "간략히 보기",
    showLessTasksFor: (company) => `${company} 담당 업무 간략히 보기`,
    current: "재직중",
    totalProjects: (n) => `총 ${n}개 프로젝트`,
    noProjects: "이 회사의 프로젝트가 없습니다.",
    summary: "요약",
    role: "역할",
    background: "배경",
    problem: "문제 인식",
    process: "진행 과정",
    result: "결과",
    close: "닫기",
    totalSkills: (n) => `총 ${n}개 스킬`,
    categoryLabels: { data: "데이터 & 분석", tool: "협업 도구", process: "운영 프로세스" },
    copy: "복사",
    copied: "복사됨",
    experienceLabel: "경력",
    certLabel: "자격증",
    toeicLabel: "TOEIC",
    experienceValue: "6년차",
  },
  en: {
    aboutHeading: "About Me",
    careerHeading: "Career",
    projectsHeading: "Projects",
    skillsHeading: "Skills & Capabilities",
    contactHeading: "Get in Touch",
    email: "Email",
    phone: "Phone",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
    exploreMore: "Explore More",
    totalCompanies: (n) => `${n} ${n === 1 ? "company" : "companies"}`,
    responsibilities: "Responsibilities",
    since: (start) => `Since ${start}`,
    showMoreTasks: (n) => `Show ${n} more`,
    showMoreTasksFor: (company, n) =>
      `Show ${n} more ${n === 1 ? "responsibility" : "responsibilities"} at ${company}`,
    showLessTasks: "Show less",
    showLessTasksFor: (company) => `Show fewer responsibilities at ${company}`,
    current: "Current",
    totalProjects: (n) => `${n} projects`,
    noProjects: "No projects for this company.",
    summary: "Summary",
    role: "Role",
    background: "Background",
    problem: "Problem",
    process: "Process",
    result: "Result",
    close: "Close",
    totalSkills: (n) => `${n} skills`,
    categoryLabels: { data: "Data & Analytics", tool: "Collaboration Tools", process: "Operations Process" },
    copy: "Copy",
    copied: "Copied",
    experienceLabel: "Experience",
    certLabel: "Cert",
    toeicLabel: "TOEIC",
    experienceValue: "6 Years",
  },
};

export function tProject(project: Project, lang: Lang): Project {
  if (lang === "en" && project.en) {
    const e = project.en;
    return {
      ...project,
      title: e.title,
      summary: e.summary,
      role: e.role,
      result: e.result,
      tags: e.tags ?? project.tags,
      background: e.background ?? project.background,
      problem: e.problem ?? project.problem,
      process: e.process ?? project.process,
      fullResult: e.fullResult ?? project.fullResult,
    };
  }
  return project;
}

export function tCareer(item: CareerItem, lang: Lang): CareerItem {
  if (lang === "en" && item.en) {
    return { ...item, tasks: item.en.tasks };
  }
  return item;
}

export function tPerson(info: PersonInfo, lang: Lang): PersonInfo {
  if (lang === "en" && info.en) {
    const e = info.en;
    return {
      ...info,
      title: e.title,
      intro: e.intro,
      education: e.education,
      certifications: e.certifications ?? info.certifications,
      languages: e.languages ?? info.languages,
    };
  }
  return info;
}
