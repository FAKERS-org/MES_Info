"use client";

import { LANGUAGE_CONFIG } from "@/config";
import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "./language";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE, langAttributes } from "./language";

export type { Lang };

type TranslationMap = Record<string, string>;
export type Translations = Record<Lang, TranslationMap>;

export type TranslationKey = keyof typeof kh | keyof typeof en;

export type TranslateFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

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
    initialLang: Lang;
}

export function LanguageProvider({ children, initialLang }: LanguageProviderProps) {
    const router = useRouter();
    const [lang, setLangState] = useState<Lang>(initialLang);

    useEffect(() => {
        applyFont(lang);
    }, [lang]);

    const setLang = (next: Lang) => {
        setLangState(next);
        document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
        router.refresh();
    };

    const toggleLang = () =>
        setLang(
            lang === LANGUAGE_CONFIG.supportedLanguages[0]
                ? LANGUAGE_CONFIG.supportedLanguages[1]
                : LANGUAGE_CONFIG.supportedLanguages[0],
        );

    const t: TranslateFn = (key, params) => {
        let str = translations[lang][key] ?? translations[LANGUAGE_CONFIG.defaultLanguage][key] ?? key;
        if (params) {
            for (const [k, v] of Object.entries(params)) {
                str = str.replace(`{${k}}`, String(v));
            }
        }
        return str;
    };

    return <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx)
        throw new Error(
            "useLanguage must be used within LanguageProvider. Make sure the component is wrapped in <LanguageProvider>",
        );
    return ctx;
}
