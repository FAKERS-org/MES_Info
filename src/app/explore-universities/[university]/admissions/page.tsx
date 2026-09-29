import { SectionLayout } from "@/components/shared/section-layout";
import { Card } from "@/components/ui/card";
import AdmissionRoadmap from "@/components/university/admissions/admission-roadmap";
import RequiredDocuments from "@/components/university/admissions/required-documents-rail";
import AdmissionsContactCard from "@/components/university/contact-card";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu, { SimpleTab } from "@/components/university/university-menu";

export default function AdmissionsPage() {
    const tabs: SimpleTab[] = [
        { href: "/explore-universities/itc/programs", icon: "BookOpen", label: "Programs & Fees" },
        { href: "/explore-universities/itc/admissions", icon: "GraduationCap", label: "Admissions", active: true },
        // { href: "/explore-universities/itc/scholarships", icon: "Award", label: "Scholarships" },
    ];

    return (
        <div className="space-y-5">
            <UniversityHero />
            <UniversityMenu tabs={tabs} />
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
