"use client";
import { useEffect, useState } from "react";
import type { ActivePanel } from "@/lib/types";
import { personInfo } from "@/lib/static-data";
import { useLang } from "@/lib/lang-context";
import TopNav, { panelOrder } from "./TopNav";
import AboutPanel from "./AboutPanel";
import CareerPanel from "./CareerPanel";
import ProjectsPanel from "./ProjectsPanel";
import SkillsPanel from "./SkillsPanel";
import ContactPanel from "./ContactPanel";

export default function PortfolioV1() {
  const { lang } = useLang();
  const [activePanel, setActivePanel] = useState<ActivePanel>("about");

  // The nav reports where the reader is rather than what they last clicked:
  // the current section is the last one whose top has passed under the header.
  useEffect(() => {
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        // A short last section may never reach the header; the page end means
        // the reader is there regardless.
        setActivePanel(panelOrder[panelOrder.length - 1]);
        return;
      }
      // Measured a third of the way down, not at the header: a section whose
      // heading has just scrolled off still owns the screen, and marking the
      // one above it left the nav reading a section behind the eye.
      const line = Math.min(window.innerHeight * 0.32, 280);
      const passed = panelOrder.filter((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= line;
      });
      setActivePanel(passed[passed.length - 1] ?? panelOrder[0]);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <TopNav activePanel={activePanel} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">
        {/* One continuous document. scroll-mt clears the sticky header so a
            section's heading is not hidden underneath it on arrival. */}
        <section id="about" className="scroll-mt-20">
          <AboutPanel />
        </section>
        <section id="career" className="scroll-mt-20 mt-16 sm:mt-20 pt-10 border-t border-[var(--border)]">
          <CareerPanel />
        </section>
        <section id="projects" className="scroll-mt-20 mt-16 sm:mt-20 pt-10 border-t border-[var(--border)]">
          <ProjectsPanel />
        </section>
        <section id="skills" className="scroll-mt-20 mt-16 sm:mt-20 pt-10 border-t border-[var(--border)]">
          <SkillsPanel />
        </section>
        <section id="contact" className="scroll-mt-20 mt-16 sm:mt-20 pt-10 border-t border-[var(--border)]">
          <ContactPanel />
        </section>
      </main>
      <footer className="border-t border-[var(--border)] mt-8 py-6 text-center">
        {/* The name follows the locale like every other name on the page; the
            English side was signing off in Korean. */}
        <p className="text-[var(--text-muted)] text-xs">
          © 2026 {lang === "en" && personInfo.nameEn ? personInfo.nameEn : personInfo.name}
        </p>
      </footer>
    </div>
  );
}
