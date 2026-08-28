"use client";
import { useEffect, useRef, useState } from "react";
import type { ActivePanel } from "@/lib/types";
import TopNav, { panelOrder } from "./TopNav";
import AboutPanel from "./AboutPanel";
import CareerPanel from "./CareerPanel";
import ProjectsPanel from "./ProjectsPanel";
import SkillsPanel from "./SkillsPanel";
import ContactPanel from "./ContactPanel";

export default function PortfolioV1() {
  const [activePanel, setActivePanel] = useState<ActivePanel>("about");
  const previous = useRef<ActivePanel>("about");

  // Direction of travel along the nav, so the panel arrives from the side the
  // visitor moved toward. Read during render; committed after paint.
  const goingForward =
    panelOrder.indexOf(activePanel) >= panelOrder.indexOf(previous.current);

  useEffect(() => {
    previous.current = activePanel;
  }, [activePanel]);

  const renderPanel = () => {
    switch (activePanel) {
      case "about": return <AboutPanel onNavigate={setActivePanel} />;
      case "career": return <CareerPanel />;
      case "projects": return <ProjectsPanel />;
      case "skills": return <SkillsPanel />;
      case "contact": return <ContactPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <TopNav activePanel={activePanel} onPanelChange={setActivePanel} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">
        <div
          key={activePanel}
          className={goingForward ? "panel-enter-next" : "panel-enter-prev"}
        >
          {renderPanel()}
        </div>
      </main>
      <footer className="border-t border-[var(--border)] mt-8 py-6 text-center">
        <p className="text-[var(--text-muted)] text-xs">© 2026 김현욱. All rights reserved.</p>
      </footer>
    </div>
  );
}
