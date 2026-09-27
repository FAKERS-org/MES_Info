/**
 * The active language, as a value both the server and the client can agree on.
 *
 * This lives apart from `@/lib/i18n` on purpose: that module is `"use client"`,
 * so a Server Component importing anything from it gets a client reference
 * rather than the real binding — and the language is exactly what a Server
 * Component needs, now that page copy is resolved during render.
 *
 * It is a cookie rather than `localStorage` because server-rendered copy has to
 * know the language before the first byte of HTML. With `localStorage` the
 * server can only ever guess, which is why the deeper pages used to bake both
 * languages into every title — see `getAdmissionsPageData`.
 */

import { LANGUAGE_CONFIG } from "@/config";

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

/**
 * Coerces anything — a cookie value, a query param, a stale localStorage entry
 * — to a language the app actually supports, falling back to the default. Used
 * on every read so a hand-edited cookie degrades to Khmer instead of rendering
 * an undefined language.
 */
export function resolveLang(value: unknown): Lang {
    return LANGUAGE_CONFIG.supportedLanguages.includes(value as Lang)
        ? (value as Lang)
        : LANGUAGE_CONFIG.defaultLanguage;
}

/**
 * The document attributes that follow from the language, so the first paint
 * already carries the right `lang` and the right font — no flash, and the
 * markup is readable by a screen reader and by search engines in the language
 * actually being shown.
 */
export function langAttributes(lang: Lang): { htmlLang: string; fontStack: string } {
    return {
        htmlLang: lang === "en" ? "en" : "km",
        fontStack: lang === "en" ? "var(--font-lexend)" : "var(--font-sans)",
    };
}
