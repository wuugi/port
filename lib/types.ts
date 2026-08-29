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
  tasks: string[];
  en?: CareerTranslation;
}

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
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
  /** Pulled from Notion by the sync script. Dimensions are measured at download
   *  time so the page reserves the real box and never crops the shot. */
  images?: ProjectImage[];
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
  nameEn?: string;
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
