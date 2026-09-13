import UniversityIdCard from "@/components/universities/universityId-card";
import UniversityMenu from "@/components/universities/university-menu";
import { DegreeSearch } from "@/components/universities/degree-search";
import { FacultyCard } from "@/components/universities/faculty-card";
import { HotNewsCard } from "@/components/universities/hot-nows-card";

export default function UniversityPage() {
  return (
    <div className="space-y-8">
      <UniversityIdCard />
      <UniversityMenu />

      <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Left Column (Search + Faculty) */}
        <div className="md:col-span-2 space-y-6">
          <DegreeSearch />
          <FacultyCard />
        </div>

        {/* Right Column (Hot News) */}
        <div className="md:col-span-1">
          <HotNewsCard />
        </div>

      </div>
    </div>  
  );
}
