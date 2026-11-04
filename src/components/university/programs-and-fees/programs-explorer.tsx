"use client";

import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { UnitListCard } from "@/components/university/programs-and-fees/unit-list-card";
import type { Unit } from "@/data/universities";
import type { components } from "@/lib/api/schema";
import type { Lang } from "@/lib/language";
import type { ProgramGroup } from "@/lib/unit-routes";
import { useMemo, useState } from "react";

export interface ProgramsExplorerProps {
    groups: ProgramGroup[];
    lang: Lang;
}

type ProgramSummary = components["schemas"]["ProgramSummary"];

function matches(unit: Unit, query: string): boolean {
    return (
        unit.id.includes(query) ||
        (unit.acronym ? unit.acronym.toLowerCase().includes(query) : false) ||
        unit.name.en.toLowerCase().includes(query) ||
        unit.name.kh.toLowerCase().includes(query) ||
        unit.category.en.toLowerCase().includes(query) ||
        unit.category.kh.toLowerCase().includes(query)
    );
}

function matchesProgram(p: ProgramSummary, query: string): boolean {
    return (
        p.name_en.toLowerCase().includes(query) ||
        (p.name_kh ? p.name_kh.toLowerCase().includes(query) : false) ||
        (p.degree_level ? p.degree_level.toLowerCase().includes(query) : false)
    );
}

/**
 * Keep the groups a query touches. A group survives when its own card matches
 * (all of its departments come with it), when any of its child departments match,
 * or when any of its direct programs match.
 */
export function filterGroups(groups: ProgramGroup[], query: string): ProgramGroup[] {
    const q = query.trim().toLowerCase();
    if (!q) return groups;

    return groups
        .map(group => {
            const unitMatch = matches(group.unit, q);
            const matchedRows = unitMatch ? group.rows : group.rows.filter(row => matches(row.unit, q));
            const matchedPrograms = unitMatch
                ? group.programs ?? []
                : (group.programs ?? []).filter(p => matchesProgram(p, q));

            return {
                ...group,
                rows: matchedRows,
                programs: matchedPrograms,
            };
        })
        .filter(
            group =>
                matches(group.unit, q) ||
                group.rows.length > 0 ||
                (group.programs && group.programs.length > 0),
        );
}

/**
 * The searchable program list organized by institutional units.
 */
export default function ProgramsExplorer({ groups, lang }: ProgramsExplorerProps) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => filterGroups(groups, query), [groups, query]);

    return (
        <div className="space-y-4">
            <SearchFilterBar value={query} onValueChange={setQuery} placeholder="Search programs" />

            {filtered.length === 0 && (
                <p className="p-6 text-center text-sm text-muted-foreground font-khmer">
                    {lang === "kh" ? "រកមិនឃើញកម្មវិធីសិក្សាណាមួយទេ។" : "No programs found."}
                </p>
            )}

            {filtered.map(group => (
                <UnitListCard
                    key={group.unit.id}
                    title={group.unit.name}
                    titleHref={group.href}
                    rows={group.rows}
                    programs={group.programs}
                    lang={lang}
                    tuitionFee={group.unit.defaultTuition}
                    tuitionFemaleFee={group.unit.defaultTuitionFemale}
                    isAutonomous={group.unit.is_autonomous}
                    acronym={group.unit.acronym}
                />
            ))}
        </div>
    );
}
