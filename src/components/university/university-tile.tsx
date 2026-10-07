"use client";

import { EntityLogo } from "@/components/shared/entity-logo";
import { IconList, IconListItem } from "@/components/shared/icon-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UniversitySummary } from "@/hooks/use-universities";
import { useLanguage } from "@/lib/i18n";
import { apiName } from "@/lib/language";
import { universityHref } from "@/lib/unit-routes";
import { cn } from "@/lib/utils";
import { ArrowUpRight, BadgeCheck, Bookmark, CalendarDays, MapPin } from "lucide-react";
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
    const href = universityHref(university.id);

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
                    <EntityLogo
                        src={university.logo_url ?? undefined}
                        alt={name}
                        className="h-20 w-20 shrink-0 rounded-full bg-white shadow-lg"
                        fallbackClassName="text-sm font-bold text-slate-700"
                        fallback={university.abbreviation || name.charAt(0)}
                    />
                    {featured && (
                        <div className="flex flex-row items-end gap-1 pb-1">
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                {university.type === "PUBLIC" ? t("miscellaneous.public") : t("miscellaneous.private")}
                            </Badge>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
                <h2 className="text-xl font-bold leading-snug text-foreground">{name}</h2>

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

                {featured && (
                    <div className="mt-auto flex items-center gap-3 pt-5">
                        <Button
                            asChild
                            variant="secondary"
                            className="h-12 flex-1 rounded-2xl bg-sky-50 dark:bg-sky-950/30 p-0 font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-950/50"
                        >
                            <Link href={href} className="flex h-full w-full items-center justify-center">
                                {t("miscellaneous.viewProgram")}
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
