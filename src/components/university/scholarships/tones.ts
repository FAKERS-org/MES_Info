import type { ScholarshipTone } from "@/data/scholarships-page";

/**
 * Class maps of the accents the scholarships data names semantically. The
 * data stores `"blue" | "purple" | …`, so every card styles its eyebrow,
 * badge, panel, marker and button the same way and Tailwind still sees the
 * classes literally (a template literal like `` `bg-${tone}-50` `` would be
 * dropped by the scanner).
 */

/** Eyebrow label and head icon of a card. */
export const eyebrowTone: Record<ScholarshipTone, string> = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  green: "text-green-600",
  amber: "text-amber-600",
  orange: "text-orange-600",
  red: "text-red-600",
  pink: "text-pink-600",
  slate: "text-slate-600",
};

/** Soft chip of the head: "រដ្ឋាភិបាល", "MPTC", a seat count… */
export const badgeTone: Record<ScholarshipTone, string> = {
  blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  green: "bg-green-100 text-green-700 hover:bg-green-200",
  amber: "bg-amber-100 text-amber-700 hover:bg-amber-200",
  orange: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  red: "bg-red-100 text-red-700 hover:bg-red-200",
  pink: "bg-pink-100 text-pink-700 hover:bg-pink-200",
  slate: "bg-slate-200 text-slate-700 hover:bg-slate-300",
};

/** Icon sitting on a white or light surface. */
export const iconTone: Record<ScholarshipTone, string> = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  green: "text-green-600",
  amber: "text-amber-600",
  orange: "text-orange-600",
  red: "text-red-600",
  pink: "text-pink-600",
  slate: "text-slate-600",
};

/** Icon sitting on the dark hero banner. */
export const heroIconTone: Record<ScholarshipTone, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  green: "text-green-400",
  amber: "text-yellow-400",
  orange: "text-orange-400",
  red: "text-red-400",
  pink: "text-pink-400",
  slate: "text-slate-300",
};

/** Wash behind the head of a card. */
export const headerWashTone: Record<ScholarshipTone, string> = {
  blue: "bg-gradient-to-r from-blue-50 to-white",
  purple: "bg-gradient-to-r from-purple-50 to-white",
  green: "bg-gradient-to-r from-green-50 to-white",
  amber: "bg-gradient-to-r from-amber-50 to-white",
  orange: "bg-gradient-to-r from-orange-50 to-white",
  red: "bg-gradient-to-r from-red-50 to-white",
  pink: "bg-gradient-to-r from-pink-50 to-white",
  slate: "bg-gradient-to-r from-slate-50 to-white",
};

/** Tinted panel: benefits, eligibility, the deadline note. */
export const panelTone: Record<ScholarshipTone, string> = {
  blue: "border-blue-200 bg-blue-50",
  purple: "border-purple-200 bg-purple-50",
  green: "border-green-200 bg-green-50",
  amber: "border-amber-200 bg-amber-50",
  orange: "border-orange-200 bg-orange-50",
  red: "border-red-200 bg-red-50",
  pink: "border-pink-200 bg-pink-50",
  slate: "border-slate-200 bg-slate-50",
};

/** Heading inside a tinted panel. */
export const panelTitleTone: Record<ScholarshipTone, string> = {
  blue: "text-blue-900",
  purple: "text-purple-900",
  green: "text-green-900",
  amber: "text-amber-900",
  orange: "text-orange-900",
  red: "text-red-900",
  pink: "text-pink-900",
  slate: "text-slate-800",
};

/** Round bullet of a `marker: "dot"` row. */
export const markerTone: Record<ScholarshipTone, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-green-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  pink: "bg-pink-500",
  slate: "bg-slate-500",
};

/** Solid call-to-action button. */
export const buttonTone: Record<ScholarshipTone, string> = {
  blue: "bg-blue-600 hover:bg-blue-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  green: "bg-green-600 hover:bg-green-700",
  amber: "bg-amber-600 hover:bg-amber-700",
  orange: "bg-orange-600 hover:bg-orange-700",
  red: "bg-red-600 hover:bg-red-700",
  pink: "bg-pink-600 hover:bg-pink-700",
  slate: "bg-slate-700 hover:bg-slate-800",
};

/** Share bar of the seat-allocation grid. */
export const barTone: Record<ScholarshipTone, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-green-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  pink: "bg-pink-500",
  slate: "bg-slate-500",
};
