"use client";

import { SearchInput } from "@/components/shared/search-input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/i18n";
import type { UniversityDetail, UniversityProgram } from "@/lib/api/universities";
import { apiName, type Lang } from "@/lib/language";
import { resolveProgramTuition } from "@/lib/tuition";
import { Clock, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

export interface ProgramsListProps {
    programs: UniversityProgram[];
    lang: Lang;
    university?: Pick<UniversityDetail, "default_tuition_per_year" | "default_tuition_female_per_year"> | null;
}

const DEGREE_LEVELS: Record<UniversityProgram["degree_level"], string> = {
    DIPLOMA: "Diploma",
    ASSOCIATE: "Associate",
    BACHELOR: "Bachelor",
    MASTER: "Master",
    PHD: "PhD",
};

/**
 * A university's degree programs as a flat, searchable list — the
 * shape the API serves today. The faculty/department tree view
 * returns with the units endpoint.
 */
export default function ProgramsList({ programs, lang, university }: ProgramsListProps) {
    const { t } = useLanguage();
    const [query, setQuery] = useState("");
    const [selectedDegree, setSelectedDegree] = useState<string>("ALL");

    const availableDegrees = useMemo(() => {
        const degrees = Array.from(new Set(programs.map(p => p.degree_level).filter(Boolean)));
        return degrees;
    }, [programs]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return programs.filter(p => {
            const matchesQuery = !q || [p.name_en, p.name_kh, p.faculty].some(field => field?.toLowerCase().includes(q));
            const matchesDegree = selectedDegree === "ALL" || p.degree_level === selectedDegree;
            return matchesQuery && matchesDegree;
        });
    }, [programs, query, selectedDegree]);

    if (programs.length === 0) {
        return <p className="p-6 text-center text-sm text-muted-foreground">{t("explore.noResults")}</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <SearchInput value={query} onChange={setQuery} placeholder="Search programs" className="flex-1" />
                {availableDegrees.length > 1 && (
                    <div className="flex flex-wrap gap-1.5 shrink-0">
                        <Badge
                            variant={selectedDegree === "ALL" ? "default" : "outline"}
                            className="cursor-pointer px-3 py-1 text-xs rounded-lg transition-colors"
                            onClick={() => setSelectedDegree("ALL")}
                        >
                            All ({programs.length})
                        </Badge>
                        {availableDegrees.map(deg => {
                            const count = programs.filter(p => p.degree_level === deg).length;
                            return (
                                <Badge
                                    key={deg}
                                    variant={selectedDegree === deg ? "default" : "outline"}
                                    className="cursor-pointer px-3 py-1 text-xs rounded-lg transition-colors"
                                    onClick={() => setSelectedDegree(deg)}
                                >
                                    {DEGREE_LEVELS[deg] || deg} ({count})
                                </Badge>
                            );
                        })}
                    </div>
                )}
            </div>

            <Card className="overflow-hidden border border-border shadow-sm rounded-xl bg-card" padding="none">
                <CardContent className="p-0">
                    {filtered.length === 0 ? (
                        <p className="p-6 text-sm text-muted-foreground">{t("explore.noResults")}</p>
                    ) : (
                        filtered.map((program, index) => {
                            const tuition = resolveProgramTuition(program, university);

                            return (
                                <div key={program.id}>
                                    <div className="p-6 flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-xl font-bold text-foreground font-khmer">
                                                    {apiName(program, lang)}
                                                </h3>
                                                <Badge className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/60 px-2 py-0.5 rounded-md text-xs font-normal font-khmer">
                                                    {DEGREE_LEVELS[program.degree_level]}
                                                </Badge>
                                                {program.faculty && (
                                                    <Badge className="bg-muted text-foreground rounded-md px-2 py-0.5 text-xs font-normal font-khmer">
                                                        {program.faculty}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            {program.duration_years != null && (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock className="h-4 w-4" />
                                                    {program.duration_years} {t("miscellaneous.year.plural")}
                                                </span>
                                            )}
                                            {tuition.hasPrice && (
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
                                                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                                                        <Wallet className="h-4 w-4 text-muted-foreground" />
                                                        {tuition.uniformAmount} {tuition.currency} {t("university.perYear")}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    {index < filtered.length - 1 && <Separator className="bg-muted" />}
                                </div>
                            );
                        })
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
