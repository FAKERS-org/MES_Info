"use client";

import { Badge } from "@/components/ui/badge";
import type { UniversityDetail, UniversityProgram } from "@/lib/api/universities";
import type { Lang } from "@/lib/language";
import type { ProgramGroup } from "@/lib/unit-routes";
import { Building2, GraduationCap } from "lucide-react";
import { useState } from "react";
import ProgramsExplorer from "./programs-explorer";
import ProgramsList from "./programs-list";

interface UnifiedProgramsViewProps {
    groups: ProgramGroup[];
    programs: UniversityProgram[];
    lang: Lang;
    university: UniversityDetail;
}

export function UnifiedProgramsView({ groups, programs, lang, university }: UnifiedProgramsViewProps) {
    const isKhmer = lang === "kh";
    const hasUnits = groups.length > 0;
    const hasPrograms = programs.length > 0;

    // If only one exists, render that one directly
    const [viewMode, setViewMode] = useState<"DEPARTMENTS" | "ALL_PROGRAMS">(
        hasUnits ? "DEPARTMENTS" : "ALL_PROGRAMS"
    );

    if (!hasUnits && !hasPrograms) {
        return (
            <div className="p-8 text-center text-sm text-muted-foreground border border-dashed rounded-xl">
                {isKhmer ? "មិនទាន់មានទិន្នន័យកម្មវិធីសិក្សាទេ។" : "No academic programs listed yet."}
            </div>
        );
    }

    if (!hasUnits) {
        return <ProgramsList programs={programs} lang={lang} university={university} />;
    }

    if (!hasPrograms) {
        return <ProgramsExplorer groups={groups} lang={lang} />;
    }

    return (
        <div className="space-y-6">
            {/* View switcher tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/80 border border-border">
                    <button
                        type="button"
                        onClick={() => setViewMode("DEPARTMENTS")}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            viewMode === "DEPARTMENTS"
                                ? "bg-card text-foreground shadow-xs border border-border/80"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Building2 className="h-3.5 w-3.5 text-primary" />
                        <span className="font-khmer">
                            {isKhmer ? "តាមមហាវិទ្យាល័យ និងដេប៉ាតឺម៉ង់" : "By Faculty & Department"}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {groups.length}
                        </Badge>
                    </button>

                    <button
                        type="button"
                        onClick={() => setViewMode("ALL_PROGRAMS")}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            viewMode === "ALL_PROGRAMS"
                                ? "bg-card text-foreground shadow-xs border border-border/80"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <GraduationCap className="h-3.5 w-3.5 text-primary" />
                        <span className="font-khmer">
                            {isKhmer ? "តារាងជំនាញទាំងអស់" : "All Degree Programs"}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {programs.length}
                        </Badge>
                    </button>
                </div>

                <p className="text-xs text-muted-foreground font-khmer hidden sm:block">
                    {viewMode === "DEPARTMENTS"
                        ? (isKhmer ? "ពិនិត្យតាមរចនាសម្ព័ន្ធមហាវិទ្យាល័យ" : "Browsing institutional hierarchy")
                        : (isKhmer ? "ស្វែងរក និងច្រោះតាមកម្រិតសញ្ញាបត្រ" : "Search & filter by degree level")}
                </p>
            </div>

            {/* Active view */}
            {viewMode === "DEPARTMENTS" ? (
                <ProgramsExplorer groups={groups} lang={lang} />
            ) : (
                <ProgramsList programs={programs} lang={lang} university={university} />
            )}
        </div>
    );
}
