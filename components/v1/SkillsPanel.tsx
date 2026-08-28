"use client";

import { useEffect, useState } from "react";
import { skillsData } from "@/lib/static-data";
import type { SkillItem } from "@/lib/types";
import { useLang } from "@/lib/lang-context";
import { ui } from "@/lib/i18n";
import { skillColors } from "@/lib/palette";

function SkillBar({
  skill,
  animate,
  lang,
  index,
}: {
  skill: SkillItem;
  animate: boolean;
  lang: string;
  index: number;
}) {
  const colors = skillColors[skill.category];
  const displayName = lang === "en" && skill.nameEn ? skill.nameEn : skill.name;
  // A column arrives as a list, so the fills stagger — capped so the last bar
  // is never left waiting on the first.
  const delay = Math.min(index * 70, 280);

  return (
    <div>
      <p className="text-[var(--text)] text-sm font-medium">{displayName}</p>
      {/* The bar is the only encoding of level: the numeric label said the same
          thing twice, and a self-rated percentage claims precision it cannot back. */}
      <div
        className="mt-2 h-1.5 bg-[var(--skill-track)] overflow-hidden"
        role="meter"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={displayName}
      >
        {/* scaleX rather than width: the fill is compositor-only and never
            asks the browser to lay the row out again mid-animation. */}
        <div
          className={`skill-fill h-full w-full origin-left ${colors.dot}`}
          style={{
            transform: `scaleX(${animate ? skill.level / 100 : 0})`,
            transition: `transform 600ms var(--ease-out) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsPanel() {
  const { lang } = useLang();
  const t = ui[lang];
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["data", "tool", "process"] as const;

  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold text-[var(--text)]">{t.skillsHeading}</h2>
        <span className="text-[var(--text-muted)] text-sm">{t.totalSkills(skillsData.length)}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const colors = skillColors[category];
          // Strongest first, so the best evidence leads each column.
          const items = skillsData
            .filter((s) => s.category === category)
            .sort((a, b) => b.level - a.level);
          return (
            <div key={category} className={`p-6 ${colors.panel}`}>
              <h3 className={`font-semibold mb-6 flex items-center gap-2 ${colors.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                {t.categoryLabels[category]}
              </h3>
              <div className="space-y-5">
                {items.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    animate={animate}
                    lang={lang}
                    index={i}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
