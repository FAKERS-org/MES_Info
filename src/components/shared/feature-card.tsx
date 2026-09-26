import { SectionCard } from "@/components/shared/section-card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface FeatureCardHeader {
    /** Small uppercase label above the title ("Checklist", "Resource Hub"…). */
    eyebrow?: ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    /** Leading glyph of the head: inline with the eyebrow, else by the title. */
    icon?: ReactNode;
    /** Right aligned slot of the head row: meta note, badge, action… */
    action?: ReactNode;
    /** Colour of the eyebrow label and the icon (a `iconTone` entry). */
    accentClassName?: string;
    /** Gradient wash behind the head — the programme cards carry one. */
    washClassName?: string;
    /** Replaces the `text-xl font-bold text-slate-900` default of the title. */
    titleClassName?: string;
    /** Replaces the `text-sm text-slate-500` default of the subtitle. */
    subtitleClassName?: string;
}

export interface FeatureCardProps {
    /** Card head. Omit for a card that opens with its own body header. */
    header?: FeatureCardHeader;
    /** Extra classes on the card surface. */
    className?: string;
    /**
     * Extra classes on the body. Merged after the default padding, so a
     * conflicting utility (`p-5`) replaces it — Tailwind-merge resolves the
     * clash the way the caller intends.
     */
    bodyClassName?: string;
    children: ReactNode;
}

/**
 * The one card shell of the `/explore-universities/{university}` tabs: a
 * {@link SectionCard} surface, the head every section repeats (eyebrow →
 * title → subtitle, with the icon and an action on the right) and the padded
 * body, so each section component only writes its own body.
 *
 * It replaces the two shells that had drifted apart —
 * `university/admissions/admissions-card.tsx` and
 * `university/scholarships/scholarship-card.tsx`, which differed only in
 * head spacing, icon placement and the tone they spoke; the feature cards
 * keep speaking their own tone through `accentClassName` / `washClassName`.
 *
 * The head is stacked on purpose: a flex *row* would line the eyebrow, the
 * title and the subtitle up side by side.
 */
export function FeatureCard({ header, className, bodyClassName, children }: FeatureCardProps) {
    return (
        <SectionCard className={className}>
            {header && (
                <div className={cn("flex flex-col px-5 py-4", header.washClassName)}>
                    {header.eyebrow !== undefined ? (
                        <>
                            <div className="flex items-center justify-between gap-3">
                                <span
                                    className={cn(
                                        "flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-wider",
                                        header.accentClassName,
                                    )}
                                >
                                    {header.icon}
                                    <span className="truncate">{header.eyebrow}</span>
                                </span>
                                {header.action}
                            </div>
                            <h3 className={cn("mt-2 text-xl font-bold text-slate-900", header.titleClassName)}>
                                {header.title}
                            </h3>
                            {header.subtitle !== undefined && (
                                <p className={cn("mt-1 text-sm text-slate-500", header.subtitleClassName)}>
                                    {header.subtitle}
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between gap-3">
                                <h3 className={cn("min-w-0 text-xl font-bold text-slate-900", header.titleClassName)}>
                                    {header.title}
                                </h3>
                                {(header.icon !== undefined || header.action !== undefined) && (
                                    <div className="flex shrink-0 items-center gap-2">
                                        {header.icon}
                                        {header.action}
                                    </div>
                                )}
                            </div>
                            {header.subtitle !== undefined && (
                                <p className={cn("mt-1 text-sm text-slate-500", header.subtitleClassName)}>
                                    {header.subtitle}
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}

            <div className={cn("px-5 pb-5 pt-4", bodyClassName)}>{children}</div>
        </SectionCard>
    );
}
