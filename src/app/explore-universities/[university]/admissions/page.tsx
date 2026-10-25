import { SectionLayout } from "@/components/shared/section-layout";
import { Card } from "@/components/ui/card";
import AdmissionRoadmap from "@/components/university/admissions/admission-roadmap";
import RequiredDocuments from "@/components/university/admissions/required-documents-rail";
import CampusSwitcher from "@/components/university/campus-switcher";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import { getUniversityDetail, toHeadingData } from "@/lib/api/universities";
import { apiName } from "@/lib/language";
import { readLang } from "@/lib/language.server";
import { universityTabs } from "@/lib/university-tabs";
import { notFound } from "next/navigation";

interface AdmissionsPageProps {
    params: Promise<{ university: string }>;
    searchParams?: Promise<{ campus?: string }>;
}

export default async function AdmissionsPage({ params, searchParams }: AdmissionsPageProps) {
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

    const activeDetail =
        activePublicId !== rootDetail.public_id
            ? (await getUniversityDetail(activePublicId)) ?? rootDetail
            : rootDetail;

    const lang = await readLang();
    const uniName = apiName(activeDetail, lang);

    return (
        <div className="space-y-6">
            <UniversityHero university={toHeadingData(activeDetail)} lang={lang} />
            <CampusSwitcher campuses={campuses} activePublicId={activePublicId} />
            <UniversityMenu tabs={universityTabs(id)} />

            <SectionLayout
                breakpoint="md"
                mainClassName="space-y-4"
                aside={
                    <div className="space-y-4">
                        <RequiredDocuments />
                        <AdmissionsContactCard
                            phone={activeDetail.contact_phone}
                            email={activeDetail.contact_email}
                            telegram={activeDetail.contact_telegram}
                            website={activeDetail.website}
                            universityName={uniName}
                        />
                        <BrochureDownloadCard website={activeDetail.website} universityName={uniName} />
                    </div>
                }
            >
                <Card className="p-6 border border-border shadow-sm rounded-2xl bg-card">
                    <AdmissionRoadmap universityName={uniName} website={activeDetail.website} />
                </Card>
            </SectionLayout>
        </div>
    );
}
