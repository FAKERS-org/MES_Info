import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface StepListProps {
    children: ReactNode;
    /** Spacing between the steps. */
    className?: string;
}

/**
 * Vertical run of numbered steps — the admissions roadmap and the
 * scholarships "how to apply" rail. The circle and the connector live on the
 * item; the list only owns the stack.
 */
export function StepList({ children, className }: StepListProps) {
    return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
}

export interface StepListItemProps {
    children: ReactNode;
    /** Number or glyph shown in the circle. */
    number: ReactNode;
    /** `md` (40px) is the wide roadmap circle, `sm` (32px) the rail one. */
    size?: "md" | "sm";
    /** Draws the rail down to the next step (needs the list's `connector`). */
    connector?: boolean;
    /** Row spacing: gap, bottom padding… */
    className?: string;
    /** Content column spacing: bottom padding of the step. */
    contentClassName?: string;
}

const CIRCLE = {
    md: "h-10 w-10 text-lg",
    sm: "h-8 w-8 text-sm",
};

/** One `circle + content` row of a {@link StepList}. */
export function StepListItem({
    children,
    number,
    size = "md",
    connector = false,
    className,
    contentClassName,
}: StepListItemProps) {
    return (
        <div className={cn("flex gap-3", className)}>
            <div className="flex shrink-0 flex-col items-center">
                <span
                    className={cn(
                        "flex items-center justify-center rounded-full bg-blue-600 font-bold text-white",
                        CIRCLE[size],
                    )}
                >
                    {number}
                </span>
                {connector && <span className="mt-2 h-full w-0.5 bg-slate-200" />}
            </div>

            <div className={cn("min-w-0 flex-1", contentClassName)}>{children}</div>
        </div>
    );
}
