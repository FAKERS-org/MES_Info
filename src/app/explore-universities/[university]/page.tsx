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

interface UniversityPageProps {
    params: Promise<{ university: string }>;
}

/**
 * The university page: admissions and the scholarships any applicant can take.
 *
 * Both used to be tabs of their own, which split one audience across three
 * routes — a scholarship open to every student was filed next to nothing about
 * the university's own entry requirements, and the university itself had no page
 * at all, only a hop into the programs tab. A scholarship that is *not* open to
 * everyone belongs to a unit, and is on that unit's page instead.
 */
export default async function UniversityPage({ params }: UniversityPageProps) {
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
                <Card className="p-6">
                    <AdmissionRoadmap />
                </Card>
            </SectionLayout>

            {/* <SectionLayout
                breakpoint="md"
                mainClassName="space-y-4"
                aside={
                    <div className="space-y-4">
                        <HowToApply />
                    </div>
                }
            >
                <div className="space-y-4">
                    <ScholarshipsBanner />
                    <ScholarshipOptions />
                </div>
            </SectionLayout> */}
        </div>
    );
}
