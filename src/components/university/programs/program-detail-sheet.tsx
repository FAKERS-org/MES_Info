"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import MetadataRenderer from "@/components/shared/metadata-renderer";
import type { UniversityDetail, UniversityProgram } from "@/lib/api/universities";
import { useLanguage } from "@/lib/i18n";
import {
    apiDescription,
    apiName,
    getDegreeLabel,
    STUDY_SHIFT_LABELS,
    type Lang,
    type StudyShift,
} from "@/lib/language";
import { getShiftBadgeConfig } from "@/lib/shift-styles";
import { resolveProgramTuition } from "@/lib/tuition";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    Briefcase,
    Building2,
    Clock,
    GraduationCap,
    Sparkles,
    Wallet,
} from "lucide-react";
import React, { useMemo } from "react";

export interface ProgramDetailSheetProps {
    program: UniversityProgram | null;
    university?: Pick<UniversityDetail, "default_tuition_per_year" | "default_tuition_female_per_year"> | null;
    lang: Lang;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const RESERVED_METADATA_KEYS = new Set([
    "overview_en",
    "overview_kh",
    "description_en",
    "description_kh",
    "admission_req_en",
    "admission_req_kh",
    "admission_requirements",
    "admission_req",
    "career_paths",
    "careers",
    "career_opportunities",
    "job_opportunities",
    "future_careers",
    "fee_schedule",
]);

export function ProgramDetailSheet({
    program,
    university,
    lang,
    open,
    onOpenChange,
}: ProgramDetailSheetProps) {
    const { t } = useLanguage();
    const isKhmer = lang === "kh";

    const tuition = useMemo(() => {
        if (!program) return null;
        return resolveProgramTuition(program, university);
    }, [program, university]);

    if (!program) return null;

    const meta = (program.metadata_json as Record<string, unknown> | null | undefined) ?? {};
    const description = apiDescription(program, lang);

    // Admission requirements check
    const rawAdmissionReq =
        (isKhmer ? program.admission_req_kh || program.admission_req_en : program.admission_req_en || program.admission_req_kh) ||
        (meta.admission_requirements as string | undefined) ||
        (meta.admission_req as string | undefined);

    // Career pathways check
    const rawCareers =
        meta.career_paths ||
        meta.careers ||
        meta.career_opportunities ||
        meta.job_opportunities ||
        meta.future_careers;

    const careersList: string[] = Array.isArray(rawCareers)
        ? rawCareers.map(String).filter(Boolean)
        : typeof rawCareers === "string"
            ? rawCareers.split(/[,\n]/).map(s => s.trim()).filter(Boolean)
            : [];

    // Filter out handled keys for MetadataRenderer (Two-Bucket Rule)
    const extraMetadata = Object.entries(meta).reduce<Record<string, unknown>>((acc, [k, v]) => {
        if (!RESERVED_METADATA_KEYS.has(k) && v !== null && v !== undefined && v !== "") {
            acc[k] = v;
        }
        return acc;
    }, {});

    const hasExtraMetadata = Object.keys(extraMetadata).length > 0;
    const curriculumSections = program.curriculum_sections ?? [];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-xl md:max-w-2xl p-6 sm:p-8 space-y-6">
                <SheetHeader className="space-y-3 pb-2 border-b border-border">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-primary/10 text-primary border-0 px-2.5 py-1 rounded-md text-xs font-semibold font-khmer">
                            {getDegreeLabel(program.degree_level, lang)}
                        </Badge>
                        {program.faculty && (
                            <Badge variant="outline" className="text-muted-foreground border-border px-2.5 py-1 rounded-md text-xs font-medium font-khmer inline-flex items-center gap-1.5">
                                <Building2 className="h-3.5 w-3.5" />
                                {program.faculty}
                            </Badge>
                        )}
                    </div>

                    <div>
                        <SheetTitle className="text-xl sm:text-2xl font-bold font-khmer text-foreground leading-snug">
                            {apiName(program, lang)}
                        </SheetTitle>
                        {program.name_kh && program.name_en && (
                            <SheetDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                                {isKhmer ? program.name_en : program.name_kh}
                            </SheetDescription>
                        )}
                    </div>
                </SheetHeader>

                {/* --- Quick Snapshot Grid --- */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {/* Duration */}
                    {program.duration_years != null && (
                        <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 flex flex-col justify-between">
                            <span className="text-[11px] font-medium text-muted-foreground font-khmer flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-primary" />
                                {isKhmer ? "រយៈពេលសិក្សា" : "Duration"}
                            </span>
                            <span className="text-sm font-semibold text-foreground mt-1.5 font-khmer">
                                {program.duration_years} {t("miscellaneous.year.plural")}
                            </span>
                        </div>
                    )}

                    {/* Tuition Fee */}
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 flex flex-col justify-between col-span-2 sm:col-span-2">
                        <span className="text-[11px] font-medium text-muted-foreground font-khmer flex items-center gap-1.5">
                            <Wallet className="h-3.5 w-3.5 text-primary" />
                            {isKhmer ? "តម្លៃសិក្សាប្រចាំឆ្នាំ" : "Annual Tuition"}
                        </span>
                        <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                            {tuition?.hasPrice ? (
                                <>
                                    <span className="text-base font-bold text-foreground">
                                        {tuition.hasGenderDifference ? tuition.maleAmount : tuition.uniformAmount} {tuition.currency}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-khmer">
                                        {t("university.perYear")}
                                    </span>
                                    {tuition.hasGenderDifference && tuition.femaleAmount && (
                                        <Badge className="bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs px-2 py-0.5 rounded-md font-khmer">
                                            ♀ {tuition.femaleAmount} {tuition.currency} ({isKhmer ? "អាហារូបករណ៍នារី" : "Female Incentive"})
                                        </Badge>
                                    )}
                                </>
                            ) : (
                                <span className="text-xs text-muted-foreground italic font-khmer">
                                    {t("university.freeOrUnset")}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Available Study Shifts */}
                {program.shifts && program.shifts.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-khmer">
                            {isKhmer ? "វេនសិក្សាដែលមាន" : "Available Study Shifts"}
                        </span>
                        <div className="flex flex-wrap gap-2">
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
                                            "text-xs px-2.5 py-1 font-medium font-khmer flex items-center gap-1.5 border",
                                            cfg.badge
                                        )}
                                    >
                                        <Icon className={cn("w-3.5 h-3.5 shrink-0", cfg.iconColor)} />
                                        <span>{isKhmer ? info?.kh ?? shift : info?.en ?? shift}</span>
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                )}

