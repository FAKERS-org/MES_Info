"use client";

import { SearchInput } from "@/components/shared/search-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/i18n";
import { getMinistryLabel, MINISTRIES, MINISTRY_LABELS } from "@/lib/language";
import { cn } from "@/lib/utils";
import { Award, BadgeCheck, Home, RotateCcw, X } from "lucide-react";
import type { BudgetFilter, SortKey, TypeFilter, useExploreFilters } from "./use-explore-filters";

export interface ExploreFilterBarProps {
    filter: ReturnType<typeof useExploreFilters>;
}

export function ExploreFilterBar({ filter }: ExploreFilterBarProps) {
    const { lang, t } = useLanguage();

    const {
        query,
        setQuery,
        selectedType,
        setSelectedType,
        selectedMinistry,
        setSelectedMinistry,
        selectedProvince,
        setSelectedProvince,
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
        filtered,
        hasActiveFilters,
        handleResetFilters,
    } = filter;

    return (
        <div className="space-y-3.5">
            {/* Filter Bar Controls */}
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

                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* University Type Filter */}
                        <Select
                            value={selectedType}
                            onValueChange={v => {
                                setSelectedType(v as TypeFilter);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">
                                    {lang === "kh" ? "គ្រប់ប្រភេទ" : "All Types"}
                                </SelectItem>
                                <SelectItem value="PUBLIC">
                                    {t("miscellaneous.public")}
                                </SelectItem>
                                <SelectItem value="PRIVATE">
                                    {t("miscellaneous.private")}
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Ministry Filter */}
                        <Select
                            value={selectedMinistry}
                            onValueChange={v => {
                                setSelectedMinistry(v);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-44">
                                <SelectValue placeholder="All Ministries" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">
                                    {lang === "kh" ? "គ្រប់ក្រសួង" : "All Ministries"}
                                </SelectItem>
                                {MINISTRIES.map(m => (
                                    <SelectItem key={m} value={m}>
                                        {MINISTRY_LABELS[m].short} — {lang === "kh" ? MINISTRY_LABELS[m].kh : MINISTRY_LABELS[m].en}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Province Filter */}
                        <Select
                            value={selectedProvince}
                            onValueChange={v => {
                                setSelectedProvince(v);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="All Provinces" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">
                                    {lang === "kh" ? "គ្រប់ខេត្ត/ក្រុង" : "All Provinces"}
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
                            <SelectTrigger className="w-38">
                                <SelectValue placeholder={t("explore.budgetAll")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">{t("explore.budgetAll")}</SelectItem>
                                <SelectItem value="UNDER_600">{t("explore.budgetUnder600")}</SelectItem>
                                <SelectItem value="600_TO_1200">{t("explore.budget600to1200")}</SelectItem>
                                <SelectItem value="OVER_1200">{t("explore.budgetOver1200")}</SelectItem>
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
                            <SelectTrigger className="w-44">
                                <SelectValue placeholder={t("explore.sortLabel")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name-asc">{t("explore.sortNameAsc")}</SelectItem>
                                <SelectItem value="name-desc">{t("explore.sortNameDesc")}</SelectItem>
                                <SelectItem value="tuition-asc">{t("explore.sortTuitionAsc")}</SelectItem>
                                <SelectItem value="tuition-desc">{t("explore.sortTuitionDesc")}</SelectItem>
                                <SelectItem value="established-desc">
                                    {lang === "kh" ? "ឆ្នាំបង្កើត (ថ្មីជាងគេ)" : "Newest Established"}
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

                {/* Quick Filter Toggle Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-border/60">
                    <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                        {lang === "kh" ? "តម្រងរហ័ស៖" : "Quick:"}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedType(selectedType === "PUBLIC" ? "ALL" : "PUBLIC");
                            setCurrentPage(1);
                        }}
                        className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border",
                            selectedType === "PUBLIC"
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                                : "bg-card text-muted-foreground border-border hover:bg-muted/70",
                        )}
                    >
                        {t("miscellaneous.public")}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedType(selectedType === "PRIVATE" ? "ALL" : "PRIVATE");
                            setCurrentPage(1);
                        }}
                        className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border",
                            selectedType === "PRIVATE"
                                ? "bg-sky-600 text-white border-sky-600 shadow-2xs"
                                : "bg-card text-muted-foreground border-border hover:bg-muted/70",
                        )}
                    >
                        {t("miscellaneous.private")}
                    </button>
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
                            setOnlyDormitory(!onlyDormitory);
                            setCurrentPage(1);
                        }}
                        className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border",
                            onlyDormitory
                                ? "bg-teal-600 text-white border-teal-600 shadow-2xs"
                                : "bg-card text-muted-foreground border-border hover:bg-muted/70",
                        )}
                    >
                        <Home className="size-3.5" />
                        {t("explore.filterDormitory")}
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
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                                : "bg-card text-muted-foreground border-border hover:bg-muted/70",
                        )}
                    >
                        <BadgeCheck className="size-3.5" />
                        {t("miscellaneous.accredited")}
                    </button>
                </div>
            </div>

            {/* Results Count & Active Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground px-1">
                <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">
                        {t("explore.resultsCount", { count: filtered.length })}
                    </p>
                    {selectedType !== "ALL" && (
                        <Badge
                            variant="secondary"
                            className="gap-1 text-2xs cursor-pointer hover:bg-destructive/15"
                            onClick={() => setSelectedType("ALL")}
                        >
                            {selectedType === "PUBLIC" ? t("miscellaneous.public") : t("miscellaneous.private")}
                            <X className="size-3" />
                        </Badge>
                    )}
                    {selectedMinistry !== "ALL" && (
                        <Badge
                            variant="secondary"
                            className="gap-1 text-2xs cursor-pointer hover:bg-destructive/15"
                            onClick={() => setSelectedMinistry("ALL")}
                        >
                            {getMinistryLabel(selectedMinistry, lang)?.short ?? selectedMinistry}
                            <X className="size-3" />
                        </Badge>
                    )}
                    {selectedProvince !== "ALL" && (
                        <Badge
                            variant="secondary"
                            className="gap-1 text-2xs cursor-pointer hover:bg-destructive/15"
                            onClick={() => setSelectedProvince("ALL")}
                        >
                            {selectedProvince}
                            <X className="size-3" />
                        </Badge>
                    )}
                    {selectedBudget !== "ALL" && (
                        <Badge
                            variant="secondary"
                            className="gap-1 text-2xs cursor-pointer hover:bg-destructive/15"
                            onClick={() => setSelectedBudget("ALL")}
                        >
                            {selectedBudget === "UNDER_600"
                                ? "< $600/yr"
                                : selectedBudget === "600_TO_1200"
                                ? "$600 – $1,200/yr"
                                : "> $1,200/yr"}
                            <X className="size-3" />
                        </Badge>
                    )}
                    {onlyScholarships && (
                        <Badge
                            variant="secondary"
                            className="gap-1 text-2xs cursor-pointer hover:bg-destructive/15"
                            onClick={() => setOnlyScholarships(false)}
                        >
                            {t("explore.filterScholarships")}
                            <X className="size-3" />
                        </Badge>
                    )}
                    {onlyDormitory && (
                        <Badge
                            variant="secondary"
                            className="gap-1 text-2xs cursor-pointer hover:bg-destructive/15"
                            onClick={() => setOnlyDormitory(false)}
                        >
                            {t("explore.filterDormitory")}
                            <X className="size-3" />
                        </Badge>
                    )}
                    {onlyAccredited && (
                        <Badge
                            variant="secondary"
                            className="gap-1 text-2xs cursor-pointer hover:bg-destructive/15"
                            onClick={() => setOnlyAccredited(false)}
                        >
                            {t("miscellaneous.accredited")}
                            <X className="size-3" />
                        </Badge>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={handleResetFilters}
                        className="text-sky-600 dark:text-sky-400 hover:underline text-xs"
                    >
                        {lang === "kh" ? "សម្អាតតម្រងស្វែងរក" : "Clear all filters"}
                    </button>
                )}
            </div>
        </div>
    );
}
