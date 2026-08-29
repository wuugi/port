"use client";

import { useState, useMemo } from "react";
import type { CompanyKey, Project } from "@/lib/types";
import { companyLabels, companyLabelsEn } from "@/lib/static-data";
import { projects as allProjects } from "@/lib/projects";
import ProjectModal from "@/components/shared/ProjectModal";
import { useLang } from "@/lib/lang-context";
import { ui, tProject } from "@/lib/i18n";

/**
 * An index of work, not a card grid. Equal-size bordered cards are the framework
 * default for "a list of things" and read as templated; a hairline-separated
 * register lets each entry be as long as it is and puts the outcome on the
 * same line of sight as the title.
 */
function ProjectRow({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <li className="border-t border-[var(--rule)] first:border-t-0">
      <button
        onClick={onClick}
        className="group w-full text-left py-6 grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1.5 sm:gap-8"
      >
        <span className="text-xs text-[var(--text-muted)] tabular-nums">
          {project.period}
        </span>

        <div className="min-w-0">
          <h3 className="flex items-start gap-2 text-[var(--text)] font-semibold text-base sm:text-lg leading-snug group-hover:text-[var(--accent)] transition-colors">
            <span className="min-w-0">{project.title}</span>
            <svg
              className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--text-muted)] opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[var(--accent)] motion-reduce:transition-none motion-reduce:translate-x-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </h3>

          <p className="mt-2 text-[var(--text-muted)] text-sm leading-relaxed line-clamp-2 max-w-[62ch]">
            {project.summary}
          </p>

          <p className="mt-3 flex items-start gap-1.5 text-[var(--success)] text-sm font-medium">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="min-w-0">{project.result}</span>
          </p>
        </div>
      </button>
    </li>
  );
}

export default function ProjectsPanel() {
  const { lang } = useLang();
  const t = ui[lang];
  const labels = lang === "en" ? companyLabelsEn : companyLabels;

  const [activeCompany, setActiveCompany] = useState<CompanyKey>("flex");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Notion is pulled at author time by npm run sync:notion, so the list is
  // present in the first paint instead of arriving a network round trip later.
  const rawProjects = allProjects;

  const companies: CompanyKey[] = ["flex", "jarvis", "midas"];
  // Translating all 12 projects on every keystroke of state (tab change, modal
  // open) was pure waste; only the visible company's cards need translating.
  const filtered = useMemo(
    () =>
      rawProjects
        .filter((p) => p.company === activeCompany)
        .map((p) => tProject(p, lang)),
    [rawProjects, activeCompany, lang]
  );
  const counts = useMemo(() => {
    const acc = { flex: 0, jarvis: 0, midas: 0 } as Record<CompanyKey, number>;
    for (const p of rawProjects) acc[p.company]++;
    return acc;
  }, [rawProjects]);

  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between flex-wrap gap-4">
        <h2 className="text-xl font-bold text-[var(--text)]">{t.projectsHeading}</h2>
        <span className="text-[var(--text-muted)] text-sm">{t.totalProjects(rawProjects.length)}</span>
      </div>

      <div className="flex gap-5 sm:gap-7 flex-wrap border-b border-[var(--border)]">
        {companies.map((company) => {
          const isActive = activeCompany === company;
          return (
            <button
              key={company}
              onClick={() => setActiveCompany(company)}
              aria-pressed={isActive}
              className={`-mb-px pb-3 flex items-baseline gap-1.5 text-sm font-medium border-b-2 transition-colors duration-200 ${
                isActive
                  ? "border-[var(--accent)] text-[var(--text)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {labels[company]}
              <span className="text-xs tabular-nums text-[var(--text-muted)]">
                {counts[company]}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <ul>
          {filtered.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(
                rawProjects.find((p) => p.id === project.id) ?? project
              )}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <p>{t.noProjects}</p>
        </div>
      )}

      <ProjectModal
        project={selectedProject ? tProject(selectedProject, lang) : null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
