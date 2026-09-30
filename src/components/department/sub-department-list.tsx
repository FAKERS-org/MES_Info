import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Unit } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { localize } from "@/lib/language";
import type { UnitRow } from "@/lib/unit-routes";
import { ChevronRight, GraduationCap, Layers } from "lucide-react";
import Link from "next/link";

export interface SubDepartmentListProps {
    /** The children, each with the URL that reaches it — the page's own chain plus one id. */
    subDepartments: UnitRow[];
    parentDepartment: Unit;
    lang: Lang;
}

/**
 * What the children of a unit are called. The same card lists a faculty's
 * departments and a department's sub-departments, and it used to call both
 * "sub-departments" — so the faculty page announced its departments as
 * "ដេប៉ាតឺម៉ង់ទន្ទឹម".
 */
const KIND_LABEL: Record<Unit["kind"], { kh: string; en: string }> = {
    faculty: { kh: "មហាវិទ្យាល័យ", en: "Faculties" },
    department: { kh: "ដេប៉ាតឺម៉ង់", en: "Departments" },
    "sub-department": { kh: "ដេប៉ាតឺម៉ង់ទន្ទឹម", en: "Sub-departments" },
    foundation: { kh: "មូលដ្ឋាន", en: "Foundation" },
};

/**
 * Lists the sub-departments of a "self department" (e.g. GEE → AMS, GIC, GTR).
 *
 * Each sub-department arrives with its own href — the chain of ids leading to
 * it — because a link built from the university and an id alone sent visitors
 * to `/explore-universities/gee/programs/gee/ams`, a university that does not
 * exist, and every one of those 404'd.
 */
export default function SubDepartmentList({ subDepartments, parentDepartment, lang }: SubDepartmentListProps) {
    if (subDepartments.length === 0) return null;

    const label = KIND_LABEL[subDepartments[0].unit.kind];

    return (
        <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl bg-white" padding="none">
            <CardHeader className="bg-[#124f70] text-white p-5">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0b3c56] p-2.5 rounded-lg border border-[#1e607f]">
                        <Layers className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                        <CardTitle className="text-lg md:text-xl font-bold font-khmer leading-tight">
                            {label.kh} ({subDepartments.length}) — {label.en}
                        </CardTitle>
                        <p className="text-blue-100 text-xs md:text-sm mt-0.5">
                            Under {parentDepartment.name.en}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {subDepartments.map(({ unit: sub, href }, index) => (
                    <div key={sub.id}>
                        <div className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-900 font-khmer">
                                        {localize(sub.name, lang)}
                                    </h3>
                                    <Badge className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md text-xs font-normal font-khmer">
                                        {localize(sub.category, lang)}
                                    </Badge>
                                </div>

                                <p className="text-slate-600 text-[15px]">{sub.name.en}</p>

                                {sub.requirements.length > 0 && (
                                    <div className="pt-1">
                                        <p className="text-xs text-slate-500 font-khmer mb-1.5">តម្រូវការចូលសិក្សា</p>
                                        <ul className="space-y-1">
                                            {sub.requirements.map(req => (
                                                <li
                                                    key={req.en}
                                                    className="flex items-start gap-1.5 text-sm text-slate-600"
                                                >
                                                    <GraduationCap
                                                        className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0"
                                                        strokeWidth={2}
                                                    />
                                                    <span className="font-khmer">{localize(req, lang)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="flex md:items-end">
                                <Button
                                    variant="secondary"
                                    asChild
                                    className="bg-[#f0f4f8] text-[#1e3a5f] hover:bg-[#e2e8f0] font-khmer gap-1 rounded-lg px-4 h-9 text-sm"
                                >
                                    <Link href={href}>
                                        ព័ត៌មានលម្អិត
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {index < subDepartments.length - 1 && <Separator className="bg-slate-100" />}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
