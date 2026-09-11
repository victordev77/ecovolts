import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

function readSavedTheme() {
  try {
    return window.localStorage?.getItem("ecovolts-theme");
  } catch {
    return null;
  }
}

function saveTheme(theme: Theme) {
  try {
    window.localStorage?.setItem("ecovolts-theme", theme);
  } catch {
    // Tema continua funcionando na sessão mesmo quando o navegador bloqueia storage.
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = readSavedTheme();
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
