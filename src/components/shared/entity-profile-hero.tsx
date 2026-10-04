import { EntityHero, EntityHeroLogo, EntityHeroStats, type EntityHeroLogoProps } from "@/components/shared/entity-hero";
import { Icon } from "@/components/shared/icon-renderer";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

/** One line of the key-figures row at the bottom of the hero. */
export interface EntityProfileHeroStat {
    icon: IconName;
    label: ReactNode;
    value: ReactNode;
}

export interface EntityProfileHeroProps {
    /** Card surface overrides (font, margin…). */
    className?: string;
    /** Gradient of the banner strip. */
    bannerClassName: string;
    /** Badges pinned to the top-left of the banner. */
    bannerBadges?: ReactNode;
    /** Icon buttons pinned to the top-right of the banner. */
    bannerActions?: ReactNode;
    /** Logo: image, background, or an initials fallback. */
    logo: Omit<EntityHeroLogoProps, "containerClassName" | "className">;
    title: ReactNode;
    /** Small chip beside the title ("ITC", the school's code…). */
    titleBadge?: ReactNode;
    subtitle?: ReactNode;
    /** Left side of the row under the name: chips of facts. */
    badges?: ReactNode;
    /** Right side of that row: the primary action and its satellites. */
    actions?: ReactNode;
    stats: EntityProfileHeroStat[];
}

/** Subtle grid pattern painted over the banner of both profile headers. */
function BannerGridPattern() {
    return (
        <div
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
            }}
        />
    );
}

/**
 * The profile header shared by `/explore-universities/{university}` and its
 * nested `/{department}` page: gradient banner (grid pattern, badges, actions,
 * logo) → entity name and fact chips → key figures.
 *
 * It replaces `university/university-id-card.tsx` and
 * `department/department-id-heading.tsx`, which had drifted into two copies
 * of the same markup — the department one only kept the name block in flow on
 * mobile, which is the behaviour both now share. Everything entity specific
 * (gradient, badges, actions, logo) arrives as props, so each page still
 * speaks only its own data.
 */
export function EntityProfileHero({
    className,
    bannerClassName,
    bannerBadges,
    bannerActions,
    logo,
    title,
    titleBadge,
    subtitle,
    badges,
    actions,
    stats,
}: EntityProfileHeroProps) {
    return (
        <EntityHero
            className={cn("border-border text-card-foreground transition-all", className)}
            bannerClassName={cn("relative h-56", bannerClassName)}
            banner={
                <>
                    <BannerGridPattern />

                    {bannerBadges !== undefined && (
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">{bannerBadges}</div>
                    )}

                    {bannerActions !== undefined && (
                        <div className="absolute right-4 top-4 flex gap-2">{bannerActions}</div>
                    )}

                    <EntityHeroLogo
                        {...logo}
                        containerClassName="absolute -bottom-20 left-6"
                        className="h-40 w-40 p-1 shadow-xl"
                        check={
                            logo.check ?? (
                                <CheckCircle2 className="absolute -bottom-1 -right-1 h-6 w-6 fill-white text-green-500 dark:text-green-400" />
                            )
                        }
                    />
                </>
            }
            bodyClassName="px-5 pb-5 pt-20"
        >
            {/* Name: in flow on mobile, on the banner split from md up. */}
            <div className="mb-3 md:absolute md:left-[196px] md:-top-11 md:right-6 md:-translate-y-1/2 md:mb-0">
                <div className="flex flex-wrap items-center gap-1.5">
                    <h1 className="text-xl font-bold text-foreground md:text-white">{title}</h1>
                    {titleBadge}
                </div>
                {subtitle !== undefined && <p className="mt-0.5 text-sm text-muted-foreground md:text-teal-100">{subtitle}</p>}
            </div>

            {/* Fact chips + actions — next to the logo, just below the split. */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5 md:absolute md:left-[196px] md:right-6 md:top-4 md:mt-0">
                <div className="flex flex-wrap items-center gap-1.5">{badges}</div>
                <div className="flex flex-wrap items-center justify-end gap-2 md:flex-nowrap">{actions}</div>
            </div>

            <hr className="my-4 border-border" />

            <EntityHeroStats
                className="grid-cols-2 gap-4 md:grid-cols-4"
                items={stats.map(stat => ({
                    icon: <Icon name={stat.icon} className="h-5 w-5 text-muted-foreground/70" />,
                    iconClassName: "mt-0.5",
                    label: stat.label,
                    labelClassName: "mb-0.5 text-xs text-muted-foreground",
                    value: stat.value,
                    valueClassName: "text-sm font-semibold text-foreground",
                    className: "items-start gap-3",
                }))}
            />
        </EntityHero>
    );
}
