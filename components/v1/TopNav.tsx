"use client";

import { useEffect, useRef, useState } from "react";
import type { ActivePanel } from "@/lib/types";
import { useTheme } from "@/lib/theme-context";
import { useLang } from "@/lib/lang-context";
import { ui } from "@/lib/i18n";

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
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.6"/>
      <line x1="12" y1="1.8" x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22.2"/>
      <line x1="4.0" y1="4.0" x2="5.6" y2="5.6"/>
      <line x1="18.4" y1="18.4" x2="20.0" y2="20.0"/>
      <line x1="1.8" y1="12" x2="4" y2="12"/>
      <line x1="20" y1="12" x2="22.2" y2="12"/>
      <line x1="4.0" y1="20.0" x2="5.6" y2="18.4"/>
      <line x1="18.4" y1="5.6" x2="20.0" y2="4.0"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 13.4A8.6 8.6 0 1 1 10.6 3.5a6.7 6.7 0 0 0 9.9 9.9z"/>
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
  const t = ui[lang];

  const tabRefs = useRef<Partial<Record<ActivePanel, HTMLAnchorElement | null>>>({});
  const stripRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // The underline travels between tabs rather than reappearing, so the two
  // states read as one movement. Re-measured on resize since widths are fluid.
  useEffect(() => {
    const measure = () => {
      const el = tabRefs.current[activePanel];
      if (!el) return;
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });

      // Below ~430px the five labels do not fit beside the controls and the
      // index scrolls. Keep the current one in view, or the reader loses the
      // only thing telling them where they are.
      const strip = stripRef.current;
      if (!strip || strip.scrollWidth <= strip.clientWidth) return;
      const left = el.offsetLeft - 12;
      const right = el.offsetLeft + el.offsetWidth + 12;
      if (left < strip.scrollLeft) strip.scrollTo({ left });
      else if (right > strip.scrollLeft + strip.clientWidth) {
        strip.scrollTo({ left: right - strip.clientWidth });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activePanel]);

  return (
    // No mark and no name: the page opens on the name set at display size two
    // lines below, and a second lockup in the bar only competed with it.
    <nav className="sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-14 sm:h-16">
          {/* The negative margin cancels the first tab's own padding so its
              label starts on the same vertical line as the content below; the
              1px inset leaves room for a focus ring the overflow would clip. */}
          <div ref={stripRef} className="nav-scroll relative flex items-center min-w-0 px-1 -ml-3.5 sm:-ml-4 overflow-x-auto scrollbar-none">
            {navItems.map((item) => (
              <a
                key={item.key}
                ref={(el) => { tabRefs.current[item.key] = el; }}
                href={`#${item.key}`}
                onClick={() => scrollToSection(item.key)}
                aria-current={activePanel === item.key ? "true" : undefined}
                className={`flex-shrink-0 px-2.5 sm:px-3 py-2 text-[13px] sm:text-sm font-medium transition-colors duration-200 ${
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

          {/* Type, not chrome: two words and a hairline read as a choice, where
              a filled segmented control read as a form field in the masthead. */}
          <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] font-semibold tracking-[0.08em]">
              <button
                onClick={() => lang !== "ko" && toggleLang()}
                aria-pressed={lang === "ko"}
                className={`transition-colors duration-200 ${
                  lang === "ko" ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
                aria-label="한국어"
              >
                KO
              </button>
              <span aria-hidden="true" className="w-px h-2.5 bg-[var(--border)]" />
              <button
                onClick={() => lang !== "en" && toggleLang()}
                aria-pressed={lang === "en"}
                className={`transition-colors duration-200 ${
                  lang === "en" ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="-mr-1.5 p-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              aria-label={t.themeLabel}
            >
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
