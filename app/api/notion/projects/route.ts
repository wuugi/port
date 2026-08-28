import { NextRequest, NextResponse } from "next/server";
import type { CompanyKey, Project } from "@/lib/types";
import { getStaticProjects, notionDatabaseIds } from "@/lib/static-data";
import { fetchProjects, isUsable, normalizeNotionId } from "@/lib/notion";

export const dynamic = "force-dynamic";

const COMPANIES: CompanyKey[] = ["flex", "jarvis", "midas"];

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

/**
 * Notion wins field by field, but only where it actually has content. A property
 * the database does not define comes back empty, and an empty Notion value must
 * never erase a good static one — that is how a schema rename silently blanks a
 * live page. English is merged the same way, so a Notion DB without EN columns
 * leaves the existing translations intact rather than dropping the site to
 * Korean-only.
 */
function merge(base: Project, remote: Project): Project {
  const prefer = <T,>(a: T | undefined, b: T | undefined): T | undefined =>
    a === undefined || a === null || (typeof a === "string" && !a.trim()) ||
    (Array.isArray(a) && a.length === 0)
      ? b
      : a;

  return {
    ...base,
    title: prefer(remote.title, base.title)!,
    period: prefer(remote.period, base.period)!,
    summary: prefer(remote.summary, base.summary)!,
    role: prefer(remote.role, base.role)!,
    result: prefer(remote.result, base.result)!,
    tags: prefer(remote.tags, base.tags)!,
    background: prefer(remote.background, base.background),
    problem: prefer(remote.problem, base.problem),
    process: prefer(remote.process, base.process),
    fullResult: prefer(remote.fullResult, base.fullResult),
    en: remote.en ? { ...base.en, ...remote.en } : base.en,
  };
}

async function loadNotionText(companies: CompanyKey[]): Promise<Map<string, Project>> {
  const byPageId = new Map<string, Project>();

  const results = await Promise.allSettled(
    companies.map((c) => fetchProjects(notionDatabaseIds[c], c))
  );

  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    for (const p of r.value) {
      if (!isUsable(p)) continue;
      const key = normalizeNotionId(p.id);
      if (key) byPageId.set(key, p);
    }
  }
  return byPageId;
}

export async function GET(request: NextRequest) {
  const company = request.nextUrl.searchParams.get("company") as CompanyKey | null;

  if (company && !COMPANIES.includes(company)) {
    return NextResponse.json({ error: "Invalid company parameter" }, { status: 400 });
  }

  const staticProjects = getStaticProjects(company || undefined);
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    return NextResponse.json({ projects: staticProjects, source: "static" });
  }

  try {
    const remote = await loadNotionText(company ? [company] : COMPANIES);

    const matched = new Set<string>();
    let merged: Project[] = staticProjects.map((p) => {
      const key = normalizeNotionId(p.notionUrl);
      const hit = key ? remote.get(key) : undefined;
      if (!hit) return p;
      matched.add(key!);
      return merge(p, hit);
    });

    // A project added in Notion and not yet in static-data still appears; that is
    // the point of syncing. It carries no EN record until Notion has EN columns.
    remote.forEach((p, key) => {
      if (!matched.has(key)) merged.push(p);
    });

    const enriched = await Promise.all(
      merged.map(async (project) => {
        const pageId = normalizeNotionId(project.notionUrl);
        if (!pageId) return project;
        const images = await fetchPageImages(pageId, token);
        return images.length > 0 ? { ...project, images } : project;
      })
    );

    return NextResponse.json({
      projects: enriched,
      source: "notion",
      synced: { text: remote.size, total: enriched.length },
    });
  } catch {
    // Notion down, rate-limited, or schema unrecognisable: the site still renders.
    return NextResponse.json({ projects: staticProjects, source: "static-fallback" });
  }
}
