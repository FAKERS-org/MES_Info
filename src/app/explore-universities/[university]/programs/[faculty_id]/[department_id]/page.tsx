import { notFound } from "next/navigation";
import { universities } from "@/data/universities";
import { facultyDepartments, getDepartmentById, getSubDepartments, isSelfDepartment, type Unit } from "@/data/faculty-departments";
import AcademicCurriculum from "@/components/department/academic-curriculum";
import AdmissionContact from "@/components/department/admission-contact";
import DepartmentHeading from "@/components/department/department-heading";
import Facilities from "@/components/department/facilities";
import { SectionLayout } from "@/components/shared/section-layout";
import SubDepartmentList from "@/components/department/sub-department-list";

interface DepartmentPageProps {
    params: Promise<{ university: string; faculty_id: string; department_id: string }>;
}

export default async function DepartmentProgramsPage({ params }: DepartmentPageProps) {
    const { university: universityId, faculty_id, department_id } = await params;

    const university = universities.find(u => u.id === universityId);
    if (!university) notFound();

    // Use the new faculty-departments data structure
    const department = getDepartmentById(faculty_id, department_id);
    if (!department) {
        notFound();
    }

    const subDepartments = getSubDepartments(faculty_id, department_id);
    const isSelfDept = isSelfDepartment(faculty_id, department_id);

    // Verify the department belongs to the requested faculty
    const faculty = facultyDepartments.find(f => f.id === faculty_id);
    if (!faculty) notFound();

    return (
        <div className="space-y-0">
            <DepartmentHeading department={department} faculty={faculty} />

            {/* Show sub-departments if this is a self-department */}
            {isSelfDept && subDepartments.length > 0 && (
                <SectionLayout background="muted">
                    <SubDepartmentList subDepartments={subDepartments} parentDepartment={department} />
                </SectionLayout>
            )}

            <SectionLayout
                background="muted"
                aside={<AdmissionContact />}
            >
                <AcademicCurriculum />
            </SectionLayout>

            <SectionLayout background="muted">
                <Facilities />
            </SectionLayout>
        </div>
    );
}