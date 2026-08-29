"use client";
import { useEffect, useState } from "react";
import type { ActivePanel } from "@/lib/types";
import TopNav, { panelOrder } from "./TopNav";
import AboutPanel from "./AboutPanel";
import CareerPanel from "./CareerPanel";
import ProjectsPanel from "./ProjectsPanel";
import SkillsPanel from "./SkillsPanel";
import ContactPanel from "./ContactPanel";

export default function PortfolioV1() {
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
      const passed = panelOrder.filter((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= 80;
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
        <section id="career" className="scroll-mt-20 mt-20 sm:mt-28 pt-10 border-t border-[var(--border)]">
          <CareerPanel />
        </section>
        <section id="projects" className="scroll-mt-20 mt-20 sm:mt-28 pt-10 border-t border-[var(--border)]">
          <ProjectsPanel />
        </section>
        <section id="skills" className="scroll-mt-20 mt-20 sm:mt-28 pt-10 border-t border-[var(--border)]">
          <SkillsPanel />
        </section>
        <section id="contact" className="scroll-mt-20 mt-20 sm:mt-28 pt-10 border-t border-[var(--border)]">
          <ContactPanel />
        </section>
      </main>
      <footer className="border-t border-[var(--border)] mt-8 py-6 text-center">
        <p className="text-[var(--text-muted)] text-xs">© 2026 김현욱. All rights reserved.</p>
      </footer>
    </div>
  );
}
