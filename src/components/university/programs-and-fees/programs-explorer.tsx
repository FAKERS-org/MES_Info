"use client";

import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { UnitListCard } from "@/components/university/programs-and-fees/unit-list-card";
import type { Unit } from "@/data/universities";
import type { Lang } from "@/lib/language";
import type { ProgramGroup } from "@/lib/unit-routes";
import { useMemo, useState } from "react";

export interface ProgramsExplorerProps {
    groups: ProgramGroup[];
    lang: Lang;
}

function matches(unit: Unit, query: string): boolean {
    return (
        unit.id.includes(query) ||
        unit.name.en.toLowerCase().includes(query) ||
        unit.name.kh.toLowerCase().includes(query) ||
        unit.category.en.toLowerCase().includes(query) ||
        unit.category.kh.toLowerCase().includes(query)
    );
}

/**
 * Keep the groups a query touches. A group survives when its own card matches
 * (all of its departments come with it) or when any one of its departments
 * matches, so a faculty is never hidden by a search for a department inside it.
 *
 * Both languages are searched whatever the UI language is: the data carries
 * Khmer and English for every unit, and someone who types "អគ្គិសនី" into the
 * English UI is looking for a department, not for a UI setting.
 */
export function filterGroups(groups: ProgramGroup[], query: string): ProgramGroup[] {
    const q = query.trim().toLowerCase();
    if (!q) return groups;

    return groups
        .map(group => ({
            ...group,
            rows: matches(group.unit, q) ? group.rows : group.rows.filter(row => matches(row.unit, q)),
        }))
        .filter(group => matches(group.unit, q) || group.rows.length > 0);
}

/**
 * The searchable program list.
 *
 * The search box was rendered on this page from the start and filtered nothing:
 * the page is a Server Component, so the query never reached the list. Filtering
 * is client state over the static tree, the same way
 * `/explore-universities` filters its own tiles — no request per keystroke.
 */
export default function ProgramsExplorer({ groups, lang }: ProgramsExplorerProps) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => filterGroups(groups, query), [groups, query]);

    return (
        <div className="space-y-4">
            <SearchFilterBar value={query} onValueChange={setQuery} placeholder="Search programs" />

            {filtered.length === 0 && (
                <p className="p-6 text-center text-sm text-muted-foreground">រកមិនឃើញកម្មវិធីសិក្សាណាមួយទេ។</p>
            )}

            {filtered.map(group => (
                <UnitListCard key={group.unit.id} title={group.unit.name} titleHref={group.href} rows={group.rows} lang={lang} />
            ))}
        </div>
    );
}
