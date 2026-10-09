import { cookies } from "next/headers";
import { LANG_COOKIE, resolveLang } from "./language";
import type { Lang } from "./language";

export async function readLang(): Promise<Lang> {
    const store = await cookies();
    return resolveLang(store.get(LANG_COOKIE)?.value);
}
