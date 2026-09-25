import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TileGridProps {
  children: ReactNode;
  /** Columns, gap and divider of the grid. */
  className?: string;
}

/**
 * Responsive tile grid shared by both pages: careers, facilities and the
 * stats row of the hero headers.
 */
export function TileGrid({ children, className }: TileGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>{children}</div>
  );
}
