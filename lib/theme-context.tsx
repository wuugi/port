"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
interface ThemeContextType { theme: Theme; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) { setTheme(saved); applyTheme(saved); }
  }, []);

  function applyTheme(t: Theme) {
    if (t === "light") { document.documentElement.classList.add("light"); }
    else { document.documentElement.classList.remove("light"); }
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
