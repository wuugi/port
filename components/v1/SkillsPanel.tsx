"use client";

import { useEffect, useRef, useState } from "react";
import { skillsData } from "@/lib/static-data";
import type { SkillItem } from "@/lib/types";

const categoryConfig: Record<
  string,
  { label: string; barClass: string; bg: string; border: string; dot: string }
> = {
  data: {
    label: "데이터 & 분석",
    barClass: "bg-[var(--accent)]",
    bg: "bg-[var(--accent-subtle)]",
    border: "border-[var(--accent)]/20",
    dot: "bg-[var(--accent)]",
  },
  tool: {
    label: "협업 도구",
    barClass: "bg-[var(--accent2)]",
    bg: "bg-[var(--accent2-subtle)]",
    border: "border-[var(--accent2)]/20",
    dot: "bg-[var(--accent2)]",
  },
  process: {
    label: "운영 프로세스",
    barClass: "bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]",
    bg: "bg-[var(--accent-subtle)]",
    border: "border-[var(--accent)]/20",
    dot: "bg-[var(--accent)]",
  },
};

function SkillBar({ skill, animate }: { skill: SkillItem; animate: boolean }) {
  const config = categoryConfig[skill.category];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[var(--text)] text-sm font-medium">{skill.name}</span>
        <span className="text-[var(--text-muted)] text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 bg-[var(--bg)] rounded-full overflow-hidden">
        <div
          className={`h-full ${config.barClass} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: animate ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function SkillsPanel() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["data", "tool", "process"] as const;

  return (
    <div ref={ref} className="panel-enter space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text)]">기술 스택 & 역량</h2>
        <span className="text-[var(--text-muted)] text-sm">총 {skillsData.length}개 스킬</span>
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
              <h3 className="text-[var(--text)] font-semibold mb-5">{config.label}</h3>
              <div className="space-y-4">
                {items.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} animate={animate} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Skills Summary */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
        <h3 className="text-[var(--text)] font-semibold mb-4">핵심 역량 Top 5</h3>
        <div className="flex flex-wrap gap-2">
          {[...skillsData]
            .sort((a, b) => b.level - a.level)
            .slice(0, 5)
            .map((skill) => {
              const config = categoryConfig[skill.category];
              return (
                <div
                  key={skill.name}
                  className={`flex items-center gap-2 px-3 py-2 ${config.bg} border ${config.border} rounded-xl`}
                >
                  <span className={`w-2 h-2 ${config.dot} rounded-full`} />
                  <span className="text-[var(--text)] text-sm font-medium">{skill.name}</span>
                  <span className="text-[var(--text-muted)] text-xs">{skill.level}%</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
