import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import { cookies } from "next/headers";
import type { TranslationKey } from "./i18n";
import { LANG_COOKIE, resolveLang } from "./language";
import type { Lang } from "./language";

export async function readLang(): Promise<Lang> {
    const store = await cookies();
    return resolveLang(store.get(LANG_COOKIE)?.value);
}

export function getServerTranslator(lang: Lang) {
    const dict = lang === "kh" ? kh : en;
    return (key: TranslationKey, params?: Record<string, string | number>): string => {
        let str = (dict as Record<string, string>)[key] ?? (en as Record<string, string>)[key] ?? key;
        if (params) {
            for (const [k, v] of Object.entries(params)) {
                str = str.replace(`{${k}}`, String(v));
            }
        }
        return str;
    };
}
