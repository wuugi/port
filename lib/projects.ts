import type { Project } from "./types";
import { projectsData } from "./static-data";
import generated from "./projects.generated.json";

/**
 * One content source, two files. `static-data.ts` is what a human authored;
 * `projects.generated.json` is what `npm run sync:notion` last pulled from
 * Notion. Notion wins field by field — but only where it actually has content.
 *
 * An empty Notion value never erases a good authored one. That is the failure
 * that matters here: rename a property in Notion and the naive version blanks
 * half the live page. This way a rename costs you a stale field, not a hole,
 * and the sync script prints the property names it saw so the rename is
 * visible where it happened.
 */
type SyncedProject = Partial<Project> & { notionPageId?: string | null };

const synced = ((generated.projects ?? []) as unknown) as SyncedProject[];

/** Notion ids are dashed UUIDs; the authored `notionUrl` carries bare 32 hex. */
function bareId(value: string | null | undefined): string | null {
  const m = String(value ?? "").replace(/-/g, "").match(/([a-f0-9]{32})/i);
  return m ? m[1].toLowerCase() : null;
}

function empty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && !value.trim()) ||
    (Array.isArray(value) && value.length === 0)
  );
}

function merge(base: Project, remote: SyncedProject): Project {
  const out: Project = { ...base };
  for (const [key, value] of Object.entries(remote)) {
    if (key === "en" || key === "notionPageId" || empty(value)) continue;
    (out as unknown as Record<string, unknown>)[key] = value;
  }
  // English merges per field too, so a Notion database without EN columns
  // leaves the existing translation intact instead of dropping to Korean.
  if (remote.en) out.en = { ...base.en, ...remote.en };
  return out;
}

function build(): Project[] {
  if (synced.length === 0) return projectsData;

  const byId = new Map<string, SyncedProject>();
  for (const p of synced) {
    const key = bareId(p.notionPageId);
    if (key) byId.set(key, p);
  }

  const used = new Set<string>();
  const merged = projectsData.map((base) => {
    const key = bareId(base.notionUrl);
    const hit = key ? byId.get(key) : undefined;
    if (!hit) return base;
    used.add(key!);
    return merge(base, hit);
  });

  // A project added in Notion and not yet authored here still appears — that is
  // the point of syncing. It carries no translation until Notion has EN columns.
  byId.forEach((p, key) => {
    if (used.has(key) || !p.title || !p.summary) return;
    merged.push({ ...(p as Project), id: p.notionPageId ?? p.title });
  });

  return merged;
}

export const projects: Project[] = build();

/** ISO timestamp of the last successful sync, or null if Notion was never pulled. */
export const syncedAt: string | null = generated.syncedAt ?? null;
