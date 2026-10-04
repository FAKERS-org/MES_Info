import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface SectionCardProps {
    children: ReactNode;
    /** Merged after the defaults so a card can restyle itself (dark, `rounded-3xl`, page padding…). */
    className?: string;
}

/**
 * Surface shared by the cards of `/explore-universities/{university}` and
 * `/explore-universities/{university}/{department}`: rounded, bordered
 * and softly shadowed.
 */
export function SectionCard({ children, className }: SectionCardProps) {
    return (
        <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)}>
            {children}
        </div>
    );
}

const DEFAULT_ICON_TILE = "flex-shrink-0 rounded-lg bg-blue-100 dark:bg-blue-950/50 p-2.5 text-blue-600 dark:text-blue-400";
const DEFAULT_PADDING = "p-4 pb-1.5";
const DEFAULT_TITLE = "text-lg font-bold text-foreground";
const DEFAULT_SUBTITLE = "mt-0.5 text-sm font-medium text-muted-foreground";

export interface SectionCardHeaderProps {
    title: ReactNode;
    subtitle?: ReactNode;
    /** Icon rendered at the start of the header row. */
    icon?: ReactNode;
    /** Right aligned slot: status badge, counter, campus tag… Rendered as is, so it keeps its own visibility rules. */
    badge?: ReactNode;
    /** Extra slot below the title: highlight chip… */
    chip?: ReactNode;
    align?: "center" | "start";
    /**
     * The `*ClassName` props replace the default styles of their own slot
     * instead of merging with them, so a card keeps its original look.
     * Only `className` is additive (it is merged into the header row).
     */
    padding?: string;
    iconTileClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    className?: string;
}

/**
 * Icon + Khmer title + English subtitle (+ optional badge) header repeated by
 * every card of both detail pages.
 */
export function SectionCardHeader({
    title,
    subtitle,
    icon,
    badge,
    chip,
    align = "center",
    padding = DEFAULT_PADDING,
    iconTileClassName,
    titleClassName,
    subtitleClassName,
    className,
}: SectionCardHeaderProps) {
    return (
        <div className={cn("flex gap-3", align === "center" ? "items-center" : "items-start", padding, className)}>
            {icon !== undefined && <div className={iconTileClassName ?? DEFAULT_ICON_TILE}>{icon}</div>}

            <div className="min-w-0 flex-1">
                <h2 className={titleClassName ?? DEFAULT_TITLE}>{title}</h2>
                {subtitle !== undefined && <p className={subtitleClassName ?? DEFAULT_SUBTITLE}>{subtitle}</p>}
                {chip}
            </div>

            {badge}
        </div>
    );
}

export interface SectionCardBodyProps {
    children: ReactNode;
    /** Spacing of the body. Replaced as a whole when overridden. */
    padding?: string;
    className?: string;
}

/** Padded content area of a {@link SectionCard}. */
export function SectionCardBody({ children, padding = "p-4 pt-2 space-y-3", className }: SectionCardBodyProps) {
    return <div className={cn(padding, className)}>{children}</div>;
}
