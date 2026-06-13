"use client";

import { useState } from "react";
import type { CompanyKey, Project } from "@/lib/types";
import { projectsData, companyLabels } from "@/lib/static-data";
import ProjectModal from "@/components/shared/ProjectModal";
import { SectionHeader } from "./AboutSection";

const companyColorMap: Record<CompanyKey, { filter: string; tag: string }> = {
  flex: {
    filter: "bg-purple-600 text-white",
    tag: "bg-purple-50 text-purple-700",
  },
  jarvis: {
    filter: "bg-amber-500 text-white",
    tag: "bg-amber-50 text-amber-700",
  },
  midas: {
    filter: "bg-emerald-600 text-white",
    tag: "bg-emerald-50 text-emerald-700",
  },
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const colors = companyColorMap[project.company];

  return (
    <button
      onClick={onClick}
      className="text-left bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs text-gray-400">{project.period}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${colors.tag}`}>
          {companyLabels[project.company]}
        </span>
      </div>

      <h3 className="text-gray-900 font-semibold text-sm leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
        {project.title}
      </h3>

      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-3 border-t border-gray-100">
        <p className="text-xs text-emerald-600 font-medium line-clamp-1">✓ {project.result}</p>
      </div>
    </button>
  );
}

export default function ProjectsSection() {
  const [activeCompany, setActiveCompany] = useState<CompanyKey | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const companies: CompanyKey[] = ["flex", "jarvis", "midas"];

  const filtered =
    activeCompany === "all"
      ? projectsData
      : projectsData.filter((p) => p.company === activeCompany);

  return (
    <section id="projects" className="py-24 bg-white px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <SectionHeader title="Projects" subtitle="프로젝트" />
          <span className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-full font-medium">
            Notion으로 관리됨
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap justify-center mt-8 mb-8">
          <button
            onClick={() => setActiveCompany("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCompany === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            전체 ({projectsData.length})
          </button>
          {companies.map((company) => {
            const isActive = activeCompany === company;
            const colors = companyColorMap[company];
            return (
              <button
                key={company}
                onClick={() => setActiveCompany(company)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? colors.filter
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {companyLabels[company]} ({projectsData.filter((p) => p.company === company).length})
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          theme="light"
        />
      </div>
    </section>
  );
}
