import AcademicCurriculum from "@/components/department/academic-curriculum";
import AdmissionContact from "@/components/department/admission-contact";
import DepartmentHeading from "@/components/department/department-heading";
import Facilities from "@/components/department/facilities";
import SubDepartmentList from "@/components/department/sub-department-list";
import UnitScholarships from "@/components/department/unit-scholarships";
import LocalizedText from "@/components/shared/localized-text";
import { SectionLayout } from "@/components/shared/section-layout";
import { getFacilitiesFor } from "@/data/universities";
import { resolveUnitPage } from "@/lib/resolve-unit-page";
import { childRows } from "@/lib/unit-routes";

interface UnitPageProps {
    params: Promise<{ university: string; chain: string[] }>;
}

export default async function UnitPage({ params }: UnitPageProps) {
    const { university, chain } = await params;
    const {
        university: uni,
        universityId,
        unit,
        pathIds,
        faculty,
        curriculum,
        lang,
    } = await resolveUnitPage(university, chain);

    const facilities = getFacilitiesFor(universityId, unit.id);

    return (
        <div>
            <SectionLayout background="muted">
                <DepartmentHeading university={uni} unit={unit} faculty={faculty} lang={lang} />
            </SectionLayout>

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
                    <div className="max-w-4xl mx-auto p-8 text-center text-muted-foreground">
                        <LocalizedText translationKey="miscellaneous.noAvailableProgramsForThisDepartment" />
                    </div>
                )}
            </SectionLayout>

            {facilities.length > 0 && (
                <SectionLayout background="muted">
                    <Facilities facilities={facilities} />
                </SectionLayout>
            )}

            {unit.scholarships && unit.scholarships.length > 0 && (
                <SectionLayout background="muted">
                    <UnitScholarships scholarships={unit.scholarships} lang={lang} />
                </SectionLayout>
            )}
        </div>
    );
}
