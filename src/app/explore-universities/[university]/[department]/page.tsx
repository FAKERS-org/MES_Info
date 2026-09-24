import DepartmentIdHeading from "@/components/explore-universities/department/department-id-heading";
import CourseSyllabusCard from "@/components/explore-universities/department/course-syllabus-card";
import ApplicationConditionCard from "@/components/explore-universities/department/application-condition-card";
import ScholarshipBriefCard from "@/components/explore-universities/department/scholarship-brief-card";
import CareerPathCard from "@/components/explore-universities/department/career-path-card";
import DiscussionCard from "@/components/explore-universities/department/discussion-card";
import FacilityCard from "@/components/explore-universities/department/facility-card";
import { departmentPageData } from "@/data/department";

export default async function DepartmentIdPage() {
  return (
    <div className="space-y-0">
      <DepartmentIdHeading data={departmentPageData.heading} />

      <div className="bg-slate-50 py-8 flex justify-center items-start">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-full w-full">
          <div className="xl:col-span-2">
            <CourseSyllabusCard data={departmentPageData.syllabus} />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-6">
            <ApplicationConditionCard data={departmentPageData.application} />
            <ScholarshipBriefCard data={departmentPageData.scholarship} />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-8 flex justify-center items-start">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-full w-full">
          <div className="xl:col-span-2">
            <CareerPathCard data={departmentPageData.career} />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-6">
            <DiscussionCard data={departmentPageData.discussion} />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-8 flex justify-center items-start">
        <div className="max-w-full w-full">
          <FacilityCard data={departmentPageData.facility} />
        </div>
      </div>
    </div>
  );
}
