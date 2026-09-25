import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface IconListProps {
  children: ReactNode;
  /** Spacing of the rows plus any row-independent styling (divider, tint…). */
  className?: string;
  /** `ul` renders a semantic list, `div` a plain stack. */
  as?: "div" | "ul";
}

/** Vertical stack of {@link IconListItem} rows (facts, contacts, requirements). */
export function IconList({ children, className, as = "div" }: IconListProps) {
  const Element = as;
  return (
    <Element className={cn("flex flex-col gap-3", className)}>{children}</Element>
  );
}

export interface IconListItemProps {
  children: ReactNode;
  /** Leading glyph of the row. */
  icon?: ReactNode;
  /** Row alignment and spacing. */
  className?: string;
  as?: "div" | "li";
}

/** One `icon + content` row of an {@link IconList}. */
export function IconListItem({
  children,
  icon,
  className,
  as = "div",
}: IconListItemProps) {
  const Element = as;
  return (
    <Element className={cn("flex items-start gap-3", className)}>
      {icon}
      {children}
    </Element>
  );
}
