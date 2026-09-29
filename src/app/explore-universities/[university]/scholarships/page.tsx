import { SectionLayout } from "@/components/shared/section-layout";
import HowToApply from "@/components/university/scholarships/how-to-apply";
import ScholarshipOptions from "@/components/university/scholarships/scholarship-options";
import ScholarshipsBanner from "@/components/university/scholarships/scholarships-banner";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu, { SimpleTab } from "@/components/university/university-menu";

export default function ScholarshipsPage() {
  const tabs: SimpleTab[] = [
    { href: "/explore-universities/itc/programs", icon: "BookOpen", label: "Programs & Fees" },
    { href: "/explore-universities/itc/admissions", icon: "GraduationCap", label: "Admissions" },
    { href: "/explore-universities/itc/scholarships", icon: "Award", label: "Scholarships", active: true },
  ];

  return (
    <div className="space-y-5">
      <UniversityHero />
      <UniversityMenu tabs={tabs} />
      <SectionLayout breakpoint="md" mainClassName="space-y-4" aside={
        <div className="space-y-4">
          <HowToApply />
        </div>
      }>
        <div className="space-y-4">
          <ScholarshipsBanner />
          <ScholarshipOptions />
        </div>
      </SectionLayout>
    </div>
  );
}