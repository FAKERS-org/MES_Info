"use client";

import { FilterChip } from "@/components/shared/filter-chip";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

export interface SearchFilterBarProps {
    pills?: string[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    activePill?: string;
    onPillChange?: (pill: string) => void;
    placeholder?: string;
    className?: string;
}

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
            className={cn("flex w-full flex-wrap items-center gap-1.5 rounded-2xl bg-white p-1.5 shadow-sm", className)}
        >
            {/* Search Input Pill */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-slate-500" />
                <input
                    type="text"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder={placeholder}
                    className="w-36 bg-transparent font-sans text-sm outline-none placeholder:text-slate-500 md:w-44"
                />
            </div>

            {/* Filter Chips */}
            {pills.length > 0 && (
                <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto">
                    {pills.map(pill => (
                        <FilterChip
                            key={pill}
                            active={pill === selected}
                            onClick={() => selectPill(pill)}
                            className={cn(
                                "whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                                pill === selected
                                    ? "bg-[#0a2540] text-white hover:bg-[#0a2540]/90" // Active: Dark Navy
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200", // Inactive: Light Grey
                            )}
                        >
                            {pill}
                        </FilterChip>
                    ))}
                </div>
            )}

            {/* Right-aligned Action Buttons */}
            <div className="ml-auto flex items-center gap-1.5">
                <button
                    type="button"
                    className="whitespace-nowrap rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                    វិស្វករ (Ingénieur 5Y)
                </button>
                <button
                    type="button"
                    className="whitespace-nowrap rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                    បរិញ្ញាបត្រ (Bachelor)
                </button>
            </div>
        </div>
    );
}
