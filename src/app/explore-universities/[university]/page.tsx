import UniversityIdCard from "@/components/university/university-id-card";
import UniversityMenu from "@/components/university/university-menu";
import { DegreeSearch } from "@/components/university/degree-search";
import { FacultyCard } from "@/components/university/faculty-card";
import { HotNewsCard } from "@/components/university/hot-news-card";
import { AdmissionsCard } from "@/components/university/admissions-card";
import { BrochureCard } from "@/components/university/brochure-card";
import { CampusMapCard } from "@/components/university/campus-map-card";
import { SectionLayout } from "@/components/shared/section-layout";
import { universityPageData } from "@/data/university";

export default async function UniversityIdPage() {
  const { hero, faculty, hotNews, admissions, campusMap, brochure } =
    universityPageData;

  return (
    <div className="space-y-8">
      <UniversityIdCard data={hero} />
      <UniversityMenu />

      <SectionLayout
        breakpoint="md"
        mainClassName="space-y-6"
        aside={
          /* Right Column (Hot News, Campus Map, Admissions, Brochure) */
          <>
            <HotNewsCard data={hotNews} />
            <CampusMapCard data={campusMap} />
            <AdmissionsCard data={admissions} />
            <BrochureCard data={brochure} />
          </>
        }
      >
        {/* Left Column (Search + Faculty) */}
        <DegreeSearch />
        <FacultyCard data={faculty} />
        <FacultyCard data={faculty} />
        {/* <FacultyCard data={faculty} /> */}
      </SectionLayout>
    </div>
  );
}
