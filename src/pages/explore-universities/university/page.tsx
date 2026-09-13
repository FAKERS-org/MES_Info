import UniversityIdCard from "@/components/universities/universityId-card";
import UniversityMenu from "@/components/universities/university-menu";

export default function UniversityPage() {
  return (
    <div className="space-y-8">
      <UniversityIdCard />
      <UniversityMenu />
    </div>
  );
}
