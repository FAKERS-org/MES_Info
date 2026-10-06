import { SectionLayout } from "@/components/shared/section-layout";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import ProgramsExplorer from "@/components/university/programs-and-fees/programs-explorer";
import ProgramsList from "@/components/university/programs-and-fees/programs-list";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import {
    buildUnitTree,
    getUniversityDetail,
    getUniversityUnits,
    toHeadingData,
} from "@/lib/api/universities";
import { readLang } from "@/lib/language.server";
import { programGroups } from "@/lib/unit-routes";
import { universityTabs } from "@/lib/university-tabs";
import { notFound } from "next/navigation";

interface ProgramsPageProps {
    params: Promise<{ university: string }>;
}

export default async function ProgramsPage({ params }: ProgramsPageProps) {
    const { university: id } = await params;

    const [detail, units] = await Promise.all([
        getUniversityDetail(id),
        getUniversityUnits(id),
    ]);
    if (!detail) notFound();

    const lang = await readLang();
    const tree = buildUnitTree(units);

    return (
        <div className="space-y-6">
            <UniversityHero university={toHeadingData(detail)} lang={lang} />
            <UniversityMenu tabs={universityTabs(id)} />
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
                {tree.length > 0 && (
                    <ProgramsExplorer groups={programGroups(id, tree)} lang={lang} />
                )}
                <ProgramsList programs={detail.programs} lang={lang} />
            </SectionLayout>
        </div>
    );
}
