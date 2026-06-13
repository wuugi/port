export type CompanyKey = "flex" | "jarvis" | "midas";
export type Lang = "ko" | "en";

export interface ProjectTranslation {
  title: string;
  summary: string;
  role: string;
  result: string;
  tags?: string[];
  background?: string;
  problem?: string;
  process?: string[];
  fullResult?: string;
}

export interface CareerTranslation {
  tasks: string[];
}

export interface PersonTranslation {
  title: string;
  intro: string;
  education: string;
  certifications?: string[];
  languages?: string[];
}

export interface CareerItem {
  company: string;
  companyKey: CompanyKey;
  period: string;
  color: "green" | "amber" | "purple";
  tasks: string[];
  en?: CareerTranslation;
}

export interface Project {
  id: string;
  title: string;
  company: CompanyKey;
  period: string;
  summary: string;
  role: string;
  result: string;
  tags: string[];
  background?: string;
  problem?: string;
  process?: string[];
  fullResult?: string;
  images?: string[];
  notionUrl?: string;
  en?: ProjectTranslation;
}

export interface SkillItem {
  name: string;
  nameEn?: string;
  level: number;
  category: "data" | "tool" | "process";
}

export interface PersonInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  intro: string;
  education: string;
  educationPeriod: string;
  certifications: string[];
  languages: string[];
  profileImage?: string;
  en?: PersonTranslation;
}

export type ActivePanel = "about" | "career" | "projects" | "skills" | "contact";
