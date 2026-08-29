"use client";

import { useState } from "react";
import { careerData, companyLabelsEn } from "@/lib/static-data";
import type { CareerItem } from "@/lib/types";
import { useLang } from "@/lib/lang-context";
import { ui, tCareer, type UiStrings } from "@/lib/i18n";

/**
 * Company on the left, the work on the right — the same label/value register
 * the About facts use. The panel card is gone: three bordered boxes stacked
 * inside a fourth were four frames drawn around content that needed none.
 */
function CareerEntry({
  item,
  companyName,
  t,
}: {
  item: CareerItem;
  companyName: string;
  t: UiStrings;
}) {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = item.companyKey === "flex";
  const hidden = item.tasks.length - 3;

  return (
    <li className="grid grid-cols-1 sm:grid-cols-[13rem_1fr] gap-1.5 sm:gap-8 py-8 first:pt-0 last:pb-0 border-t border-[var(--rule)] first:border-t-0">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[var(--text)]">{companyName}</h3>
        {/* An open span is written with a dash, the way a résumé writes it.
            A pulsing "재직중" pill said the same thing in a louder register. */}
        <p className="mt-1 text-[var(--text-muted)] text-sm tabular-nums">
          {isCurrent ? t.ongoing(item.period) : item.period}
        </p>
      </div>

      <div className="min-w-0">
        <ul className="space-y-2.5">
          {(expanded ? item.tasks : item.tasks.slice(0, 3)).map((task, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0 bg-[var(--text-muted)]" />
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">{task}</p>
            </li>
          ))}
        </ul>

        {hidden > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            // The visible label is short; the accessible name names the company,
            // so the three buttons stay distinguishable out of context.
            aria-label={
              expanded
                ? t.showLessTasksFor(companyName)
                : t.showMoreTasksFor(companyName, hidden)
            }
            className="mt-4 text-xs font-medium text-[var(--accent)] hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            {expanded ? t.showLessTasks : t.showMoreTasks(hidden)}
            <svg
              className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </li>
  );
}

export default function CareerPanel() {
  const { lang } = useLang();
  const t = ui[lang];
  // Korean keeps the authored name (it carries the 삼쩜삼 brand); English uses
  // the same labels the Projects panel shows, so one company reads one way.
  const companyName = (item: CareerItem) =>
    lang === "en" ? companyLabelsEn[item.companyKey] : item.company;

  // Newest first: the most recent role is the one that matters most.
  const entries = [...careerData].reverse().map((item) => tCareer(item, lang));

  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold text-[var(--text)]">{t.careerHeading}</h2>
        <span className="text-[var(--text-muted)] text-sm">
          {t.totalCompanies(careerData.length)}
        </span>
      </div>

      <ol className="border-t border-[var(--border)] pt-8">
        {entries.map((item) => (
          <CareerEntry
            key={item.companyKey}
            item={item}
            companyName={companyName(item)}
            t={t}
          />
        ))}
      </ol>
    </div>
  );
}
