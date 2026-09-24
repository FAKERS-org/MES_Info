"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import kh from "@/locales/kh.json";
import en from "@/locales/en.json";
import { LANGUAGE_CONFIG } from "@/config";

export type Lang = typeof LANGUAGE_CONFIG.supportedLanguages[number];

type TranslationMap = Record<string, string>;
export type Translations = Record<Lang, TranslationMap>;

export type TranslationKey = keyof typeof kh | keyof typeof en;

export type TranslateFn = (
  key: TranslationKey,
  params?: Record<string, string | number>,
) => string;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: TranslateFn;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const translations: Translations = {
  kh: kh,
  en: en,
};

const LANG_KEY = LANGUAGE_CONFIG.storageKey;

function applyFont(lang: Lang): void {
  document.documentElement.style.setProperty(
    "--font-current",
    lang === "en" ? "var(--font-lexend)" : "var(--font-sans)"
  );
  document.documentElement.lang = lang === "en" ? "en" : "km";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start from the default language so server and client render the same
  // markup, then sync with the persisted choice after hydration.
  const [lang, setLang] = useState<Lang>(LANGUAGE_CONFIG.defaultLanguage);
  const skipNextPersist = useRef(true);

  // Read the persisted language once, after hydration.
  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_KEY);
    const initial = LANGUAGE_CONFIG.supportedLanguages.includes(stored as Lang)
      ? (stored as Lang)
      : LANGUAGE_CONFIG.defaultLanguage;
    setLang(initial);
    applyFont(initial);
  }, []);

  // Persist + apply font on every subsequent change (skips the mount run).
  useEffect(() => {
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    window.localStorage.setItem(LANG_KEY, lang);
    applyFont(lang);
  }, [lang]);

  const t: TranslateFn = (key, params) => {
    let str =
      translations[lang][key] ?? translations[LANGUAGE_CONFIG.defaultLanguage][key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };

  const toggleLang = () =>
    setLang((l) =>
      l === LANGUAGE_CONFIG.supportedLanguages[0]
        ? LANGUAGE_CONFIG.supportedLanguages[1]
        : LANGUAGE_CONFIG.supportedLanguages[0]
    );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error(
      "useLanguage must be used within LanguageProvider. Make sure the component is wrapped in <LanguageProvider>"
    );
  return ctx;
}
