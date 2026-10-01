"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);
  return (
    <button
      className="theme-toggle"
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("portfolio-theme", next);
        } catch {}
      }}
    >
      <Sun size={16} />
      <Moon size={15} />
      <span className={`theme-thumb ${theme}`} />
    </button>
  );
}
