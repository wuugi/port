import { NextRequest, NextResponse } from "next/server";
import type { CompanyKey } from "@/lib/types";
import { getStaticProjects } from "@/lib/static-data";

export const dynamic = "force-dynamic";

async function fetchPageImages(pageId: string, token: string): Promise<string[]> {
  try {
    const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=20`, {
      cache: "no-store",
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

function extractPageId(notionUrl: string): string | null {
  try {
    const match = notionUrl.match(/\/p\/([a-f0-9]{32})/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const company = searchParams.get("company") as CompanyKey | null;

  const validCompanies: CompanyKey[] = ["flex", "jarvis", "midas"];
  if (company && !validCompanies.includes(company)) {
    return NextResponse.json({ error: "Invalid company parameter" }, { status: 400 });
  }

  // Always use rich static data as the base
  const staticProjects = getStaticProjects(company || undefined);

  if (!process.env.NOTION_TOKEN) {
    return NextResponse.json({ projects: staticProjects, source: "static" });
  }

  const token = process.env.NOTION_TOKEN;

  // Enrich static projects with images fetched from Notion page blocks
  const enriched = await Promise.all(
    staticProjects.map(async (project) => {
      if (!project.notionUrl) return project;
      const pageId = extractPageId(project.notionUrl);
      if (!pageId) return project;
      const images = await fetchPageImages(pageId, token);
      return images.length > 0 ? { ...project, images } : project;
    })
  );

  return NextResponse.json({ projects: enriched, source: "notion" });
}
