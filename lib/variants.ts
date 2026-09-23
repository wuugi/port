import type { PersonInfo, Project } from "./types";
import { personInfo } from "./static-data";
import { projects } from "./projects";

/**
 * Role-targeted versions of the same site. Career, figures and every other
 * project field stay shared with the default page; a variant only swaps the
 * title and intro, the project order, and a few project fields.
 */
export type Variant = "default" | "axm";

type ProjectPatch = Partial<Pick<Project, "role" | "process">> & {
  en?: Partial<Pick<NonNullable<Project["en"]>, "role" | "process">>;
};

interface VariantConfig {
  title?: { ko: string; en: string };
  intro?: { ko: string; en: string };
  /** Ids listed here render first, in this order; the rest keep file order. */
  projectOrder?: string[];
  projectPatches?: Record<string, ProjectPatch>;
}

const byId = (id: string) => projects.find((p) => p.id === id)!;
const survey = byId("proj-flex-3");
const pricing = byId("proj-flex-1");

const configs: Record<Variant, VariantConfig> = {
  default: {},
  axm: {
    title: {
      ko: "AI·자동화 시스템을 설계하고 운영하는 Operation Manager",
      en: "Operations Manager Building and Running AI & Automation Systems",
    },
    intro: {
      ko:
        "AI와 자동화로 운영 문제를 푸는 시스템을 설계하고, 직접 구현해 현장에서 운영까지 맡아온 Operation Manager입니다. 사람이 반복하던 검수·발송·분기 업무를 에이전트와 자동화 도구로 옮기고, 그 결과가 실제로 맞는지 데이터로 검증해 왔습니다.\n\n" +
        "도구를 만드는 데서 끝내지 않고, 쓰는 부서의 요구사항을 모아 범위를 정리하고 영업·개발·회계·법무 등 유관 부서와 일정과 엣지 케이스를 조율하며 운영에 안착시키는 것까지를 제 일로 봅니다.\n\n" +
        "그렇게 확보한 시간을 다시 고객과 팀의 더 중요한 문제에 쓰는 구조를 만드는 것이 목표입니다.",
      en:
        "An Operations Manager who designs AI and automation systems for operational problems, builds them, and runs them in production. I move repetitive review, sending and routing work from people to agents and automation tools, then check with data that the results actually hold.\n\n" +
        "Shipping the tool is not the end of it. I gather requirements from the teams who use it, settle the scope, and coordinate schedules and edge cases with sales, engineering, finance, legal and operations until it is part of how the work runs.\n\n" +
        "The aim is a setup where the hours saved go back into the problems that matter more — for customers and for the team.",
    },
    projectOrder: ["proj-flex-4", "proj-flex-3", "proj-flex-1", "proj-flex-2"],
    projectPatches: {
      "proj-flex-3": {
        process: insertAfter(
          survey.process!,
          2,
          "부서별 프로토타입 → 요구사항 수렴 → 범위 정리 — 사용 부서별로 프로토타입을 먼저 보여주고 요구사항을 모은 뒤, 공통 기능과 부서별 요청을 나눠 구현 범위를 정리"
        ),
        en: {
          process: insertAfter(
            survey.en!.process!,
            2,
            "Prototype per team → gather requirements → settle scope — Showing each using team a prototype first, collecting their requirements, then separating shared features from team-specific requests to fix the build scope"
          ),
        },
      },
      "proj-flex-1": {
        role: "전환 PM — 영업·개발·회계·법무·운영 협업, 일정·엣지 케이스 관리, 고객 안내 프로세스 기획·운영",
        process: [
          "유관 부서 협업·일정 관리 — 영업·개발·회계·법무·운영 부서와 협업하며 전환 일정을 수립하고, 부서별 이슈와 엣지 케이스를 PM으로서 취합·조율",
          ...pricing.process!,
        ],
        en: {
          role: "Migration PM — coordinating sales, engineering, finance, legal and operations; owning schedule and edge cases; customer communication process",
          process: [
            "Cross-team coordination and scheduling — Working with sales, engineering, finance, legal and operations to set the migration schedule, and collecting and resolving each team's issues and edge cases as PM",
            ...pricing.en!.process!,
          ],
        },
      },
    },
  },
};

function insertAfter(list: string[], index: number, item: string): string[] {
  return [...list.slice(0, index + 1), item, ...list.slice(index + 1)];
}

export function variantPerson(variant: Variant): PersonInfo {
  const { title, intro } = configs[variant];
  const ko = { ...(title && { title: title.ko }), ...(intro && { intro: intro.ko }) };
  const en = { ...(title && { title: title.en }), ...(intro && { intro: intro.en }) };
  return { ...personInfo, ...ko, en: personInfo.en && { ...personInfo.en, ...en } };
}

export function variantProjects(variant: Variant): Project[] {
  const { projectOrder = [], projectPatches = {} } = configs[variant];
  const rank = (id: string) => {
    const i = projectOrder.indexOf(id);
    return i === -1 ? projectOrder.length : i;
  };
  // Array.prototype.sort is stable, so unlisted projects keep file order.
  return [...projects]
    .sort((a, b) => rank(a.id) - rank(b.id))
    .map((p) => {
      const patch = projectPatches[p.id];
      if (!patch) return p;
      const { en, ...ko } = patch;
      return { ...p, ...ko, en: p.en && { ...p.en, ...en } };
    });
}

