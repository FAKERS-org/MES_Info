import { universities } from "@/data/universities";
import UniInfoCard from "@/components/info/uni-info-card";

export default function OverviewPage() {
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