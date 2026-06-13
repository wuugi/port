"use client";

import { useState } from "react";
import type { ActivePanel } from "@/lib/types";
import TopNav from "./TopNav";
import AboutPanel from "./AboutPanel";
import CareerPanel from "./CareerPanel";
import ProjectsPanel from "./ProjectsPanel";
import SkillsPanel from "./SkillsPanel";
import ContactPanel from "./ContactPanel";

export default function PortfolioV1() {
  const [activePanel, setActivePanel] = useState<ActivePanel>("about");

  const renderPanel = () => {
    switch (activePanel) {
      case "about":
        return <AboutPanel />;
      case "career":
        return <CareerPanel />;
      case "projects":
        return <ProjectsPanel />;
      case "skills":
        return <SkillsPanel />;
      case "contact":
        return <ContactPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      <TopNav activePanel={activePanel} onPanelChange={setActivePanel} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <div key={activePanel}>{renderPanel()}</div>
      </main>
      <footer className="border-t border-slate-800 py-4 text-center">
        <p className="text-slate-600 text-xs">© 2026 김현욱. All rights reserved.</p>
      </footer>
    </div>
  );
}
