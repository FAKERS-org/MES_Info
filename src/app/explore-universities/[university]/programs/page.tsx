import { SectionLayout } from "@/components/shared/section-layout";
import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import { UnitListCard } from "@/components/university/programs-and-fees/unit-list-card";
import UniversityHero from "@/components/university/university-hero";
import { getUniversity } from "@/data/universities";
import { readLang } from "@/lib/language.server";
import { notFound } from "next/navigation";

interface ProgramsPageProps {
    params: Promise<{ university: string }>;
}

/**
 * Programs of a university: one card per top-level unit (faculty, or a
 * department where a university has no faculties).
 *
 * This page used to ignore its own `university` param and render
 * `facultyDepartments` — a module holding ITC's tree only — with `itc`
 * hardcoded into every link. Every university in the catalogue showed ITC's
 * faculties.
 */
export default async function ProgramsPage({ params }: ProgramsPageProps) {
    const { university } = await params;

    const uni = getUniversity(university);
    if (!uni) notFound();

    const lang = await readLang();

    return (
        <div className="space-y-5">
            <UniversityHero university={uni} lang={lang} />
            <SectionLayout
                breakpoint="md"
                mainClassName="space-y-4"
                aside={
                    <div className="space-y-4">
                        <CampusMapCard />
                        <AdmissionsContactCard />
                        <BrochureDownloadCard />
                    </div>
                }
            >
                <div className="space-y-4">
                    <SearchFilterBar pills={[]} placeholder="Search programs" />

                    {uni.units.map(unit => (
                        <UnitListCard
                            key={unit.id}
                            title={unit.name}
                            titleHref={`/explore-universities/${university}/programs/${unit.id}`}
                            units={(unit.units ?? []).filter(child => child.kind !== "faculty")}
                            universityId={university}
                            lang={lang}
                        />
                    ))}
                </div>
            </SectionLayout>
        </div>
    );
}
