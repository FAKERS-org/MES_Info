import { SectionLayout } from "@/components/shared/section-layout";
import AdmissionsContactCard from "@/components/university/contact-card";
import CampusSwitcher from "@/components/university/campus-switcher";
import BrochureDownloadCard from "@/components/university/brochure-download-card";
import CampusMapCard from "@/components/university/campus-map-card";
import ProgramsExplorer from "@/components/university/programs/programs-explorer";
import ProgramsList from "@/components/university/programs/programs-list";
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
    const tree = buildUnitTree(units, displayDetail.programs ?? []);

    // Identify programs attached to units to avoid duplicating them
    const assignedProgramIds = new Set<number>();
    const collectAssigned = (uList: typeof tree) => {
        for (const u of uList) {
            if (u.programs) {
                for (const p of u.programs) {
                    assignedProgramIds.add(p.id);
                }
            }
            if (u.units && u.units.length > 0) {
                collectAssigned(u.units);
            }
        }
    };
    collectAssigned(tree);

    const unassignedPrograms = (displayDetail.programs ?? []).filter(
        p => !assignedProgramIds.has(p.id),
    );

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
                            telegram={displayDetail.contact_telegram}
                            advisorName={displayDetail.advisor_name}
                            advisorRole={displayDetail.advisor_role}
                            advisorAvatar={displayDetail.advisor_avatar_url}
                        />
                        <BrochureDownloadCard website={displayDetail.website} universityName={uniName} />
                    </div>
                }
            >
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold font-khmer text-foreground">
                            {lang === "kh"
                                ? "កម្មវិធីសិក្សា និងសញ្ញាបត្រ (Academic Program Offerings)"
                                : "Degree Program Offerings"}
                        </h2>
                        <p className="text-xs text-muted-foreground font-khmer mt-1">
                            {lang === "kh"
                                ? "ស្វែងរក និងត្រងតាមកម្រិតសញ្ញាបត្រ វេនសិក្សា និងតម្លៃសិក្សាប្រចាំឆ្នាំ"
                                : "Filter by degree level, delivery shifts, and annual tuition."}
                        </p>
                    </div>

                    <ProgramsList
                        programs={displayDetail.programs ?? []}
                        lang={lang}
                        university={displayDetail}
                    />
                </div>
            </SectionLayout>
        </div>
    );
}
