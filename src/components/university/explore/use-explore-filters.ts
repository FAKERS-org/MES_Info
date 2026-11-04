import type { UniversitySummary } from "@/hooks/use-universities";
import { useLanguage } from "@/lib/i18n";
import { apiName } from "@/lib/language";
import { useMemo, useState } from "react";

export type SortKey = "name-asc" | "name-desc" | "tuition-asc" | "tuition-desc" | "established-desc" | "established-asc";
export type TypeFilter = "ALL" | "PUBLIC" | "PRIVATE";
export type BudgetFilter = "ALL" | "UNDER_600" | "600_TO_1200" | "OVER_1200";

export const PAGE_SIZE = 9;

export function useExploreFilters(universities: UniversitySummary[]) {
    const { lang } = useLanguage();

    const [query, setQuery] = useState("");
    const [selectedType, setSelectedType] = useState<TypeFilter>("ALL");
    const [selectedMinistry, setSelectedMinistry] = useState<string>("ALL");
    const [selectedProvince, setSelectedProvince] = useState<string>("ALL");
    const [selectedBudget, setSelectedBudget] = useState<BudgetFilter>("ALL");
    const [onlyScholarships, setOnlyScholarships] = useState(false);
    const [onlyDormitory, setOnlyDormitory] = useState(false);
    const [onlyAccredited, setOnlyAccredited] = useState(false);
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
            const matchesMinistry = selectedMinistry === "ALL" || u.ministry === selectedMinistry;
            const matchesProvince = selectedProvince === "ALL" || u.province === selectedProvince;

            const tuition = u.default_tuition_per_year;
            const matchesBudget = selectedBudget === "ALL" || (
                selectedBudget === "UNDER_600"
                    ? (tuition != null && tuition < 600)
                    : selectedBudget === "600_TO_1200"
                    ? (tuition != null && tuition >= 600 && tuition <= 1200)
                    : (tuition != null && tuition > 1200)
            );

            const matchesScholarships = !onlyScholarships || Boolean(u.has_scholarships);
            const matchesDormitory = !onlyDormitory || Boolean(u.has_dormitory);
            const matchesAccredited = !onlyAccredited || Boolean(u.moeys_accredited);

            return (
                matchesQuery &&
                matchesType &&
                matchesMinistry &&
                matchesProvince &&
                matchesBudget &&
                matchesScholarships &&
                matchesDormitory &&
                matchesAccredited
            );
        });

        return [...items].sort((a, b) => {
            if (sort === "tuition-asc") {
                const tA = a.default_tuition_per_year ?? 999999;
                const tB = b.default_tuition_per_year ?? 999999;
                return tA - tB;
            }
            if (sort === "tuition-desc") {
                const tA = a.default_tuition_per_year ?? 0;
                const tB = b.default_tuition_per_year ?? 0;
                return tB - tA;
            }
            if (sort === "established-desc") {
                return (b.established_year ?? 0) - (a.established_year ?? 0);
            }
            if (sort === "established-asc") {
                return (a.established_year ?? 9999) - (b.established_year ?? 9999);
            }
            const nameA = apiName(a, lang);
            const nameB = apiName(b, lang);
            return sort === "name-asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
    }, [
        universities,
        lang,
        query,
        selectedType,
        selectedMinistry,
        selectedProvince,
        selectedBudget,
        onlyScholarships,
        onlyDormitory,
        onlyAccredited,
        sort,
    ]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

    const paginated = useMemo(() => {
        const start = (safeCurrentPage - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, safeCurrentPage]);

    const handleResetFilters = () => {
        setQuery("");
        setSelectedType("ALL");
        setSelectedMinistry("ALL");
        setSelectedProvince("ALL");
        setSelectedBudget("ALL");
        setOnlyScholarships(false);
        setOnlyDormitory(false);
        setOnlyAccredited(false);
        setSort("name-asc");
        setCurrentPage(1);
    };

    const hasActiveFilters =
        Boolean(query) ||
        selectedType !== "ALL" ||
        selectedMinistry !== "ALL" ||
        selectedProvince !== "ALL" ||
        selectedBudget !== "ALL" ||
        onlyScholarships ||
        onlyDormitory ||
        onlyAccredited;

    return {
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
        currentPage,
        setCurrentPage,
        provinces,
        publicCount,
        privateCount,
        filtered,
        paginated,
        totalPages,
        safeCurrentPage,
        hasActiveFilters,
        handleResetFilters,
    };
}
