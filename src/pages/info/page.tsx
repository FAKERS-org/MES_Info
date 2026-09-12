import InfoHeading from "@/components/info/info-heading";
import UniInfoCard from "@/components/info/uni-info-card";
import { universities } from "@/data/universities";

export default function InfoPage() {
  return (
    <div className="space-y-8">
      <InfoHeading />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {universities.map((university) => (
          <UniInfoCard key={university.id} university={university} />
        ))}
      </div>
    </div>
  );
}
