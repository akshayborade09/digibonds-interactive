"use client";

import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return {
    theme,
    resolvedTheme,
    systemTheme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
