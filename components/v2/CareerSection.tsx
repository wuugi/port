"use client";

import { useState } from "react";
import { careerData } from "@/lib/static-data";
import type { CareerItem } from "@/lib/types";
import { SectionHeader } from "./AboutSection";

const colorMap: Record<string, { dot: string; line: string; badge: string; text: string; expand: string }> = {
  green: {
    dot: "bg-emerald-500",
    line: "border-emerald-200",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    text: "text-emerald-700",
    expand: "text-emerald-600 hover:text-emerald-800",
  },
  amber: {
    dot: "bg-amber-500",
    line: "border-amber-200",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    text: "text-amber-700",
    expand: "text-amber-600 hover:text-amber-800",
  },
  purple: {
    dot: "bg-purple-500",
    line: "border-purple-200",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    text: "text-purple-700",
    expand: "text-purple-600 hover:text-purple-800",
  },
};

function TimelineItem({ item, isLast }: { item: CareerItem; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const colors = colorMap[item.color];

  return (
    <div className="relative flex gap-6">
      {/* Line */}
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200" />
      )}

      {/* Dot */}
      <div className={`relative w-8 h-8 ${colors.dot} rounded-full flex-shrink-0 flex items-center justify-center shadow-md mt-1`}>
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className={`text-lg font-bold ${colors.text}`}>{item.company}</h3>
              <p className="text-gray-500 text-sm mt-0.5">{item.period}</p>
            </div>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors.badge}`}>
              {item.color === "purple" ? "재직중" : "전직"}
            </span>
          </div>

          <div className="space-y-1.5">
            {(expanded ? item.tasks : item.tasks.slice(0, 3)).map((task, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className={`w-1.5 h-1.5 ${colors.dot} rounded-full mt-2 flex-shrink-0`} />
                <p className="text-gray-600 text-sm leading-relaxed">{task}</p>
              </div>
            ))}
          </div>

          {item.tasks.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={`mt-3 text-xs font-medium ${colors.expand} flex items-center gap-1 transition-colors`}
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
      </div>
    </div>
  );
}

export default function CareerSection() {
  return (
    <section id="career" className="py-24 bg-gray-50 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Career" subtitle="경력 사항" />

        <div className="mt-12">
          {[...careerData].reverse().map((item, i) => (
            <TimelineItem
              key={item.companyKey}
              item={item}
              isLast={i === careerData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
