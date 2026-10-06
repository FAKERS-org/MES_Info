import { SectionLayout } from "@/components/shared/section-layout";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import ProgramsList from "@/components/university/programs-and-fees/programs-list";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import { getUniversityDetail, toHeadingData } from "@/lib/api/universities";
import { readLang } from "@/lib/language.server";
import { universityTabs } from "@/lib/university-tabs";
import { notFound } from "next/navigation";

interface ProgramsPageProps {
    params: Promise<{ university: string }>;
}

export default async function ProgramsPage({ params }: ProgramsPageProps) {
    const { university: id } = await params;

    const detail = await getUniversityDetail(id);
    if (!detail) notFound();

    const lang = await readLang();

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
                <ProgramsList programs={detail.programs} lang={lang} />
            </SectionLayout>
        </div>
    );
}
