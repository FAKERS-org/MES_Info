import UniInfoCard from "@/components/info/uni-info-card";
import { SkeletonGrid } from "@/components/shared/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { useUniversities } from "@/hooks/use-universities";

export default function OverviewPage() {
  const { universities, status, refresh } = useUniversities();

  if (status === "loading") {
    return <SkeletonGrid count={4} />;
  }

  if (status === "error") {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {universities.map((university) => (
          <UniInfoCard key={university.id} university={university} />
        ))}
      </div>
    </div>
  );
}
