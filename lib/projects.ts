import type { Project, ProjectImage } from "./types";
import { projectsData } from "./static-data";
import generated from "./projects.generated.json";

/**
 * The machine syncs what is mechanical; the writing stays authored.
 *
 * Notion holds raw working notes — bulleted memos under a template — while
 * `static-data.ts` holds the edited, bilingual copy the site actually shows.
 * Pulling that text over the authored version would trade prose for notes and
 * silently leave the English behind, so text is not synced at all.
 *
 * Images are the opposite case: Notion serves them from signed URLs that expire
 * within the hour, so there is no way to show them except to download them.
 * `npm run sync:notion` does exactly that and writes the resulting paths here,
 * keyed by Notion page id and matched to a project through its `notionUrl`.
 */
type SyncedProject = { notionPageId?: string | null; images?: ProjectImage[] };

const synced = ((generated.projects ?? []) as unknown) as SyncedProject[];

/** Notion ids are dashed UUIDs; the authored `notionUrl` carries bare 32 hex. */
function bareId(value: string | null | undefined): string | null {
  const m = String(value ?? "").replace(/-/g, "").match(/([a-f0-9]{32})/i);
  return m ? m[1].toLowerCase() : null;
}

function build(): Project[] {
  if (synced.length === 0) return projectsData;

  const imagesByPage = new Map<string, ProjectImage[]>();
  for (const p of synced) {
    const key = bareId(p.notionPageId);
    if (key && p.images?.length) imagesByPage.set(key, p.images);
  }

  return projectsData.map((base) => {
    const key = bareId(base.notionUrl);
    const images = key ? imagesByPage.get(key) : undefined;
    return images ? { ...base, images } : base;
  });
}

export const projects: Project[] = build();

/** ISO timestamp of the last successful sync, or null if Notion was never pulled. */
export const syncedAt: string | null = generated.syncedAt ?? null;
