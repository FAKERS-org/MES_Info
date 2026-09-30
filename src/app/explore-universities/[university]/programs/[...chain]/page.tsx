import AcademicCurriculum from "@/components/department/academic-curriculum";
import AdmissionContact from "@/components/department/admission-contact";
import DepartmentHeading from "@/components/department/department-heading";
import Facilities from "@/components/department/facilities";
import SubDepartmentList from "@/components/department/sub-department-list";
import { SectionLayout } from "@/components/shared/section-layout";
import { getFacilitiesFor } from "@/data/universities";
import { resolveUnitPage } from "@/lib/resolve-unit-page";
import { childRows } from "@/lib/unit-routes";

interface UnitPageProps {
    params: Promise<{ university: string; chain: string[] }>;
}

/**
 * The detail page of a faculty, a department or a sub-department.
 *
 * One route for all three, and the path is the chain: `/programs/foe` is the
 * faculty, `/programs/foe/gee` the department, `/programs/foe/gee/gic` the
 * sub-department. The path used to hold a single id, so a sub-department was
 * unreachable from the URL that named its faculty and the segment claimed all
 * three were "programs"; `resolveUnitPage` redirects an old one-segment link to
 * the chain that matches the tree.
 */
export default async function UnitPage({ params }: UnitPageProps) {
    const { university, chain } = await params;
    const { university: uni, universityId, unit, pathIds, faculty, curriculum, lang } = await resolveUnitPage(
        university,
        chain,
    );

    const facilities = getFacilitiesFor(universityId, unit.id);

    return (
        <div className="space-y-0">
            <DepartmentHeading university={uni} unit={unit} faculty={faculty} lang={lang} />

            {/* Sub-departments of a "self department" (GEE → AMS, GIC, GTR) */}
            {unit.units && unit.units.length > 0 && (
                <SectionLayout background="muted">
                    <SubDepartmentList
                        subDepartments={childRows(uni, unit, pathIds)}
                        parentDepartment={unit}
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
