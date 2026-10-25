"use client";

import { ErrorState } from "@/components/shared/error-state";
import { SearchInput } from "@/components/shared/search-input";
import { SkeletonGrid } from "@/components/shared/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UniversityHeader from "@/components/university/university-header";
import UniversityPagination from "@/components/university/university-pagination";
import { UniversityTile } from "@/components/university/university-tile";
import { useUniversities } from "@/hooks/use-universities";
import { useLanguage } from "@/lib/i18n";
import { apiName } from "@/lib/language";
import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

type SortKey = "name-asc" | "name-desc";
type TypeFilter = "ALL" | "PUBLIC" | "PRIVATE";
const PAGE_SIZE = 9;

export default function ExploreUniversitiesPage() {
    const { lang, t } = useLanguage();
    const { universities, status, refresh } = useUniversities();

    const [query, setQuery] = useState("");
    const [selectedType, setSelectedType] = useState<TypeFilter>("ALL");
    const [selectedProvince, setSelectedProvince] = useState<string>("ALL");
    const [sort, setSort] = useState<SortKey>("name-asc");
    const [currentPage, setCurrentPage] = useState(1);

    const provinces = useMemo(() => {
        const set = new Set<string>();
        for (const u of universities) {
            if (u.province) set.add(u.province);
        }
        return Array.from(set).sort();
    }, [universities]);

    const publicCount = useMemo(() => universities.filter(u => u.type === "PUBLIC").length, [universities]);
    const privateCount = useMemo(() => universities.filter(u => u.type === "PRIVATE").length, [universities]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const items = universities.filter(u => {
            const name = apiName(u, lang).toLowerCase();
            const province = (u.province || "").toLowerCase();
            const abbrev = (u.abbreviation || "").toLowerCase();
            const matchesQuery = !q || name.includes(q) || province.includes(q) || abbrev.includes(q);
            const matchesType = selectedType === "ALL" || u.type === selectedType;
            const matchesProvince = selectedProvince === "ALL" || u.province === selectedProvince;

            return matchesQuery && matchesType && matchesProvince;
        });

        return [...items].sort((a, b) => {
            const nameA = apiName(a, lang);
            const nameB = apiName(b, lang);
            return sort === "name-asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
    }, [universities, lang, query, selectedType, selectedProvince, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

    const paginated = useMemo(() => {
        const start = (safeCurrentPage - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, safeCurrentPage]);

    const handleQueryChange = (val: string) => {
        setQuery(val);
        setCurrentPage(1);
    };

    const handleTypeChange = (val: TypeFilter) => {
        setSelectedType(val);
        setCurrentPage(1);
    };

    const handleProvinceChange = (val: string) => {
        setSelectedProvince(val);
        setCurrentPage(1);
    };

    const handleSortChange = (val: SortKey) => {
        setSort(val);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setQuery("");
        setSelectedType("ALL");
        setSelectedProvince("ALL");
        setSort("name-asc");
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        const target = Math.min(Math.max(1, page), totalPages);
        setCurrentPage(target);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 320, behavior: "smooth" });
        }
    };

    if (status === "loading") {
        return <SkeletonGrid count={6} />;
    }

    if (status === "error") {
        return <ErrorState onRetry={refresh} />;
    }

    const hasActiveFilters = query || selectedType !== "ALL" || selectedProvince !== "ALL";

    return (
        <div className="space-y-6">
            {/* Header */}
            <UniversityHeader
                totalCount={universities.length}
                publicCount={publicCount}
                privateCount={privateCount}
                provincesCount={provinces.length}
            />

            {/* Filter Bar */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between p-4 rounded-2xl bg-card border border-border shadow-xs">
                <SearchInput
                    value={query}
                    onChange={handleQueryChange}
                    placeholder={t("topbar.searchPlaceholder")}
                    className="w-full lg:max-w-xs"
                />

                <div className="flex flex-wrap items-center gap-2.5">
                    {/* University Type Filter */}
                    <Select value={selectedType} onValueChange={v => handleTypeChange(v as TypeFilter)}>
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

                    {/* Province Filter */}
                    <Select value={selectedProvince} onValueChange={handleProvinceChange}>
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

                    {/* Sort Order */}
                    <Select value={sort} onValueChange={v => handleSortChange(v as SortKey)}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder={t("explore.sortLabel")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name-asc">{t("explore.sortNameAsc")}</SelectItem>
                            <SelectItem value="name-desc">{t("explore.sortNameDesc")}</SelectItem>
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

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
                <p>{t("explore.resultsCount", { count: filtered.length })}</p>
                {hasActiveFilters && (
                    <button
                        onClick={handleResetFilters}
                        className="text-sky-600 dark:text-sky-400 hover:underline text-xs"
                    >
                        {lang === "kh" ? "សម្អាតតម្រងស្វែងរក" : "Clear all filters"}
                    </button>
                )}
            </div>

            {filtered.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-muted/30 rounded-2xl border border-dashed border-border p-6">
                    <p className="text-sm text-muted-foreground">{t("explore.noResults")}</p>
                    {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={handleResetFilters}>
                            {lang === "kh" ? "កំណត់តម្រងឡើងវិញ" : "Reset Filters"}
                        </Button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {paginated.map(university => (
                            <UniversityTile key={university.id} university={university} variant="featured" />
                        ))}
                    </div>

                    {filtered.length > 0 && (
                        <UniversityPagination
                            currentPage={safeCurrentPage}
                            totalPages={totalPages}
                            totalItems={filtered.length}
                            pageSize={PAGE_SIZE}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}
