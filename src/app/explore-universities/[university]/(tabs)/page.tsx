import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { SectionLayout } from "@/components/shared/section-layout";
import AdmissionsContactCard from "@/components/university/programs-and-fees/admissions-contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import ExamInfoCard from "@/components/university/programs-and-fees/exam-info-card";
import FacultyCard from "@/components/university/programs-and-fees/faculty-card";
import { universities } from "@/data/universities";
import { getUniversityPageData } from "@/data/university-page";
import { readLang } from "@/lib/language.server";
import { notFound } from "next/navigation";

interface ProgramsPageProps {
    params: Promise<{ university: string }>;
}

/** "Programs & Fees" tab: search pills + the programs list, plus the right-hand rail. */
export default async function ProgramsPage({ params }: ProgramsPageProps) {
    const { university: id } = await params;
    const university = universities.find(u => u.id === id);

    if (!university) notFound();

    const lang = await readLang();
    const { filters, faculty, about, hotNews, campusMap, admissions, brochure } = getUniversityPageData(
        university,
        lang,
    );

    return (
        <SectionLayout
            breakpoint="md"
            mainClassName="space-y-4"
            aside={
                /* Right Column (About, Hot News, Campus Map, Admissions, Brochure) */
                <>
                    <ExamInfoCard />
                    <CampusMapCard />
                    <AdmissionsContactCard />
                    <BrochureDownloadCard />
                </>
            }
        >
            {/* Widget copy this page owns, in the reader's language rather than as one
          string holding both. */}
            <SearchFilterBar pills={filters} placeholder={lang === "en" ? "Search programs" : "ស្វែងរកជំនាញ"} />

            {/* Faculty Card */}
            <FacultyCard />
        </SectionLayout>
    );
}
