"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";
import type { CampusSummary } from "@/lib/api/universities";

export interface CampusSwitcherProps {
    campuses: CampusSummary[];
    activePublicId: string;
}

export default function CampusSwitcher({
    campuses,
    activePublicId,
}: CampusSwitcherProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // If only 1 or no campus, don't show the switcher to keep UI clean
    if (!campuses || campuses.length <= 1) return null;

    const handleSelect = (publicId: string) => {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.set("campus", publicId);
        router.push(`${pathname}?${nextParams.toString()}`);
    };

    return (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-card border rounded-xl shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                Campuses:
            </span>
            {campuses.map(c => {
                const isActive = c.public_id === activePublicId;
                const displayName = c.campus_name || "Campus";

                return (
                    <button
                        key={c.public_id}
                        type="button"
                        onClick={() => handleSelect(c.public_id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            isActive
                                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        aria-pressed={isActive}
                    >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{displayName}</span>
                        {c.province && (
                            <span className="opacity-75 font-normal">({c.province})</span>
                        )}
                        {c.is_main_campus && (
                            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-primary-foreground/20 uppercase tracking-tight">
                                Main
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
