import type { AdmissionsTone } from "@/data/admissions-page";

/**
 * Class maps of the accents the admissions data names semantically. The data
 * stores `"blue" | "green" | …`, so every card styles its chips, tiles and
 * buttons the same way and Tailwind still sees the classes literally.
 */

/** Soft chip: date pill, "Non-refundable" tag, criterion badge. */
export const softTone: Record<AdmissionsTone, string> = {
  blue: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  green: "bg-green-100 text-green-800 hover:bg-green-100",
  red: "bg-red-100 text-red-800 hover:bg-red-100",
  purple: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  amber: "bg-amber-100 text-amber-800 hover:bg-amber-100",
};

/** Solid call-to-action button. */
export const buttonTone: Record<AdmissionsTone, string> = {
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  red: "bg-red-600 hover:bg-red-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  amber: "bg-amber-600 hover:bg-amber-700",
};

/** Background of an icon tile. */
export const iconTileTone: Record<AdmissionsTone, string> = {
  blue: "bg-blue-100",
  green: "bg-green-100",
  red: "bg-red-100",
  purple: "bg-purple-100",
  amber: "bg-amber-100",
};

/** Icon sitting on one of {@link iconTileTone}. */
export const iconTone: Record<AdmissionsTone, string> = {
  blue: "text-blue-600",
  green: "text-green-600",
  red: "text-red-600",
  purple: "text-purple-600",
  amber: "text-amber-600",
};

/** Muted icon colour of a list row. */
export const iconSoftTone: Record<AdmissionsTone, string> = {
  blue: "text-blue-500",
  green: "text-green-500",
  red: "text-red-500",
  purple: "text-purple-500",
  amber: "text-amber-500",
};

/** Eyebrow label and head icon of a card. */
export const accentTone: Record<AdmissionsTone, string> = {
  blue: "text-blue-600",
  green: "text-green-600",
  red: "text-red-600",
  purple: "text-purple-600",
  amber: "text-amber-600",
};
