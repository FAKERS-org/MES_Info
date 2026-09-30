"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";

export interface EntityLogoProps {
    src?: string;
    alt: string;
    /** Shown when there is no `src` — and when the image fails to load. */
    fallback: ReactNode;
    /** Circle surface: size, border, background. */
    className?: string;
    /** Text surface of the fallback, so it matches the circle it sits in. */
    fallbackClassName?: string;
}

/**
 * A logo inside a circle that degrades to initials instead of showing a broken
 * image. The data declares a `logo` per university and per unit, but the asset
 * only exists for the ones whose file has been added under `public/images` —
 * a missing one is normal while the catalogue is being filled in, and a raw
 * `<img>` would put a torn-image glyph where the name belongs.
 *
 * `useState` alone is not enough: when `src` changes between two units the
 * previous failure would still be in state, so the error resets on every
 * `src` change.
 */
export function EntityLogo({ src, alt, fallback, className, fallbackClassName }: EntityLogoProps) {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        setFailed(false);
    }, [src]);

    const showImage = Boolean(src) && !failed;

    return (
        <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden", className)}>
            {showImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={src}
                    alt={alt}
                    onError={() => setFailed(true)}
                    className="h-full w-full object-contain"
                />
            ) : (
                <span className={cn("flex h-full w-full items-center justify-center text-center", fallbackClassName)}>
                    {fallback}
                </span>
            )}
        </div>
    );
}
