import { notFound } from "next/navigation";
import { FacultyCard } from "@/components/university/programs-and-fees/faculty-card";
import { AboutCard } from "@/components/university/about-card";
import { HotNewsCard } from "@/components/university/hot-news-card";
import { CampusMapCard } from "@/components/university/campus-map-card";
import { AdmissionsCard } from "@/components/university/admissions-card";
import { BrochureCard } from "@/components/university/brochure-card";
import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { SectionLayout } from "@/components/shared/section-layout";
import { getUniversityPageData } from "@/data/university-page";
import { universities } from "@/data/universities";
import { readLang } from "@/lib/language.server";

interface ProgramsPageProps {
  params: Promise<{ university: string }>;
}

/** "Programs & Fees" tab: search pills + the programs list, plus the right-hand rail. */
export default async function ProgramsPage({ params }: ProgramsPageProps) {
  const { university: id } = await params;
  const university = universities.find((u) => u.id === id);

  if (!university) notFound();

  const lang = await readLang();
  const { filters, faculty, about, hotNews, campusMap, admissions, brochure } =
    getUniversityPageData(university, lang);

  return (
    <SectionLayout
      breakpoint="md"
      mainClassName="space-y-4"
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
      {/* Widget copy this page owns, in the reader's language rather than as one
          string holding both. */}
      <SearchFilterBar
        pills={filters}
        placeholder={lang === "en" ? "Search programs" : "ស្វែងរកជំនាញ"}
      />
      <FacultyCard data={faculty} />
    </SectionLayout>
  );
}
