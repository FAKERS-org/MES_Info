import { IconList, IconListItem } from "@/components/shared/icon-list";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

export interface CheckListProps {
    children: ReactNode;
    /** Row spacing, dividers… */
    className?: string;
    /** `ul` renders a semantic list, `div` a plain stack. */
    as?: "div" | "ul";
}

/** Vertical stack of {@link CheckItem} rows: requirements, benefits, items… */
export function CheckList({ children, className, as = "ul" }: CheckListProps) {
    return (
        <IconList as={as} className={cn("gap-2.5", className)}>
            {children}
        </IconList>
    );
}

export interface CheckItemProps {
    children: ReactNode;
    /** Replaces the default blue check (a tinted check, another glyph…). */
    icon?: ReactNode;
    /** Merged into the default check: size, colour… */
    iconClassName?: string;
    /** Row spacing: gap, alignment… */
    className?: string;
    as?: "div" | "li";
}

/** One `check + text` row of a {@link CheckList}. */
export function CheckItem({ children, icon, iconClassName, className, as = "li" }: CheckItemProps) {
    return (
        <IconListItem
            as={as}
            className={cn("gap-2.5", className)}
            icon={icon ?? <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0 text-blue-600", iconClassName)} />}
        >
            {children}
        </IconListItem>
    );
}
