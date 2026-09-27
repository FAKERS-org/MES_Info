"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import kh from "@/locales/kh.json";
import en from "@/locales/en.json";
import { LANGUAGE_CONFIG } from "@/config";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE, langAttributes, resolveLang } from "./language";
import type { Lang } from "./language";

export type { Lang };

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

function applyFont(lang: Lang): void {
  const { htmlLang, fontStack } = langAttributes(lang);
  document.documentElement.style.setProperty("--font-current", fontStack);
  document.documentElement.lang = htmlLang;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
  /**
   * The language the server already resolved from the cookie. It is passed in
   * rather than read here so the first client render matches the server's HTML
   * exactly; reading `localStorage` on mount is what used to make the page
   * paint in one language and then switch to another.
   */
  initialLang: Lang;
}

export function LanguageProvider({ children, initialLang }: LanguageProviderProps) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang);

  /* Keep the document in step when the language changes without a reload. The
   * server already set both of these for the first paint, so this only has to
   * cover the change. */
  useEffect(() => {
    applyFont(lang);
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
    /* Copy rendered by Server Components — every card on the university and
     * department pages — is baked during the server render, so the new language
     * only reaches it once that tree is re-fetched. Without this the chrome
     * would switch while the page body stayed in the old language. */
    router.refresh();
  };

  const toggleLang = () =>
    setLang(
      lang === LANGUAGE_CONFIG.supportedLanguages[0]
        ? LANGUAGE_CONFIG.supportedLanguages[1]
        : LANGUAGE_CONFIG.supportedLanguages[0],
    );

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
