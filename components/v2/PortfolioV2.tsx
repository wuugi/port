"use client";

import StickyNav from "./StickyNav";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import CareerSection from "./CareerSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";

export default function PortfolioV2() {
  return (
    <div className="bg-white">
      <StickyNav />
      <HeroSection />
      <AboutSection />
      <CareerSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
