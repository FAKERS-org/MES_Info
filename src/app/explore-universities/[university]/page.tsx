import { notFound } from "next/navigation";
import UniversityIdCard from "@/components/university/university-id-card";
import UniversityMenu from "@/components/university/university-menu";
import { DegreeSearch } from "@/components/university/degree-search";
import { FacultyCard } from "@/components/university/faculty-card";
import { AboutCard } from "@/components/university/about-card";
import { HotNewsCard } from "@/components/university/hot-news-card";
import { AdmissionsCard } from "@/components/university/admissions-card";
import { BrochureCard } from "@/components/university/brochure-card";
import { CampusMapCard } from "@/components/university/campus-map-card";
import { SectionLayout } from "@/components/shared/section-layout";
import { getUniversityPageData } from "@/data/university-page";
import { universities } from "@/data/universities";

interface UniversityIdPageProps {
  params: Promise<{ university: string }>;
}

export default async function UniversityIdPage({ params }: UniversityIdPageProps) {
  const { university: id } = await params;
  const university = universities.find((u) => u.id === id);

  if (!university) notFound();

  const {
    hero,
    filters,
    faculty,
    about,
    hotNews,
    admissions,
    campusMap,
    brochure,
    menu,
  } = getUniversityPageData(university);

  return (
    <div className="space-y-8">
      <UniversityIdCard data={hero} />
      <UniversityMenu tabs={menu} />

      <SectionLayout
        breakpoint="md"
        mainClassName="space-y-6"
        aside={
          /* Right Column (About, Hot News, Campus Map, Admissions, Brochure) */
          <>
            <AboutCard data={about} />
            {hotNews && <HotNewsCard data={hotNews} />}
            <CampusMapCard data={campusMap} />
            <AdmissionsCard data={admissions} />
            {brochure && <BrochureCard data={brochure} />}
          </>
        }
      >
        {/* Left Column (Search + Faculty) */}
        <DegreeSearch pills={filters} />
        <FacultyCard data={faculty} />
      </SectionLayout>
    </div>
  );
}
