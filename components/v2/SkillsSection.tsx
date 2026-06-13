"use client";

import { useEffect, useRef, useState } from "react";
import { skillsData } from "@/lib/static-data";
import { SectionHeader } from "./AboutSection";

const categoryConfig: Record<
  string,
  { label: string; color: string; bg: string; border: string; text: string }
> = {
  data: {
    label: "데이터 & 분석",
    color: "bg-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
  },
  tool: {
    label: "협업 도구",
    color: "bg-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
    text: "text-violet-600",
  },
  process: {
    label: "운영 프로세스",
    color: "bg-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
  },
};

export default function SkillsSection() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimate(true), 200);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = ["data", "tool", "process"] as const;

  return (
    <section ref={sectionRef} id="skills" className="py-24 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Skills" subtitle="기술 스택" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {categories.map((category) => {
            const config = categoryConfig[category];
            const items = skillsData.filter((s) => s.category === category);
            return (
              <div
                key={category}
                className={`${config.bg} border ${config.border} rounded-2xl p-6`}
              >
                <h3 className={`font-bold ${config.text} mb-5`}>{config.label}</h3>
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 text-sm font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-xs">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/70 rounded-full overflow-hidden shadow-inner">
                        <div
                          className={`h-full ${config.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: animate ? `${skill.level}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Skills */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">핵심 역량 Top 5</h3>
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
                    <span className="text-gray-800 text-sm font-medium">{skill.name}</span>
                    <span className="text-gray-400 text-xs">{skill.level}%</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
