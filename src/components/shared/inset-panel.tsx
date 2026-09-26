import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface InsetPanelProps {
    children: ReactNode;
    /** Layout of the content: spacing, grid… */
    className?: string;
    /** Surface: the slate default can be re-tinted with a `panelTone` entry. */
    toneClassName?: string;
}

/**
 * The grey box cards nest inside themselves: an eligibility cell, an FAQ
 * entry, a download block, a grouped sub-card… Tinted variants (the
 * scholarship panels) reuse it through `toneClassName`, so the nesting
 * surface stays one decision instead of five.
 */
export function InsetPanel({ children, className, toneClassName }: InsetPanelProps) {
    return (
        <div className={cn("rounded-lg border border-slate-200 bg-slate-50 p-4", toneClassName, className)}>
            {children}
        </div>
    );
}
