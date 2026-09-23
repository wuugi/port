import type { PersonInfo, Project } from "./types";
import { personInfo } from "./static-data";
import { projects } from "./projects";

/**
 * Role-targeted versions of the same site. Career, figures and every project
 * field stay shared with the default page; a variant only swaps the title and
 * intro and reorders the projects.
 */
export type Variant = "default" | "axm";

interface VariantConfig {
  title?: { ko: string; en: string };
  intro?: { ko: string; en: string };
  /** Ids listed here render first, in this order; the rest keep file order. */
  projectOrder?: string[];
}

const configs: Record<Variant, VariantConfig> = {
  default: {},
  axm: {
    title: {
      ko: "AI 자동화 시스템을 설계, 운영하는 AX Manager",
      en: "AX Manager Designing and Running AI Automation Systems",
    },
    intro: {
      ko:
        "조직이 갖고 있는 문제점과 니즈를 구조화·분석하고, AI를 활용해 해결할 수 있는 시스템을 설계해 직접 구현하는 AX Manager입니다.\n\n" +
        "사람이 반복하던 데이터 모니터링 업무를 에이전트와 자동화 도구로 옮기고, 그 결과가 실제로 맞는지 데이터로 검증해 왔습니다. 또한 고정된 워크플로우에서 벗어나 스스로 트러블슈팅을 하며 개선할 수 있는 에이전트를 만들어 조직의 문제를 해결했습니다.\n\n" +
        "고객의 니즈와 문제를 명확하게 분석해 AI로 해결할 수 있는 부분과 사람이 집중해서 처리해야 하는 부분을 구조화하고, 원하는 문제 해결과 안정성을 동시에 확보하는 AX를 이끌고 있습니다.",
      en:
        "An AX Manager who structures and analyses the problems and needs an organisation has, then designs and personally builds AI systems that solve them.\n\n" +
        "I have moved repetitive data-monitoring work from people to agents and automation tools, and checked with data that the results actually hold. Beyond fixed workflows, I have built agents that troubleshoot and improve on their own to solve the organisation's problems.\n\n" +
        "I lead AX by analysing customer needs and problems clearly, separating what AI can handle from what people need to focus on, and securing both the outcome and the stability the work requires.",
    },
    projectOrder: ["proj-flex-4", "proj-flex-3", "proj-flex-1", "proj-flex-2"],
  },
};

export function variantPerson(variant: Variant): PersonInfo {
  const { title, intro } = configs[variant];
  const ko = { ...(title && { title: title.ko }), ...(intro && { intro: intro.ko }) };
  const en = { ...(title && { title: title.en }), ...(intro && { intro: intro.en }) };
  return { ...personInfo, ...ko, en: personInfo.en && { ...personInfo.en, ...en } };
}

export function variantProjects(variant: Variant): Project[] {
  const { projectOrder = [] } = configs[variant];
  const rank = (id: string) => {
    const i = projectOrder.indexOf(id);
    return i === -1 ? projectOrder.length : i;
  };
  // Array.prototype.sort is stable, so unlisted projects keep file order.
  return [...projects].sort((a, b) => rank(a.id) - rank(b.id));
}
