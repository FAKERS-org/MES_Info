import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { institutions } from "@/data/institutions";
import UniInfoCard from "@/components/info/uni-info-card";
import { SearchInput } from "@/components/shared/search-input";
import { FilterChip } from "@/components/shared/filter-chip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortKey = "name-asc" | "name-desc" | "departments-desc";

export default function ExploreUniversitiesPage() {
  const { t } = useLanguage();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("name-asc");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(institutions.flatMap((i) => i.departments.map((d) => d.categoryKey))),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = institutions.filter((i) => {
      const matchesQuery =
        !q ||
        t(i.nameKey).toLowerCase().includes(q) ||
        (i.address ?? "").toLowerCase().includes(q);
      const matchesCategory =
        !category || i.departments.some((d) => d.categoryKey === category);
      return matchesQuery && matchesCategory;
    });

    items = [...items].sort((a, b) => {
      if (sort === "name-asc") return t(a.nameKey).localeCompare(t(b.nameKey));
      if (sort === "name-desc") return t(b.nameKey).localeCompare(t(a.nameKey));
      return b.departments.length - a.departments.length;
    });

    return items;
  }, [query, category, sort, t]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {t("explore.title")}
        </h1>
        <p className="mx-auto mt-1 max-w-2xl text-sm text-muted-foreground md:text-base">
          {t("explore.subtitle")}
        </p>
      </div>

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

      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={category === null} onClick={() => setCategory(null)}>
            {t("filter.all")}
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              active={category === cat}
              onClick={() => setCategory(category === cat ? null : cat)}
            >
              {t(cat)}
            </FilterChip>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        {t("explore.resultsCount", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {t("explore.noResults")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((institution) => (
            <UniInfoCard key={institution.id} institution={institution} />
          ))}
        </div>
      )}
    </div>
  );
}
