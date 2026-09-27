import { SectionLayout } from "@/components/shared/section-layout";
import { DepartmentAllocation } from "@/components/university/scholarships/department-allocation";
import HowToApply from "@/components/university/scholarships/how-to-apply";
import ScholarshipOptions from "@/components/university/scholarships/scholarship-options";
import { ScholarshipProgramCard } from "@/components/university/scholarships/scholarship-program-card";
import ScholarshipsBanner from "@/components/university/scholarships/scholarships-banner";
import { getScholarshipsPageData } from "@/data/scholarships-page";
import { universities } from "@/data/universities";
import { readLang } from "@/lib/language.server";
import { notFound } from "next/navigation";

interface ScholarshipsPageProps {
    params: Promise<{ university: string }>;
}

/**
 * "Scholarships" tab: a banner over the school's own published scholarships and
 * a wide column of programme sections, plus a narrow rail of steps, contacts
 * and the application button. Every section is optional — the sample ones (see
 * `getScholarshipsPageData`) exist for ITC only — so another school renders
 * its banner and its real list instead of invented deadlines and quotas.
 */
export default async function ScholarshipsPage({ params }: ScholarshipsPageProps) {
    const { university: id } = await params;
    const university = universities.find(u => u.id === id);

    if (!university) notFound();

    const data = getScholarshipsPageData(university, await readLang());

    return (
        <div className="space-y-4 py-3 md:py-6">
            <ScholarshipsBanner />

            <SectionLayout
                breakpoint="md"
                mainClassName="space-y-4"
                aside={data.howToApply && <HowToApply />}
            >
                <ScholarshipOptions />

                {/* {data.programs.map(program => (
                    <ScholarshipProgramCard key={program.header.title} data={program} />
                ))}

                {data.allocation && <DepartmentAllocation data={data.allocation} />} */}
            </SectionLayout>
        </div>
    );
}
