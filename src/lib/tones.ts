/**
 * Class maps of the semantic accents every feature card styles itself with.
 *
 * The data files store a tone *name* (`"blue" | "green" | …`) so they stay
 * free of Tailwind classes; this module owns the one mapping from that name
 * to class strings. It used to exist twice — once in
 * `components/university/admissions/tones.ts` and once in
 * `components/university/scholarships/tones.ts` — with `iconTone` and
 * `buttonTone` colliding between them; both features now read the same maps.
 *
 * Every entry is a literal class string so Tailwind's scanner sees it: a
 * template literal like `` `bg-${tone}-50` `` would be dropped from the
 * bundle. Feature tone unions (`AdmissionsTone`, `ScholarshipTone`) are
 * subsets of {@link Tone}, so indexing these records with them is safe.
 *
 * Dark theme lives in the same strings: the soft maps tint towards `X-950`
 * and lift their text to `X-200`/`X-300`, so a tone reads the same way on a
 * dark card as on a light one. `dark:hover:` pins mirror the light
 * `hover:` pins — without them the light hover colour wins the cascade in
 * dark mode (same specificity, later variant) and the chip flashes light
 * blue on hover.
 */

/** Every accent name the data files are allowed to use. */
export type Tone =
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "amber"
  | "orange"
  | "pink"
  | "slate";

/** Soft chip: date pill, "Non-refundable" tag, criterion badge. */
export const softTone: Record<Tone, string> = {
  blue: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-950/50",
  green: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950/50 dark:text-green-200 dark:hover:bg-green-950/50",
  red: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-200 dark:hover:bg-red-950/50",
  purple: "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-950/50 dark:text-purple-200 dark:hover:bg-purple-950/50",
  amber: "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-200 dark:hover:bg-amber-950/50",
  orange: "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-950/50 dark:text-orange-200 dark:hover:bg-orange-950/50",
  pink: "bg-pink-100 text-pink-800 hover:bg-pink-100 dark:bg-pink-950/50 dark:text-pink-200 dark:hover:bg-pink-950/50",
  slate: "bg-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-800",
};

/** Soft chip of a head: "រដ្ឋាភិបាល", "MPTC", a seat count… */
export const badgeTone: Record<Tone, string> = {
  blue: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900/50",
  green: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-300 dark:hover:bg-green-900/50",
  red: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-900/50",
  purple: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:hover:bg-purple-900/50",
  amber: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:hover:bg-amber-900/50",
  orange: "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:hover:bg-orange-900/50",
  pink: "bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:hover:bg-pink-900/50",
  slate: "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
};

/** Solid call-to-action button. */
export const buttonTone: Record<Tone, string> = {
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  red: "bg-red-600 hover:bg-red-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  amber: "bg-amber-600 hover:bg-amber-700",
  orange: "bg-orange-600 hover:bg-orange-700",
  pink: "bg-pink-600 hover:bg-pink-700",
  slate: "bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500",
};

/** Background of an icon tile. */
export const iconTileTone: Record<Tone, string> = {
  blue: "bg-blue-100 dark:bg-blue-950/50",
  green: "bg-green-100 dark:bg-green-950/50",
  red: "bg-red-100 dark:bg-red-950/50",
  purple: "bg-purple-100 dark:bg-purple-950/50",
  amber: "bg-amber-100 dark:bg-amber-950/50",
  orange: "bg-orange-100 dark:bg-orange-950/50",
  pink: "bg-pink-100 dark:bg-pink-950/50",
  slate: "bg-slate-200 dark:bg-slate-800",
};

/** Eyebrow label, head icon and any other accent on a light surface. */
export const iconTone: Record<Tone, string> = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  red: "text-red-600 dark:text-red-400",
  purple: "text-purple-600 dark:text-purple-400",
  amber: "text-amber-600 dark:text-amber-400",
  orange: "text-orange-600 dark:text-orange-400",
  pink: "text-pink-600 dark:text-pink-400",
  slate: "text-slate-600 dark:text-slate-400",
};

/** Muted icon colour of a list row. */
export const iconSoftTone: Record<Tone, string> = {
  blue: "text-blue-500 dark:text-blue-400",
  green: "text-green-500 dark:text-green-400",
  red: "text-red-500 dark:text-red-400",
  purple: "text-purple-500 dark:text-purple-400",
  amber: "text-amber-500 dark:text-amber-400",
  orange: "text-orange-500 dark:text-orange-400",
  pink: "text-pink-500 dark:text-pink-400",
  slate: "text-slate-500 dark:text-slate-400",
};

/** Icon sitting on the dark hero banner: dark in both themes, never changes. */
export const heroIconTone: Record<Tone, string> = {
  blue: "text-blue-400",
  green: "text-green-400",
  red: "text-red-400",
  purple: "text-purple-400",
  amber: "text-yellow-400",
  orange: "text-orange-400",
  pink: "text-pink-400",
  slate: "text-slate-300",
};

/** Gradient wash behind the head of a card. */
export const headerWashTone: Record<Tone, string> = {
  blue: "bg-gradient-to-r from-blue-50 to-card dark:from-blue-950/40",
  green: "bg-gradient-to-r from-green-50 to-card dark:from-green-950/40",
  red: "bg-gradient-to-r from-red-50 to-card dark:from-red-950/40",
  purple: "bg-gradient-to-r from-purple-50 to-card dark:from-purple-950/40",
  amber: "bg-gradient-to-r from-amber-50 to-card dark:from-amber-950/40",
  orange: "bg-gradient-to-r from-orange-50 to-card dark:from-orange-950/40",
  pink: "bg-gradient-to-r from-pink-50 to-card dark:from-pink-950/40",
  slate: "bg-gradient-to-r from-slate-50 to-card dark:from-slate-800",
};

/** Tinted panel: benefits, eligibility, the deadline note. */
export const panelTone: Record<Tone, string> = {
  blue: "border-blue-200 bg-blue-50 dark:border-blue-800/60 dark:bg-blue-950/30",
  green: "border-green-200 bg-green-50 dark:border-green-800/60 dark:bg-green-950/30",
  red: "border-red-200 bg-red-50 dark:border-red-800/60 dark:bg-red-950/30",
  purple: "border-purple-200 bg-purple-50 dark:border-purple-800/60 dark:bg-purple-950/30",
  amber: "border-amber-200 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-950/30",
  orange: "border-orange-200 bg-orange-50 dark:border-orange-800/60 dark:bg-orange-950/30",
  pink: "border-pink-200 bg-pink-50 dark:border-pink-800/60 dark:bg-pink-950/30",
  slate: "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40",
};

/** Heading inside a tinted panel. */
export const panelTitleTone: Record<Tone, string> = {
  blue: "text-blue-900 dark:text-blue-100",
  green: "text-green-900 dark:text-green-100",
  red: "text-red-900 dark:text-red-100",
  purple: "text-purple-900 dark:text-purple-100",
  amber: "text-amber-900 dark:text-amber-100",
  orange: "text-orange-900 dark:text-orange-100",
  pink: "text-pink-900 dark:text-pink-100",
  slate: "text-slate-800 dark:text-slate-100",
};

/** Round bullet of a `marker: "dot"` row. */
export const markerTone: Record<Tone, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  slate: "bg-slate-500",
};

/** Share bar of the seat-allocation grid (same fill as {@link markerTone}). */
export const barTone: Record<Tone, string> = markerTone;