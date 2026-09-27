import AcademicCurriculum from "@/components/department/academic-curriculum";
import AdmissionContact from "@/components/department/admission-contact";
import DepartmentHeading from "@/components/department/department-heading";
import Facilities from "@/components/department/facilities";
import { SectionLayout } from "@/components/shared/section-layout";
import { universities } from "@/data/universities";
import { notFound } from "next/navigation";

interface DepartmentIdPageProps {
    params: Promise<{ university: string; department: string }>;
}

export default async function DepartmentIdPage({ params }: DepartmentIdPageProps) {
    const { university, department } = await params;

    const dept = universities.find(u => u.id === university)?.departments.find(d => d.id === department);

    if (!dept) {
        notFound();
    }

    return (
        <div className="space-y-0">
            <DepartmentHeading />

            <SectionLayout
                background="muted"
                aside={<>{/* <ScholarshipBriefCard data={departmentPageData.scholarship} /> */ <AdmissionContact />}</>}
            >
                <AcademicCurriculum />
            </SectionLayout>

            {/* <SectionLayout background="muted" aside={<DiscussionCard data={departmentPageData.discussion} />}>
                <CareerPathCard data={departmentPageData.career} />
            </SectionLayout> */}

            <SectionLayout background="muted">
                <Facilities />
            </SectionLayout>
        </div>
    );
}
