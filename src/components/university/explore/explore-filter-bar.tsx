"use client";

import { SearchInput } from "@/components/shared/search-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DELIVERY_SHIFTS, type Bac2Grade, type DeliveryShift } from "@/lib/bac2";
import { useLanguage } from "@/lib/i18n";
import { MINISTRIES, MINISTRY_LABELS } from "@/lib/language";
import { cn } from "@/lib/utils";
import {
    Award,
    Clock,
    GraduationCap,
    MapPin,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import type {
    BudgetFilter,
    QualificationFilter,
    SortKey,
    TypeFilter,
    useExploreFilters,
} from "./use-explore-filters";

export interface ExploreFilterBarProps {
    filter: ReturnType<typeof useExploreFilters>;
}

const BAC2_GRADES: { grade: Bac2Grade; labelEn: string; labelKh: string; discountHint?: string }[] = [
    { grade: "ALL", labelEn: "All Grades", labelKh: "គ្រប់និទ្ទេស" },
    { grade: "A", labelEn: "Grade A", labelKh: "និទ្ទេស A", discountHint: "100% off" },
    { grade: "B", labelEn: "Grade B", labelKh: "និទ្ទេស B", discountHint: "50% off" },
    { grade: "C", labelEn: "Grade C", labelKh: "និទ្ទេស C", discountHint: "25% off" },
    { grade: "D", labelEn: "Grade D", labelKh: "និទ្ទេស D" },
    { grade: "E", labelEn: "Grade E", labelKh: "និទ្ទេស E" },
];

export function ExploreFilterBar({ filter }: ExploreFilterBarProps) {
    const { lang, t } = useLanguage();
    const isKhmer = lang === "kh";

    const {
        query,
        setQuery,
        selectedGrade,
        setSelectedGrade,
        selectedType,
        setSelectedType,
        selectedMinistry,
        setSelectedMinistry,
        selectedProvince,
        setSelectedProvince,
        selectedKhan,
        setSelectedKhan,
        selectedShifts,
        toggleShift,
        selectedQualification,
        setSelectedQualification,
        selectedBudget,
        setSelectedBudget,
        onlyScholarships,
        setOnlyScholarships,
        onlyDormitory,
        setOnlyDormitory,
        onlyAccredited,
        setOnlyAccredited,
        sort,
        setSort,
        setCurrentPage,
        provinces,
        khans,
        hasActiveFilters,
        handleResetFilters,
    } = filter;

    return (
        <div className="space-y-4">
            {/* ── 1. The Bac II Merit Calculator (Top Banner) ──────────────── */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-primary/5 to-emerald-500/10 border border-primary/20 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-primary text-white shadow-xs shrink-0">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm sm:text-base font-bold text-foreground font-khmer">
                                    {isKhmer
                                        ? "គណនាថ្លៃសិក្សាតាមនិទ្ទេសបាក់ឌុប (Bac II Calculator)"
                                        : "Bac II Calculator & Merit Waivers"}
                                </h3>
                                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-[10px] px-1.5 py-0 font-medium">
                                    MVP Live
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-khmer mt-0.5">
                                {isKhmer
                                    ? "ជ្រើសរើសនិទ្ទេសបាក់ឌុបរបស់អ្នក ដើម្បីមើលថ្លៃសិក្សាឆ្នាំទី១ ក្រោយបញ្ចុះតម្លៃអាហារូបករណ៍ភ្លាមៗ"
                                    : "Select your Bac II grade to calculate adjusted Year 1 tuition after merit waiver."}
                            </p>
                        </div>
                    </div>

                    {selectedGrade !== "ALL" && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 w-fit">
                            <Sparkles className="size-3.5" />
                            <span>
                                {isKhmer
                                    ? `កំពុងបង្ហាញថ្លៃសិក្សាក្នុងនិទ្ទេស ${selectedGrade}`
                                    : `Active: Grade ${selectedGrade} Year 1 Pricing`}
                            </span>
                        </div>
                    )}
                </div>

                {/* Grade Selection Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                    {BAC2_GRADES.map(item => {
                        const isActive = selectedGrade === item.grade;
                        return (
                            <button
                                key={item.grade}
                                type="button"
                                onClick={() => {
                                    setSelectedGrade(item.grade);
                                    setCurrentPage(1);
                                }}
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border shadow-2xs",
                                    isActive
                                        ? "bg-primary text-primary-foreground border-primary scale-[1.02] shadow-sm"
                                        : "bg-card text-foreground border-border hover:bg-muted/80 hover:border-primary/40",
                                )}
                            >
                                <span>{isKhmer ? item.labelKh : item.labelEn}</span>
                                {item.discountHint && (
                                    <span
                                        className={cn(
                                            "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                                        )}
                                    >
                                        {item.discountHint}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── 2. Filter Controls ────────────────────────────────────────── */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-card border border-border shadow-xs">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput
                        value={query}
                        onChange={val => {
                            setQuery(val);
                            setCurrentPage(1);
                        }}
                        placeholder={t("topbar.searchPlaceholder")}
                        className="w-full lg:max-w-xs"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Qualification Filter (CQF Level 5 / 6) */}
                        <Select
                            value={selectedQualification}
                            onValueChange={v => {
                                setSelectedQualification(v as QualificationFilter);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-40 text-xs">
                                <SelectValue placeholder="Qualifications" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">
                                    {isKhmer ? "កម្រិតសិក្សាទាំងអស់" : "All Undergrad"}
                                </SelectItem>
                                <SelectItem value="BACHELOR">
                                    {isKhmer ? "បរិញ្ញាបត្រ (CQF 6)" : "Bachelor (CQF 6)"}
                                </SelectItem>
                                <SelectItem value="ASSOCIATE">
                                    {isKhmer ? "បរិញ្ញាបត្ររង (CQF 5)" : "Associate (CQF 5)"}
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Khan / District Filter */}
                        {khans.length > 0 && (
                            <Select
                                value={selectedKhan}
                                onValueChange={v => {
                                    setSelectedKhan(v);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-38 text-xs">
                                    <MapPin className="size-3 text-muted-foreground mr-1" />
                                    <SelectValue placeholder="All Khans" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">
                                        {isKhmer ? "គ្រប់ខណ្ឌ (All Khans)" : "All Khans"}
                                    </SelectItem>
                                    {khans.map(k => (
                                        <SelectItem key={k} value={k}>
                                            Khan {k}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {/* Province Filter */}
                        <Select
                            value={selectedProvince}
                            onValueChange={v => {
                                setSelectedProvince(v);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-36 text-xs">
                                <SelectValue placeholder="All Provinces" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">
                                    {isKhmer ? "គ្រប់ខេត្ត/ក្រុង" : "All Provinces"}
                                </SelectItem>
                                {provinces.map(p => (
                                    <SelectItem key={p} value={p}>
                                        {p}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Budget Filter */}
                        <Select
                            value={selectedBudget}
                            onValueChange={v => {
                                setSelectedBudget(v as BudgetFilter);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-36 text-xs">
                                <SelectValue placeholder={t("explore.budgetAll")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">{t("explore.budgetAll")}</SelectItem>
                                <SelectItem value="UNDER_600">{t("explore.budgetUnder600")}</SelectItem>
                                <SelectItem value="600_TO_1200">{t("explore.budget600to1200")}</SelectItem>
                                <SelectItem value="OVER_1200">{t("explore.budgetOver1200")}</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* University Type Filter */}
                        <Select
                            value={selectedType}
                            onValueChange={v => {
                                setSelectedType(v as TypeFilter);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-32 text-xs">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">
                                    {isKhmer ? "គ្រប់ប្រភេទ" : "All Types"}
                                </SelectItem>
                                <SelectItem value="PUBLIC">
                                    {t("miscellaneous.public")}
                                </SelectItem>
                                <SelectItem value="PRIVATE">
                                    {t("miscellaneous.private")}
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Sort Order */}
                        <Select
                            value={sort}
                            onValueChange={v => {
                                setSort(v as SortKey);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-40 text-xs">
                                <SelectValue placeholder={t("explore.sortLabel")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name-asc">{t("explore.sortNameAsc")}</SelectItem>
                                <SelectItem value="name-desc">{t("explore.sortNameDesc")}</SelectItem>
                                <SelectItem value="tuition-asc">
                                    {selectedGrade !== "ALL"
                                        ? isKhmer ? "តម្លៃឆ្នាំទី១ (ទាបទៅខ្ពស់)" : "Year 1 Fee (Low to High)"
                                        : t("explore.sortTuitionAsc")}
                                </SelectItem>
                                <SelectItem value="tuition-desc">
                                    {selectedGrade !== "ALL"
                                        ? isKhmer ? "តម្លៃឆ្នាំទី១ (ខ្ពស់ទៅទាប)" : "Year 1 Fee (High to Low)"
                                        : t("explore.sortTuitionDesc")}
                                </SelectItem>
                                <SelectItem value="established-desc">
                                    {isKhmer ? "ឆ្នាំបង្កើត (ថ្មីជាងគេ)" : "Newest Established"}
                                </SelectItem>
                                <SelectItem value="established-asc">{t("explore.sortEstablished")}</SelectItem>
                            </SelectContent>
                        </Select>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleResetFilters}
                                title="Reset filters"
                                className="text-muted-foreground hover:text-foreground shrink-0"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* ── 3. Delivery Shift Toggles & Quick Filters ────────────── */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
                    {/* Delivery Shifts */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mr-1">
                            <Clock className="size-3" />
                            {isKhmer ? "វេនសិក្សា៖" : "Shifts:"}
                        </span>
                        {DELIVERY_SHIFTS.map(s => {
                            const isSelected = selectedShifts.includes(s.id);
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => toggleShift(s.id)}
                                    className={cn(
                                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border",
                                        isSelected
                                            ? "bg-sky-600 text-white border-sky-600 shadow-2xs"
                                            : "bg-card text-muted-foreground border-border hover:bg-muted/70",
                                    )}
                                >
                                    <span>{s.icon}</span>
                                    <span>{isKhmer ? s.labelKh : s.labelEn}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setOnlyScholarships(!onlyScholarships);
                                setCurrentPage(1);
                            }}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border",
                                onlyScholarships
                                    ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                                    : "bg-card text-muted-foreground border-border hover:bg-muted/70",
                            )}
                        >
                            <Award className="size-3.5" />
                            {t("explore.filterScholarships")}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setOnlyAccredited(!onlyAccredited);
                                setCurrentPage(1);
                            }}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border",
                                onlyAccredited
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                                    : "bg-card text-muted-foreground border-border hover:bg-muted/70",
                            )}
                        >
                            {t("miscellaneous.accredited")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
