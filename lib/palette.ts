import type { CompanyKey, SkillItem } from "./types";

/**
 * Colour carries exactly two meanings on this site:
 *   clay  — action, link, active state
 *   green — outcome
 *
 * Companies and skill categories are named in text, so tinting them added a
 * third and fourth vocabulary that competed with those two without encoding
 * anything the label did not already say. They are neutral on purpose.
 *
 * Class strings are written out in full: Tailwind's scanner only finds literals.
 */
interface Swatch {
  text: string;
  dot: string;
  tag: string;
  panel: string;
  solid?: string;
}

const neutral: Swatch = {
  text: "text-[var(--text)]",
  dot: "bg-[var(--text-muted)]",
  tag: "bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)]",
  panel: "bg-[var(--bg-card)] border-[var(--border)]",
  // The active filter is an interaction, so it earns the accent.
  solid: "bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)]",
};

export const companyColors: Record<CompanyKey, Swatch> = {
  midas: neutral,
  jarvis: neutral,
  flex: neutral,
};

export const skillColors: Record<SkillItem["category"], Swatch> = {
  data: neutral,
  tool: neutral,
  process: neutral,
};
