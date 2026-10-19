"use client";

import { useEffect, useRef, useState } from "react";
import { THEME_CONFIG } from "@/config";

type Theme = "light" | "dark";

const THEME_KEY = THEME_CONFIG.storageKey;

/**
 * Detect the system's preferred color scheme.
 * @returns The detected theme
 */
function getSystemTheme(): Theme {
  if (typeof window === "undefined") return THEME_CONFIG.defaultTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Resolve the theme that should be shown: stored preference first,
 * otherwise the system preference. Safe to call on the client only.
 * @returns The resolved theme
 */
function resolveTheme(): Theme {
  if (typeof window === "undefined") return THEME_CONFIG.defaultTheme;
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return getSystemTheme();
}

/**
 * Apply the theme to the document element.
 * @param theme - The theme to apply
 */
function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle(THEME_CONFIG.darkClass, theme === "dark");
}

/**
 * Custom hook for theme management.
 *
 * Next.js renders on the server, so the hook starts from the default theme
 * (keeping hydration markup identical) and syncs with the stored/system
 * preference after mount. An inline script in the root layout applies the
 * stored class before first paint to avoid a flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(THEME_CONFIG.defaultTheme);
  const skipNextApply = useRef(true);

  // Sync with the persisted preference once, after hydration.
  useEffect(() => {
    const initial = resolveTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  // Persist + apply on every subsequent change (skips the mount run).
  useEffect(() => {
    if (skipNextApply.current) {
      skipNextApply.current = false;
      return;
    }
    applyTheme(theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const setDark = () => setTheme("dark");
  const setLight = () => setTheme("light");

  return {
    theme,
    toggleTheme,
    setDark,
    setLight,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}
