import { notFound } from "next/navigation";
import { universities } from "@/data/universities";
import { facultyDepartments, isSelfDepartment, type Unit } from "@/data/faculty-departments";
import { SectionLayout } from "@/components/shared/section-layout";
import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import FacultyCard from "@/components/university/programs-and-fees/faculty-card";
import UniversityHero from "@/components/university/university-hero";
import { SimpleTab } from "@/components/university/university-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, GraduationCap, Layers, Clock } from "lucide-react";

interface FacultyPageProps {
    params: Promise<{ university: string; faculty_id: string }>;
}

export default async function FacultyProgramsPage({ params }: FacultyPageProps) {
    const { university: universityId, faculty_id } = await params;

    const university = universities.find(u => u.id === universityId);
    if (!university) notFound();

    // Resolve the faculty from the static hierarchy data
    const faculty =
        facultyDepartments.find(f => f.id === faculty_id) ??
        facultyDepartments.find(f =>
            f.departments.some(d => d.id === faculty_id || d.subDepartments?.some(s => s.id === faculty_id))
        );

    if (!faculty) notFound();

    // If faculty_id points at a specific department, show only that one
    const directDepartments = faculty.departments.filter(d => d.id === faculty_id);
    const departments = directDepartments.length > 0 ? directDepartments : faculty.departments;

    const tabs: SimpleTab[] = [
        { href: `/explore-universities/${universityId}/programs`, icon: "BookOpen", label: "Programs & Fees", active: true },
        { href: `/explore-universities/${universityId}/admissions`, icon: "GraduationCap", label: "Admissions" },
        { href: `/explore-universities/${universityId}/scholarships`, icon: "Award", label: "Scholarships" },
    ];

    return (
        <div className="space-y-5">
            <UniversityHero />
            <SectionLayout
                breakpoint="md"
                mainClassName="space-y-4"
                aside={
                    <div className="space-y-4">
                        <CampusMapCard />
                        <AdmissionsContactCard />
                        <BrochureDownloadCard />
                    </div>
                }
            >
                <div className="space-y-4">
                    <SearchFilterBar pills={[]} placeholder="Search programs" />

                    {/* Faculty header + departments from static hierarchy data */}
                    <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl bg-white" padding="none">
                        <div className="bg-[#124f70] text-white p-5">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#0b3c56] p-2.5 rounded-lg border border-[#1e607f]">
                                    <GraduationCap className="w-6 h-6 text-white" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h1 className="text-lg md:text-xl font-bold font-khmer leading-tight">
                                        {faculty.name.kh}
                                    </h1>
                                    <p className="text-blue-100 text-xs md:text-sm mt-0.5">
                                        {faculty.name.en}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-0">
                            {departments.map((dept, index) => (
                                <div key={dept.id}>
                                    <DepartmentRow department={dept} facultyId={faculty.id} />
                                    {index < departments.length - 1 && <Separator className="bg-slate-100" />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </SectionLayout>
        </div>
    );
}

function DepartmentRow({ department, facultyId }: { department: Unit; facultyId: string }) {
    const isSelf = isSelfDepartment(facultyId, department.id);

    return (
        <div className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-slate-50/50 transition-colors">
            <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900 font-khmer">{department.name.kh}</h3>
                    <Badge className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md text-xs font-normal font-khmer">
                        {department.category.kh}
                    </Badge>
                    {isSelf && (
                        <Badge className="bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-md text-xs font-normal font-khmer flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            ដេប៉ាតឺម៉ង់ទន្ទឹម
                        </Badge>
                    )}
                </div>

                <p className="text-slate-600 text-[15px]">{department.name.en}</p>

                {/* Sub-departments preview (self department) */}
                {isSelf && department.subDepartments && department.subDepartments.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {department.subDepartments.map(sub => (
                            <Link
                                key={sub.id}
                                href={`/explore-universities/${facultyId}/programs/${facultyId}/${sub.id}`}
                                className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full px-3 py-1 text-xs font-khmer transition-colors"
                            >
                                {sub.id.toUpperCase()}
                                <ChevronRight className="w-3 h-3" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex md:items-end">
                <Link
                    href={`/explore-universities/itc/programs/${facultyId}/${department.id}`}
                    className="inline-flex items-center gap-1 bg-[#f0f4f8] text-[#1e3a5f] hover:bg-[#e2e8f0] font-khmer rounded-lg px-4 h-9 text-sm transition-colors"
                >
                    ព័ត៌មានលម្អិត
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
    );
}