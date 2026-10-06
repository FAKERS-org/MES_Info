"use client";

import { ErrorState } from "@/components/shared/error-state";
import { SearchInput } from "@/components/shared/search-input";
import { SkeletonGrid } from "@/components/shared/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UniversityHeader from "@/components/university/university-header";
import UniversityPagination from "@/components/university/university-pagination";
import { UniversityTile } from "@/components/university/university-tile";
import { useUniversities } from "@/hooks/use-universities";
import { useLanguage } from "@/lib/i18n";
import { apiName } from "@/lib/language";
import { useMemo, useState } from "react";

type SortKey = "name-asc" | "name-desc";

export default function ExploreUniversitiesPage() {
    const { lang, t } = useLanguage();
    const { universities, status, refresh } = useUniversities();

    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<SortKey>("name-asc");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const items = universities.filter(u => {
            const name = apiName(u, lang).toLowerCase();
            const province = u.province.toLowerCase();
            return !q || name.includes(q) || province.includes(q);
        });

        return [...items].sort((a, b) => {
            const nameA = apiName(a, lang);
            const nameB = apiName(b, lang);
            return sort === "name-asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
    }, [universities, lang, query, sort]);

    if (status === "loading") {
        return <SkeletonGrid count={8} />;
    }

    if (status === "error") {
        return <ErrorState onRetry={refresh} />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <UniversityHeader />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <SearchInput
                    value={query}
                    onChange={setQuery}
                    placeholder={t("topbar.searchPlaceholder")}
                    className="w-full sm:max-w-md"
                />

                <Select value={sort} onValueChange={v => setSort(v as SortKey)}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder={t("explore.sortLabel")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">{t("explore.sortNameAsc")}</SelectItem>
                        <SelectItem value="name-desc">{t("explore.sortNameDesc")}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">{t("explore.resultsCount", { count: filtered.length })}</p>

            {filtered.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">{t("explore.noResults")}</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {filtered.map(university => (
                        <UniversityTile key={university.id} university={university} variant="featured" />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <UniversityPagination />
        </div>
    );
}
