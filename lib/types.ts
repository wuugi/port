export type CompanyKey = "flex" | "jarvis" | "midas";

export interface CareerItem {
  company: string;
  companyKey: CompanyKey;
  period: string;
  color: "green" | "amber" | "purple";
  tasks: string[];
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
}

export interface SkillItem {
  name: string;
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
}

export type ActivePanel = "about" | "career" | "projects" | "skills" | "contact";
