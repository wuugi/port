import { NextResponse } from "next/server";
import { notionDatabaseIds } from "@/lib/static-data";
import type { CompanyKey } from "@/lib/types";

export const dynamic = "force-dynamic";

/**
 * Property names this codebase will read, in priority order. Keep in sync with
 * lib/notion.ts — this endpoint exists to tell you whether the live Notion
 * database actually uses any of them.
 */
const EXPECTED: Record<string, string[]> = {
  title: ["title", "Name", "이름"],
  period: ["Period", "기간"],
  summary: ["Summary", "요약"],
  role: ["Role", "역할"],
  result: ["Result", "결과"],
  tags: ["Tags", "태그"],
  background: ["Background", "배경"],
  problem: ["Problem", "문제"],
  process: ["Process", "프로세스"],
  fullResult: ["FullResult", "전체결과"],
};

const EXPECTED_EN: Record<string, string[]> = {
  "en.title": ["Title EN", "Title_EN", "TitleEN", "제목 영문"],
  "en.summary": ["Summary EN", "Summary_EN", "요약 영문"],
  "en.role": ["Role EN", "Role_EN", "역할 영문"],
  "en.result": ["Result EN", "Result_EN", "결과 영문"],
  "en.background": ["Background EN", "Background_EN", "배경 영문"],
  "en.problem": ["Problem EN", "Problem_EN", "문제 영문"],
  "en.process": ["Process EN", "Process_EN", "프로세스 영문"],
  "en.fullResult": ["FullResult EN", "FullResult_EN", "전체결과 영문"],
};

function diagnose(actual: string[], expected: Record<string, string[]>) {
  const matched: Record<string, string> = {};
  const missing: string[] = [];
  for (const [field, candidates] of Object.entries(expected)) {
    const hit = candidates.find((c) => actual.includes(c));
    if (hit) matched[field] = hit;
    else missing.push(`${field}  (accepts: ${candidates.join(" | ")})`);
  }
  return { matched, missing };
}

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "NOTION_TOKEN is not set in this environment." },
      { status: 200 }
    );
  }

  const companies = Object.keys(notionDatabaseIds) as CompanyKey[];

  const databases = await Promise.all(
    companies.map(async (company) => {
      const id = notionDatabaseIds[company];
      try {
        const res = await fetch(`https://api.notion.com/v1/databases/${id}`, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
            "Notion-Version": "2022-06-28",
          },
        });
        const body = await res.json();

        if (!res.ok) {
          return {
            company,
            databaseId: id,
            ok: false,
            status: res.status,
            // Notion's own message, e.g. "Could not find database" when the
            // integration has not been invited to the page.
            notionMessage: body?.message ?? null,
          };
        }

        const props = body.properties ?? {};
        const actual = Object.keys(props);

        return {
          company,
          databaseId: id,
          ok: true,
          databaseTitle: body.title?.map((t: any) => t.plain_text).join("") || null,
          actualProperties: actual.map((name) => ({ name, type: props[name]?.type })),
          korean: diagnose(actual, EXPECTED),
          english: diagnose(actual, EXPECTED_EN),
        };
      } catch (err) {
        return { company, databaseId: id, ok: false, error: String(err) };
      }
    })
  );

  return NextResponse.json({
    ok: true,
    hint:
      "`korean.matched` drives text sync. Anything under `korean.missing` keeps its " +
      "value from lib/static-data.ts. `english.missing` means that field will not " +
      "sync to EN — add those columns in Notion to enable it.",
    databases,
  });
}
