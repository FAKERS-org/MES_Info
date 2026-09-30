import { getChildren, type Unit, type University } from "@/data/universities";

/**
 * A unit as a link: the unit itself, plus the URL that reaches it. Rows carry
 * their own href instead of an id plus a base path, because a row's depth is
 * not fixed — a faculty's list holds its departments *and* their
 * sub-departments, three levels down from the top.
 */
export interface UnitRow {
    unit: Unit;
    href: string;
}

/** One card of the programs list: a top-level unit and everything under it. */
export interface ProgramGroup extends UnitRow {
    rows: UnitRow[];
}

/**
 * The canonical URL of a unit: `/explore-universities/{uni}/programs/{path}`,
 * where `path` is the unit's chain of ids from the top-level unit down.
 *
 * The path used to stop at a single id, which put a faculty, a department and a
 * sub-department on the same URL and called all three "programs". It also made
 * the unit a first-match scan of the whole tree, so a department id used under
 * two faculties could only ever resolve to one of them.
 */
export function unitHref(universityId: string, pathIds: string[]): string {
    return `/explore-universities/${universityId}/programs/${pathIds.join("/")}`;
}

/**
 * Walk a URL's id path down the tree, one level at a time.
 *
 * Returns the units matched so far: a short array means the path left the tree,
 * and the caller decides whether that is a broken link or an old one. Resolving
 * level by level is what makes a path unambiguous — no id is looked up outside
 * its own parent.
 */
export function walkUnitPath(university: University, pathIds: string[]): Unit[] {
    const chain: Unit[] = [];

    let level: Unit[] = university.units;
    for (const id of pathIds) {
        const next = level.find(unit => unit.id === id);
        if (!next) break;
        chain.push(next);
        level = getChildren(next);
    }

    return chain;
}

/** The direct children of a unit, each with the URL that reaches it. */
export function childRows(university: University, unit: Unit, pathIds: string[]): UnitRow[] {
    return getChildren(unit).map(child => ({ unit: child, href: unitHref(university.id, [...pathIds, child.id]) }));
}

/**
 * The programs list of a university: one group per top-level unit, each listing
 * every unit below it in tree order. A faculty nested under another faculty is
 * not a program, so it is walked through rather than listed.
 */
export function programGroups(university: University): ProgramGroup[] {
    const rows = (unit: Unit, pathIds: string[]): UnitRow[] =>
        getChildren(unit).flatMap(child => {
            const childPath = [...pathIds, child.id];
            const row = { unit: child, href: unitHref(university.id, childPath) };
            return child.kind === "faculty" ? rows(child, childPath) : [row, ...rows(child, childPath)];
        });

    return university.units.map(unit => ({
        unit,
        href: unitHref(university.id, [unit.id]),
        rows: rows(unit, [unit.id]),
    }));
}
