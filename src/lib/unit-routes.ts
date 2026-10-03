import { getChildren, type Unit, type University } from "@/data/universities";

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

export function childRows(university: University, unit: Unit, pathIds: string[]): UnitRow[] {
    return getChildren(unit).map(child => ({ unit: child, href: unitHref(university.id, [...pathIds, child.id]) }));
}

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
