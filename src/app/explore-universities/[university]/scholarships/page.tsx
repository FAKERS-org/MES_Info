import { SectionLayout } from "@/components/shared/section-layout";
import HowToApply from "@/components/university/scholarships/how-to-apply";
import ScholarshipOptions from "@/components/university/scholarships/scholarship-options";
import ScholarshipsBanner from "@/components/university/scholarships/scholarships-banner";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu, { SimpleTab } from "@/components/university/university-menu";
import { getUniversity } from "@/data/universities";
import { readLang } from "@/lib/language.server";
import { notFound } from "next/navigation";

interface ScholarshipsPageProps {
    params: Promise<{ university: string }>;
}

export default async function ScholarshipsPage({ params }: ScholarshipsPageProps) {
    const { university } = await params;

    const uni = getUniversity(university);
    if (!uni) notFound();

    const lang = await readLang();
    const base = `/explore-universities/${university}`;

    const tabs: SimpleTab[] = [
        { href: `${base}/programs`, icon: "BookOpen", label: "Programs & Fees" },
        { href: `${base}/admissions`, icon: "GraduationCap", label: "Admissions" },
        { href: `${base}/scholarships`, icon: "Award", label: "Scholarships", active: true },
    ];

    return (
        <div className="space-y-5">
            <UniversityHero university={uni} lang={lang} />
            <UniversityMenu tabs={tabs} />
            <SectionLayout
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
            </SectionLayout>
        </div>
    );
}
