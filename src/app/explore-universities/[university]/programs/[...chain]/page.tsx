import AcademicCurriculum from "@/components/department/academic-curriculum";
import MetadataRenderer from "@/components/shared/metadata-renderer";
import DepartmentHeading from "@/components/department/department-heading";
import Facilities from "@/components/department/facilities";
import SubDepartmentList from "@/components/department/sub-department-list";
import UnitScholarships from "@/components/department/unit-scholarships";
import ProgramsList from "@/components/university/programs-and-fees/programs-list";
import { SectionLayout } from "@/components/shared/section-layout";
import { getFacilitiesFor } from "@/data/universities";
import { getUnitKindLabel } from "@/lib/language";
import { resolveUnitPage } from "@/lib/resolve-unit-page";
import { childRows } from "@/lib/unit-routes";

interface UnitPageProps {
    params: Promise<{ university: string; chain: string[] }>;
}

export default async function UnitPage({ params }: UnitPageProps) {
    const { university, chain } = await params;
    const {
        university: uni,
        universityDetail,
        universityId,
        unit,
        pathIds,
        faculty,
        curriculum,
        curriculums,
        facilities,
        scholarships,
        programs,
        lang,
    } = await resolveUnitPage(university, chain);

    const displayFacilities = facilities.length > 0 ? facilities : getFacilitiesFor(universityId, unit.id);

    return (
        <div>
            <SectionLayout background="muted">
                <DepartmentHeading university={uni} unit={unit} faculty={faculty} lang={lang} />
            </SectionLayout>

            {programs && programs.length > 0 && (
                <SectionLayout background="muted">
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold font-khmer text-foreground">
                            {lang === "kh"
                                ? `សញ្ញាបត្រ និងកម្មវិធីសិក្សាក្នុង${getUnitKindLabel(unit.kind, "kh")}នេះ`
                                : `Degrees & Majors in this ${getUnitKindLabel(unit.kind, "en")}`}
                        </h2>
                        <ProgramsList programs={programs} lang={lang} university={universityDetail} />
                    </div>
                </SectionLayout>
            )}

            {unit.units && unit.units.length > 0 && (
                <SectionLayout background="muted">
                    <SubDepartmentList
                        subDepartments={childRows(universityId, unit, pathIds)}
                        parentDepartment={unit}
                        lang={lang}
                    />
                </SectionLayout>
            )}

            {(curriculums.length > 0 || curriculum) && (
                <SectionLayout
                    background="muted"
                    aside={
                        <MetadataRenderer
                            data={(unit as any).metadata_json || universityDetail.metadata_json}
                            title="Academic Inquiries"
                        />
                    }
                >
                    <div className="space-y-6">
                        {curriculums.length > 0 ? (
                            curriculums.map((curr, idx) => (
                                <AcademicCurriculum key={idx} curriculum={curr} lang={lang} />
                            ))
                        ) : curriculum ? (
                            <AcademicCurriculum curriculum={curriculum} lang={lang} />
                        ) : null}
                    </div>
                </SectionLayout>
            )}

            {displayFacilities.length > 0 && (
                <SectionLayout background="muted">
                    <Facilities facilities={displayFacilities} />
                </SectionLayout>
            )}

            {scholarships.length > 0 && (
                <SectionLayout background="muted">
                    <UnitScholarships scholarships={scholarships} lang={lang} />
                </SectionLayout>
            )}
        </div>
    );
}
