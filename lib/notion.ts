import { Client } from "@notionhq/client";
import type { Project, CompanyKey, ProjectTranslation } from "./types";

function getNotionClient(): Client | null {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;
  return new Client({ auth: token });
}

function extractRichText(richTextArray: any[]): string {
  if (!richTextArray || richTextArray.length === 0) return "";
  return richTextArray.map((rt: any) => rt.plain_text).join("");
}

function extractTitle(titleArray: any[]): string {
  if (!titleArray || titleArray.length === 0) return "";
  return titleArray.map((t: any) => t.plain_text).join("");
}

function extractMultiSelect(multiSelectArray: any[]): string[] {
  if (!multiSelectArray || multiSelectArray.length === 0) return [];
  return multiSelectArray.map((ms: any) => ms.name);
}

/**
 * Notion property names are authored by hand and drift (English, Korean, with or
 * without separators). Try every spelling we accept rather than assuming one.
 */
function pick(props: any, ...names: string[]): any {
  for (const n of names) if (props?.[n]) return props[n];
  return undefined;
}

const text = (p: any) => extractRichText(p?.rich_text ?? []);
const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

/** English is optional in Notion; absent EN properties leave `en` undefined so
 *  the i18n layer keeps whatever the static record already had. */
function mapTranslation(props: any): ProjectTranslation | undefined {
  const title = text(pick(props, "Title EN", "Title_EN", "TitleEN", "제목 영문"));
  const summary = text(pick(props, "Summary EN", "Summary_EN", "요약 영문"));
  const role = text(pick(props, "Role EN", "Role_EN", "역할 영문"));
  const result = text(pick(props, "Result EN", "Result_EN", "결과 영문"));
  const background = text(pick(props, "Background EN", "Background_EN", "배경 영문"));
  const problem = text(pick(props, "Problem EN", "Problem_EN", "문제 영문"));
  const processText = text(pick(props, "Process EN", "Process_EN", "프로세스 영문"));
  const fullResult = text(pick(props, "FullResult EN", "FullResult_EN", "전체결과 영문"));
  const tags = extractMultiSelect(pick(props, "Tags EN", "Tags_EN")?.multi_select ?? []);

  if (!title && !summary && !role && !result) return undefined;

  return {
    title,
    summary,
    role,
    result,
    tags: tags.length ? tags : undefined,
    background: background || undefined,
    problem: problem || undefined,
    process: processText ? lines(processText) : undefined,
    fullResult: fullResult || undefined,
  };
}

function mapNotionPageToProject(page: any, company: CompanyKey): Project {
  const props = page.properties;

  const processText = text(pick(props, "Process", "프로세스"));

  return {
    id: page.id,
    company,
    title: extractTitle((pick(props, "title", "Name", "이름")?.title) ?? []),
    period: text(pick(props, "Period", "기간")),
    summary: text(pick(props, "Summary", "요약")),
    role: text(pick(props, "Role", "역할")),
    result: text(pick(props, "Result", "결과")),
    tags: extractMultiSelect(pick(props, "Tags", "태그")?.multi_select ?? []),
    background: text(pick(props, "Background", "배경")) || undefined,
    problem: text(pick(props, "Problem", "문제")) || undefined,
    process: processText ? lines(processText) : undefined,
    fullResult: text(pick(props, "FullResult", "전체결과")) || undefined,
    // Carried through so the image-enrichment step can still resolve the page.
    notionUrl: page.url || undefined,
    en: mapTranslation(props),
  };
}

/** A page whose title and summary are both empty means the schema did not match;
 *  treating it as real content would blank the site. */
export function isUsable(project: Project): boolean {
  return Boolean(project.title?.trim() && project.summary?.trim());
}

/** Notion ids are dashed UUIDs; static `notionUrl` carries the bare 32 hex. */
export function normalizeNotionId(value: string | undefined): string | null {
  if (!value) return null;
  const m = value.replace(/-/g, "").match(/([a-f0-9]{32})/i);
  return m ? m[1].toLowerCase() : null;
}

export async function fetchProjects(companyDbId: string, company: CompanyKey): Promise<Project[]> {
  const notion = getNotionClient();
  if (!notion) {
    throw new Error("NOTION_TOKEN not configured");
  }

  const response = await notion.databases.query({
    database_id: companyDbId,
    sorts: [{ timestamp: "created_time", direction: "descending" }],
  });

  return response.results.map((page: any) => mapNotionPageToProject(page, company));
}
