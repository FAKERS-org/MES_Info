import { notFound } from "next/navigation";
import ApplicationConditionCard from "@/components/department/application-condition-card";
import CareerPathCard from "@/components/department/career-path-card";
import CourseSyllabusCard from "@/components/department/course-syllabus-card";
import DepartmentIdHeading from "@/components/department/department-id-heading";
import DiscussionCard from "@/components/department/discussion-card";
import FacilityCard from "@/components/department/facility-card";
import ScholarshipBriefCard from "@/components/department/scholarship-brief-card";
import { SectionLayout } from "@/components/shared/section-layout";
import { departmentPageData } from "@/data/department-page";
import { universities } from "@/data/universities";

interface DepartmentIdPageProps {
  params: Promise<{ university: string; department: string }>;
}

export default async function DepartmentIdPage({
  params,
}: DepartmentIdPageProps) {
  const { university, department } = await params;

  const dept = universities
    .find((u) => u.id === university)
    ?.departments.find((d) => d.id === department);

  if (!dept) {
    notFound();
  }

  return (
    <div className="space-y-0">
      <DepartmentIdHeading
        data={departmentPageData.heading}
        entity={{ name: dept.name, logo: dept.logo }}
      />

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
