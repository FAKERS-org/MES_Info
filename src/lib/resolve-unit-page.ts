import { notFound } from "next/navigation";
import { getCurriculumFor, getFacultyFor, getUniversity, findUnit, getChildren } from "@/data/universities";
import { readLang } from "@/lib/language.server";
import type { University } from "@/data/universities";
import type { Lang } from "@/lib/language";

export interface ResolvedUnit {
    university: University;
    universityId: string;
    unitId: string;
    unit: NonNullable<ReturnType<typeof findUnit>>;
    faculty: ReturnType<typeof getFacultyFor>;
    children: ReturnType<typeof getChildren>;
    curriculum: ReturnType<typeof getCurriculumFor>;
    lang: Lang;
}

/**
 * The one place a unit page turns its route params into data.
 *
 * Every page under `/explore-universities/{university}/programs` used to
 * resolve its own unit: the faculty page through `getDepartmentById`, the
 * department page through the same helper with a different argument order, and
 * the old `[department]` route through `university.departments`, a property
 * that does not exist. They disagreed about what a faculty was, and two of the
 * three produced links that 404'd. Resolving here means a unit is found at any
 * depth by its own id, and every page agrees on what it found.
 *
 * Throws `notFound()` rather than returning a union, so callers keep their
 * narrowing instead of an `if (!unit)` branch that can be forgotten.
 */
export async function resolveUnitPage(universityId: string, unitId: string): Promise<ResolvedUnit> {
    const university = getUniversity(universityId);
    if (!university) notFound();

    const unit = findUnit(university, unitId);
    if (!unit) notFound();

    return {
        university,
        universityId,
        unitId,
        unit,
        faculty: getFacultyFor(universityId, unitId),
        children: getChildren(unit),
        curriculum: getCurriculumFor(universityId, unitId),
        lang: await readLang(),
    };
}
