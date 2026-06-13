import { NextRequest, NextResponse } from "next/server";
import type { CompanyKey } from "@/lib/types";
import { notionDatabaseIds, getStaticProjects } from "@/lib/static-data";
import { fetchProjects } from "@/lib/notion";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const company = searchParams.get("company") as CompanyKey | null;

  const validCompanies: CompanyKey[] = ["flex", "jarvis", "midas"];
  if (company && !validCompanies.includes(company)) {
    return NextResponse.json({ error: "Invalid company parameter" }, { status: 400 });
  }

  if (!process.env.NOTION_TOKEN) {
    return NextResponse.json(
      { error: "Notion token not configured", fallback: true },
      { status: 503 }
    );
  }

  try {
    const companiesToFetch: CompanyKey[] = company ? [company] : validCompanies;
    const allProjects = await Promise.all(
      companiesToFetch.map((c) => fetchProjects(notionDatabaseIds[c], c))
    );
    const projects = allProjects.flat();
    return NextResponse.json({ projects, source: "notion" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const fallbackProjects = getStaticProjects(company || undefined);
    return NextResponse.json(
      { projects: fallbackProjects, source: "static", error: message },
      { status: 200 }
    );
  }
}
