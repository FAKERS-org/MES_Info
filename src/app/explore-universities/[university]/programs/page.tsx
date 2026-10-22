import { SectionLayout } from "@/components/shared/section-layout";
import AdmissionsContactCard from "@/components/university/contact-card";
import CampusSwitcher from "@/components/university/campus-switcher";
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
    searchParams?: Promise<{ campus?: string }>;
}

export default async function ProgramsPage({ params, searchParams }: ProgramsPageProps) {
    const { university: id } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const campusParam = resolvedSearchParams?.campus;

    const rootDetail = await getUniversityDetail(id);
    if (!rootDetail) notFound();

    const campuses = rootDetail.campuses ?? [];
    const activePublicId =
        (campusParam && campuses.some(c => c.public_id === campusParam)
            ? campusParam
            : campuses.find(c => c.is_main_campus)?.public_id) ?? rootDetail.public_id;

    // Fetch active campus detail and its units
    const [activeDetail, units] = await Promise.all([
        activePublicId !== rootDetail.public_id
            ? getUniversityDetail(activePublicId)
            : Promise.resolve(rootDetail),
        getUniversityUnits(activePublicId),
    ]);

    const displayDetail = activeDetail ?? rootDetail;
    const lang = await readLang();
    const tree = buildUnitTree(units);

    return (
        <div className="space-y-6">
            <UniversityHero university={toHeadingData(displayDetail)} lang={lang} />
            <CampusSwitcher campuses={campuses} activePublicId={activePublicId} />
            <UniversityMenu tabs={universityTabs(id)} />
            <SectionLayout
                breakpoint="md"
                mainClassName="space-y-4"
                aside={
                    <div className="space-y-4">
                        <CampusMapCard
                            address={displayDetail.address}
                            mapUrl={displayDetail.embed_map_url}
                            locationName={displayDetail.campus_name || displayDetail.province}
                        />
                        <AdmissionsContactCard />
                        <BrochureDownloadCard />
                    </div>
                }
            >
                {tree.length > 0 && (
                    <ProgramsExplorer groups={programGroups(id, tree)} lang={lang} />
                )}
                <ProgramsList programs={displayDetail.programs} lang={lang} />
            </SectionLayout>
        </div>
    );
}
