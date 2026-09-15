import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useUniversities } from "@/hooks/use-universities";
import { UniversityCard } from "@/components/universities/university-card";
import { SearchInput } from "@/components/shared/search-input";
import { FilterChip } from "@/components/shared/filter-chip";
import { SkeletonGrid } from "@/components/shared/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UniversityHero from "@/components/universities/university-hero";
import UniversityPagination from "@/components/universities/universiity-pagination";

type SortKey = "name-asc" | "name-desc" | "departments-desc";

export default function ExploreUniversitiesPage() {
  const { lang, t } = useLanguage();
  const { universities, status, refresh } = useUniversities();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("name-asc");

  const categories = useMemo(() => {
    const seen = new Map<string, { id: string; label: string }>();
    for (const u of universities) {
      for (const d of u.departments) {
        const label = d.category[lang] ?? d.category.en;
        if (!seen.has(label)) seen.set(label, { id: label, label });
      }
    }
    return [...seen.values()];
  }, [universities, lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = universities.filter((u) => {
      const name = u.name[lang] ?? u.name.en;
      const address = u.address ? u.address[lang] ?? u.address.en : "";
      const matchesQuery =
        !q ||
        name.toLowerCase().includes(q) ||
        address.toLowerCase().includes(q);
      const matchesCategory =
        !category ||
        u.departments.some((d) => (d.category[lang] ?? d.category.en) === category);
      return matchesQuery && matchesCategory;
    });

    items = [...items].sort((a, b) => {
      const nameA = a.name[lang] ?? a.name.en;
      const nameB = b.name[lang] ?? b.name.en;
      if (sort === "name-asc") return nameA.localeCompare(nameB);
      if (sort === "name-desc") return nameB.localeCompare(nameA);
      return b.departments.length - a.departments.length;
    });

    return items;
  }, [universities, lang, query, category, sort]);

  if (status === "loading") {
    return <SkeletonGrid count={8} />;
  }

  if (status === "error") {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      
      {/* Hero */}
      <UniversityHero />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={t("topbar.searchPlaceholder")}
          className="w-full sm:max-w-md"
        />

        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t("explore.sortLabel")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">{t("explore.sortNameAsc")}</SelectItem>
            <SelectItem value="name-desc">{t("explore.sortNameDesc")}</SelectItem>
            <SelectItem value="departments-desc">{t("explore.sortByDepartments")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={category === null} onClick={() => setCategory(null)}>
            {t("filter.all")}
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={category === cat.id}
              onClick={() => setCategory(category === cat.id ? null : cat.id)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        {t("explore.resultsCount", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {t("explore.noResults")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <UniversityPagination />

    </div>
  );
}
