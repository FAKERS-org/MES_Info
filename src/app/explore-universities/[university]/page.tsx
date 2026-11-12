import { SectionLayout } from "@/components/shared/section-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CampusSwitcher from "@/components/university/campus-switcher";
import MetadataRenderer from "@/components/shared/metadata-renderer";
import BrochureDownloadCard from "@/components/university/brochure-download-card";
import CampusMapCard from "@/components/university/campus-map-card";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import { getUniversityDetail, toHeadingData } from "@/lib/api/universities";
import { apiDescription, apiName, apiOverview } from "@/lib/language";
import { getServerTranslator, readLang } from "@/lib/language.server";
import { universityTabs } from "@/lib/university-tabs";
import { ArrowRight, BookOpen, Building2 } from "lucide-react";
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

    const meta = (activeDetail.metadata_json as Record<string, unknown> | null | undefined) ?? {};
    const reservedKeys = new Set([
        "bac2_waivers", "bac2_discounts", "merit_waivers",
        "foundation_year", "foundation_year_fee", "foundation_year_economics",
        "admission_requirements", "special_admissions", "admissions_criteria",
    ]);
    const asideMeta = Object.fromEntries(
        Object.entries(meta).filter(([k]) => !reservedKeys.has(k))
    );

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
                        <MetadataRenderer
                            data={asideMeta}
                            title="University Details & Admissions Contact"
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
