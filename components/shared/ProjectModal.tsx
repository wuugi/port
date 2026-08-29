"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { companyLabels, companyLabelsEn } from "@/lib/static-data";
import { useLang } from "@/lib/lang-context";
import { ui } from "@/lib/i18n";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
      {children}
    </span>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang } = useLang();
  const t = ui[lang];
  const labels = lang === "en" ? companyLabelsEn : companyLabels;
  const panelRef = useRef<HTMLDivElement>(null);

  // The project is held past the prop clearing so the close has something to
  // animate out; without this the dialog would simply vanish on unmount.
  const [shown, setShown] = useState<Project | null>(project);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // `project` arrives translated, so in English it is a fresh object on every
  // render. Effects key off the id (plus lang, to re-sync a translation while
  // the dialog is open) — never the object, which would loop and steal focus.
  const projectId = project?.id ?? null;
  const latest = useRef(project);
  latest.current = project;

  useEffect(() => {
    if (latest.current) {
      setShown(latest.current);
      setClosing(false);
      return;
    }
    setClosing(true);
    const timer = setTimeout(() => {
      setShown(null);
      setClosing(false);
    }, 140);
    return () => clearTimeout(timer);
  }, [projectId, lang]);

  // Locked on <html>, not <body>: html's overflow is what propagates to the
  // viewport, so a lock on body leaves the page scrolling behind the dialog.
  // scrollbar-gutter keeps the layout from jumping when the bar goes.
  useEffect(() => {
    document.documentElement.style.overflow = projectId ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [projectId]);

  useEffect(() => {
    if (projectId) panelRef.current?.focus();
  }, [projectId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!shown || !mounted) return null;

  const meta = [labels[shown.company], shown.period].filter(Boolean).join("  ·  ");

  /**
   * One surface. The dialog previously stacked ten kinds of rectangle inside its
   * own frame — an accent strip, a boxed close button, a header on its own
   * background, a chip per tag, a bordered summary panel, a bordered numeral per
   * process step, a tinted result panel. Cards inside cards is the tell. Here the
   * frame belongs to the dialog alone and everything within is separated by
   * hairlines, indentation and space.
   *
   * Portalled to the body: the animated panel wrapper would otherwise become the
   * containing block and clip this fixed overlay to the panel.
   */
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${
          closing ? "modal-scrim-out" : "modal-scrim"
        }`}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl outline-none ${
          closing ? "modal-panel-out" : "modal-panel"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          aria-label={t.close}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto scrollbar-thin px-7 sm:px-10 py-9">
          <header className="pr-10">
            <p className="text-xs text-[var(--text-muted)] tabular-nums">{meta}</p>

            <h2
              id="project-modal-title"
              className="mt-3 text-2xl sm:text-3xl font-bold text-[var(--text)] leading-tight tracking-tight text-balance"
            >
              {shown.title}
            </h2>

            <p className="mt-4 flex items-start gap-2 text-[var(--success)] text-base sm:text-lg font-medium leading-snug text-balance">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="min-w-0">{shown.result}</span>
            </p>

            {/* Tags read as a line of keywords, not a row of chips. */}
            {shown.tags.length > 0 && (
              <p className="mt-4 text-xs text-[var(--text-muted)]">
                {shown.tags.join("  ·  ")}
              </p>
            )}
          </header>

          {shown.images && shown.images.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shown.images.map((img, i) => (
                // The image is its own edge; a border around it would be another
                // rectangle. aspect-ratio still reserves the box so nothing reflows.
                <div key={i} className="relative w-full aspect-[4/3] max-h-48 overflow-hidden bg-[var(--bg)]">
                  <Image
                    src={img}
                    alt={`${shown.title} ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 90vw, 320px"
                    loading="lazy"
                    className="object-cover"
                    // Signed Notion URLs expire; a broken one must not leave a
                    // torn frame behind in the middle of the case study.
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Summary and role are a definition list, matching the About facts. */}
          <dl className="mt-8 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6 py-4 border-b border-[var(--border)]">
              <dt><Label>{t.summary}</Label></dt>
              <dd className="text-sm leading-relaxed text-[var(--text)]">{shown.summary}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6 py-4 border-b border-[var(--border)]">
              <dt><Label>{t.role}</Label></dt>
              <dd className="text-sm leading-relaxed text-[var(--text)]">{shown.role}</dd>
            </div>
          </dl>

          <div className="mt-8 space-y-8">
            {shown.background && (
              <section>
                <Label>{t.background}</Label>
                <p className="mt-2 text-[15px] leading-[1.85] text-[var(--text)]">{shown.background}</p>
              </section>
            )}

            {shown.problem && (
              <section>
                <Label>{t.problem}</Label>
                <p className="mt-2 text-[15px] leading-[1.85] text-[var(--text)]">{shown.problem}</p>
              </section>
            )}

            {shown.process && shown.process.length > 0 && (
              <section>
                <Label>{t.process}</Label>
                {/* Hanging numerals rather than a boxed chip per step. */}
                <ol className="mt-3 space-y-3">
                  {shown.process.map((step, i) => (
                    <li key={i} className="grid grid-cols-[1.75rem_1fr] text-[15px] text-[var(--text)]">
                      <span className="tabular-nums text-[var(--text-muted)] leading-[1.85]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="leading-[1.85]">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* The header already carries `result`; this is the fuller account, and
                the outcome colour marks it without another tinted box. */}
            {shown.fullResult && (
              <section className="border-t border-[var(--success-line)] pt-6">
                <Label>{t.result}</Label>
                <p className="mt-2 text-[15px] leading-[1.85] text-[var(--text)]">{shown.fullResult}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
