"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { BadgeCheck, Building2, GraduationCap, MapPin } from "lucide-react";

export interface UniversityHeaderProps {
    totalCount?: number;
    publicCount?: number;
    privateCount?: number;
    provincesCount?: number;
}

export default function UniversityHeader({
    totalCount,
    publicCount,
    privateCount,
    provincesCount,
}: UniversityHeaderProps = {}) {
    const { t } = useLanguage();

    return (
        <section className="w-full py-8 px-4">
            <div className="mx-auto max-w-5xl flex flex-col items-center text-center gap-6">
                {/* Verified Badge */}
                <Badge
                    variant="secondary"
                    className="bg-sky-100 text-sky-700 hover:bg-sky-100 dark:bg-sky-950/50 dark:text-sky-200 dark:hover:bg-sky-950/50 px-4 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 border-0"
                >
                    <BadgeCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    {t("miscellaneous.verifiedAccreditation")}
                </Badge>

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                    {t("explore.title")}
                </h1>

                {/* Subtitle */}
                <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {t("explore.subtitle")}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    <div className="py-2 px-4 rounded-full border border-border bg-card text-foreground flex items-center gap-2 text-sm shadow-xs">
                        <GraduationCap className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                        <span className="font-semibold">{totalCount ?? 0}</span>
                        <span className="text-muted-foreground">{t("miscellaneous.university.plural")}</span>
                    </div>

                    <div className="py-2 px-4 rounded-full border border-border bg-card text-foreground flex items-center gap-2 text-sm shadow-xs">
                        <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-semibold">{publicCount ?? 0}</span>
                        <span className="text-muted-foreground">{t("miscellaneous.public")}</span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="font-semibold">{privateCount ?? 0}</span>
                        <span className="text-muted-foreground">{t("miscellaneous.private")}</span>
                    </div>

                    <div className="py-2 px-4 rounded-full border border-border bg-card text-foreground flex items-center gap-2 text-sm shadow-xs">
                        <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-semibold">{provincesCount ?? 0}</span>
                        <span className="text-muted-foreground">{t("miscellaneous.location")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
