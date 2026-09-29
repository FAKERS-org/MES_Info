import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { NamespacedText, Unit } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { localize } from "@/lib/language";
import { ChevronRight, GraduationCap, Layers } from "lucide-react";
import Link from "next/link";

export interface UnitListCardProps {
    title: NamespacedText;
    /** When set, the header becomes a link — used by the faculty list, not the faculty page. */
    titleHref?: string;
    subtitle?: string;
    units: Unit[];
    universityId: string;
    lang: Lang;
}

/**
 * The list of departments of a faculty, as it appears on the programs list and
 * on the faculty page. Those two pages each carried their own copy of the same
 * row markup, and they had drifted: the faculty page linked its
 * sub-departments to `/explore-universities/{facultyId}/programs/…` with the
 * faculty id in the university slot, and the programs page rendered its
 * sub-departments as unclickable pills.
 *
 * A unit's own href is its id alone — the depth is not part of the URL, so a
 * sub-department needs no parent segment to be reachable.
 */
export function UnitListCard({ title, titleHref, subtitle, units, universityId, lang }: UnitListCardProps) {
    const Header = (
        <div className="bg-[#124f70] text-white p-5 flex items-center gap-4">
            <div className="bg-[#0b3c56] p-2.5 rounded-lg border border-[#1e607f]">
                <GraduationCap className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
                <h1 className="text-lg md:text-xl font-bold font-khmer leading-tight">{localize(title, lang)}</h1>
                {subtitle ? (
                    <p className="text-blue-100 text-xs md:text-sm mt-0.5">{subtitle}</p>
                ) : (
                    <p className="text-blue-100 text-xs md:text-sm mt-0.5">{title.en}</p>
                )}
            </div>
            {titleHref && <ChevronRight className="w-5 h-5" />}
        </div>
    );

    return (
        <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl bg-white" padding="none">
            {titleHref ? (
                <Link href={titleHref} className="block hover:bg-[#0f425f] transition-colors">
                    {Header}
                </Link>
            ) : (
                Header
            )}

            <CardContent className="p-0">
                {units.length === 0 && (
                    <p className="p-6 text-sm text-slate-500">មិនទាន់មានដេប៉ាតឺម៉ង់ជាក់ស្តែងទេ។</p>
                )}

                {units.map((unit, index) => (
                    <div key={unit.id}>
                        <div className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-900 font-khmer">
                                        {localize(unit.name, lang)}
                                    </h3>
                                    <Badge className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md text-xs font-normal font-khmer">
                                        {localize(unit.category, lang)}
                                    </Badge>
                                    {unit.units && unit.units.length > 0 && (
                                        <Badge className="bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-md text-xs font-normal font-khmer flex items-center gap-1">
                                            <Layers className="w-3 h-3" />
                                            ដេប៉ាតឺម៉ង់ទន្ទឹម
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-slate-600 text-[15px]">{unit.name.en}</p>

                                {/* Sub-departments, linked to the same page shape */}
                                {unit.units && unit.units.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {unit.units.map(child => (
                                            <Link
                                                key={child.id}
                                                href={`/explore-universities/${universityId}/programs/${child.id}`}
                                                className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full px-3 py-1 text-xs font-khmer transition-colors"
                                            >
                                                {child.id.toUpperCase()}
                                                <ChevronRight className="w-3 h-3" />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex md:items-end">
                                <Link
                                    href={`/explore-universities/${universityId}/programs/${unit.id}`}
                                    className="inline-flex items-center gap-1 bg-[#f0f4f8] text-[#1e3a5f] hover:bg-[#e2e8f0] font-khmer rounded-lg px-4 h-9 text-sm transition-colors"
                                >
                                    ព័ត៌មានលម្អិត
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>

                        {index < units.length - 1 && <Separator className="bg-slate-100" />}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
