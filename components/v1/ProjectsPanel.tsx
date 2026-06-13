"use client";

import { useState, useEffect } from "react";
import type { CompanyKey, Project } from "@/lib/types";
import { projectsData, companyLabels, companyLabelsEn } from "@/lib/static-data";
import ProjectModal from "@/components/shared/ProjectModal";
import { useLang } from "@/lib/lang-context";
import { ui, tProject } from "@/lib/i18n";

const companyTagMap: Record<CompanyKey, string> = {
  flex: "bg-[var(--accent2-subtle)] text-[var(--accent2)] border border-[var(--accent2)]/20",
  jarvis: "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20",
  midas: "bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20",
};

function ProjectCard({
  project,
  companyLabel,
  onClick,
}: {
  project: Project;
  companyLabel: string;
  onClick: () => void;
}) {
  const tagClass = companyTagMap[project.company];

  return (
    <button
      onClick={onClick}
      className="text-left bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--accent)]/40 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs text-[var(--text-muted)]">{project.period}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${tagClass}`}>
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
              className="text-xs px-2 py-0.5 bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20 rounded-full"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      <div className="mt-3 pt-3 border-t border-[var(--border)]">
        <p className="text-xs text-[var(--accent2)] font-medium line-clamp-1">
          ✓ {project.result}
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
    fetch("/api/notion/projects")
      .then((r) => r.json())
      .then((data) => {
        if (data.projects?.length) setRawProjects(data.projects);
      })
      .catch(() => {});
  }, []);

  const allProjects = rawProjects.map((p) => tProject(p, lang));
  const companies: CompanyKey[] = ["flex", "jarvis", "midas"];
  const filtered = allProjects.filter((p) => p.company === activeCompany);

  return (
    <div className="panel-enter space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-[var(--text)]">{t.projectsHeading}</h2>
          <span className="px-2 py-0.5 text-xs bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30 rounded-full">
            {t.managedViaNotion}
          </span>
        </div>
        <span className="text-[var(--text-muted)] text-sm">{t.totalProjects(rawProjects.length)}</span>
      </div>

      {/* Company Filter */}
      <div className="flex gap-2 flex-wrap">
        {companies.map((company) => {
          const isActive = activeCompany === company;
          return (
            <button
              key={company}
              onClick={() => setActiveCompany(company)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[var(--accent)] text-[#0a1a14]"
                  : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/50"
              }`}
            >
              {labels[company]}
              <span className={`ml-1.5 text-xs ${isActive ? "opacity-70" : "opacity-50"}`}>
                ({rawProjects.filter((p) => p.company === company).length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Project Grid */}
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
