import { cn } from "@/lib/utils";
import Image from "next/image";
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
    /** Rendered CSS width of the circle — drives the `next/image` srcset. */
    sizes?: string;
    /** Overlay of the circle: a status dot, a ring… */
    children?: ReactNode;
}

/**
 * Circular portrait with an initials fallback — the admissions officer, the
 * advisor of the aside card and the logo of a university tile all used to
 * hand-roll their own `<img>` (or ship a broken placeholder request).
 */
export function Avatar({ src, alt, fallback, className, imageClassName, sizes = "80px", children }: AvatarProps) {
    return (
        <div className={cn("relative shrink-0 overflow-hidden rounded-full bg-slate-200", className)}>
            {src !== undefined ? (
                <Image
                    fill
                    src={src}
                    alt={alt ?? ""}
                    sizes={sizes}
                    className={cn("object-cover", imageClassName)}
                />
            ) : (
                <span className="flex h-full w-full items-center justify-center text-center">{fallback}</span>
            )}
            {children}
        </div>
    );
}
