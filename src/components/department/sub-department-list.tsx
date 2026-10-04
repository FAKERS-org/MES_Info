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
    subDepartments: UnitRow[];
    parentDepartment: Unit;
    lang: Lang;
}

const KIND_LABEL: Record<Unit["kind"], { kh: string; en: string }> = {
    faculty: { kh: "មហាវិទ្យាល័យ", en: "Faculties" },
    department: { kh: "ដេប៉ាតឺម៉ង់", en: "Departments" },
    "sub-department": { kh: "ដេប៉ាតឺម៉ង់ទន្ទឹម", en: "Sub-departments" },
    foundation: { kh: "មូលដ្ឋាន", en: "Foundation" },
};

export default function SubDepartmentList({ subDepartments, parentDepartment, lang }: SubDepartmentListProps) {
    if (subDepartments.length === 0) return null;

    const label = KIND_LABEL[subDepartments[0].unit.kind];

    return (
        <Card className="overflow-hidden border border-border shadow-sm rounded-xl bg-card" padding="none">
            <CardHeader className="bg-[#124f70] text-white p-5">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0b3c56] p-2.5 rounded-lg border border-[#1e607f]">
                        <Layers className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                        <CardTitle className="text-lg md:text-xl font-bold font-khmer text-white leading-tight">
                            {label.kh} ({subDepartments.length}) - {label.en}
                        </CardTitle>
                        <p className="text-blue-100 text-xs md:text-sm mt-0.5">Under {parentDepartment.name.en}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {subDepartments.map(({ unit: sub, href }, index) => (
                    <div key={sub.id}>
                        <div className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-muted/50 transition-colors">
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-xl font-bold text-foreground font-khmer">
                                        {localize(sub.name, lang)}
                                    </h3>
                                    <Badge className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/60 px-2 py-0.5 rounded-md text-xs font-normal font-khmer">
                                        {localize(sub.category, lang)}
                                    </Badge>
                                </div>

                                <p className="text-muted-foreground text-[15px]">{sub.name.en}</p>

                                {sub.requirements.length > 0 && (
                                    <div className="pt-1">
                                        <p className="text-xs text-muted-foreground font-khmer mb-1.5">តម្រូវការចូលសិក្សា</p>
                                        <ul className="space-y-1">
                                            {sub.requirements.map(req => (
                                                <li
                                                    key={req.en}
                                                    className="flex items-start gap-1.5 text-sm text-muted-foreground"
                                                >
                                                    <GraduationCap
                                                        className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0"
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
                                    className="bg-muted text-foreground hover:bg-border font-khmer gap-1 rounded-lg px-4 h-9 text-sm whitespace-nowrap"
                                >
                                    <Link href={href} className="flex items-center">
                                        {" "}
                                        ព័ត៌មានលម្អិត
                                        <ChevronRight className="w-4 h-4 ml-1 shrink-0" />{" "}
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {index < subDepartments.length - 1 && <Separator className="bg-muted" />}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
