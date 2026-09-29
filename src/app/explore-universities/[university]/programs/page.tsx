import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { SectionLayout } from "@/components/shared/section-layout";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import ExamInfoCard from "@/components/university/programs-and-fees/exam-info-card";
import FacultyCard from "@/components/university/programs-and-fees/faculty-card";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu, { SimpleTab } from "@/components/university/university-menu";

export default function ProgramsPage() {
    const tabs: SimpleTab[] = [
        { href: "/explore-universities/itc/programs", icon: "BookOpen", label: "Programs & Fees", active: true },
        // { href: "/explore-universities/itc/admissions", icon: "GraduationCap", label: "Admissions" },
        // { href: "/explore-universities/itc/scholarships", icon: "Award", label: "Scholarships" },
    ];

    return (
        <div className="space-y-5">
            <UniversityHero />
            {/* <UniversityMenu tabs={tabs} /> */}
            <SectionLayout
                breakpoint="md"
                mainClassName="space-y-4"
                aside={
                    <div className="space-y-4">
                        <ExamInfoCard />
                        <CampusMapCard />
                        <AdmissionsContactCard />
                        <BrochureDownloadCard />
                    </div>
                }
            >
                <div className="space-y-4">
                    <SearchFilterBar pills={[]} placeholder="Search programs" />
                    <FacultyCard />
                </div>
            </SectionLayout>
        </div>
    );
}
