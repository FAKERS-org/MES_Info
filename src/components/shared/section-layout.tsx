import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface SectionLayoutProps {
    children: ReactNode;
    /** Side column. When omitted, the main content spans the full width. */
    aside?: ReactNode;
    /** Breakpoint of the 2/1 split: `xl` on the department page, `md` on the university page. */
    breakpoint?: "md" | "xl";
    /**
     * `muted` renders the band the department page stacks its sections in.
     * The band is the padding around a card, so it must stay *recessive*: a
     * shade off the page (`bg-muted` on light) and the page colour itself in
     * dark, where a lighter band would out-shout the `bg-card` it frames.
     * Its `py-6` is also the page's only vertical rhythm — stack bands with
     * no `space-y-*` between them and each gap is two of them.
     */
    background?: "none" | "muted";
    mainClassName?: string;
    asideClassName?: string;
    className?: string;
}

/**
 * Responsive classes of the 2/1 split. They are spelled out instead of built
 * from `${breakpoint}:…` because Tailwind only generates the class names it
 * finds written literally in the source, so a template literal silently drops
 * the whole split (the grid stayed on `grid-cols-1` and never spanned).
 */
const GRID_COLS = {
    md: "md:grid-cols-3",
    xl: "xl:grid-cols-3",
} as const;

const MAIN_SPAN = {
    md: "md:col-span-2",
    xl: "xl:col-span-2",
} as const;

const ASIDE_SPAN = {
    md: "md:col-span-1",
    xl: "xl:col-span-1",
} as const;

/**
 * Page band wrapping a wide main column plus a narrow side column, used by
 * both detail pages of `/explore-universities`.
 */
export function SectionLayout({
    children,
    aside,
    breakpoint = "xl",
    background = "none",
    mainClassName,
    asideClassName,
    className,
}: SectionLayoutProps) {
    return (
        <div className={cn(background === "muted" && "flex items-start justify-center bg-muted py-6 dark:bg-background", className)}>
            <div className={cn("grid w-full max-w-full grid-cols-1 gap-4", aside && GRID_COLS[breakpoint])}>
                <div className={cn(aside && MAIN_SPAN[breakpoint], mainClassName)}>{children}</div>

                {aside && (
                    <div className={cn("flex flex-col gap-4", ASIDE_SPAN[breakpoint], asideClassName)}>{aside}</div>
                )}
            </div>
        </div>
    );
}
