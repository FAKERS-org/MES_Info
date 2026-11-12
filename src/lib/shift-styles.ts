import type { DeliveryShift } from "@/lib/bac2";
import type { StudyShift } from "@/lib/language";
import {
  CalendarDays,
  Clock,
  Moon,
  Sun,
  Sunset,
  type LucideIcon,
} from "lucide-react";

export interface ShiftFilterConfig {
  id: DeliveryShift;
  icon: LucideIcon;
  iconColor: string;
  active: string;
  hover: string;
}

export const SHIFT_FILTER_CONFIG: Record<DeliveryShift, ShiftFilterConfig> = {
  Morning: {
    id: "Morning",
    icon: Sun,
    iconColor: "text-amber-500 dark:text-amber-400",
    active:
      "bg-amber-500 text-white border-amber-500 shadow-2xs dark:bg-amber-600 dark:border-amber-600",
    hover:
      "hover:border-amber-300 hover:bg-amber-50/70 hover:text-amber-900 dark:hover:border-amber-700/60 dark:hover:bg-amber-950/25 dark:hover:text-amber-200",
  },
  Afternoon: {
    id: "Afternoon",
    icon: Sunset,
    iconColor: "text-orange-500 dark:text-orange-400",
    active:
      "bg-orange-500 text-white border-orange-500 shadow-2xs dark:bg-orange-600 dark:border-orange-600",
    hover:
      "hover:border-orange-300 hover:bg-orange-50/70 hover:text-orange-900 dark:hover:border-orange-700/60 dark:hover:bg-orange-950/25 dark:hover:text-orange-200",
  },
  Evening: {
    id: "Evening",
    icon: Moon,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    active:
      "bg-indigo-600 text-white border-indigo-600 shadow-2xs dark:bg-indigo-600 dark:border-indigo-600",
    hover:
      "hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-900 dark:hover:border-indigo-700/60 dark:hover:bg-indigo-950/25 dark:hover:text-indigo-200",
  },
  Weekend: {
    id: "Weekend",
    icon: CalendarDays,
    iconColor: "text-teal-600 dark:text-teal-400",
    active:
      "bg-teal-600 text-white border-teal-600 shadow-2xs dark:bg-teal-600 dark:border-teal-600",
    hover:
      "hover:border-teal-300 hover:bg-teal-50/70 hover:text-teal-900 dark:hover:border-teal-700/60 dark:hover:bg-teal-950/25 dark:hover:text-teal-200",
  },
};

export interface ShiftBadgeConfig {
  icon: LucideIcon;
  badge: string;
  iconColor: string;
}

export const SHIFT_BADGE_CONFIG: Record<StudyShift, ShiftBadgeConfig> = {
  MORNING: {
    icon: Sun,
    badge:
      "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-300/40 dark:border-amber-800/40",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  AFTERNOON: {
    icon: Sunset,
    badge:
      "bg-orange-500/10 text-orange-800 dark:text-orange-300 border-orange-300/40 dark:border-orange-800/40",
    iconColor: "text-orange-500 dark:text-orange-400",
  },
  EVENING: {
    icon: Moon,
    badge:
      "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-300/40 dark:border-indigo-800/40",
    iconColor: "text-indigo-500 dark:text-indigo-400",
  },
  WEEKEND: {
    icon: CalendarDays,
    badge:
      "bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-300/40 dark:border-teal-800/40",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
};

export function getShiftBadgeConfig(
  shift: string | undefined | null,
): ShiftBadgeConfig {
  if (!shift) {
    return {
      icon: Clock,
      badge: "bg-muted/40 text-muted-foreground border-border/60",
      iconColor: "text-muted-foreground/70",
    };
  }
  const key = shift.toUpperCase() as StudyShift;
  return (
    SHIFT_BADGE_CONFIG[key] ?? {
      icon: Clock,
      badge: "bg-muted/40 text-muted-foreground border-border/60",
      iconColor: "text-muted-foreground/70",
    }
  );
}
