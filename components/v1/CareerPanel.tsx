"use client";

import { useState } from "react";
import { careerData } from "@/lib/static-data";
import type { CareerItem } from "@/lib/types";

const colorMap: Record<
  string,
  { bg: string; border: string; text: string; badge: string; dot: string }
> = {
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300",
    dot: "bg-emerald-500",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-300",
    dot: "bg-amber-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-300",
    dot: "bg-purple-500",
  },
};

function CareerCard({ item }: { item: CareerItem }) {
  const [expanded, setExpanded] = useState(false);
  const colors = colorMap[item.color];

  return (
    <div
      className={`bg-navy-800 border ${colors.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-lg font-bold ${colors.text}`}>{item.company}</h3>
          <p className="text-slate-400 text-sm mt-1">{item.period}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${colors.badge}`}>
          {item.color === "purple" ? "재직중" : "전직"}
        </span>
      </div>

      <div className="space-y-1.5">
        {(expanded ? item.tasks : item.tasks.slice(0, 3)).map((task, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`w-1.5 h-1.5 ${colors.dot} rounded-full mt-2 flex-shrink-0`} />
            <p className="text-slate-300 text-sm leading-relaxed">{task}</p>
          </div>
        ))}
      </div>

      {item.tasks.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`mt-4 text-xs font-medium ${colors.text} hover:opacity-80 transition-opacity flex items-center gap-1`}
        >
          {expanded ? "접기" : `+${item.tasks.length - 3}개 더보기`}
          <svg
            className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function CareerPanel() {
  return (
    <div className="panel-enter space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">경력 사항</h2>
        <span className="text-slate-400 text-sm">총 {careerData.length}개 회사</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careerData.map((item) => (
          <CareerCard key={item.companyKey} item={item} />
        ))}
      </div>

      {/* Timeline summary */}
      <div className="bg-navy-800 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">경력 타임라인</h3>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-700" />
          <div className="space-y-4">
            {[...careerData].reverse().map((item) => {
              const colors = colorMap[item.color];
              return (
                <div key={item.companyKey} className="flex items-center gap-4 pl-8 relative">
                  <span
                    className={`absolute left-1.5 w-3 h-3 ${colors.dot} rounded-full ring-2 ring-navy-800`}
                  />
                  <div>
                    <p className={`font-medium ${colors.text}`}>{item.company}</p>
                    <p className="text-slate-400 text-sm">{item.period}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
