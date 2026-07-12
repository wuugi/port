"use client";

import { useState } from "react";
import { careerData } from "@/lib/static-data";
import type { CareerItem } from "@/lib/types";
import { useLang } from "@/lib/lang-context";
import { ui, tCareer } from "@/lib/i18n";

const colorMap: Record<
  string,
  { dot: string; text: string; badge: string }
> = {
  green: {
    dot: "bg-[var(--color-green)]",
    text: "text-[var(--color-green)]",
    badge: "bg-[var(--color-green-subtle)] text-[var(--color-green)] border border-[var(--color-green)]/20",
  },
  amber: {
    dot: "bg-[var(--color-blue)]",
    text: "text-[var(--color-blue)]",
    badge: "bg-[var(--color-blue-subtle)] text-[var(--color-blue)] border border-[var(--color-blue)]/20",
  },
  purple: {
    dot: "bg-[var(--accent)]",
    text: "text-[var(--accent)]",
    badge: "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20",
  },
};

function CareerCard({
  item,
  currentLabel,
  formerLabel,
  expandLabel,
  collapseLabel,
}: {
  item: CareerItem;
  currentLabel: string;
  formerLabel: string;
  expandLabel: (n: number) => string;
  collapseLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const colors = colorMap[item.color];

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 transition-all duration-300 hover:border-[var(--accent)]/40">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-lg font-bold ${colors.text}`}>{item.company}</h3>
          <p className="text-[var(--accent)] text-sm mt-1">{item.period}</p>
        </div>
        <span className={`px-2 py-0.5 text-xs ${colors.badge}`}>
          {item.color === "purple" ? currentLabel : formerLabel}
        </span>
      </div>

      <div className="space-y-1.5">
        {(expanded ? item.tasks : item.tasks.slice(0, 3)).map((task, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`w-1.5 h-1.5 ${colors.dot} rounded-full mt-2 flex-shrink-0`} />
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">{task}</p>
          </div>
        ))}
      </div>

      {item.tasks.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`mt-4 text-xs font-medium ${colors.text} hover:opacity-80 transition-opacity flex items-center gap-1`}
        >
          {expanded ? collapseLabel : expandLabel(item.tasks.length - 3)}
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
  const { lang } = useLang();
  const t = ui[lang];
  const translatedCareer = careerData.map((item) => tCareer(item, lang));

  const expandLabel = (n: number) => lang === "ko" ? `+${n}개 더보기` : `+${n} more`;
  const collapseLabel = lang === "ko" ? "접기" : "Collapse";

  return (
    <div className="panel-enter space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text)]">{t.careerHeading}</h2>
        <span className="text-[var(--text-muted)] text-sm">
          {lang === "ko" ? `총 ${careerData.length}${t.totalCompanies}` : `${careerData.length}${t.totalCompanies}`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {translatedCareer.map((item) => (
          <CareerCard
            key={item.companyKey}
            item={item}
            currentLabel={t.current}
            formerLabel={t.former}
            expandLabel={expandLabel}
            collapseLabel={collapseLabel}
          />
        ))}
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6">
        <h3 className="text-[var(--text)] font-semibold mb-4">{t.careerTimeline}</h3>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[var(--border)]" />
          <div className="space-y-4">
            {[...careerData].reverse().map((item) => {
              const colors = colorMap[item.color];
              return (
                <div key={item.companyKey} className="flex items-center gap-4 pl-8 relative">
                  <span
                    className={`absolute left-1.5 w-3 h-3 ${colors.dot} rounded-full ring-2 ring-[var(--bg-card)]`}
                  />
                  <div>
                    <p className={`font-medium ${colors.text}`}>{item.company}</p>
                    <p className="text-[var(--text-muted)] text-sm">{item.period}</p>
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
