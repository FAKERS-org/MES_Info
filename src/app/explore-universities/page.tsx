"use client";

import { ErrorState } from "@/components/shared/error-state";
import { SkeletonGrid } from "@/components/shared/skeleton";
import { Button } from "@/components/ui/button";
import { ExploreFilterBar } from "@/components/university/explore/explore-filter-bar";
import { PAGE_SIZE, useExploreFilters } from "@/components/university/explore/use-explore-filters";
import UniversityHeader from "@/components/university/university-header";
import UniversityPagination from "@/components/university/university-pagination";
import { UniversityTile } from "@/components/university/university-tile";
import { useUniversities } from "@/hooks/use-universities";
import { useLanguage } from "@/lib/i18n";

export default function ExploreUniversitiesPage() {
    const { lang, t } = useLanguage();
    const { universities, status, refresh } = useUniversities();
    const filter = useExploreFilters(universities);

    if (status === "loading") {
        return <SkeletonGrid count={6} />;
    }

    if (status === "error") {
        return <ErrorState onRetry={refresh} />;
    }

    const handlePageChange = (page: number) => {
        const target = Math.min(Math.max(1, page), filter.totalPages);
        filter.setCurrentPage(target);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 320, behavior: "smooth" });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <UniversityHeader
                totalCount={universities.length}
                publicCount={filter.publicCount}
                privateCount={filter.privateCount}
                provincesCount={filter.provinces.length}
            />

            {/* Filter Bar Controls & Active Tags */}
            <ExploreFilterBar filter={filter} />

            {/* Results Grid or Empty State */}
            {filter.filtered.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-muted/30 rounded-2xl border border-dashed border-border p-6">
                    <p className="text-sm text-muted-foreground">{t("explore.noResults")}</p>
                    {filter.hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={filter.handleResetFilters}>
                            {lang === "kh" ? "កំណត់តម្រងឡើងវិញ" : "Reset Filters"}
                        </Button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {filter.paginated.map(university => (
                            <UniversityTile key={university.id} university={university} variant="featured" />
                        ))}
                    </div>

                    <UniversityPagination
                        currentPage={filter.safeCurrentPage}
                        totalPages={filter.totalPages}
                        totalItems={filter.filtered.length}
                        pageSize={PAGE_SIZE}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}
