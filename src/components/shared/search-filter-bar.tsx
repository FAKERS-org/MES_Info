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
            className={cn("flex w-full flex-wrap items-center gap-1.5 rounded-2xl bg-card p-1.5 shadow-sm", className)}
        >
            {/* Search Input Pill */}
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder={placeholder}
                    className="w-36 bg-transparent font-sans text-sm outline-none placeholder:text-muted-foreground md:w-44"
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
                                    : "bg-muted text-foreground hover:bg-border", // Inactive: Muted
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
                    className="whitespace-nowrap rounded-xl bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-border"
                >
                    វិស្វករ (Ingénieur 5Y)
                </button>
                <button
                    type="button"
                    className="whitespace-nowrap rounded-xl bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-border"
                >
                    បរិញ្ញាបត្រ (Bachelor)
                </button>
            </div>
        </div>
    );
}
