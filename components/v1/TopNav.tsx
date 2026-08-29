"use client";

import { useEffect, useRef, useState } from "react";
import type { ActivePanel } from "@/lib/types";
import { useTheme } from "@/lib/theme-context";
import { useLang } from "@/lib/lang-context";

interface TopNavProps {
  activePanel: ActivePanel;
}

const navItems: { key: ActivePanel; label: string }[] = [
  { key: "about", label: "About" },
  { key: "career", label: "Career" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "contact", label: "Contact" },
];

/** Left-to-right order of the sections; the shell reads it to track scroll. */
export const panelOrder: ActivePanel[] = navItems.map((i) => i.key);

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

/** The href carries the deep link; this carries the travel. A click on the
 *  section already named in the URL is not a navigation, so the browser does
 *  nothing — after scrolling away, that tab would go dead. */
function scrollToSection(key: ActivePanel) {
  document.getElementById(key)?.scrollIntoView();
}

export default function TopNav({ activePanel }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  const tabRefs = useRef<Partial<Record<ActivePanel, HTMLAnchorElement | null>>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // The underline travels between tabs rather than reappearing, so the two
  // states read as one movement. Re-measured on resize since widths are fluid.
  useEffect(() => {
    const measure = () => {
      const el = tabRefs.current[activePanel];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activePanel]);

  return (
    <nav className="sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-[var(--accent)] flex items-center justify-center">
              <span className="text-[var(--accent)] font-bold text-sm">김</span>
            </div>
            <span className="text-[var(--text)] font-semibold hidden sm:block">김현욱</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="relative flex items-center">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  ref={(el) => { tabRefs.current[item.key] = el; }}
                  href={`#${item.key}`}
                  onClick={() => scrollToSection(item.key)}
                  aria-current={activePanel === item.key ? "true" : undefined}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activePanel === item.key
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-0.5 w-px bg-[var(--accent)] origin-left ${
                  indicator.width ? "nav-indicator" : ""
                }`}
                style={{
                  transform: `translateX(${indicator.left}px) scaleX(${indicator.width})`,
                }}
              />
            </div>

            <div className="ml-2 flex items-center border border-[var(--border)] overflow-hidden text-xs font-semibold">
              <button
                onClick={() => lang !== "ko" && toggleLang()}
                aria-pressed={lang === "ko"}
                className={`px-2.5 py-1.5 transition-colors duration-200 ${
                  lang === "ko"
                    ? "bg-[var(--accent)] text-[var(--bg)]"
                    : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                }`}
                aria-label="한국어"
              >
                KO
              </button>
              <button
                onClick={() => lang !== "en" && toggleLang()}
                aria-pressed={lang === "en"}
                className={`px-2.5 py-1.5 transition-colors duration-200 ${
                  lang === "en"
                    ? "bg-[var(--accent)] text-[var(--bg)]"
                    : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="ml-1 p-2 border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
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
