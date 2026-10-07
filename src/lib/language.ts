import { LANGUAGE_CONFIG } from "@/config";
import type { NamespacedText } from "@/data/universities";

/** The languages the UI ships. */
export type Lang = (typeof LANGUAGE_CONFIG.supportedLanguages)[number];

/**
 * Cookie holding the language choice. Named after
 * {@link LANGUAGE_CONFIG.storageKey} so the existing setting and this one are
 * the same knob.
 */
export const LANG_COOKIE = LANGUAGE_CONFIG.storageKey;

/** A year: reading language is a durable preference, not a session setting. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function resolveLang(value: unknown): Lang {
    return LANGUAGE_CONFIG.supportedLanguages.includes(value as Lang)
        ? (value as Lang)
        : LANGUAGE_CONFIG.defaultLanguage;
}

export function langAttributes(lang: Lang): { htmlLang: string; fontStack: string } {
    return {
        htmlLang: lang === "en" ? "en" : "km",
        fontStack: lang === "en" ? "var(--font-lexend)" : "var(--font-sans)",
    };
}

export function localize(text: NamespacedText | undefined, lang: Lang): string {
    if (!text) return "";
    return text[lang] || text.en;
}

export function apiName(row: { name_en: string; name_kh?: string | null }, lang: Lang): string {
    return lang === "kh" ? row.name_kh || row.name_en : row.name_en;
}
