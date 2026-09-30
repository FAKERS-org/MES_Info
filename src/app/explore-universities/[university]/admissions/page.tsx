import { SectionLayout } from "@/components/shared/section-layout";
import { Card } from "@/components/ui/card";
import AdmissionRoadmap from "@/components/university/admissions/admission-roadmap";
import RequiredDocuments from "@/components/university/admissions/required-documents-rail";
import AdmissionsContactCard from "@/components/university/contact-card";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import { getUniversity } from "@/data/universities";
import { readLang } from "@/lib/language.server";
import { universityTabs } from "@/lib/university-tabs";
import { notFound } from "next/navigation";

interface AdmissionsPageProps {
    params: Promise<{ university: string }>;
}

export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
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
                        <RequiredDocuments />
                        <AdmissionsContactCard />
                    </div>
                }
            >
                <div className="space-y-4">
                    <Card className="p-6">
                        <AdmissionRoadmap />
                    </Card>
                </div>
            </SectionLayout>
        </div>
    );
}
