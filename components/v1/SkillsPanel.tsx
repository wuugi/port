"use client";

import { useEffect, useRef, useState } from "react";
import { skillsData } from "@/lib/static-data";
import type { SkillItem } from "@/lib/types";

const categoryConfig: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  data: {
    label: "데이터 & 분석",
    color: "bg-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  tool: {
    label: "협업 도구",
    color: "bg-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  process: {
    label: "운영 프로세스",
    color: "bg-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
};

function SkillBar({ skill, animate }: { skill: SkillItem; animate: boolean }) {
  const config = categoryConfig[skill.category];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-slate-200 text-sm font-medium">{skill.name}</span>
        <span className="text-slate-400 text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 bg-navy-900/70 rounded-full overflow-hidden">
        <div
          className={`h-full ${config.color} rounded-full transition-all duration-1000 ease-out`}
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
        <h2 className="text-xl font-bold text-white">기술 스택 & 역량</h2>
        <span className="text-slate-400 text-sm">총 {skillsData.length}개 스킬</span>
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
              <h3 className="text-white font-semibold mb-5">{config.label}</h3>
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
      <div className="bg-navy-800 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">핵심 역량 Top 5</h3>
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
                  <span className={`w-2 h-2 ${config.color} rounded-full`} />
                  <span className="text-white text-sm font-medium">{skill.name}</span>
                  <span className="text-slate-400 text-xs">{skill.level}%</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
