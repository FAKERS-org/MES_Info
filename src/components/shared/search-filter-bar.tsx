"use client";

import { FilterChip } from "@/components/shared/filter-chip";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

export interface SearchFilterBarProps {
    /** Filter pills. The first one starts active when nothing is controlled. */
    pills?: string[];
    /** Controlled query. Omit to let the bar hold its own. */
    value?: string;
    /** Initial query of an uncontrolled bar. */
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Controlled active pill. Omit to let the bar hold its own. */
    activePill?: string;
    onPillChange?: (pill: string) => void;
    placeholder?: string;
    /** Container surface: width, radius… */
    className?: string;
}

/**
 * One capsule holding a search field and a scrolling row of
 * {@link FilterChip}s — the shape the programs tab of
 * `/explore-universities/{university}` asks for. It is controlled when the
 * page needs the query (`value` / `activePill` + a change handler) and
 * self-contained otherwise, so a page only wires what it acts on.
 */
export function SearchFilterBar({
    pills = [],
    value,
    defaultValue = "",
    onValueChange,
    activePill,
    onPillChange,
    placeholder,
    className,
}: SearchFilterBarProps) {
    const [innerValue, setInnerValue] = useState(defaultValue);
    const [innerPill, setInnerPill] = useState(pills[0]);

    const query = value ?? innerValue;
    const selected = activePill ?? innerPill;

    const setQuery = (next: string) => {
        setInnerValue(next);
        onValueChange?.(next);
    };

    const selectPill = (pill: string) => {
        setInnerPill(pill);
        onPillChange?.(pill);
    };

    return (
        <div
            className={cn(
                "flex w-full flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm",
                className,
            )}
        >
            <div className="flex items-center gap-2 border-r border-slate-200 pl-3 pr-4">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder={placeholder}
                    className="w-40 bg-transparent font-sans text-sm outline-none placeholder:text-slate-400 md:w-48"
                />
            </div>

            {pills.length > 0 && (
                <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto">
                    {pills.map(pill => (
                        <FilterChip
                            key={pill}
                            active={pill === selected}
                            onClick={() => selectPill(pill)}
                            className="whitespace-nowrap px-4"
                        >
                            {pill}
                        </FilterChip>
                    ))}
                </div>
            )}
        </div>
    );
}
