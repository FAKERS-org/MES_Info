import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface AvatarProps {
    /** Portrait. When omitted, `fallback` is rendered inside the circle. */
    src?: string;
    alt?: string;
    /** Content of the circle when there is no `src`: initials, a glyph… */
    fallback?: ReactNode;
    /**
     * Circle surface: size, colours… Text styles belong here too — the
     * fallback inherits them from the circle.
     */
    className?: string;
    /** Image surface: `object-cover`, a zoom… */
    imageClassName?: string;
    /** Overlay of the circle: a status dot, a ring… */
    children?: ReactNode;
}

/**
 * Circular portrait with an initials fallback — the admissions officer, the
 * advisor of the aside card and the logo of a university tile all used to
 * hand-roll their own `<img>` (or ship a broken placeholder request).
 */
export function Avatar({ src, alt, fallback, className, imageClassName, children }: AvatarProps) {
    return (
        <div className={cn("relative shrink-0 overflow-hidden rounded-full bg-slate-200", className)}>
            {src !== undefined ? (
                <img src={src} alt={alt ?? ""} className={cn("h-full w-full object-cover", imageClassName)} />
            ) : (
                <span className="flex h-full w-full items-center justify-center text-center">{fallback}</span>
            )}
            {children}
        </div>
    );
}
