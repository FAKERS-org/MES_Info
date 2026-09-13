import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useUniversities } from "@/hooks/use-universities";
import { SkeletonGrid } from "@/components/shared/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import UniversityIdCard from "@/components/universities/universityId-card";

export default function UniversityPage() {
  const { university = "" } = useParams();
  const { lang, t } = useLanguage();
  const { universities, status, refresh } = useUniversities();
  const data = universities.find((u) => u.id === university);

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const categories = useMemo(() => {
    if (!data) return [];
    const seen = new Map<string, { id: string; label: string }>();
    for (const d of data.departments) {
      const label = d.category[lang] ?? d.category.en;
      if (!seen.has(label)) seen.set(label, { id: label, label });
    }
    return [...seen.values()];
  }, [data, lang]);

  const filteredDepartments = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    return data.departments.filter((dept) => {
      const matchesCategory =
        !categoryFilter || (dept.category[lang] ?? dept.category.en) === categoryFilter;
      const name = (dept.name[lang] ?? dept.name.en).toLowerCase();
      const enName = dept.name.en.toLowerCase();
      const matchesQuery = !q || name.includes(q) || enName.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [data, lang, query, categoryFilter]);

  if (status === "loading") {
    return <SkeletonGrid count={2} />;
  }

  if (status === "error") {
    return <ErrorState onRetry={refresh} />;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">{t("explore.universityNotFound")}</p>
        <Link to="/explore-universities" className="text-sm font-medium text-primary hover:underline">
          {t("nav.exploreUniversities")}
        </Link>
      </div>
    );
  }

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
      <UniversityIdCard />
    </div>
  );
}
