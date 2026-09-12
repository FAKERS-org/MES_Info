import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage, translations } from "@/lib/i18n";
import { universities } from "@/data/universities";
import DepartementInfoCard from "@/components/info/departement-info-card";
import UniInfoSecondCard from "@/components/info/uni-info-second-card";
import { SearchInput } from "@/components/shared/search-input";
import { FilterChip } from "@/components/shared/filter-chip";

export default function UniversityPage() {
  const { university = "" } = useParams();
  const { t } = useLanguage();
  const data = universities.find((u) => u.id === university);

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const categories = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.departments.map((d) => d.categoryKey)));
  }, [data]);

  const filteredDepartments = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    return data.departments.filter((dept) => {
      const matchesCategory = !categoryFilter || dept.categoryKey === categoryFilter;
      const name = t(dept.nameKey).toLowerCase();
      const enName = t(dept.enNameKey).toLowerCase();
      const matchesQuery = !q || name.includes(q) || enName.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [data, query, categoryFilter, t]);

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">{t("exam.subjectNotFound")}</p>
        <Link to="/explore-universities" className="text-sm font-medium text-primary hover:underline">
          {t("nav.exploreUniversities")}
        </Link>
      </div>
    );
  }

  const khName = translations.kh[data.nameKey] ?? t(data.nameKey);
  const enName = translations.en[data.nameKey] ?? t(data.nameKey);

  const totalExpanded = filteredDepartments.length > 0 && expandedIds.size === filteredDepartments.length;

  const toggleAll = () => {
    if (totalExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(filteredDepartments.map((d) => d.id)));
    }
  };

  const toggleOne = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <Link
        to="/explore-universities"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("nav.exploreUniversities")}
      </Link>

      <div className="rounded-xl overflow-hidden shadow-md">
        <div className="bg-[#0f4c81] px-6 py-6">
          <div className="flex items-center gap-4">
            <img
              src={data.logo}
              alt={t(data.nameKey)}
              className="h-16 w-16 rounded-full object-cover border-4 border-white bg-white shrink-0"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold leading-tight text-white">{khName}</h1>
              <p className="text-sm font-medium text-white/80">{enName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1.5fr_1fr]">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder={t("topbar.searchPlaceholder")}
              />

              {data.departments.length > 0 && (
                <button
                  onClick={toggleAll}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {totalExpanded ? t("info.detail.collapseAll") : t("info.detail.expandAll")}
                </button>
              )}
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                <FilterChip active={categoryFilter === null} onClick={() => setCategoryFilter(null)}>
                  {t("filter.all")}
                </FilterChip>
                {categories.map((cat) => (
                  <FilterChip
                    key={cat}
                    active={categoryFilter === cat}
                    onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                  >
                    {t(cat)}
                  </FilterChip>
                ))}
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {t("info.detail.departments")}: {filteredDepartments.length} / {data.departments.length}
          </p>

          {filteredDepartments.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {t("info.detail.noDepartments")}
            </p>
          ) : (
            filteredDepartments.map((dept) => (
              <DepartementInfoCard
                key={dept.id}
                department={dept}
                open={expandedIds.has(dept.id)}
                onToggle={() => toggleOne(dept.id)}
              />
            ))
          )}
        </div>
        <UniInfoSecondCard university={data} />
      </div>
    </div>
  );
}