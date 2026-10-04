import { Icon } from "@/components/shared/icon-renderer";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface NoticeBoxProps {
    /** Body of the notice. */
    children: ReactNode;
    /** Leading glyph. Defaults to `Info`. */
    icon?: ReactNode;
    /** Bold line above the body. */
    title?: ReactNode;
    /** Slot under the body: a button, a link… */
    action?: ReactNode;
    /** `md` (p-4) is the default, `sm` (p-3, gap-2) the compact one. */
    size?: "md" | "sm";
    /** Surface overrides — a `panelTone` entry re-tints the amber default. */
    className?: string;
}

/**
 * Amber callout repeated across the detail pages: the associate-degree note
 * of the eligibility matrix, the calculator rule of the resource hub, the
 * deadline note of a scholarship programme… A card that needs another colour
 * passes its own `panelTone` through `className`.
 */
export function NoticeBox({ children, icon, title, action, size = "md", className }: NoticeBoxProps) {
    const sm = size === "sm";

    return (
        <div
            className={cn(
                "flex items-start rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/30",
                sm ? "gap-2 p-3" : "gap-3 p-4",
                className,
            )}
        >
            <span
                className={cn(
                    "flex shrink-0 items-start text-amber-600 dark:text-amber-400 [&>svg]:h-full [&>svg]:w-full",
                    sm ? "h-4 w-4" : "h-5 w-5",
                )}
            >
                {icon ?? <Icon name="Info" />}
            </span>

            <div className="min-w-0">
                {title !== undefined && <p className="text-sm font-medium text-amber-800 dark:text-amber-200">{title}</p>}
                <div className={cn("text-sm text-amber-800 dark:text-amber-200", title !== undefined && "mt-0.5")}>{children}</div>
                {action !== undefined && <div className="mt-2">{action}</div>}
            </div>
        </div>
    );
}