                <Separator className="bg-border/60" />

                {/* --- Decision Helper 1: Career Pathways --- */}
                {careersList.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <Briefcase className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground font-khmer">
                                {isKhmer ? "ឱកាសការងារក្រោយបញ្ចប់ការសិក្សា" : "Career Opportunities & Job Prospects"}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {careersList.map((job, idx) => (
                                <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="px-3 py-1 text-xs rounded-lg font-medium bg-secondary text-secondary-foreground flex items-center gap-1.5 border border-border/50"
                                >
                                    <Sparkles className="h-3 w-3 text-primary" />
                                    <span>{job}</span>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Decision Helper 2: Admission Requirements --- */}
                {rawAdmissionReq && (
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <GraduationCap className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground font-khmer">
                                {isKhmer ? "លក្ខខណ្ឌចូលរៀន" : "Admission Requirements"}
                            </h3>
                        </div>
                        <Card className="p-4 bg-muted/30 border border-border/60 rounded-xl">
                            <p className="text-xs sm:text-sm text-foreground/90 font-khmer leading-relaxed whitespace-pre-line">
                                {rawAdmissionReq}
                            </p>
                        </Card>
                    </div>
                )}

                {/* --- Decision Helper 3: Program Overview --- */}
                {description && (
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                                <BookOpen className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground font-khmer">
                                {isKhmer ? "ទិដ្ឋភាពទូទៅនៃជំនាញ" : "Program Overview"}
                            </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/90 font-khmer leading-relaxed whitespace-pre-line">
                            {description}
                        </p>
                    </div>
                )}

                {/* --- Decision Helper 4: Curriculum Outline --- */}
                {curriculumSections.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                                <BookOpen className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground font-khmer">
                                {isKhmer ? "រចនាសម្ព័ន្ធមុខវិជ្ជាសិក្សា" : "Curriculum Structure"}
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {curriculumSections.map((sec, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-card border border-border shadow-2xs space-y-3">
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground font-khmer">
                                            {isKhmer ? sec.heading_kh || sec.heading_en : sec.heading_en}
                                        </h4>
                                        {sec.banner_text && (
                                            <p className="text-xs text-muted-foreground font-khmer mt-0.5">
                                                {sec.banner_text}
                                            </p>
                                        )}
                                    </div>
                                    {sec.blocks && sec.blocks.length > 0 && (
                                        <div className="grid gap-2.5">
                                            {sec.blocks.map((block, bIdx) => (
                                                <div key={bIdx} className="p-3 rounded-lg bg-muted/40 border border-border/50 text-xs space-y-1.5">
                                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                                        <div className="flex items-center gap-2">
                                                            {block.badge_text && (
                                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-medium font-khmer bg-background">
                                                                    {block.badge_text}
                                                                </Badge>
                                                            )}
                                                            <span className="font-semibold text-foreground font-khmer">
                                                                {isKhmer ? block.title : block.english_title || block.title}
                                                            </span>
                                                        </div>
                                                        {block.credits && (
                                                            <span className="text-muted-foreground font-medium text-[11px]">
                                                                {block.credits}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {block.description && (
                                                        <p className="text-muted-foreground font-khmer leading-relaxed">
                                                            {block.description}
                                                        </p>
                                                    )}
                                                    {block.courses && block.courses.length > 0 && (
                                                        <ul className="pl-4 list-disc space-y-0.5 text-muted-foreground font-khmer">
                                                            {block.courses.map((course, cIdx) => (
                                                                <li key={cIdx}>{course}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Bucket B: Any Other Institutional Metadata --- */}
                {hasExtraMetadata && (
                    <div className="space-y-3 pt-2">
                        <MetadataRenderer
                            data={extraMetadata}
                            title={isKhmer ? "ព័ត៌មានលម្អិតបន្ថែម" : "Additional Specifics"}
                        />
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

export default ProgramDetailSheet;
