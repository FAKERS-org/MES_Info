import { notFound } from "next/navigation";
import { getChildren, getCurriculumFor, getFacultyFor, getUniversity, type University, type Unit } from "@/data/universities";
import { readLang } from "@/lib/language.server";
import { walkUnitPath } from "@/lib/unit-routes";
import type { Lang } from "@/lib/language";

export interface ResolvedUnit {
    university: University;
    universityId: string;
    /** The unit on the page — the last segment of the path. */
    unit: Unit;
    /** The top-level unit the path starts at. */
    root: Unit;
    /** Ids from the top-level unit down to `unit`, as they appear in the URL. */
    pathIds: string[];
    faculty: Unit | undefined;
    children: Unit[];
    curriculum: ReturnType<typeof getCurriculumFor>;
    lang: Lang;
}

/**
 * The one place a unit page turns its route path into data.
 *
 * The path is walked one level at a time, so a URL names the whole chain
 * (`foe` → `gee` → `gic`) and no unit is reachable by an id alone. Every page
 * under `/explore-universities/{university}/programs` resolves here, which is
 * what keeps them from disagreeing about what a faculty is.
 *
 * A path that leaves the tree is a `notFound()`, not a redirect: the URL shape
 * follows the data, so a unit is always reached by the chain the data actually
 * has. Throwing rather than returning a union keeps callers' narrowing instead
 * of an `if (!unit)` branch that can be forgotten.
 */
export async function resolveUnitPage(universityId: string, pathIds: string[]): Promise<ResolvedUnit> {
    const university = getUniversity(universityId);
    if (!university) notFound();

    const chain = walkUnitPath(university, pathIds);
    if (chain.length < pathIds.length) notFound();

    const unit = chain[chain.length - 1];

    return {
        university,
        universityId,
        unit,
        root: chain[0],
        pathIds,
        faculty: getFacultyFor(universityId, unit.id),
        children: getChildren(unit),
        curriculum: getCurriculumFor(universityId, unit.id),
        lang: await readLang(),
    };
}
