"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "./types";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({ lang: "ko", toggleLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");

  // The document's own language, not just the visible strings. It drives how a
  // screen reader pronounces the page, and the root element was pinned to "ko",
  // so the English side was being read aloud with Korean pronunciation rules.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, toggleLang: () => setLang((l) => (l === "ko" ? "en" : "ko")) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
