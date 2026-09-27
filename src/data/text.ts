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

/* ------------------------------------------------------------------ *
 * Bilingual page data                                                  *
 * ------------------------------------------------------------------ */

/**
 * A piece of display copy, in the languages it actually exists in.
 *
 * Both sides are optional on purpose. The deeper pages were never fully
 * translated — of 776 unique strings only 137 carry both languages — so a type
 * that demanded both would have meant either inventing the missing 639 or
 * duplicating the present one. Instead a missing side is written as a missing
 * side, which does three useful things: the reader sees real copy in whichever
 * language exists rather than an empty card, `grep 'kh: {$'` finds the
 * outstanding translations, and the type stops the data from pretending to be
 * bilingual when it is not.
 */
export interface PageCopy {
  kh?: string;
  en?: string;
}

/**
 * Picks the copy to show. Falls back to whichever language the field does have,
 * preferring English — the language a Khmer-only string is most likely to be
 * wanted in, and the one already established as the fallback by
 * {@link resolveText}.
 */
export function resolveCopy(copy: PageCopy, lang: Lang): string {
  return copy[lang] ?? copy.en ?? copy.kh ?? "";
}

/**
 * The same data shape with every piece of display copy turned into a
 * {@link PageCopy} pair. Page data is authored per language and resolved once,
 * during render, rather than being written as one string holding both — which
 * is how the deeper pages used to end up printing "លក្ខខណ្ឌចូលរៀន (Entry
 * Criteria)" whatever the reader had chosen.
 *
 * Numbers, booleans and optionality pass through untouched, so a bar's `value`
 * stays a number and an omitted `subtitle` stays omitted.
 *
 * `Verbatim` names the fields that are strings but not *copy*. It is only
 * needed for those typed as a bare `string` — a slash, a bank code, a URL,
 * a generated index — because a `string` is otherwise indistinguishable from
 * copy:
 *
 * ```ts
 * type ContactProfile = Bilingual<ContactCardData, "avatar">;
 * ```
 *
 * An `IconName` or an `AdmissionsTone` needs no listing: those are unions of
 * string *literals*, which {@link Bilingual} recognises as identifiers and
 * passes through. That is the distinction doing the work — copy is authored
 * as a bare `string`, an identifier as the closed set of values it may take.
 */
export type Bilingual<T, Verbatim extends PropertyKey = never> = T extends string
  ? string extends T
    ? PageCopy
    : T
  : // Distributed on purpose, so `subtitle?: string` becomes
    // `subtitle?: PageCopy` rather than collapsing to `never`.
    T extends number | boolean | bigint | symbol | null | undefined
    ? T
    : T extends readonly (infer Item)[]
      ? Bilingual<Item, Verbatim>[]
      : { [K in keyof T]: K extends Verbatim ? T[K] : Bilingual<T[K], Verbatim> };

/**
 * The display shape {@link Bilingual} resolves back down to. Written as the
 * exact inverse of {@link Bilingual} — including leaving a plain `string` alone
 * — so that resolving a profile yields the component types unchanged and no
 * builder has to know copy was ever bilingual.
 */
export type Resolved<T> = T extends PageCopy
  ? string
  : T extends number | boolean | bigint | symbol | null | undefined
    ? T
    : // The mirror of the rule in {@link Bilingual}: a literal union is an
      // identifier and passes through, a bare `string` was copy and resolves
      // to the string it always was.
      T extends string
      ? T
      : T extends readonly (infer Item)[]
        ? Resolved<Item>[]
        : { [K in keyof T]: Resolved<T[K]> };

/**
 * A `PageCopy` and nothing else. Keys are checked against the allow-list rather
 * than counted, so an unrelated object cannot be mistaken for copy, and a
 * `PageCopy` is still recognised with only one of its two languages written.
 */
function isPageCopy(value: unknown): value is PageCopy {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const copy = value as Record<string, unknown>;
  const keys = Object.keys(copy);
  return (
    keys.length > 0 &&
    keys.length <= 2 &&
    keys.every(key => key === "kh" || key === "en") &&
    keys.some(key => typeof copy[key] === "string")
  );
}

/**
 * Walks a {@link Bilingual} structure and returns the active language's copy,
 * leaving every non-copy value (numbers, icon names, tones, file names) as it
 * was. Walks the whole tree in one pass so a section's copy is resolved in one
 * place instead of field by field.
 */
export function resolveBilingual<T>(value: unknown, lang: Lang): Resolved<T> {
  if (isPageCopy(value)) return resolveCopy(value, lang) as Resolved<T>;

  if (Array.isArray(value)) {
    return value.map(item => resolveBilingual(item, lang)) as Resolved<T>;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveBilingual(item, lang)]),
    ) as Resolved<T>;
  }

  return value as Resolved<T>;
}
