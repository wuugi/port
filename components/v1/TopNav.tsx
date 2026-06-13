"use client";

import type { ActivePanel } from "@/lib/types";
import { useTheme } from "@/lib/theme-context";
import { useLang } from "@/lib/lang-context";

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

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function TopNav({ activePanel, onPanelChange }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  return (
    <nav className="sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] flex items-center justify-center">
              <span className="text-[var(--accent)] font-bold text-sm">김</span>
            </div>
            <span className="text-[var(--text)] font-semibold hidden sm:block">김현욱</span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onPanelChange(item.key)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative ${
                  activePanel === item.key
                    ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className={`ml-2 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                lang === "en"
                  ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-subtle)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/60 hover:text-[var(--accent)]"
              }`}
              aria-label="언어 전환"
            >
              {lang === "ko" ? "EN" : "KO"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="ml-1 p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              aria-label="테마 전환"
            >
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
