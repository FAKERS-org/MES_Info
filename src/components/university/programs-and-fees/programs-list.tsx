"use client";

import { SearchInput } from "@/components/shared/search-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { UniversityDetail, UniversityProgram } from "@/lib/api/universities";
import { useLanguage } from "@/lib/i18n";
import { apiName, type Lang } from "@/lib/language";
import { resolveProgramTuition } from "@/lib/tuition";
import { ArrowUpDown, Building2, Clock, FilterX, Sparkles, Wallet } from "lucide-react";
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

type TuitionRangeFilter = "ALL" | "DISCOUNT" | "FREE" | "UNDER_1000" | "RANGE_1000_2500" | "OVER_2500";
type SortOption = "DEFAULT" | "PRICE_ASC" | "PRICE_DESC" | "DURATION" | "NAME";

export default function ProgramsList({ programs, lang, university }: ProgramsListProps) {
    const { t } = useLanguage();
    const isKhmer = lang === "kh";

    const [query, setQuery] = useState("");
    const [selectedDegree, setSelectedDegree] = useState<string>("ALL");
    const [selectedFaculty, setSelectedFaculty] = useState<string>("ALL");
    const [selectedTuition, setSelectedTuition] = useState<TuitionRangeFilter>("ALL");
    const [sortBy, setSortBy] = useState<SortOption>("DEFAULT");

    const availableDegrees = useMemo(() => {
        return Array.from(new Set(programs.map(p => p.degree_level).filter(Boolean)));
    }, [programs]);

    const availableFaculties = useMemo(() => {
        const set = new Set<string>();
        for (const p of programs) {
            if (p.faculty) set.add(p.faculty);
        }
        return Array.from(set).sort();
    }, [programs]);

    const isFiltered =
        query.trim() !== "" ||
        selectedDegree !== "ALL" ||
        selectedFaculty !== "ALL" ||
        selectedTuition !== "ALL" ||
        sortBy !== "DEFAULT";

    const handleReset = () => {
        setQuery("");
        setSelectedDegree("ALL");
        setSelectedFaculty("ALL");
        setSelectedTuition("ALL");
        setSortBy("DEFAULT");
    };

    const filteredAndSorted = useMemo(() => {
        const q = query.trim().toLowerCase();

        const filtered = programs.filter(p => {
            const matchesQuery =
                !q || [p.name_en, p.name_kh, p.faculty].some(field => field?.toLowerCase().includes(q));
            if (!matchesQuery) return false;

            if (selectedDegree !== "ALL" && p.degree_level !== selectedDegree) return false;
            if (selectedFaculty !== "ALL" && p.faculty !== selectedFaculty) return false;

            if (selectedTuition !== "ALL") {
                const tuition = resolveProgramTuition(p, university);
                const effectiveAmount = tuition.maleAmount ?? tuition.uniformAmount;

                if (selectedTuition === "DISCOUNT" && !tuition.hasGenderDifference) return false;
                if (selectedTuition === "FREE" && (effectiveAmount ?? 0) > 0) return false;
                if (selectedTuition === "UNDER_1000" && (!effectiveAmount || effectiveAmount > 1000)) return false;
                if (
                    selectedTuition === "RANGE_1000_2500" &&
                    (!effectiveAmount || effectiveAmount <= 1000 || effectiveAmount > 2500)
                ) {
                    return false;
                }
                if (selectedTuition === "OVER_2500" && (!effectiveAmount || effectiveAmount <= 2500)) return false;
            }

            return true;
        });

        if (sortBy === "DEFAULT") return filtered;

        return [...filtered].sort((a, b) => {
            if (sortBy === "PRICE_ASC" || sortBy === "PRICE_DESC") {
                const feeA = resolveProgramTuition(a, university).maleAmount ?? resolveProgramTuition(a, university).uniformAmount ?? 0;
                const feeB = resolveProgramTuition(b, university).maleAmount ?? resolveProgramTuition(b, university).uniformAmount ?? 0;
                return sortBy === "PRICE_ASC" ? feeA - feeB : feeB - feeA;
            }
            if (sortBy === "DURATION") {
                return (a.duration_years ?? 0) - (b.duration_years ?? 0);
            }
            if (sortBy === "NAME") {
                const nameA = apiName(a, lang);
                const nameB = apiName(b, lang);
                return nameA.localeCompare(nameB);
            }
            return 0;
        });
    }, [programs, query, selectedDegree, selectedFaculty, selectedTuition, sortBy, university, lang]);

    if (programs.length === 0) {
        return <p className="p-6 text-center text-sm text-muted-foreground">{t("explore.noResults")}</p>;
    }

    return (
        <div className="space-y-4">
            {/* Search and Degree Pill Bar */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <SearchInput
                        value={query}
                        onChange={setQuery}
                        placeholder={isKhmer ? "ស្វែងរកឈ្មោះជំនាញ ឬមហាវិទ្យាល័យ…" : "Search program name or faculty…"}
                        className="flex-1"
                    />

                    {availableDegrees.length > 1 && (
                        <div className="flex flex-wrap gap-1.5 shrink-0">
                            <Badge
                                variant={selectedDegree === "ALL" ? "default" : "outline"}
                                className="cursor-pointer px-3 py-1 text-xs rounded-lg transition-colors font-khmer"
                                onClick={() => setSelectedDegree("ALL")}
                            >
                                {isKhmer ? "ទាំងអស់" : "All"} ({programs.length})
                            </Badge>
                            {availableDegrees.map(deg => {
                                const count = programs.filter(p => p.degree_level === deg).length;
                                return (
                                    <Badge
                                        key={deg}
                                        variant={selectedDegree === deg ? "default" : "outline"}
                                        className="cursor-pointer px-3 py-1 text-xs rounded-lg transition-colors font-khmer"
                                        onClick={() => setSelectedDegree(deg)}
                                    >
                                        {DEGREE_LEVELS[deg] || deg} ({count})
                                    </Badge>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Filter and Sorting Toolbar */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {/* Faculty Select */}
                    {availableFaculties.length > 0 && (
                        <div className="w-full sm:w-auto min-w-44">
                            <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                                <SelectTrigger size="sm" className="w-full text-xs h-8 bg-muted/40 border-border">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                        <SelectValue placeholder={t("university.filterFaculty")} />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">{t("university.allFaculties")}</SelectItem>
                                    {availableFaculties.map(fac => (
                                        <SelectItem key={fac} value={fac}>
                                            {fac}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Tuition Range Select */}
                    <div className="w-full sm:w-auto min-w-40">
                        <Select value={selectedTuition} onValueChange={val => setSelectedTuition(val as TuitionRangeFilter)}>
                            <SelectTrigger size="sm" className="w-full text-xs h-8 bg-muted/40 border-border">
                                <div className="flex items-center gap-1.5 truncate">
                                    <Wallet className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                    <SelectValue placeholder={t("university.filterTuition")} />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">{t("university.allTuitions")}</SelectItem>
                                <SelectItem value="DISCOUNT">
                                    <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        {t("university.femaleDiscountOnly")}
                                    </span>
                                </SelectItem>
                                <SelectItem value="FREE">{t("university.freeOrUnset")}</SelectItem>
                                <SelectItem value="UNDER_1000">{t("university.under1000")}</SelectItem>
                                <SelectItem value="RANGE_1000_2500">{t("university.range1000to2500")}</SelectItem>
                                <SelectItem value="OVER_2500">{t("university.over2500")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort Order Select */}
                    <div className="w-full sm:w-auto min-w-36">
                        <Select value={sortBy} onValueChange={val => setSortBy(val as SortOption)}>
                            <SelectTrigger size="sm" className="w-full text-xs h-8 bg-muted/40 border-border">
                                <div className="flex items-center gap-1.5 truncate">
                                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                    <SelectValue placeholder={t("university.sortBy")} />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DEFAULT">{t("university.sortDefault")}</SelectItem>
                                <SelectItem value="PRICE_ASC">{t("university.sortPriceAsc")}</SelectItem>
                                <SelectItem value="PRICE_DESC">{t("university.sortPriceDesc")}</SelectItem>
                                <SelectItem value="DURATION">{t("university.sortDuration")}</SelectItem>
                                <SelectItem value="NAME">{t("university.sortName")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reset Button */}
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground font-khmer cursor-pointer"
                        >
                            <FilterX className="h-3.5 w-3.5 mr-1" />
                            {t("university.clearFilters")}
                        </Button>
                    )}

                    {/* Active Match Count */}
                    <span className="ml-auto text-xs text-muted-foreground font-khmer hidden md:inline-block">
                        {isKhmer
                            ? `បង្ហាញ ${filteredAndSorted.length} ក្នុងចំណោម ${programs.length} ជំនាញ`
                            : `Showing ${filteredAndSorted.length} of ${programs.length} programs`}
                    </span>
                </div>
            </div>

            {/* Program List Card */}
            <Card className="overflow-hidden border border-border shadow-sm rounded-2xl bg-card" padding="none">
                <CardContent className="p-0">
                    {filteredAndSorted.length === 0 ? (
                        <div className="p-8 text-center space-y-3">
                            <p className="text-sm text-muted-foreground font-khmer">{t("explore.noResults")}</p>
                            {isFiltered && (
                                <Button variant="outline" size="sm" onClick={handleReset} className="font-khmer">
                                    <FilterX className="h-4 w-4 mr-1.5" />
                                    {t("university.clearFilters")}
                                </Button>
                            )}
                        </div>
                    ) : (
                        filteredAndSorted.map((program, index) => {
                            const tuition = resolveProgramTuition(program, university);

                            return (
                                <div key={program.id}>
                                    <div className="p-6 flex flex-col md:flex-row justify-between gap-4 hover:bg-muted/10 transition-colors">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex flex-wrap items-center gap-2.5">
                                                <h3 className="text-lg font-bold text-foreground font-khmer">
                                                    {apiName(program, lang)}
                                                </h3>
                                                <Badge className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 px-2.5 py-0.5 rounded-lg text-xs font-semibold">
                                                    {DEGREE_LEVELS[program.degree_level]}
                                                </Badge>
                                                {program.faculty && (
                                                    <Badge className="bg-muted text-muted-foreground border-0 rounded-lg px-2.5 py-0.5 text-xs font-medium font-khmer flex items-center gap-1">
                                                        <Building2 className="h-3 w-3" />
                                                        {program.faculty}
                                                    </Badge>
                                                )}
                                            </div>
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
                                        </div>
                                    </div>
                                    {index < filteredAndSorted.length - 1 && <Separator className="bg-muted" />}
                                </div>
                            );
                        })
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
