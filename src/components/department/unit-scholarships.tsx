import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { UnitScholarship } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { localize } from "@/lib/language";
import { Award, GraduationCap } from "lucide-react";

export interface UnitScholarshipsProps {
    scholarships: UnitScholarship[];
    lang: Lang;
}

/**
 * Scholarships a unit declares for its own students.
 *
 * The university page carries the ones any applicant can take, so this section
 * is for the rest: the unit's page is where a student finds out what their own
 * department awards. Renders nothing when the unit declares none — most units
 * do not, and a section that always shows an empty heading is noise.
 */
export default function UnitScholarships({ scholarships, lang }: UnitScholarshipsProps) {
    if (scholarships.length === 0) return null;

    return (
        <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl bg-white" padding="none">
            <div className="bg-[#124f70] text-white p-5 flex items-center gap-4">
                <div className="bg-[#0b3c56] p-2.5 rounded-lg border border-[#1e607f]">
                    <Award className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-lg md:text-xl font-bold font-khmer leading-tight">
                        អាហារូបករណ៍សម្រាប់សិស្សរបស់ដេប៉ាតឺម៉ង់នេះ
                    </h1>
                    <p className="text-blue-100 text-xs md:text-sm mt-0.5">
                        Scholarships open to students of this unit only
                    </p>
                </div>
            </div>

            <CardContent className="p-0">
                {scholarships.map(scholarship => (
                    <div key={scholarship.id} className="p-6 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-bold text-slate-900 font-khmer">
                                {localize(scholarship.name, lang)}
                            </h3>
                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md text-xs font-normal font-khmer">
                                {localize(scholarship.coverage, lang)}
                            </Badge>
                        </div>

                        <p className="text-slate-600 text-[15px]">{scholarship.name.en}</p>

                        {scholarship.requirements.length > 0 && (
                            <ul className="space-y-1 pt-1">
                                {scholarship.requirements.map(requirement => (
                                    <li key={requirement.en} className="flex items-start gap-1.5 text-sm text-slate-600">
                                        <GraduationCap className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" strokeWidth={2} />
                                        <span className="font-khmer">{localize(requirement, lang)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
