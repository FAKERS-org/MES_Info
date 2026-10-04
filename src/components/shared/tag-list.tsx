import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface TagListProps {
    children: ReactNode;
    /** Wrapping row: gap, overflow… */
    className?: string;
}

/** Flex wrap row of {@link Tag}s (syllabus tags, hiring partners, filters…). */
export function TagList({ children, className }: TagListProps) {
    return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>;
}

export interface TagProps {
    children: ReactNode;
    /** Leading glyph of the tag. */
    icon?: ReactNode;
    /** Surface: color, radius, padding… */
    className?: string;
    /** `button` renders an interactive pill (the filters of the university page). */
    as?: "span" | "button";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const TAG_CLASS =
    "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors";

/** Chip used by the tag rows of both detail pages. */
export function Tag({ children, icon, className, as = "span", onClick, type }: TagProps) {
    const classes = cn(TAG_CLASS, className);

    if (as === "button") {
        return (
            <button type={type} className={classes} onClick={onClick}>
                {icon}
                {children}
            </button>
        );
    }

    return (
        <span className={classes}>
            {icon}
            {children}
        </span>
    );
}
