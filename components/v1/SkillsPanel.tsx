"use client";

import { useEffect, useRef, useState } from "react";
import { skillsData } from "@/lib/static-data";
import type { SkillItem } from "@/lib/types";
import { useLang } from "@/lib/lang-context";
import { ui } from "@/lib/i18n";

function SkillBar({ skill, animate, lang }: { skill: SkillItem; animate: boolean; lang: string }) {
  const categoryConfig = {
    data: { barClass: "bg-[var(--accent)]" },
    tool: { barClass: "bg-[var(--accent2)]" },
    process: { barClass: "bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" },
  };
  const config = categoryConfig[skill.category];
  const displayName = lang === "en" && skill.nameEn ? skill.nameEn : skill.name;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[var(--text)] text-sm font-medium">{displayName}</span>
        <span className="text-[var(--text-muted)] text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 bg-[var(--skill-track)] rounded-full overflow-hidden">
        <div
          className={`h-full ${config.barClass} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: animate ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function SkillsPanel() {
  const { lang } = useLang();
  const t = ui[lang];
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["data", "tool", "process"] as const;

  const categoryConfig: Record<
    string,
    { bg: string; border: string; dot: string }
  > = {
    data: {
      bg: "bg-[var(--accent-subtle)]",
      border: "border-[var(--accent)]/20",
      dot: "bg-[var(--accent)]",
    },
    tool: {
      bg: "bg-[var(--accent2-subtle)]",
      border: "border-[var(--accent2)]/20",
      dot: "bg-[var(--accent2)]",
    },
    process: {
      bg: "bg-[var(--accent-subtle)]",
      border: "border-[var(--accent)]/20",
      dot: "bg-[var(--accent)]",
    },
  };

  return (
    <div ref={ref} className="panel-enter space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text)]">{t.skillsHeading}</h2>
        <span className="text-[var(--text-muted)] text-sm">{t.totalSkills(skillsData.length)}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const config = categoryConfig[category];
          const items = skillsData.filter((s) => s.category === category);
          return (
            <div
              key={category}
              className={`${config.bg} border ${config.border} rounded-2xl p-6`}
            >
              <h3 className="text-[var(--text)] font-semibold mb-5">{t.categoryLabels[category]}</h3>
              <div className="space-y-4">
                {items.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} animate={animate} lang={lang} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Skills Summary */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
        <h3 className="text-[var(--text)] font-semibold mb-4">{t.topSkills}</h3>
        <div className="flex flex-wrap gap-2">
          {[...skillsData]
            .sort((a, b) => b.level - a.level)
            .slice(0, 5)
            .map((skill) => {
              const config = categoryConfig[skill.category];
              const displayName = lang === "en" && skill.nameEn ? skill.nameEn : skill.name;
              return (
                <div
                  key={skill.name}
                  className={`flex items-center gap-2 px-3 py-2 ${config.bg} border ${config.border} rounded-xl`}
                >
                  <span className={`w-2 h-2 ${config.dot} rounded-full`} />
                  <span className="text-[var(--text)] text-sm font-medium">{displayName}</span>
                  <span className="text-[var(--text-muted)] text-xs">{skill.level}%</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
