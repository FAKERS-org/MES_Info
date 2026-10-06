import type { Unit } from "@/data/universities";

export interface UnitRow {
    unit: Unit;
    href: string;
}

export interface ProgramGroup extends UnitRow {
    rows: UnitRow[];
}

export function universityHref(universityId: string): string {
    return `/explore-universities/${universityId}/programs`;
}

export function unitHref(universityId: string, pathIds: string[]): string {
    return `/explore-universities/${universityId}/programs/${pathIds.join("/")}`;
}

/** Walk a path of unit ids down a tree, one level at a time. */
export function walkUnitPath(units: Unit[], pathIds: string[]): Unit[] {
    const chain: Unit[] = [];

    let level = units;
    for (const id of pathIds) {
        const next = level.find(unit => unit.id === id);
        if (!next) break;
        chain.push(next);
        level = getChildren(next);
    }

    return chain;
}

function getChildren(unit: Unit): Unit[] {
    return unit.units ?? [];
}

export function childRows(universityId: string, unit: Unit, pathIds: string[]): UnitRow[] {
    return getChildren(unit).map(child => ({
        unit: child,
        href: unitHref(universityId, [...pathIds, child.id]),
    }));
}

export function programGroups(universityId: string, units: Unit[]): ProgramGroup[] {
    const rows = (unit: Unit, pathIds: string[]): UnitRow[] =>
        getChildren(unit).flatMap(child => {
            const childPath = [...pathIds, child.id];
            const row = { unit: child, href: unitHref(universityId, childPath) };
            return child.kind === "faculty" ? rows(child, childPath) : [row, ...rows(child, childPath)];
        });

    return units.map(unit => ({
        unit,
        href: unitHref(universityId, [unit.id]),
        rows: rows(unit, [unit.id]),
    }));
}
