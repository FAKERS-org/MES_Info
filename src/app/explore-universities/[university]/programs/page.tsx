import { SectionLayout } from "@/components/shared/section-layout";
import ProgramsExplorer from "@/components/university/programs-and-fees/programs-explorer";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import { getUniversity } from "@/data/universities";
import { readLang } from "@/lib/language.server";
import { programGroups } from "@/lib/unit-routes";
import { universityTabs } from "@/lib/university-tabs";
import { notFound } from "next/navigation";

interface ProgramsPageProps {
    params: Promise<{ university: string }>;
}

/**
 * Programs of a university: one card per top-level unit (faculty, or a
 * department where a university has none), listing every unit under it.
 *
 * This page used to ignore its own `university` param and render
 * `facultyDepartments` — a module holding ITC's tree only — with `itc`
 * hardcoded into every link. Every university in the catalogue showed ITC's
 * faculties. It also rendered no tab bar at all, so the tabs every other page
 * of the university has disappeared on the page the university root redirects
 * to.
 */
export default async function ProgramsPage({ params }: ProgramsPageProps) {
    const { university } = await params;

    const uni = getUniversity(university);
    if (!uni) notFound();

    const lang = await readLang();

    return (
        <div className="space-y-5">
            <UniversityHero university={uni} lang={lang} />
            <UniversityMenu tabs={universityTabs(university)} />
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
                <ProgramsExplorer groups={programGroups(uni)} lang={lang} />
            </SectionLayout>
        </div>
    );
}
