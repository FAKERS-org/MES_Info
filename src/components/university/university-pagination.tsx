"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UniversityPagination() {
    const { t } = useLanguage();

    return (
        // Container wrapper to simulate the card/list boundary
        <div className="w-full max-w-full mx-auto bg-card p-6 border rounded-xl shadow-sm mt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Left Side: Info Text */}
                <div className="text-sm font-medium text-muted-foreground order-1">
                    {t("miscellaneous.showing")} 6 {t("miscellaneous.of")} 42 {t("miscellaneous.university.plural")}{" "}
                    <span className="text-muted-foreground/70 hidden sm:inline">
                        ({t("miscellaneous.showing")} 6 {t("miscellaneous.of")} 42{" "}
                        {t("miscellaneous.university.plural")})
                    </span>
                </div>

                {/* Right Side: Pagination Controls */}
                <div className="flex items-center gap-2 order-2 sm:order-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-foreground text-background hover:bg-foreground/90">
                        1
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent text-foreground">
                        2
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent text-foreground">
                        3
                    </Button>

                    <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Middle: Load More Button */}
                <div className="order-3 sm:order-2 w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto text-foreground bg-transparent">
                        {t("miscellaneous.loadMoreUniversities")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
