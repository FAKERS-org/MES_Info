"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UniversityDetail, UniversityProgram } from "@/lib/api/universities";
import { useLanguage } from "@/lib/i18n";
import {
    apiName,
    getDegreeLabel,
    STUDY_SHIFT_LABELS,
    type Lang,
    type StudyShift,
} from "@/lib/language";
import { resolveProgramTuition } from "@/lib/tuition";
import {
    Building2,
    ChevronDown,
    ChevronUp,
    Clock,
    FileText,
    Globe,
    Sparkles,
    Wallet,
} from "lucide-react";

export interface ProgramRowItemProps {
    program: UniversityProgram;
    university?: Pick<UniversityDetail, "default_tuition_per_year" | "default_tuition_female_per_year"> | null;
    lang: Lang;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

export function ProgramRowItem({
    program,
    university,
    lang,
    isExpanded,
    onToggleExpand,
}: ProgramRowItemProps) {
    const { t } = useLanguage();
    const isKhmer = lang === "kh";
    const tuition = resolveProgramTuition(program, university);

    const feeSchedule = Array.isArray((program as any).fee_schedule)
        ? ((program as any).fee_schedule as any[])
        : [];
    const admissionRules = Array.isArray((program as any).admission_rules)
        ? ((program as any).admission_rules as any[])
        : [];
    const accreditations = Array.isArray((program as any).accreditations)
        ? ((program as any).accreditations as string[])
        : [];
    const cqfLevel = (program as any).cqf_level;
    const languageTrack = (program as any).language_track;

    return (
        <div>
            <div className="p-4 sm:p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-muted/30 transition-colors">
                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground font-khmer">
                            {apiName(program, lang)}
                        </h3>
                        <Badge className="bg-primary/10 text-primary border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer">
                            {getDegreeLabel(program.degree_level, lang)}
                        </Badge>
                        {program.faculty && (
                            <Badge className="bg-muted text-muted-foreground border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {program.faculty}
                            </Badge>
                        )}
                        {cqfLevel && (
                            <Badge className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px] px-2 py-0.5 font-normal">
                                {cqfLevel}
                            </Badge>
                        )}
                        {languageTrack && (
                            <Badge className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] px-2 py-0.5 font-normal flex items-center gap-1">
                                <Globe className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span>{languageTrack}</span>
                            </Badge>
                        )}
                        {accreditations.map(acc => (
                            <Badge
                                key={acc}
                                className="bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] px-2 py-0.5 font-normal flex items-center gap-1"
                            >
                                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                                <span>{acc}</span>
                            </Badge>
                        ))}
                    </div>

                    {/* Prerequisite & Admission Rule Cards */}
                    {admissionRules.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            {admissionRules.map((rule, rIdx) => (
                                <Badge
                                    key={rIdx}
                                    variant="outline"
                                    className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 text-[10px] px-1.5 py-0 font-normal flex items-center gap-1"
                                >
                                    <FileText className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                                    <span>{rule.title}</span>
                                    {rule.cutoff && <span className="opacity-75">({rule.cutoff})</span>}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {program.shifts && program.shifts.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            {program.shifts.map(shift => {
                                const s = shift as StudyShift;
                                const info = STUDY_SHIFT_LABELS[s];
                                return (
                                    <Badge
                                        key={shift}
                                        variant="outline"
                                        className="bg-sky-50/80 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 text-[11px] px-2 py-0.5 font-normal font-khmer flex items-center gap-1"
                                        title={info ? `${info.en}: ${info.time}` : shift}
                                    >
                                        <Clock className="w-3 h-3 text-sky-500 shrink-0" />
                                        <span>{isKhmer ? info?.kh ?? shift : info?.en ?? shift}</span>
                                        {info?.time && (
                                            <span className="opacity-75 text-[10px] hidden sm:inline font-mono">
                                                ({info.time})
                                            </span>
                                        )}
                                    </Badge>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground shrink-0">
                    {program.duration_years != null && (
                        <span className="inline-flex items-center gap-1.5 font-medium">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {program.duration_years} {t("miscellaneous.year.plural")}
                        </span>
                    )}

                    {tuition.hasPrice ? (
                        tuition.hasGenderDifference ? (
                            <div className="flex flex-col sm:items-end gap-1">
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                                    <Wallet className="h-4 w-4 text-muted-foreground" />
                                    {tuition.maleAmount} {tuition.currency}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        ({t("university.tuitionMale")})
                                    </span>
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="inline-flex items-center gap-1 text-sm font-bold text-rose-600 dark:text-rose-400">
                                        {tuition.femaleAmount} {tuition.currency}
                                        <span className="text-xs font-normal">
                                            ({t("university.tuitionFemale")})
                                        </span>
                                    </span>
                                    {tuition.discountPercent != null && (
                                        <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-0 text-[10px] px-1.5 py-0 font-bold">
                                            -{tuition.discountPercent}%
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                                {tuition.uniformAmount} {tuition.currency} {t("university.perYear")}
                            </span>
                        )
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground italic">
                            <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                            {t("university.freeOrUnset")}
                        </span>
                    )}

                    {feeSchedule.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleExpand}
                            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer w-fit mt-1"
                        >
                            <span>{isKhmer ? "កម្រៃលម្អិត" : "Itemized Fees"}</span>
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full font-mono">
                                {feeSchedule.length}
                            </span>
                            {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                            )}
                        </Button>
                    )}
                </div>
            </div>

            {/* Itemized Fee Breakdown Drawer */}
            {isExpanded && feeSchedule.length > 0 && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground pb-1.5 border-b border-border/40">
                            <span>{isKhmer ? "កម្រៃសិក្សានិងថ្លៃផ្សេងៗ (Line Items)" : "Fee Breakdown"}</span>
                            {(program as any).estimated_annual_min_usd != null && (
                                <span className="text-foreground font-mono text-xs">
                                    Est. ${(program as any).estimated_annual_min_usd}
                                    {(program as any).estimated_annual_max_usd &&
                                    (program as any).estimated_annual_max_usd !== (program as any).estimated_annual_min_usd
                                        ? ` - $${(program as any).estimated_annual_max_usd}`
                                        : ""}
                                    /yr
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {feeSchedule.map((item, fIdx) => {
                                const isDiscount = Number(item.amount) < 0 || String(item.tag).toUpperCase() === "DISCOUNT";
                                return (
                                    <div
                                        key={fIdx}
                                        className="flex items-center justify-between p-2 rounded-lg bg-background/80 border border-border/40"
                                    >
                                        <div className="space-y-0.5">
                                            <span className="font-medium text-foreground">
                                                {item.title || item.name}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                                <span>{item.frequency || item.billing_metric || "YEARLY"}</span>
                                                {item.mandatory_level && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-[9px] px-1 py-0 uppercase"
                                                    >
                                                        {item.mandatory_level}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <span
                                            className={`font-mono font-semibold ${
                                                isDiscount
                                                    ? "text-rose-600 dark:text-rose-400"
                                                    : "text-foreground"
                                            }`}
                                        >
                                            {isDiscount ? "" : "+"}
                                            {item.amount} {item.currency || "USD"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
