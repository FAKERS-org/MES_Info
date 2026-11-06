"use client";

import { EntityLogo } from "@/components/shared/entity-logo";
import { IconList, IconListItem } from "@/components/shared/icon-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UniversitySummary } from "@/hooks/use-universities";
import {
    calculateBac2Tuition,
    getUniversityKhan,
    getUniversityShifts,
    type Bac2Grade,
} from "@/lib/bac2";
import { useLanguage } from "@/lib/i18n";
import {
    apiDescription,
    apiName,
    apiOverview,
    getMinistryLabel,
    STUDY_SHIFT_LABELS,
    type StudyShift,
} from "@/lib/language";
import { universityHref } from "@/lib/unit-routes";
import { cn } from "@/lib/utils";
import {
    ArrowUpRight,
    BadgeCheck,
    Bookmark,
    CalendarDays,
    Clock,
    MapPin,
    Sparkles,
    Wallet,
} from "lucide-react";
import Link from "next/link";

export interface UniversityCardProps {
    university: UniversitySummary;
    variant?: "featured" | "compact";
    className?: string;
    selectedGrade?: Bac2Grade;
}

export function UniversityCard({
    university,
    variant = "compact",
    className,
    selectedGrade = "ALL",
}: UniversityCardProps) {
    const { lang, t } = useLanguage();
    const isKhmer = lang === "kh";
    const featured = variant === "featured";

    const name = apiName(university, lang);
    const href = universityHref(university);
    const overview = apiOverview(university, lang) || apiDescription(university, lang);
    const ministryLabel = getMinistryLabel(university.ministry, lang);

    const khan = getUniversityKhan(university);
    const shifts = getUniversityShifts(university);
    const bac2Result = calculateBac2Tuition(university, selectedGrade);

    const surface = cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-shadow",
        featured ? "hover:shadow-md" : "hover:shadow-xl",
        className,
    );

    const content = (
        <>
            {/* Head: brand strip the logo hangs out of */}
            <div
                className={cn(
                    "relative bg-primary",
                    featured
                        ? "bg-gradient-to-br from-primary to-slate-900 pb-16 pt-4"
                        : "h-24",
                )}
            >
                {featured && (
                    <div className="flex items-center justify-between px-6">
                        {university.moeys_accredited && (
                            <Badge
                                variant="secondary"
                                className="gap-1.5 rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/20 font-medium text-xs"
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
                    <Link
                        href={href}
                        className="shrink-0 transition-transform hover:scale-105"
                    >
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
                                {university.type === "PUBLIC"
                                    ? t("miscellaneous.public")
                                    : t("miscellaneous.private")}
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
                            {university.type === "PUBLIC"
                                ? t("miscellaneous.public")
                                : t("miscellaneous.private")}
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
                        <Badge
                            variant="outline"
                            className="text-[11px] py-0 px-1.5 font-normal"
                        >
                            {university.campus_name}
                        </Badge>
                    )}
                </div>

                <Link href={href} className="group/title">
                    <h2 className="text-xl font-bold leading-snug text-foreground group-hover/title:text-sky-600 dark:group-hover/title:text-sky-400 transition-colors">
                        {name}
                    </h2>
                </Link>

                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground leading-relaxed min-h-[2.5rem]">
                    {overview ||
                        (isKhmer
                            ? `គ្រឹះស្ថានឧត្តមសិក្សាស្ថិតនៅ ${university.province}`
                            : `Higher education institution located in ${university.province}.`)}
                </p>

                {/* ── MVP Bac II Tuition Calculator Output ──────────────────── */}
                <div className="mt-3.5">
                    {selectedGrade !== "ALL" ? (
                        bac2Result.hasWaiver ? (
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 flex items-center justify-between gap-2 shadow-2xs">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-bold">
                                                Year 1: ${bac2Result.adjustedAmount}
                                            </span>
                                            {bac2Result.baseAmount != null && (
                                                <span className="line-through text-muted-foreground text-2xs">
                                                    ${bac2Result.baseAmount}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                                            {isKhmer
                                                ? `បញ្ចុះតម្លៃ ${bac2Result.discountPercent}% សម្រាប់និទ្ទេស ${selectedGrade}`
                                                : `${bac2Result.discountPercent}% Bac II Grade ${selectedGrade} waiver`}
                                        </span>
                                    </div>
                                </div>
                                <Badge className="bg-emerald-600 text-white text-[10px] px-1.5 py-0 font-bold border-0">
                                    -{bac2Result.discountPercent}%
                                </Badge>
                            </div>
                        ) : (
                            <div className="p-2 rounded-xl bg-muted/50 border border-border/60 text-muted-foreground flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5">
                                    <Wallet className="size-3.5" />
                                    Year 1:{" "}
                                    <strong className="text-foreground">
                                        ${bac2Result.baseAmount ?? "N/A"}/yr
                                    </strong>
                                </span>
                                <span className="text-[10px] italic">
                                    {isKhmer ? "ថ្លៃសិក្សាធម្មតា" : "Standard tuition"}
                                </span>
                            </div>
                        )
                    ) : (
                        <div className="flex items-center justify-between text-xs text-muted-foreground py-1">
                            <span className="flex items-center gap-1.5 font-medium text-foreground">
                                <Wallet className="size-3.5 text-muted-foreground" />
                                {university.default_tuition_per_year != null
                                    ? `$${university.default_tuition_per_year}/yr`
                                    : t("university.freeOrUnset")}
                            </span>
                            {university.has_scholarships && (
                                <Badge
                                    variant="outline"
                                    className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] px-1.5 py-0"
                                >
                                    {isKhmer ? "មានអាហារូបករណ៍បាក់ឌុប" : "Bac II Waivers"}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Delivery Shifts Pills (Rien Song Sang support) ────────── */}
                {shifts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 mt-2.5">
                        {shifts.map(s => {
                            const info = STUDY_SHIFT_LABELS[s as StudyShift];
                            return (
                                <Badge
                                    key={s}
                                    variant="outline"
                                    className="text-[10px] px-1.5 py-0 bg-muted/40 font-normal text-muted-foreground border-border/60"
                                >
                                    <Clock className="size-2.5 mr-0.5 text-muted-foreground/70" />
                                    {isKhmer ? info?.kh ?? s : info?.en ?? s}
                                </Badge>
                            );
                        })}
                    </div>
                )}

                <IconList className="mt-3.5 gap-2">
                    <IconListItem
                        className="gap-2 text-xs text-muted-foreground"
                        icon={
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                        }
                    >
                        <span className="truncate">
                            {khan ? `${khan}, ${university.province}` : university.province}
                        </span>
                    </IconListItem>
                    {university.established_year != null && (
                        <IconListItem
                            className="gap-2 text-xs text-muted-foreground"
                            icon={
                                <CalendarDays className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                            }
                        >
                            <span className="truncate">
                                {t("miscellaneous.established")}{" "}
                                {university.established_year}
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
                            <Link
                                href={href}
                                className="flex h-full w-full items-center justify-center"
                            >
                                {t("explore.viewUniversity")}
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="h-11 w-11 shrink-0 rounded-2xl border-border p-0 text-muted-foreground"
                        >
                            <Link
                                href={href}
                                className="flex h-full w-full items-center justify-center"
                            >
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

// Backward-compatibility alias
export const UniversityTile = UniversityCard;
export type UniversityTileProps = UniversityCardProps;
