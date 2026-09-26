import { TileGrid } from "@/components/shared/tile-grid";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

export interface EntityHeroProps {
    children: ReactNode;
    /** Card surface overrides (border color, radius, font…). */
    className?: string;
    /**
     * Gradient strip behind the logo. It owns its own positioning: in flow on
     * the university page, absolutely anchored on the department page.
     */
    bannerClassName?: string;
    /** Overlay of the banner (badges, actions, entity name…). */
    banner?: ReactNode;
    /** Spacing of the content area below/over the banner. */
    bodyClassName?: string;
}

/**
 * Shell shared by the profile headers of `/explore-universities/{university}`
 * and `/explore-universities/{university}/{department}`: white card → gradient
 * banner → content area.
 */
export function EntityHero({ children, className, bannerClassName, banner, bodyClassName }: EntityHeroProps) {
    return (
        <div
            className={cn(
                "relative w-full max-w-full overflow-hidden rounded-2xl border bg-white shadow-lg",
                className,
            )}
        >
            {banner !== undefined || bannerClassName !== undefined ? (
                <div className={bannerClassName}>{banner}</div>
            ) : null}
            <div className={cn("relative", bodyClassName)}>{children}</div>
        </div>
    );
}

export interface EntityHeroLogoProps {
    /** Logo image. When omitted, `fallback` is rendered inside the circle. */
    src?: string;
    alt?: string;
    /** Content of the inner circle when there is no `src`. */
    fallback?: ReactNode;
    /** Positioning of the logo inside the hero. */
    containerClassName?: string;
    /** Circle surface: size, padding, shadow… */
    className?: string;
    /** Inner circle surface (background, border…). */
    innerClassName?: string;
    imageClassName?: string;
    /** Passed to `next/image` — the CSS width of the circle, for srcset sizing. */
    sizes?: string;
    /** Hero logos sit above the fold, so they are preloaded by default. */
    priority?: boolean;
    /** Verified badge anchored to the circle. */
    check?: ReactNode;
}

/**
 * Circular entity logo with the verified check used by both hero headers.
 */
export function EntityHeroLogo({
    src,
    alt,
    fallback,
    containerClassName,
    className,
    innerClassName,
    imageClassName,
    // `h-40 w-40 p-1` in EntityProfileHero → 152px inner circle.
    sizes = "152px",
    priority = true,
    check,
}: EntityHeroLogoProps) {
    return (
        <div className={cn("relative", containerClassName)}>
            <div className="relative">
                <div className={cn("flex items-center justify-center rounded-full bg-white", className)}>
                    <div
                        className={cn(
                            "relative flex h-full w-full items-center justify-center overflow-hidden rounded-full",
                            innerClassName,
                        )}
                    >
                        {src !== undefined ? (
                            <Image
                                fill
                                src={src}
                                alt={alt ?? ""}
                                sizes={sizes}
                                priority={priority}
                                className={cn("object-cover", imageClassName)}
                            />
                        ) : (
                            fallback
                        )}
                    </div>
                </div>

                {check}
            </div>
        </div>
    );
}

export interface EntityHeroStatItem {
    icon?: ReactNode;
    label: ReactNode;
    value: ReactNode;
    /** Item surface (alignment, tile, spacing…). */
    className?: string;
    /** Wrapper around the icon. */
    iconClassName?: string;
    labelClassName?: string;
    valueClassName?: string;
}

export interface EntityHeroStatsProps {
    items: EntityHeroStatItem[];
    /** Grid classes: columns, gap, divider… */
    className?: string;
}

/**
 * Bottom row of key figures shared by both hero headers.
 */
export function EntityHeroStats({ items, className }: EntityHeroStatsProps) {
    return (
        <TileGrid className={className}>
            {items.map((stat, idx) => (
                <div key={idx} className={cn("flex", stat.className)}>
                    {stat.icon !== undefined && <div className={stat.iconClassName}>{stat.icon}</div>}
                    <div>
                        <p className={stat.labelClassName}>{stat.label}</p>
                        <p className={stat.valueClassName}>{stat.value}</p>
                    </div>
                </div>
            ))}
        </TileGrid>
    );
}
