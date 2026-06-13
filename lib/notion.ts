import { Client } from "@notionhq/client";
import type { Project, CompanyKey } from "./types";

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

function extractSelect(select: any): string {
  if (!select) return "";
  return select.name || "";
}

function mapNotionPageToProject(page: any, company: CompanyKey): Project {
  const props = page.properties;

  const title = extractTitle(props["title"]?.title || props["Name"]?.title || []);
  const period = extractRichText(props["Period"]?.rich_text || props["기간"]?.rich_text || []);
  const summary = extractRichText(props["Summary"]?.rich_text || props["요약"]?.rich_text || []);
  const role = extractRichText(props["Role"]?.rich_text || props["역할"]?.rich_text || []);
  const result = extractRichText(props["Result"]?.rich_text || props["결과"]?.rich_text || []);
  const tags = extractMultiSelect(props["Tags"]?.multi_select || props["태그"]?.multi_select || []);
  const background = extractRichText(props["Background"]?.rich_text || props["배경"]?.rich_text || []);
  const problem = extractRichText(props["Problem"]?.rich_text || props["문제"]?.rich_text || []);
  const fullResult = extractRichText(props["FullResult"]?.rich_text || props["전체결과"]?.rich_text || []);

  const processText = extractRichText(props["Process"]?.rich_text || props["프로세스"]?.rich_text || []);
  const process = processText
    ? processText.split("\n").filter((line: string) => line.trim().length > 0)
    : [];

  return {
    id: page.id,
    title,
    company,
    period,
    summary,
    role,
    result,
    tags,
    background: background || undefined,
    problem: problem || undefined,
    process: process.length > 0 ? process : undefined,
    fullResult: fullResult || undefined,
  };
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
