"use client";

import { useEffect } from "react";
import type { Project } from "@/lib/types";
import { companyLabels, companyLabelsEn } from "@/lib/static-data";
import { useLang } from "@/lib/lang-context";
import { ui } from "@/lib/i18n";

interface ProjectModalProps {
  project: Project | null;
  rawProject?: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang } = useLang();
  const t = ui[lang];
  const labels = lang === "en" ? companyLabelsEn : companyLabels;

  useEffect(() => {
    if (project) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const companyTagMap: Record<string, string> = {
    flex: "bg-[var(--accent2-subtle)] text-[var(--accent2)] border border-[var(--accent2)]/30",
    jarvis: "bg-[var(--color-amber-subtle)] text-[var(--color-amber)] border border-[var(--color-amber)]/30",
    midas: "bg-[var(--color-green-subtle)] text-[var(--color-green)] border border-[var(--color-green)]/30",
  };
  const companyBadgeClass = companyTagMap[project.company] || "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl scrollbar-thin">
        <div className="sticky top-0 z-10 px-6 pt-6 pb-4 bg-[var(--bg-card)] border-b border-[var(--border)]/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-xs ${companyBadgeClass}`}>{labels[project.company]}</span>
                <span className="text-xs text-[var(--text-muted)]">{project.period}</span>
              </div>
              <h2 className="text-lg font-bold text-[var(--text)] leading-tight">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--accent-subtle)] transition-colors"
              aria-label={t.close}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 space-y-5 pt-4">
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.images.map((img, i) => (
                <img key={i} src={img} alt={`${project.title} ${i + 1}`} className="w-full max-h-48 object-cover" />
              ))}
            </div>
          )}

          <div className="bg-[var(--bg)] border border-[var(--border)] p-4">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{t.summary}</span>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">{project.summary}</p>
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{t.role}</span>
                <p className="mt-1 text-sm text-[var(--text)]">{project.role}</p>
              </div>
            </div>
          </div>

          {project.background && (
            <div>
              <h3 className="text-[var(--accent)] font-semibold mb-3">{t.background}</h3>
              <p className="text-sm leading-relaxed text-[var(--text)]">{project.background}</p>
            </div>
          )}

          {project.problem && (
            <div>
              <h3 className="text-[var(--accent)] font-semibold mb-3">{t.problem}</h3>
              <p className="text-sm leading-relaxed text-[var(--text)]">{project.problem}</p>
            </div>
          )}

          {project.process && project.process.length > 0 && (
            <div>
              <h3 className="text-[var(--accent)] font-semibold mb-3">{t.process}</h3>
              <div className="space-y-3">
                {project.process.map((step, i) => (
                  <div key={i} className="flex gap-3 text-sm text-[var(--text)]">
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[var(--accent-subtle)] border border-[var(--accent)]/20 p-4">
            <h3 className="text-sm font-semibold mb-2 text-[var(--accent)]">{t.result}</h3>
            <p className="text-sm leading-relaxed text-[var(--text)]">{project.fullResult || project.result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
