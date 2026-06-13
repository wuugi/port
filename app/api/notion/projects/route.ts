import { NextRequest, NextResponse } from "next/server";
import type { CompanyKey } from "@/lib/types";
import { notionDatabaseIds, getStaticProjects } from "@/lib/static-data";
import { fetchProjects } from "@/lib/notion";

async function fetchPageImages(pageId: string, token: string): Promise<string[]> {
  try {
    const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=20`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
      },
    });
    if (!response.ok) return [];
    const data = await response.json();
    const images: string[] = [];
    for (const block of data.results ?? []) {
      if (block.type === "image") {
        const url = block.image?.file?.url || block.image?.external?.url;
        if (url) images.push(url);
        if (images.length >= 3) break;
      }
    }
    return images;
  } catch {
    return [];
  }
}

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

  const token = process.env.NOTION_TOKEN;

  try {
    const companiesToFetch: CompanyKey[] = company ? [company] : validCompanies;
    const allProjects = await Promise.all(
      companiesToFetch.map((c) => fetchProjects(notionDatabaseIds[c], c))
    );
    const projects = allProjects.flat();

    // Enrich each project with up to 3 image blocks from the Notion page
    const enriched = await Promise.all(
      projects.map(async (project) => {
        if (!project.images || project.images.length === 0) {
          const images = await fetchPageImages(project.id, token);
          return { ...project, images };
        }
        return project;
      })
    );

    return NextResponse.json({ projects: enriched, source: "notion" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const fallbackProjects = getStaticProjects(company || undefined);
    return NextResponse.json(
      { projects: fallbackProjects, source: "static", error: message },
      { status: 200 }
    );
  }
}
