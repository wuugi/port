"use client";

import { createContext, useContext, useState } from "react";
import type { Lang } from "./types";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({ lang: "ko", toggleLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");
  return (
    <LangContext.Provider value={{ lang, toggleLang: () => setLang((l) => (l === "ko" ? "en" : "ko")) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
