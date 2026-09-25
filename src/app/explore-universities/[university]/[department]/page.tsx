import ApplicationConditionCard from "@/components/department/application-condition-card";
import CareerPathCard from "@/components/department/career-path-card";
import CourseSyllabusCard from "@/components/department/course-syllabus-card";
import DepartmentIdHeading from "@/components/department/department-id-heading";
import DiscussionCard from "@/components/department/discussion-card";
import FacilityCard from "@/components/department/facility-card";
import ScholarshipBriefCard from "@/components/department/scholarship-brief-card";
import { SectionLayout } from "@/components/shared/section-layout";
import { departmentPageData } from "@/data/department";

export default async function DepartmentIdPage() {
    return (
        <div className="space-y-0">
            <DepartmentIdHeading data={departmentPageData.heading} />

            <SectionLayout
                background="muted"
                aside={
                    <>
                        <ApplicationConditionCard data={departmentPageData.application} />
                        <ScholarshipBriefCard data={departmentPageData.scholarship} />
                    </>
                }
            >
                <CourseSyllabusCard data={departmentPageData.syllabus} />
            </SectionLayout>

            <SectionLayout background="muted" aside={<DiscussionCard data={departmentPageData.discussion} />}>
                <CareerPathCard data={departmentPageData.career} />
            </SectionLayout>

            <SectionLayout background="muted">
                <FacilityCard data={departmentPageData.facility} />
            </SectionLayout>
        </div>
    );
}
