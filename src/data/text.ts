import type { NamespacedText } from "./universities";
import type { Lang } from "@/lib/i18n";

/**
 * Picks the copy for the active language out of a {@link NamespacedText}
 * field, falling back to the English string when the key is missing.
 *
 * Shared by every card that renders data-file content, so it lives here
 * next to the {@link NamespacedText} type it reads — not inside a page mock.
 */
export function resolveText(text: NamespacedText, lang: Lang): string {
  return text[lang] ?? text.en;
}
