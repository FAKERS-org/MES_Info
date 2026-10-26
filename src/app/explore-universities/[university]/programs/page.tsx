import { SectionLayout } from "@/components/shared/section-layout";
import AdmissionsContactCard from "@/components/university/contact-card";
import CampusSwitcher from "@/components/university/campus-switcher";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import { TuitionSummaryBanner } from "@/components/university/programs-and-fees/tuition-summary-banner";
import { UnifiedProgramsView } from "@/components/university/programs-and-fees/unified-programs-view";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import {
    buildUnitTree,
    getUniversityDetail,
    getUniversityUnits,
    toHeadingData,
} from "@/lib/api/universities";
import { apiName } from "@/lib/language";
import { readLang } from "@/lib/language.server";
import { resolveUniversityTuitionSummary } from "@/lib/tuition";
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
    const uniName = apiName(displayDetail, lang);
    const tree = buildUnitTree(units);
    const tuitionSummary = resolveUniversityTuitionSummary(displayDetail, displayDetail.programs ?? []);

    return (
        <div className="space-y-6">
            <UniversityHero university={toHeadingData(displayDetail)} lang={lang} />
            <CampusSwitcher campuses={campuses} activePublicId={activePublicId} />
            <UniversityMenu tabs={universityTabs(id)} />
            <SectionLayout
                breakpoint="md"
                mainClassName="space-y-6"
                aside={
                    <div className="space-y-4">
                        <CampusMapCard
                            address={displayDetail.address}
                            mapUrl={displayDetail.embed_map_url}
                            locationName={displayDetail.campus_name || displayDetail.province}
                        />
                        <AdmissionsContactCard
                            phone={displayDetail.contact_phone}
                            email={displayDetail.contact_email}
                            telegram={displayDetail.contact_telegram}
                            website={displayDetail.website}
                            universityName={uniName}
                        />
                        <BrochureDownloadCard website={displayDetail.website} universityName={uniName} />
                    </div>
                }
            >
                <TuitionSummaryBanner summary={tuitionSummary} lang={lang} />

                <UnifiedProgramsView
                    groups={programGroups(id, tree)}
                    programs={displayDetail.programs ?? []}
                    lang={lang}
                    university={displayDetail}
                />
            </SectionLayout>
        </div>
    );
}
