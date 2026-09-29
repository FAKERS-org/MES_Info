import AcademicCurriculum from "@/components/department/academic-curriculum";
import AdmissionContact from "@/components/department/admission-contact";
import DepartmentHeading from "@/components/department/department-heading";
import Facilities from "@/components/department/facilities";
import SubDepartmentList from "@/components/department/sub-department-list";
import { SectionLayout } from "@/components/shared/section-layout";
import { getFacilitiesFor } from "@/data/universities";
import { resolveUnitPage } from "@/lib/resolve-unit-page";

interface UnitPageProps {
    params: Promise<{ university: string; unit_id: string }>;
}

/**
 * The detail page of a faculty, a department or a sub-department.
 *
 * One route for all three: `findUnit` matches at any depth, so `/programs/gic`
 * and `/programs/gee` and `/programs/foe` are the same page over a different
 * node. The faculty id that used to be its own path segment is redundant —
 * a sub-department was unreachable from the URL that named its faculty,
 * because the segment could only hold one id.
 */
export default async function UnitPage({ params }: UnitPageProps) {
    const { university, unit_id } = await params;
    const { university: uni, universityId, unit, faculty, children, curriculum, lang } = await resolveUnitPage(
        university,
        unit_id,
    );

    const facilities = getFacilitiesFor(universityId, unit_id);

    return (
        <div className="space-y-0">
            <DepartmentHeading university={uni} unit={unit} faculty={faculty} lang={lang} />

            {/* Sub-departments of a "self department" (GEE → AMS, GIC, GTR) */}
            {children.length > 0 && (
                <SectionLayout background="muted">
                    <SubDepartmentList
                        subDepartments={children}
                        parentDepartment={unit}
                        universityId={universityId}
                        lang={lang}
                    />
                </SectionLayout>
            )}

            <SectionLayout background="muted" aside={<AdmissionContact university={uni} lang={lang} />}>
                {curriculum ? (
                    <AcademicCurriculum curriculum={curriculum} lang={lang} />
                ) : (
                    <div className="max-w-4xl mx-auto p-8 text-center text-slate-500">
                        មិនទាន់មានកម្មវិធីសិក្សាសម្រាប់ដេប៉ាតឺម៉ង់នេះទេ។
                    </div>
                )}
            </SectionLayout>

            {facilities.length > 0 && (
                <SectionLayout background="muted">
                    <Facilities facilities={facilities} />
                </SectionLayout>
            )}
        </div>
    );
}
