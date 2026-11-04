"use client";

import { EntityLogo } from "@/components/shared/entity-logo";
import { IconList, IconListItem } from "@/components/shared/icon-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UniversitySummary } from "@/hooks/use-universities";
import { useLanguage } from "@/lib/i18n";
import { apiName, apiOverview, getMinistryLabel } from "@/lib/language";
import { universityHref } from "@/lib/unit-routes";
import { cn, formatCurrency } from "@/lib/utils";
import { ArrowUpRight, Award, BadgeCheck, Bookmark, CalendarDays, Home, MapPin } from "lucide-react";
import Link from "next/link";

export interface UniversityTileProps {
    university: UniversitySummary;
    variant?: "featured" | "compact";
    className?: string;
}

export function UniversityTile({ university, variant = "compact", className }: UniversityTileProps) {
    const { lang, t } = useLanguage();
    const featured = variant === "featured";

    const name = apiName(university, lang);
    const href = universityHref(university);
    const overview = apiOverview(university, lang);
    const ministryLabel = getMinistryLabel(university.ministry, lang);

    const surface = cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-shadow",
        featured ? "hover:shadow-md" : "hover:shadow-xl",
        className,
    );

    const content = (
        <>
            {/* Head: brand strip the logo hangs out of. */}
            <div
                className={cn(
                    "relative bg-primary",
                    featured ? "bg-gradient-to-br from-primary to-slate-900 pb-16 pt-4" : "h-24",
                )}
            >
                {featured && (
                    <div className="flex items-center justify-between px-6">
                        {university.moeys_accredited && (
                            <Badge
                                variant="secondary"
                                className="gap-1.5 rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/20"
                            >
                                <BadgeCheck className="h-3.5 w-3.5" />
                                {t("miscellaneous.accredited")}
                            </Badge>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/80 hover:bg-white/10 hover:text-white"
                        >
                            <Bookmark className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                <div className="absolute -bottom-10 left-6 right-6 z-10 flex items-end justify-between gap-3">
                    <Link href={href} className="shrink-0 transition-transform hover:scale-105">
                        <EntityLogo
                            src={university.logo_url ?? undefined}
                            alt={name}
                            className="h-20 w-20 shrink-0 rounded-full bg-white shadow-lg"
                            fallbackClassName="text-sm font-bold text-slate-700"
                            fallback={university.abbreviation || name.charAt(0)}
                        />
                    </Link>
                    {featured && (
                        <div className="flex flex-row flex-wrap items-end gap-1 pb-1">
                            <Badge
                                className={cn(
                                    "border-0 font-medium",
                                    university.type === "PUBLIC"
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-100"
                                        : "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 hover:bg-sky-100",
                                )}
                            >
                                {university.type === "PUBLIC" ? t("miscellaneous.public") : t("miscellaneous.private")}
                            </Badge>
                            {ministryLabel && (
                                <Badge
                                    className="border-0 font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
                                    title={ministryLabel.full}
                                >
                                    {ministryLabel.short}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    {!featured && (
                        <Badge
                            className={cn(
                                "border-0 font-medium text-[11px] py-0 px-2",
                                university.type === "PUBLIC"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                    : "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300",
                            )}
                        >
                            {university.type === "PUBLIC" ? t("miscellaneous.public") : t("miscellaneous.private")}
                        </Badge>
                    )}
                    {ministryLabel && !featured && (
                        <Badge
                            className="border-0 font-medium text-[11px] py-0 px-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
                            title={ministryLabel.full}
                        >
                            {ministryLabel.short}
                        </Badge>
                    )}
                    {university.campus_name && (
                        <Badge variant="outline" className="text-[11px] py-0 px-1.5 font-normal">
                            {university.campus_name}
                        </Badge>
                    )}
                </div>

                <Link href={href} className="group/title">
                    <h2 className="text-xl font-bold leading-snug text-foreground group-hover/title:text-sky-600 dark:group-hover/title:text-sky-400 transition-colors">
                        {name}
                    </h2>
                </Link>

                {overview && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{overview}</p>}

                <IconList className="mt-4 gap-2.5">
                    <IconListItem
                        className="gap-2.5 text-sm text-muted-foreground"
                        icon={<MapPin className="h-4 w-4 shrink-0 text-muted-foreground/70" />}
                    >
                        <span className="truncate">{university.province}</span>
                    </IconListItem>
                    {university.established_year != null && (
                        <IconListItem
                            className="gap-2.5 text-sm text-muted-foreground"
                            icon={<CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground/70" />}
                        >
                            <span className="truncate">
                                {t("miscellaneous.established")} {university.established_year}
                            </span>
                        </IconListItem>
                    )}
                </IconList>

                {/* Feature tags */}
                {(university.has_scholarships || university.has_dormitory) && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        {university.has_scholarships && (
                            <Badge
                                variant="outline"
                                className="text-3xs font-medium gap-1 text-amber-700 bg-amber-50/80 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50"
                            >
                                <Award className="size-3" />
                                {t("explore.filterScholarships")}
                            </Badge>
                        )}
                        {university.has_dormitory && (
                            <Badge
                                variant="outline"
                                className="text-3xs font-medium gap-1 text-teal-700 bg-teal-50/80 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-900/50"
                            >
                                <Home className="size-3" />
                                {t("explore.filterDormitory")}
                            </Badge>
                        )}
                    </div>
                )}

                {/* Base Tuition Benchmark */}
                {university.default_tuition_per_year != null && (
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-muted/40 p-2 px-3 border border-border/60">
                        <span className="text-2xs font-medium text-muted-foreground">
                            {t("explore.tuitionBenchmark")}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-foreground">
                                {formatCurrency(university.default_tuition_per_year, "USD")}/yr
                            </span>
                            {university.default_tuition_female_per_year != null && (
                                <span className="text-rose-600 dark:text-rose-400 font-medium text-3xs bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded-md border border-rose-200 dark:border-rose-900/50">
                                    ♀ {formatCurrency(university.default_tuition_female_per_year, "USD")}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {featured && (
                    <div className="mt-auto flex items-center gap-3 pt-5">
                        <Button
                            asChild
                            variant="secondary"
                            className="h-12 flex-1 rounded-2xl bg-sky-50 dark:bg-sky-950/30 p-0 font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-950/50"
                        >
                            <Link href={href} className="flex h-full w-full items-center justify-center">
                                {t("explore.viewUniversity")}
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="h-11 w-11 shrink-0 rounded-2xl border-border p-0 text-muted-foreground"
                        >
                            <Link href={href} className="flex h-full w-full items-center justify-center">
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );

    if (featured) {
        return <article className={surface}>{content}</article>;
    }

    return (
        <Link href={href} className={surface}>
            {content}
        </Link>
    );
}
