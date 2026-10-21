import type { UniversityHeadingData } from "@/components/department/department-heading";
import type { CurriculumSection, Unit } from "@/data/universities";
import { getChildren } from "@/data/universities";
import {
    buildUnitTree,
    getUnitDetail,
    getUniversityDetail,
    getUniversityUnits,
    toHeadingData,
} from "@/lib/api/universities";
import type { Lang } from "@/lib/language";
import { readLang } from "@/lib/language.server";
import { walkUnitPath } from "@/lib/unit-routes";
import { notFound } from "next/navigation";

export interface ResolvedUnit {
    university: UniversityHeadingData;
    universityId: string;
    unit: Unit;
    root: Unit;
    pathIds: string[];
    faculty: Unit | undefined;
    children: Unit[];
    curriculum: CurriculumSection | undefined;
    curriculums: CurriculumSection[];
    facilities: any[];
    scholarships: any[];
    lang: Lang;
}

export async function resolveUnitPage(universityId: string, pathIds: string[]): Promise<ResolvedUnit> {
    const unitId = pathIds[pathIds.length - 1] ?? "";
    const [detail, units, unitDetail] = await Promise.all([
        getUniversityDetail(universityId),
        getUniversityUnits(universityId),
        getUnitDetail(universityId, unitId),
    ]);
    if (!detail) notFound();

    const tree = buildUnitTree(units);
    const chain = walkUnitPath(tree, pathIds);
    if (chain.length < pathIds.length) notFound();

    const unit = chain[chain.length - 1];

    return {
        university: toHeadingData(detail),
        universityId,
        unit,
        root: chain[0],
        pathIds,
        faculty: chain.find(candidate => candidate.kind === "faculty"),
        children: getChildren(unit),
        curriculum: unitDetail?.curriculum?.[0],
        curriculums: unitDetail?.curriculum ?? [],
        facilities: unitDetail?.facilities ?? [],
        scholarships: unitDetail?.scholarships ?? [],
        lang: await readLang(),
    };
}
