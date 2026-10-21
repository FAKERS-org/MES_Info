"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface UniversityPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function UniversityPagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    className,
}: UniversityPaginationProps) {
    const { t } = useLanguage();

    if (totalItems === 0) return null;

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    const getPageNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | "...")[] = [];
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className={cn("w-full max-w-full mx-auto bg-card p-6 border border-border rounded-xl shadow-xs mt-6", className)}>
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Left Side: Info Text */}
                <div className="text-sm font-medium text-muted-foreground order-1">
                    {t("miscellaneous.showing")} <span className="font-semibold text-foreground">{start}–{end}</span> {t("miscellaneous.of")} <span className="font-semibold text-foreground">{totalItems}</span>{" "}
                    {totalItems === 1
                        ? t("miscellaneous.university.singular")
                        : t("miscellaneous.university.plural")}
                </div>

                {/* Right Side: Pagination Controls */}
                <div className="flex items-center gap-1.5 order-2 sm:order-3">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-border bg-card text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-40"
                        disabled={currentPage <= 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {pages.map((p, idx) =>
                        p === "..." ? (
                            <span key={`dots-${idx}`} className="px-1.5 text-sm text-muted-foreground">
                                …
                            </span>
                        ) : (
                            <Button
                                key={p}
                                variant={p === currentPage ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                    "h-8 w-8 p-0 font-medium transition-colors",
                                    p === currentPage
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-xs"
                                        : "bg-card text-foreground border-border hover:border-primary hover:bg-primary/10 hover:text-primary"
                                )}
                                onClick={() => onPageChange(p)}
                            >
                                {p}
                            </Button>
                        )
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-border bg-card text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-40"
                        disabled={currentPage >= totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Middle: Load More Button */}
                {currentPage < totalPages && (
                    <div className="order-3 sm:order-2 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            {t("miscellaneous.loadMoreUniversities")}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
