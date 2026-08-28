"use client";

import Image from "next/image";
import { personInfo } from "@/lib/static-data";
import type { ActivePanel } from "@/lib/types";
import { useLang } from "@/lib/lang-context";
import { ui, tPerson } from "@/lib/i18n";

interface AboutPanelProps {
  onNavigate: (panel: ActivePanel) => void;
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg-card)] px-5 py-4 sm:px-6 sm:py-5">
      <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <div className="mt-1.5 space-y-0.5">{children}</div>
    </div>
  );
}

export default function AboutPanel({ onNavigate }: AboutPanelProps) {
  const { lang } = useLang();
  const t = ui[lang];
  const p = tPerson(personInfo, lang);

  const stats = [
    { label: t.experienceLabel, value: t.experienceValue },
    { label: t.certLabel, value: "SQLD" },
    { label: t.toeicLabel, value: "920" },
  ];

  return (
    <div className="space-y-10">
      {/* Lead: one identity block — the person, the claim, and the evidence for it. */}
      <section className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden bg-[var(--accent-subtle)] border border-[var(--accent-line)] flex items-center justify-center flex-shrink-0">
            {personInfo.profileImage ? (
              // The source is 921×1152 but the box is 96–128 CSS px, so 128 is the
              // real intrinsic size: retina then fetches the 256px candidate rather
              // than a 640px one. `priority` keeps the LCP element eager.
              <Image
                src={personInfo.profileImage}
                alt={personInfo.name}
                width={128}
                height={128}
                priority
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <span className="text-[var(--accent)] text-4xl font-bold">김</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
              {lang === "en" && personInfo.nameEn ? personInfo.nameEn : personInfo.name}
            </h2>
            <p className="mt-2 text-[var(--accent)] text-base sm:text-lg text-balance">{p.title}</p>

            {/* A fixed measure, not `ch`: the ch unit is sized from the Latin "0",
                so 68ch is far wider in Korean than it looks. 34rem lands near 40
                Korean characters and ~70 Latin ones — a comfortable line in both. */}
            <p className="mt-6 text-[var(--text-muted)] leading-[1.9] text-[15px] max-w-[34rem] text-pretty">
              {p.intro}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((item) => (
                <div key={item.label}>
                  <dd className="text-[var(--accent)] font-bold text-2xl tabular-nums leading-none">
                    {item.value}
                  </dd>
                  <dt className="text-[var(--text-muted)] text-xs mt-1.5">{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-[var(--text-muted)] text-xs flex-1">{t.exploreMore}</p>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate("career")}
              className="px-5 py-2.5 border border-[var(--accent)] text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent-subtle)] transition-colors"
            >
              Career →
            </button>
            <button
              onClick={() => onNavigate("projects")}
              className="px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Projects →
            </button>
          </div>
        </div>
      </section>

      {/* Supporting facts: one region split by hairlines, not four competing boxes.
          gap-px over a border-colored ground draws the rules at every breakpoint. */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
        <Fact label={t.email}>
          <a
            href={`mailto:${personInfo.email}`}
            className="text-[var(--text)] text-sm font-medium hover:text-[var(--accent)] transition-colors break-all"
          >
            {personInfo.email}
          </a>
        </Fact>

        <Fact label={t.phone}>
          <a
            href={`tel:${personInfo.phone}`}
            className="text-[var(--text)] text-sm font-medium tabular-nums hover:text-[var(--accent)] transition-colors"
          >
            {personInfo.phone}
          </a>
        </Fact>

        <Fact label={t.education}>
          <p className="text-[var(--text)] text-sm font-medium">{p.education}</p>
          <p className="text-[var(--text-muted)] text-xs tabular-nums">{personInfo.educationPeriod}</p>
        </Fact>

        <Fact label={`${t.certifications} · ${t.languages}`}>
          {[...p.certifications, ...p.languages].map((item) => (
            <p key={item} className="text-[var(--text)] text-sm">{item}</p>
          ))}
        </Fact>
      </section>
    </div>
  );
}
