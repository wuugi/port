"use client";

import { skillsData } from "@/lib/static-data";
import type { SkillItem } from "@/lib/types";
import { useLang } from "@/lib/lang-context";
import { ui, type UiStrings } from "@/lib/i18n";

const categories = ["data", "tool", "process"] as const;
const tiers = ["core", "working", "familiar"] as const;
type Tier = (typeof tiers)[number];

/**
 * A self-assessed number cannot support a bar to the percent, and a wall of
 * part-filled tracks is the one thing on this page that looked generated. The
 * levels still order and band the list — they just stop claiming precision
 * they never had.
 */
function tierOf(skill: SkillItem): Tier {
  if (skill.level >= 85) return "core";
  if (skill.level >= 70) return "working";
  return "familiar";
}

function SkillGroup({
  tier,
  items,
  lang,
  t,
}: {
  tier: Tier;
  items: SkillItem[];
  lang: string;
  t: UiStrings;
}) {
  if (items.length === 0) return null;

  return (
    <div className="mt-5 first:mt-6">
      <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
        {t.skillTiers[tier]}
      </p>
      {/* Names on one flowing line rather than one row each: a dozen single-item
          rows read as a form, and these are simply a vocabulary. */}
      <p className="mt-1.5 text-sm leading-[1.9] text-[var(--text)]">
        {items.map((skill, i) => (
          <span key={skill.name}>
            {i > 0 && (
              <span aria-hidden="true" className="text-[var(--text-muted)]">
                {"  ·  "}
              </span>
            )}
            {lang === "en" && skill.nameEn ? skill.nameEn : skill.name}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function SkillsPanel() {
  const { lang } = useLang();
  const t = ui[lang];

  // Strongest first, so the best evidence leads each column.
  const columns = categories
    .map((category) => ({
      category,
      items: skillsData
        .filter((s) => s.category === category)
        .sort((a, b) => b.level - a.level),
    }))
    .filter((c) => c.items.length > 0);

  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold text-[var(--text)]">{t.skillsHeading}</h2>
        <span className="text-[var(--text-muted)] text-sm">{t.totalSkills(skillsData.length)}</span>
      </div>

      {/* A category with nothing in it is not a column — the source of truth is
          Notion, and what it holds decides how many columns there are. */}
      <div
        className={`grid grid-cols-1 gap-x-10 gap-y-10 ${
          columns.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
        }`}
      >
        {columns.map(({ category, items }) => {
          return (
            // A column head over a hairline, not a boxed panel: three cards
            // inside the page frame were three more rectangles saying nothing.
            <div key={category}>
              <h3 className="pb-3 border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                {t.categoryLabels[category]}
              </h3>
              {tiers.map((tier) => (
                <SkillGroup
                  key={tier}
                  tier={tier}
                  items={items.filter((s) => tierOf(s) === tier)}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
