"use client";

import { Badge } from "@/components/ui/badge";
import type { UniversityDetail, UniversityProgram } from "@/lib/api/universities";
import { useLanguage } from "@/lib/i18n";
import {
    apiName,
    getDegreeLabel,
    STUDY_SHIFT_LABELS,
    type Lang,
    type StudyShift,
} from "@/lib/language";
import { getShiftBadgeConfig } from "@/lib/shift-styles";
import { resolveProgramTuition } from "@/lib/tuition";
import { cn } from "@/lib/utils";
import { Building2, Clock, Wallet } from "lucide-react";

export interface ProgramRowItemProps {
    program: UniversityProgram;
    university?: Pick<UniversityDetail, "default_tuition_per_year" | "default_tuition_female_per_year"> | null;
    lang: Lang;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

export function ProgramRowItem({
    program,
    university,
    lang,
}: ProgramRowItemProps) {
    const { t } = useLanguage();
    const isKhmer = lang === "kh";
    const tuition = resolveProgramTuition(program, university);

    return (
        <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
            <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground font-khmer">
                        {apiName(program, lang)}
                    </h3>
                    <Badge className="bg-primary/10 text-primary border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer">
                        {getDegreeLabel(program.degree_level, lang)}
                    </Badge>
                </div>

                {program.faculty && (
                    <div>
                        <Badge className="bg-muted text-muted-foreground border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer inline-flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {program.faculty}
                        </Badge>
                    </div>
                )}

                {program.shifts && program.shifts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {program.shifts.map(shift => {
                            const s = shift as StudyShift;
                            const info = STUDY_SHIFT_LABELS[s];
                            const cfg = getShiftBadgeConfig(shift);
                            const Icon = cfg.icon;
                            return (
                                <Badge
                                    key={shift}
                                    variant="outline"
                                    className={cn(
                                        "text-[11px] px-2 py-0.5 font-normal font-khmer flex items-center gap-1 border",
                                        cfg.badge,
                                    )}
                                >
                                    <Icon className={cn("w-3 h-3 shrink-0", cfg.iconColor)} />
                                    <span>{isKhmer ? info?.kh ?? shift : info?.en ?? shift}</span>
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
                        <div className="flex flex-col sm:items-end gap-0.5">
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                                {tuition.maleAmount} {tuition.currency}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                                {tuition.femaleAmount} {tuition.currency} ({t("university.tuitionFemale")})
                            </span>
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
            </div>
        </div>
    );
}
