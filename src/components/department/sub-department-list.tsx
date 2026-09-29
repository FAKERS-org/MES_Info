import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Unit } from "@/data/faculty-departments";
import { ChevronRight, GraduationCap, Layers } from "lucide-react";
import Link from "next/link";

interface SubDepartmentListProps {
    subDepartments: Unit[];
    parentDepartment: Unit;
    facultyId?: string;
}

/**
 * Lists the sub-departments of a "self department" (e.g. GEE → AMS, GIC, GTR).
 */
export default function SubDepartmentList({ subDepartments, parentDepartment, facultyId }: SubDepartmentListProps) {
    if (subDepartments.length === 0) return null;

    return (
        <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl bg-white" padding="none">
            <CardHeader className="bg-[#124f70] text-white p-5">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0b3c56] p-2.5 rounded-lg border border-[#1e607f]">
                        <Layers className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                        <CardTitle className="text-lg md:text-xl font-bold font-khmer leading-tight">
                            ដេប៉ាតឺម៉ង់ទន្ទឹម ({subDepartments.length}) — Sub-departments
                        </CardTitle>
                        <p className="text-blue-100 text-xs md:text-sm mt-0.5">
                            Under {parentDepartment.name.en}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {subDepartments.map((sub, index) => (
                    <div key={sub.id}>
                        <div className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-900 font-khmer">
                                        {sub.name.kh}
                                    </h3>
                                    <Badge className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md text-xs font-normal font-khmer">
                                        {sub.category.kh}
                                    </Badge>
                                </div>

                                <p className="text-slate-600 text-[15px]">{sub.name.en}</p>

                                {sub.requirements.length > 0 && (
                                    <div className="pt-1">
                                        <p className="text-xs text-slate-500 font-khmer mb-1.5">តម្រូវការចូលសិក្សា</p>
                                        <ul className="space-y-1">
                                            {sub.requirements.map((req, i) => (
                                                <li key={i} className="flex items-start gap-1.5 text-sm text-slate-600">
                                                    <GraduationCap className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" strokeWidth={2} />
                                                    <span className="font-khmer">{req.kh}</span>
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
                                    <Link
                                        href={
                                            facultyId
                                                ? `/explore-universities/itc/programs/${facultyId}/${sub.id}`
                                                : `/explore-universities/itc/programs/${parentDepartment.id}/${sub.id}`
                                        }
                                    >
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
