"use client";

import type { ActivePanel } from "@/lib/types";

interface TopNavProps {
  activePanel: ActivePanel;
  onPanelChange: (panel: ActivePanel) => void;
}

const navItems: { key: ActivePanel; label: string }[] = [
  { key: "about", label: "About" },
  { key: "career", label: "Career" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "contact", label: "Contact" },
];

export default function TopNav({ activePanel, onPanelChange }: TopNavProps) {
  return (
    <nav className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">김</span>
            </div>
            <span className="text-white font-semibold hidden sm:block">김현욱</span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onPanelChange(item.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  activePanel === item.key
                    ? "text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.label}
                {activePanel === item.key && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
