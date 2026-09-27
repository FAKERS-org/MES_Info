/**
 * Reading the active language on the server.
 *
 * Split from `@/lib/language` because that module is imported by the client
 * `LanguageProvider`, and `cookies()` may only be called in a Server Component
 * or a Route Handler. The `.server` suffix is the boundary: importing this from
 * a `"use client"` file is a build error rather than a runtime surprise.
 *
 * A page whose copy is Server-rendered needs this. Reading the language on the
 * client instead leaves the server guessing, and a page that has to guess can
 * only do so by printing both languages at once.
 */

import { cookies } from "next/headers";
import { LANG_COOKIE, resolveLang } from "./language";
import type { Lang } from "./language";

/**
 * The language this request is being read in, taken from the cookie the
 * language switcher writes.
 *
 * Marked async because `cookies()` is: awaiting it is what opts the route out of
 * static prerendering, so it is paid for on purpose and only where server-rendered
 * copy actually needs it. An absent or unrecognised cookie falls back to the
 * configured default rather than rendering an undefined language.
 */
export async function readLang(): Promise<Lang> {
    const store = await cookies();
    return resolveLang(store.get(LANG_COOKIE)?.value);
}
