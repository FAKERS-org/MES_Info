import UniversityIdCard from "@/components/university/university-id-card";
import UniversityMenu from "@/components/university/university-menu";
import { DegreeSearch } from "@/components/university/degree-search";
import { FacultyCard } from "@/components/university/faculty-card";
import { HotNewsCard } from "@/components/university/hot-news-card";
import { AdmissionsCard } from "@/components/university/admissions-card";
import { BrochureCard } from "@/components/university/brochure-card";
import { CampusMapCard } from "@/components/university/campus-map-card";

export default async function UniversityIdPage() {
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
