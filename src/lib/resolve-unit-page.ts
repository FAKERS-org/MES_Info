import { notFound } from "next/navigation";
import {
    buildUnitTree,
    getUniversityDetail,
    getUniversityUnits,
    toHeadingData,
} from "@/lib/api/universities";
import { walkUnitPath } from "@/lib/unit-routes";
import { readLang } from "@/lib/language.server";
import type { Lang } from "@/lib/language";
import type { CurriculumSection, Unit } from "@/data/universities";
import type { UniversityHeadingData } from "@/components/department/department-heading";
import { getChildren } from "@/data/universities";

export interface ResolvedUnit {
    university: UniversityHeadingData;
    universityId: string;
    /** The unit on the page — the last segment of the path. */
    unit: Unit;
    /** The top-level unit the path starts at. */
    root: Unit;
    /** Ids from the top-level unit down to `unit`, as they appear in the URL. */
    pathIds: string[];
    faculty: Unit | undefined;
    children: Unit[];
    /** Stage 3b: the curriculum table does not exist yet. */
    curriculum: CurriculumSection | undefined;
    lang: Lang;
}

/**
 * The one place a unit page turns its route path into data.
 *
 * The path is walked one level at a time, so a URL names the whole
 * chain and no unit is reachable by an id alone. Every page under
 * `/explore-universities/{university}/programs` resolves here, which
 * is what keeps them from disagreeing about what a faculty is.
 *
 * A path that leaves the tree is a `notFound()`, not a redirect: the
 * URL shape follows the data, so a unit is always reached by the
 * chain the data actually has.
 */
export async function resolveUnitPage(universityId: string, pathIds: string[]): Promise<ResolvedUnit> {
    const [detail, units] = await Promise.all([
        getUniversityDetail(universityId),
        getUniversityUnits(universityId),
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
        curriculum: undefined,
        lang: await readLang(),
    };
}
