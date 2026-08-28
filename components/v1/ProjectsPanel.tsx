"use client";

import { useState, useEffect, useMemo } from "react";
import type { CompanyKey, Project } from "@/lib/types";
import { projectsData, companyLabels, companyLabelsEn } from "@/lib/static-data";
import ProjectModal from "@/components/shared/ProjectModal";
import { useLang } from "@/lib/lang-context";
import { ui, tProject } from "@/lib/i18n";
import { companyColors } from "@/lib/palette";

// The shell remounts a panel on every visit, so a bare mount-effect refetched
// Notion each time the user returned here. Cached at module scope: one request
// per page load, and a repeat visit renders from memory.
let projectsRequest: Promise<Project[] | null> | null = null;

function loadRemoteProjects(): Promise<Project[] | null> {
  projectsRequest ??= fetch("/api/notion/projects")
    .then((r) => r.json())
    .then((data) => (data.projects?.length ? (data.projects as Project[]) : null))
    .catch(() => null);
  return projectsRequest;
}

function ProjectCard({
  project,
  companyLabel,
  onClick,
}: {
  project: Project;
  companyLabel: string;
  onClick: () => void;
}) {
  const colors = companyColors[project.company];

  return (
    <button
      onClick={onClick}
      className="text-left bg-[var(--bg-card)] border border-[var(--border)] p-5 hover:border-[var(--accent-line)] transition-colors duration-200 group relative"
    >
      <span className={`absolute inset-x-0 top-0 h-px ${colors.dot}`} />

      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs text-[var(--text-muted)] tabular-nums">{project.period}</span>
        <span className={`text-xs px-2 py-0.5 ${colors.tag}`}>
          {companyLabel}
        </span>
      </div>

      <h3 className="text-[var(--text)] font-semibold text-sm leading-tight mb-2 group-hover:text-[var(--accent)] transition-colors">
        {project.title}
      </h3>

      <p className="text-[var(--text-muted)] text-xs leading-relaxed line-clamp-3 mb-4">
        {project.summary}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-line)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <svg
          className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <div className="mt-3 pt-3 border-t border-[var(--border)]">
        <p className="text-xs text-[var(--success)] font-medium line-clamp-1 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {project.result}
        </p>
      </div>
    </button>
  );
}

export default function ProjectsPanel() {
  const { lang } = useLang();
  const t = ui[lang];
  const labels = lang === "en" ? companyLabelsEn : companyLabels;

  const [activeCompany, setActiveCompany] = useState<CompanyKey>("flex");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [rawProjects, setRawProjects] = useState<Project[]>(projectsData);

  useEffect(() => {
    let active = true;
    loadRemoteProjects().then((remote) => {
      if (active && remote) setRawProjects(remote);
    });
    return () => { active = false; };
  }, []);

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

      <div className="flex gap-2 flex-wrap">
        {companies.map((company) => {
          const isActive = activeCompany === company;
          const colors = companyColors[company];
          return (
            <button
              key={company}
              onClick={() => setActiveCompany(company)}
              aria-pressed={isActive}
              className={`px-4 py-2 text-sm font-medium border transition-colors duration-200 flex items-center gap-2 ${
                isActive
                  ? colors.solid
                  : "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[var(--bg)]" : colors.dot}`}
              />
              {labels[company]}
              <span className={`ml-1.5 text-xs ${isActive ? "opacity-70" : "opacity-50"}`}>
                ({counts[company]})
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              companyLabel={labels[project.company]}
              onClick={() => setSelectedProject(
                rawProjects.find((p) => p.id === project.id) ?? project
              )}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <p>{t.noProjects}</p>
        </div>
      )}

      <ProjectModal
        project={selectedProject ? tProject(selectedProject, lang) : null}
        rawProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
