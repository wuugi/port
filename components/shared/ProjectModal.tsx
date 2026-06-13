"use client";

import { useEffect } from "react";
import type { Project } from "@/lib/types";
import { companyLabels } from "@/lib/static-data";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  theme?: "dark" | "light";
}

export default function ProjectModal({ project, onClose, theme = "dark" }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isDark = theme === "dark";

  const overlayClass = "fixed inset-0 z-50 flex items-center justify-center p-4";
  const backdropClass = "absolute inset-0 bg-black/70 backdrop-blur-sm";
  const modalClass = isDark
    ? "relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-navy-800 border border-slate-700 rounded-2xl shadow-2xl scrollbar-thin"
    : "relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl";

  const titleClass = isDark ? "text-white" : "text-gray-900";
  const labelClass = isDark ? "text-slate-400" : "text-gray-500";
  const valueClass = isDark ? "text-slate-200" : "text-gray-700";
  const sectionBgClass = isDark ? "bg-navy-900/50 rounded-xl p-4" : "bg-gray-50 rounded-xl p-4";
  const sectionLabelClass = isDark ? "text-slate-400" : "text-gray-500";
  const sectionTitleClass = isDark ? "text-indigo-400 font-semibold mb-3" : "text-indigo-600 font-semibold mb-3";
  const processItemClass = isDark
    ? "flex gap-3 text-sm text-slate-300"
    : "flex gap-3 text-sm text-gray-700";
  const tagClass = isDark
    ? "px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full"
    : "px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full";
  const closeButtonClass = isDark
    ? "p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
    : "p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors";

  const companyColorMap: Record<string, string> = {
    flex: "purple",
    jarvis: "amber",
    midas: "green",
  };
  const color = companyColorMap[project.company] || "indigo";
  const companyBadgeClass = isDark
    ? `px-2 py-1 text-xs rounded-full bg-${color}-500/20 text-${color}-300 border border-${color}-500/30`
    : `px-2 py-1 text-xs rounded-full bg-${color}-50 text-${color}-700 border border-${color}-200`;

  return (
    <div className={overlayClass}>
      <div className={backdropClass} onClick={onClose} />
      <div className={modalClass}>
        {/* Header */}
        <div className={`sticky top-0 z-10 px-6 pt-6 pb-4 ${isDark ? "bg-navy-800 border-b border-slate-700/50" : "bg-white border-b border-gray-100"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={companyBadgeClass}>{companyLabels[project.company]}</span>
                <span className={`text-xs ${labelClass}`}>{project.period}</span>
              </div>
              <h2 className={`text-lg font-bold ${titleClass} leading-tight`}>{project.title}</h2>
            </div>
            <button onClick={onClose} className={closeButtonClass} aria-label="닫기">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag) => (
              <span key={tag} className={tagClass}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-5 pt-4">
          {/* Summary + Role */}
          <div className={sectionBgClass}>
            <div className="space-y-3">
              <div>
                <span className={`text-xs font-medium uppercase tracking-wide ${sectionLabelClass}`}>요약</span>
                <p className={`mt-1 text-sm leading-relaxed ${valueClass}`}>{project.summary}</p>
              </div>
              <div>
                <span className={`text-xs font-medium uppercase tracking-wide ${sectionLabelClass}`}>역할</span>
                <p className={`mt-1 text-sm ${valueClass}`}>{project.role}</p>
              </div>
            </div>
          </div>

          {/* Background */}
          {project.background && (
            <div>
              <h3 className={sectionTitleClass}>배경</h3>
              <p className={`text-sm leading-relaxed ${valueClass}`}>{project.background}</p>
            </div>
          )}

          {/* Problem */}
          {project.problem && (
            <div>
              <h3 className={sectionTitleClass}>문제 인식</h3>
              <p className={`text-sm leading-relaxed ${valueClass}`}>{project.problem}</p>
            </div>
          )}

          {/* Process */}
          {project.process && project.process.length > 0 && (
            <div>
              <h3 className={sectionTitleClass}>진행 과정</h3>
              <div className="space-y-3">
                {project.process.map((step, i) => (
                  <div key={i} className={processItemClass}>
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"}`}>
                      {i + 1}
                    </span>
                    <p className="leading-relaxed flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          <div className={`${isDark ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"} rounded-xl p-4`}>
            <h3 className={`text-sm font-semibold mb-2 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
              결과
            </h3>
            <p className={`text-sm leading-relaxed ${isDark ? "text-emerald-200" : "text-emerald-800"}`}>
              {project.fullResult || project.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
