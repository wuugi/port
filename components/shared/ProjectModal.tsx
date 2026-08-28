"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { companyLabels, companyLabelsEn } from "@/lib/static-data";
import { useLang } from "@/lib/lang-context";
import { ui } from "@/lib/i18n";
import { companyColors } from "@/lib/palette";

interface ProjectModalProps {
  project: Project | null;
  rawProject?: Project | null;
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

  useEffect(() => {
    document.body.style.overflow = projectId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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

  const colors = companyColors[shown.company];

  // Portalled to the body: the panel wrapper animates a transform, which would
  // otherwise become the containing block and clip this fixed overlay to the
  // panel instead of the viewport.
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
        <span className="absolute inset-x-0 top-0 h-1 z-20 bg-[var(--accent)]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent-line)] hover:bg-[var(--accent-subtle)] transition-colors"
          aria-label={t.close}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto scrollbar-thin">
          {/* Peak: company identity, the title at the system's full scale, the outcome as evidence. */}
          <header className="border-b border-[var(--border)] px-6 pt-8 pb-6 pr-16 bg-[var(--bg)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 text-xs bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)]">{labels[shown.company]}</span>
              <span className="text-xs text-[var(--text-muted)] tabular-nums">{shown.period}</span>
            </div>

            <h2
              id="project-modal-title"
              className="text-2xl sm:text-3xl font-bold text-[var(--text)] leading-tight tracking-tight text-balance"
            >
              {shown.title}
            </h2>

            <p className="mt-4 flex items-start gap-2 text-[var(--success)] text-base sm:text-lg font-medium leading-snug text-balance">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {shown.result}
            </p>

            {shown.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-5">
                {shown.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-line)] text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="px-6 pb-8 pt-6 space-y-7">
            {shown.images && shown.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shown.images.map((img, i) => (
                  // Notion serves originals at full camera resolution. These sit
                  // below the fold inside a dialog, so they stay lazy; the box is
                  // reserved by aspect-ratio so nothing reflows as they arrive.
                  <div
                    key={i}
                    className="relative w-full aspect-[4/3] max-h-48 overflow-hidden border border-[var(--border)] bg-[var(--bg)]"
                  >
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

            <div className="bg-[var(--bg)] border border-[var(--border)] p-4 space-y-3">
              <div>
                <Label>{t.summary}</Label>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">{shown.summary}</p>
              </div>
              <div>
                <Label>{t.role}</Label>
                <p className="mt-1 text-sm text-[var(--text)]">{shown.role}</p>
              </div>
            </div>

            {shown.background && (
              <div>
                <Label>{t.background}</Label>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text)]">{shown.background}</p>
              </div>
            )}

            {shown.problem && (
              <div>
                <Label>{t.problem}</Label>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text)]">{shown.problem}</p>
              </div>
            )}

            {shown.process && shown.process.length > 0 && (
              <div>
                <Label>{t.process}</Label>
                <div className="mt-3 space-y-3">
                  {shown.process.map((step, i) => (
                    <div key={i} className="flex gap-3 text-sm text-[var(--text)]">
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 tabular-nums bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-line)]">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed flex-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* The header already carries `result`; this panel exists only for the fuller account. */}
            {shown.fullResult && (
              <div className="bg-[var(--success-subtle)] border border-[var(--success-line)] p-5">
                <Label>{t.result}</Label>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text)]">{shown.fullResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
