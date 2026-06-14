"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as string | null;
    // Migrar "mid" legado → "dark"
    const initial: Theme = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid var(--border)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface)",
        color: "var(--text-muted)",
        flexShrink: 0,
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
      }}
    >
      <i
        className={`ti ${theme === "dark" ? "ti-sun" : "ti-moon"}`}
        style={{ fontSize: 16 }}
      />
    </button>
  );
}
