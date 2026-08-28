import type { CompanyKey, SkillItem } from "./types";

// Class strings are written out in full: Tailwind's scanner only finds literals.
interface Swatch {
  text: string;
  dot: string;
  tag: string;
  panel: string;
  solid?: string;
}

export const companyColors: Record<CompanyKey, Swatch> = {
  midas: {
    text: "text-[var(--co-midas)]",
    dot: "bg-[var(--co-midas)]",
    tag: "bg-[var(--co-midas-subtle)] text-[var(--co-midas)] border border-[var(--co-midas-line)]",
    panel: "bg-[var(--co-midas-subtle)] border-[var(--co-midas-line)]",
    solid: "bg-[var(--co-midas)] border-[var(--co-midas)] text-[var(--bg)]",
  },
  jarvis: {
    text: "text-[var(--co-jarvis)]",
    dot: "bg-[var(--co-jarvis)]",
    tag: "bg-[var(--co-jarvis-subtle)] text-[var(--co-jarvis)] border border-[var(--co-jarvis-line)]",
    panel: "bg-[var(--co-jarvis-subtle)] border-[var(--co-jarvis-line)]",
    solid: "bg-[var(--co-jarvis)] border-[var(--co-jarvis)] text-[var(--bg)]",
  },
  flex: {
    text: "text-[var(--co-flex)]",
    dot: "bg-[var(--co-flex)]",
    tag: "bg-[var(--co-flex-subtle)] text-[var(--co-flex)] border border-[var(--co-flex-line)]",
    panel: "bg-[var(--co-flex-subtle)] border-[var(--co-flex-line)]",
    solid: "bg-[var(--co-flex)] border-[var(--co-flex)] text-[var(--bg)]",
  },
};

export const skillColors: Record<SkillItem["category"], Swatch> = {
  data: {
    text: "text-[var(--cat-data)]",
    dot: "bg-[var(--cat-data)]",
    tag: "bg-[var(--cat-data-subtle)] text-[var(--cat-data)] border border-[var(--cat-data-line)]",
    panel: "bg-[var(--cat-data-subtle)] border-[var(--cat-data-line)]",
  },
  tool: {
    text: "text-[var(--cat-tool)]",
    dot: "bg-[var(--cat-tool)]",
    tag: "bg-[var(--cat-tool-subtle)] text-[var(--cat-tool)] border border-[var(--cat-tool-line)]",
    panel: "bg-[var(--cat-tool-subtle)] border-[var(--cat-tool-line)]",
  },
  process: {
    text: "text-[var(--cat-process)]",
    dot: "bg-[var(--cat-process)]",
    tag: "bg-[var(--cat-process-subtle)] text-[var(--cat-process)] border border-[var(--cat-process-line)]",
    panel: "bg-[var(--cat-process-subtle)] border-[var(--cat-process-line)]",
  },
};
