import { SectionCard, SectionCardBody, SectionCardHeader } from "@/components/shared/section-card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface PromoCardAction {
    /** Leading icon of the call to action. */
    icon?: ReactNode;
    label: ReactNode;
    /** Color/sizing of the button, on top of the shared full width layout. */
    className?: string;
    /** Renders the action as a link opening in a new tab when set. */
    href?: string;
}

export interface PromoCardProps {
    /** Content rendered below the action (contact rows, lists…). */
    children?: ReactNode;
    /** Card surface overrides (color, radius, padding…). */
    className?: string;
    icon: ReactNode;
    iconTileClassName?: string;
    title: ReactNode;
    titleClassName?: string;
    subtitle?: ReactNode;
    subtitleClassName?: string;
    /**
     * `inline` renders the icon beside the title (the aside widget header),
     * `stacked` renders it above the title as its own tile.
     */
    layout?: "inline" | "stacked";
    /** Header row spacing. Only used by the `inline` layout. */
    headerPadding?: string;
    headerClassName?: string;
    description?: ReactNode;
    descriptionClassName?: string;
    /** Full width button rendered after the description. */
    action?: PromoCardAction;
    bodyPadding?: string;
    bodyClassName?: string;
    /** Decorative element anchored to the card itself (glow, pattern…). */
    decor?: ReactNode;
}

const ACTION_CLASS = "w-full flex items-center justify-center gap-2 transition-colors";

/**
 * Dark call to action card shared by the brochure widget of
 * `/explore-universities/{university}` and the discussion widget of
 * `/explore-universities/{university}/{department}`: icon, title, optional
 * description and a full width button.
 */
export function PromoCard({
    children,
    className,
    icon,
    iconTileClassName,
    title,
    titleClassName,
    subtitle,
    subtitleClassName,
    layout = "inline",
    headerPadding,
    headerClassName,
    description,
    descriptionClassName,
    action,
    bodyPadding,
    bodyClassName,
    decor,
}: PromoCardProps) {
    const hasBody = description !== undefined || action !== undefined || children !== undefined;

    return (
        <SectionCard className={cn("relative text-white", className)}>
            {layout === "stacked" ? (
                <>
                    <div className={iconTileClassName}>{icon}</div>
                    <h3 className={titleClassName}>{title}</h3>
                    {subtitle !== undefined && <h4 className={subtitleClassName}>{subtitle}</h4>}
                </>
            ) : (
                <SectionCardHeader
                    align="start"
                    padding={headerPadding}
                    className={cn("relative z-10 gap-4", headerClassName)}
                    icon={icon}
                    iconTileClassName={iconTileClassName}
                    title={title}
                    titleClassName={titleClassName}
                    subtitle={subtitle}
                    subtitleClassName={subtitleClassName}
                />
            )}

            {hasBody && (
                <SectionCardBody padding={bodyPadding} className={bodyClassName}>
                    {description !== undefined && <p className={descriptionClassName}>{description}</p>}

                    {action !== undefined &&
                        (action.href ? (
                            <a
                                href={action.href}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(ACTION_CLASS, action.className)}
                            >
                                {action.icon}
                                {action.label}
                            </a>
                        ) : (
                            <button className={cn(ACTION_CLASS, action.className)}>
                                {action.icon}
                                {action.label}
                            </button>
                        ))}

                    {children}
                </SectionCardBody>
            )}

            {decor}
        </SectionCard>
    );
}
