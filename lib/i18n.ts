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
  totalCompanies: (n: number) => string;
  responsibilities: string;
  ongoing: (start: string) => string;
  showMoreTasks: (n: number) => string;
  showMoreTasksFor: (company: string, n: number) => string;
  showLessTasks: string;
  showLessTasksFor: (company: string) => string;
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
  skillTiers: Record<"core" | "working" | "familiar", string>;
  copy: string;
  themeLabel: string;
  copied: string;
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
    totalCompanies: (n) => `총 ${n}개 회사`,
    responsibilities: "담당 업무",
    ongoing: (start) => `${start} – 현재`,
    showMoreTasks: (n) => `업무 ${n}개 더 보기`,
    showMoreTasksFor: (company, n) => `${company} 담당 업무 ${n}개 더 보기`,
    showLessTasks: "간략히 보기",
    showLessTasksFor: (company) => `${company} 담당 업무 간략히 보기`,
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
    skillTiers: { core: "주력", working: "실무 활용", familiar: "사용 경험" },
    copy: "복사",
    themeLabel: "밝은 화면과 어두운 화면 전환",
    copied: "복사됨",
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
    totalCompanies: (n) => `${n} ${n === 1 ? "company" : "companies"}`,
    responsibilities: "Responsibilities",
    ongoing: (start) => `${start} – Present`,
    showMoreTasks: (n) => `Show ${n} more`,
    showMoreTasksFor: (company, n) =>
      `Show ${n} more ${n === 1 ? "responsibility" : "responsibilities"} at ${company}`,
    showLessTasks: "Show less",
    showLessTasksFor: (company) => `Show fewer responsibilities at ${company}`,
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
    skillTiers: { core: "Core", working: "Working", familiar: "Familiar" },
    copy: "Copy",
    themeLabel: "Switch between light and dark",
    copied: "Copied",
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
