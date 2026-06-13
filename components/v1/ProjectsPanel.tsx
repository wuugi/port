"use client";

import { useState } from "react";
import type { CompanyKey, Project } from "@/lib/types";
import { projectsData, companyLabels } from "@/lib/static-data";
import ProjectModal from "@/components/shared/ProjectModal";

const companyColorMap: Record<CompanyKey, { tab: string; tag: string }> = {
  flex: {
    tab: "bg-purple-600 text-white",
    tag: "bg-purple-500/20 text-purple-300",
  },
  jarvis: {
    tab: "bg-amber-600 text-white",
    tag: "bg-amber-500/20 text-amber-300",
  },
  midas: {
    tab: "bg-emerald-600 text-white",
    tag: "bg-emerald-500/20 text-emerald-300",
  },
};

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const colors = companyColorMap[project.company];

  return (
    <button
      onClick={onClick}
      className="text-left bg-navy-800 border border-slate-700 rounded-2xl p-5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs text-slate-400">{project.period}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${colors.tag}`}>
          {companyLabels[project.company]}
        </span>
      </div>

      <h3 className="text-white font-semibold text-sm leading-tight mb-2 group-hover:text-indigo-300 transition-colors">
        {project.title}
      </h3>

      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
        {project.summary}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <svg
          className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0"
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

      <div className="mt-3 pt-3 border-t border-slate-700/50">
        <p className="text-xs text-emerald-400 font-medium line-clamp-1">
          ✓ {project.result}
        </p>
      </div>
    </button>
  );
}

export default function ProjectsPanel() {
  const [activeCompany, setActiveCompany] = useState<CompanyKey>("flex");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const companies: CompanyKey[] = ["flex", "jarvis", "midas"];
  const filtered = projectsData.filter((p) => p.company === activeCompany);

  return (
    <div className="panel-enter space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">프로젝트</h2>
          <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full">
            Notion으로 관리됨
          </span>
        </div>
        <span className="text-slate-400 text-sm">총 {projectsData.length}개 프로젝트</span>
      </div>

      {/* Company Filter */}
      <div className="flex gap-2 flex-wrap">
        {companies.map((company) => {
          const isActive = activeCompany === company;
          const colors = companyColorMap[company];
          return (
            <button
              key={company}
              onClick={() => setActiveCompany(company)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? colors.tab
                  : "bg-navy-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              {companyLabels[company]}
              <span className={`ml-1.5 text-xs ${isActive ? "opacity-70" : "opacity-50"}`}>
                ({projectsData.filter((p) => p.company === company).length})
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
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500">
          <p>이 회사의 프로젝트가 없습니다.</p>
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        theme="dark"
      />
    </div>
  );
}
