import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { NamespacedText } from "@/data/universities";
import type { components } from "@/lib/api/schema";
import type { Lang, StudyShift } from "@/lib/language";
import { apiName, getDegreeLabel, localize, STUDY_SHIFT_LABELS } from "@/lib/language";
import type { UnitRow } from "@/lib/unit-routes";
import { ChevronRight, Clock, FolderTree, GraduationCap, Wallet } from "lucide-react";
import Link from "next/link";

export interface UnitListCardProps {
    lang: Lang;
    rows: UnitRow[];
    subtitle?: string;
    title: NamespacedText;
    titleHref?: string;
    tuitionFee?: number;
    tuitionFemaleFee?: number;
    programs?: components["schemas"]["ProgramSummary"][];
    isAutonomous?: boolean;
    acronym?: string;
}

export function UnitListCard({
    title,
    titleHref,
    subtitle,
    rows,
    lang,
    tuitionFee,
    tuitionFemaleFee,
    programs,
    isAutonomous,
    acronym,
}: UnitListCardProps) {
    const isKhmer = lang === "kh";

    const Header = (
        <div className="bg-card border-b border-border p-4 sm:p-5 flex items-center gap-3.5">
            <div className="bg-primary/10 text-primary p-2 rounded-xl shrink-0">
                <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base md:text-lg font-bold font-khmer leading-tight text-foreground truncate">
                        {localize(title, lang)}
                    </h2>
                    {acronym && (
                        <span className="text-2xs font-mono font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                            [{acronym}]
                        </span>
                    )}
                    {isAutonomous && (
                        <span className="text-2xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded">
                            {isKhmer ? "ស្ថាប័នស្វ័យភាព" : "Autonomous Unit"}
                        </span>
                    )}
                </div>
                {subtitle ? (
                    <p className="text-muted-foreground text-xs mt-0.5">{subtitle}</p>
                ) : (
                    <p className="text-muted-foreground text-xs mt-0.5">{title.en}</p>
                )}
            </div>
            {tuitionFee != null && (
                <div className="text-right shrink-0">
                    <Badge variant="outline" className="font-semibold text-xs border-primary/30 text-foreground">
                        ${tuitionFee}{isKhmer ? "/ឆ្នាំ" : "/yr"}
                        {tuitionFemaleFee != null && (
                            <span className="ml-1 text-rose-600 dark:text-rose-400 font-bold">
                                (♀ ${tuitionFemaleFee})
                            </span>
                        )}
                    </Badge>
                </div>
            )}
            {titleHref && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
        </div>
    );

    return (
        <Card className="overflow-hidden border border-border shadow-xs rounded-2xl bg-card" padding="none">
            {titleHref ? (
                <Link href={titleHref} className="block hover:bg-muted/40 transition-colors">
                    {Header}
                </Link>
            ) : (
                Header
            )}

            <CardContent className="p-0">
                {/* 1. Sub-departments if present */}
                {rows.map(({ unit, href }, index) => (
                    <div key={unit.id}>
                        <div className="p-4 sm:p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-muted/30 transition-colors">
                            <div className="flex-1 space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-semibold text-foreground font-khmer flex items-center gap-1.5">
                                        <span>{localize(unit.name, lang)}</span>
                                        {unit.acronym && (
                                            <span className="text-2xs font-mono font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                                [{unit.acronym}]
                                            </span>
                                        )}
                                        {unit.is_autonomous && (
                                            <span className="text-2xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded">
                                                {isKhmer ? "ស្ថាប័នស្វ័យភាព" : "Autonomous"}
                                            </span>
                                        )}
                                    </h3>
                                    <Badge className="bg-primary/10 text-primary border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer">
                                        {localize(unit.category, lang)}
                                    </Badge>
                                    {unit.units && unit.units.length > 0 && (
                                        <Badge className="bg-muted text-muted-foreground border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer flex items-center gap-1">
                                            <FolderTree className="h-3 w-3" />
                                            {isKhmer ? "ផ្នែក/ដេប៉ាតឺម៉ង់ចំណុះ" : "Sub-units / Departments"}
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-muted-foreground text-xs">{unit.name.en}</p>
                            </div>

                            <div className="flex md:items-center">
                                <Link
                                    href={href}
                                    className="inline-flex items-center gap-1 bg-muted hover:bg-border text-foreground font-khmer rounded-lg px-3 h-8 text-xs font-medium transition-colors cursor-pointer"
                                >
                                    <span>{isKhmer ? "ព័ត៌មានលម្អិត" : "View Details"}</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>

                        {(index < rows.length - 1 || (programs && programs.length > 0)) && (
                            <Separator className="bg-border/60" />
                        )}
                    </div>
                ))}

                {/* 2. Direct Programs in this unit */}
                {programs && programs.length > 0 && (
                    <div className="divide-y divide-border/60">
                        {programs.map(program => {
                            const tuition = program.tuition_per_year ?? tuitionFee;
                            const femaleTuition = program.tuition_female_per_year ?? tuitionFemaleFee;
                            return (
                                <div
                                    key={program.id}
                                    className="p-4 sm:p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-muted/20 transition-colors"
                                >
                                    <div className="flex-1 space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-base font-semibold text-foreground font-khmer">
                                                {apiName(program, lang)}
                                            </h3>
                                            <Badge className="bg-primary/10 text-primary border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer">
                                                {getDegreeLabel(program.degree_level, lang)}
                                            </Badge>
                                        </div>
                                        {program.name_kh && (
                                            <p className="text-muted-foreground text-xs">{program.name_en}</p>
                                        )}

                                        {program.shifts && program.shifts.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                                {program.shifts.map(shift => {
                                                    const s = shift as StudyShift;
                                                    const info = STUDY_SHIFT_LABELS[s];
                                                    return (
                                                        <Badge
                                                            key={shift}
                                                            variant="outline"
                                                            className="bg-sky-50/80 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 text-[11px] px-2 py-0.5 font-normal font-khmer flex items-center gap-1"
                                                        >
                                                            <Clock className="w-3 h-3 text-sky-500 shrink-0" />
                                                            <span>{isKhmer ? info?.kh ?? shift : info?.en ?? shift}</span>
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3.5 text-sm text-muted-foreground shrink-0">
                                        {program.duration_years != null && (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                {program.duration_years} {isKhmer ? "ឆ្នាំ" : "yrs"}
                                            </span>
                                        )}
                                        {tuition != null && (
                                            <Badge
                                                variant="outline"
                                                className="font-semibold text-xs border-primary/30 text-foreground"
                                            >
                                                <Wallet className="h-3 w-3 mr-1 text-primary" />
                                                ${tuition}{isKhmer ? "/ឆ្នាំ" : "/yr"}
                                                {femaleTuition != null && femaleTuition < tuition && (
                                                    <span className="ml-1 text-rose-600 dark:text-rose-400 font-bold">
                                                        (♀ ${femaleTuition})
                                                    </span>
                                                )}
                                            </Badge>
                                        )}
                                        {program.tuition_per_credit != null && tuition == null && (
                                            <Badge
                                                variant="outline"
                                                className="font-semibold text-xs border-primary/30 text-foreground"
                                            >
                                                ${program.tuition_per_credit}{isKhmer ? "/ក្រេឌីត" : "/credit"}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 3. Empty state only when neither sub-units nor programs exist */}
                {rows.length === 0 && (!programs || programs.length === 0) && (
                    <p className="p-6 text-sm text-muted-foreground font-khmer text-center">
                        {isKhmer ? "មិនទាន់មានព័ត៌មានកម្មវិធីសិក្សាជាក់ស្តែងទេ។" : "No programs listed yet."}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
