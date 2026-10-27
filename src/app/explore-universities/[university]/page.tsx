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
import { apiDescription, apiName, apiOverview } from "@/lib/language";
import { getServerTranslator, readLang } from "@/lib/language.server";
import { universityTabs } from "@/lib/university-tabs";
import {
    ArrowRight,
    Award,
    BadgeCheck,
    BookOpen,
    Building2,
    CalendarDays,
    GraduationCap,
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
    const t = getServerTranslator(lang);
    const uniName = apiName(activeDetail, lang);

    const overview = apiOverview(activeDetail, lang);
    const description = apiDescription(activeDetail, lang);
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
                            telegram={activeDetail.contact_telegram}
                            advisorName={activeDetail.advisor_name}
                            advisorRole={activeDetail.advisor_role}
                            advisorAvatar={activeDetail.advisor_avatar_url}
                        />
                        <BrochureDownloadCard website={activeDetail.website} universityName={uniName} />
                    </div>
                }
            >
                {/* About / Description Card */}
                <Card className="border border-border shadow-xs rounded-2xl bg-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base md:text-lg font-bold flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
                                <Building2 className="h-4.5 w-4.5" />
                            </div>
                            {t("university.aboutTitle")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground leading-relaxed">
                        {overview && (
                            <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
                                {overview}
                            </p>
                        )}
                        {description && description !== overview ? (
                            <div className="whitespace-pre-line text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {description}
                            </div>
                        ) : !overview ? (
                            <p className="text-xs sm:text-sm text-muted-foreground italic">
                                {t("university.noDescription")}
                            </p>
                        ) : null}
                    </CardContent>
                </Card>

                {/* Information Preparation Grid (Key Institutional Facts) */}
                <Card className="border border-border shadow-xs rounded-2xl bg-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base md:text-lg font-bold">
                            {t("university.keyInfo")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                                    <BadgeCheck className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-khmer">
                                        {t("university.accreditation")}
                                    </p>
                                    <p className="font-semibold text-xs sm:text-sm text-foreground">
                                        {activeDetail.moeys_accredited
                                            ? t("university.accreditedMoEYS")
                                            : t("university.standardRecognition")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-khmer">
                                        {t("university.provinceCity")}
                                    </p>
                                    <p className="font-semibold text-xs sm:text-sm text-foreground">
                                        {activeDetail.province || t("university.phnomPenh")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                                    <CalendarDays className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-khmer">
                                        {t("university.establishedYear")}
                                    </p>
                                    <p className="font-semibold text-xs sm:text-sm text-foreground">
                                        {activeDetail.established_year
                                            ? `${t("miscellaneous.established")} ${activeDetail.established_year}`
                                            : t("university.notSpecified")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                                    <Home className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-khmer">
                                        {t("university.dormitory")}
                                    </p>
                                    <p className="font-semibold text-xs sm:text-sm text-foreground">
                                        {activeDetail.has_dormitory
                                            ? activeDetail.dormitory_details || t("university.dormitoryAvailable")
                                            : t("university.noDormitory")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Pathways Hub */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Link
                        href={`/explore-universities/${id}/admissions`}
                        className="group p-4 rounded-2xl border border-border bg-card hover:bg-muted/40 transition-all flex items-center justify-between shadow-xs"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform shrink-0">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground font-khmer">
                                    {t("university.admissionRoadmapTitle")}
                                </p>
                                <p className="text-xs text-muted-foreground font-khmer">
                                    {t("university.admissionRoadmapDesc")}
                                </p>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>

                    <Link
                        href={`/explore-universities/${id}/scholarships`}
                        className="group p-4 rounded-2xl border border-border bg-card hover:bg-muted/40 transition-all flex items-center justify-between shadow-xs"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform shrink-0">
                                <Award className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground font-khmer">
                                    {t("university.scholarshipsTitle")}
                                </p>
                                <p className="text-xs text-muted-foreground font-khmer">
                                    {activeDetail.has_scholarships
                                        ? t("university.scholarshipsAvailable")
                                        : t("university.scholarshipsInquire")}
                                </p>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>

                {/* Programs Quick Access Card */}
                <Card className="border border-border shadow-sm rounded-2xl bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                            {t("university.academicPrograms")}
                            {programsCount > 0 && (
                                <Badge variant="secondary" className="ml-2 font-semibold">
                                    {programsCount}
                                </Badge>
                            )}
                        </CardTitle>
                        <Button asChild variant="ghost" size="sm" className="gap-1 text-sky-600 dark:text-sky-400">
                            <Link href={`/explore-universities/${id}/programs`}>
                                {t("university.viewAll")}
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
                                            {t("university.exploreAllPrograms", { count: programsCount })}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                <p>
                                    {t("university.exploreProgramsHint")}
                                </p>
                                <Button asChild variant="outline" className="mt-4 rounded-xl">
                                    <Link href={`/explore-universities/${id}/programs`}>
                                        {t("university.goToPrograms")}
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
