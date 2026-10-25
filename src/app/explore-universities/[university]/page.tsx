import { SectionLayout } from "@/components/shared/section-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CampusSwitcher from "@/components/university/campus-switcher";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import CampusMapCard from "@/components/university/programs-and-fees/campus-map-card";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import { getUniversityDetail, toHeadingData } from "@/lib/api/universities";
import { apiName } from "@/lib/language";
import { readLang } from "@/lib/language.server";
import { universityTabs } from "@/lib/university-tabs";
import {
    ArrowRight,
    BadgeCheck,
    BookOpen,
    Building2,
    CalendarDays,
    Home,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface UniversityPageProps {
    params: Promise<{ university: string }>;
    searchParams?: Promise<{ campus?: string }>;
}

export default async function UniversityPage({ params, searchParams }: UniversityPageProps) {
    const { university: id } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const campusParam = resolvedSearchParams?.campus;

    const rootDetail = await getUniversityDetail(id);
    if (!rootDetail) notFound();

    const campuses = rootDetail.campuses ?? [];
    const activePublicId =
        (campusParam && campuses.some(c => c.public_id === campusParam)
            ? campusParam
            : campuses.find(c => c.is_main_campus)?.public_id) ?? rootDetail.public_id;

    const activeDetail =
        activePublicId !== rootDetail.public_id
            ? (await getUniversityDetail(activePublicId)) ?? rootDetail
            : rootDetail;

    const lang = await readLang();
    const uniName = apiName(activeDetail, lang);

    const description =
        (lang === "kh" ? activeDetail.description_kh || activeDetail.description_en : activeDetail.description_en || activeDetail.description_kh) ??
        (lang === "kh" ? activeDetail.overview_kh || activeDetail.overview_en : activeDetail.overview_en || activeDetail.overview_kh);

    const overview =
        lang === "kh"
            ? activeDetail.overview_kh || activeDetail.overview_en
            : activeDetail.overview_en || activeDetail.overview_kh;

    const programsCount = activeDetail.programs?.length ?? 0;

    return (
        <div className="space-y-6">
            <UniversityHero university={toHeadingData(activeDetail)} lang={lang} />
            <CampusSwitcher campuses={campuses} activePublicId={activePublicId} />
            <UniversityMenu tabs={universityTabs(id)} />

            <SectionLayout
                breakpoint="md"
                mainClassName="space-y-6"
                aside={
                    <div className="space-y-4">
                        <CampusMapCard
                            address={activeDetail.address}
                            mapUrl={activeDetail.embed_map_url}
                            locationName={activeDetail.campus_name || activeDetail.province}
                        />
                        <AdmissionsContactCard
                            phone={activeDetail.contact_phone}
                            email={activeDetail.contact_email}
                            telegram={activeDetail.contact_telegram}
                            website={activeDetail.website}
                            universityName={uniName}
                        />
                        <BrochureDownloadCard website={activeDetail.website} universityName={uniName} />
                    </div>
                }
            >
                {/* About / Description Card */}
                <Card className="border border-border shadow-sm rounded-2xl bg-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                            {lang === "kh" ? "អំពីគ្រឹះស្ថានសិក្សា" : "About the University"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground leading-relaxed">
                        {overview && (
                            <p className="text-base font-medium text-foreground">
                                {overview}
                            </p>
                        )}
                        {description && description !== overview ? (
                            <div className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed">
                                {description}
                            </div>
                        ) : !overview ? (
                            <p className="text-sm text-muted-foreground italic">
                                {lang === "kh"
                                    ? "មិនទាន់មានការពិពណ៌នាលម្អិតនៅឡើយទេ។"
                                    : "Detailed profile and description not available yet."}
                            </p>
                        ) : null}
                    </CardContent>
                </Card>

                {/* Information Preparation Grid (Key Institutional Facts) */}
                <Card className="border border-border shadow-sm rounded-2xl bg-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold">
                            {lang === "kh" ? "ព័ត៌មានសំខាន់ៗ" : "Key Information"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/60">
                                <BadgeCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        {lang === "kh" ? "ការទទួលស្គាល់ផ្លូវការ" : "Accreditation"}
                                    </p>
                                    <p className="font-semibold text-sm">
                                        {activeDetail.moeys_accredited
                                            ? lang === "kh"
                                                ? "ទទួលស្គាល់ដោយក្រសួងអប់រំ (MoEYS)"
                                                : "Accredited by MoEYS"
                                            : lang === "kh"
                                              ? "កំពុងរង់ចាំការបញ្ជាក់"
                                              : "Standard Recognition"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/60">
                                <MapPin className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        {lang === "kh" ? "ខេត្ត / រាជធានី" : "Province / City"}
                                    </p>
                                    <p className="font-semibold text-sm">
                                        {activeDetail.province || (lang === "kh" ? "ភ្នំពេញ" : "Phnom Penh")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/60">
                                <CalendarDays className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        {lang === "kh" ? "ឆ្នាំបង្កើត" : "Established Year"}
                                    </p>
                                    <p className="font-semibold text-sm">
                                        {activeDetail.established_year
                                            ? `Est. ${activeDetail.established_year}`
                                            : lang === "kh"
                                              ? "មិនបានបញ្ជាក់"
                                              : "Not specified"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/60">
                                <Home className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        {lang === "kh" ? "អន្តេវាសិកដ្ឋាន (កន្លែងស្នាក់)" : "Dormitory"}
                                    </p>
                                    <p className="font-semibold text-sm">
                                        {activeDetail.has_dormitory
                                            ? activeDetail.dormitory_details ||
                                              (lang === "kh" ? "មានកន្លែងស្នាក់នៅសម្រាប់និស្សិត" : "Dormitory available")
                                            : lang === "kh"
                                              ? "មិនមានកន្លែងស្នាក់នៅផ្ទាល់"
                                              : "No on-campus dormitory"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Programs Quick Access Card */}
                <Card className="border border-border shadow-sm rounded-2xl bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                            {lang === "kh" ? "កម្មវិធីសិក្សា" : "Academic Programs"}
                            {programsCount > 0 && (
                                <Badge variant="secondary" className="ml-2 font-semibold">
                                    {programsCount}
                                </Badge>
                            )}
                        </CardTitle>
                        <Button asChild variant="ghost" size="sm" className="gap-1 text-sky-600 dark:text-sky-400">
                            <Link href={`/explore-universities/${id}/programs`}>
                                {lang === "kh" ? "មើលទាំងអស់" : "View all"}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {programsCount > 0 ? (
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {activeDetail.programs.slice(0, 4).map(p => (
                                        <div
                                            key={p.id}
                                            className="p-3 rounded-xl border border-border bg-muted/40 flex flex-col justify-between"
                                        >
                                            <p className="font-semibold text-sm font-khmer">
                                                {apiName(p, lang)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                    {p.degree_level}
                                                </Badge>
                                                {p.faculty && <span className="truncate">{p.faculty}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-2 text-center">
                                    <Button asChild variant="outline" className="w-full rounded-xl">
                                        <Link href={`/explore-universities/${id}/programs`}>
                                            {lang === "kh"
                                                ? `ស្វែងយល់កម្មវិធីសិក្សាទាំង ${programsCount} ជំនាញ`
                                                : `Explore all ${programsCount} academic programs`}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                <p>
                                    {lang === "kh"
                                        ? "សូមចូលទៅកាន់ផ្ទាំងកម្មវិធីសិក្សា ដើម្បីពិនិត្យមើលមហាវិទ្យាល័យ និងដេប៉ាតឺម៉ង់។"
                                        : "Check the Programs & Faculties tab to explore unit hierarchy and departments."}
                                </p>
                                <Button asChild variant="outline" className="mt-4 rounded-xl">
                                    <Link href={`/explore-universities/${id}/programs`}>
                                        {lang === "kh" ? "ចូលមើលកម្មវិធីសិក្សា" : "Go to Programs"}
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </SectionLayout>
        </div>
    );
}
