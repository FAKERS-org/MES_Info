import UniversityIdCard from "@/components/universities/universityId-card";
import UniversityMenu from "@/components/universities/university-menu";
import { DegreeSearch } from "@/components/universities/degree-search";
import { FacultyCard } from "@/components/universities/faculty-card";
import { HotNewsCard } from "@/components/universities/hot-nows-card";
import { AdmissionsCard } from "@/components/universities/admissions-card";
import { BrochureCard } from "@/components/universities/brochure-card";
import { CampusMapCard } from "@/components/universities/campus-map-card";

export default function UniversityIdPage() {
  return (
    <div className="space-y-8">
      <UniversityIdCard />
      <UniversityMenu />

      <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Left Column (Search + Faculty) */}
        <div className="md:col-span-2 space-y-6">
          <DegreeSearch />
          <FacultyCard />
          <FacultyCard />
          {/* <FacultyCard /> */}
        </div>

        {/* Right Column (Hot News) */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <HotNewsCard />
          <CampusMapCard />
          <AdmissionsCard />
          <BrochureCard />
        </div>

      </div>
    </div>  
  );
}
