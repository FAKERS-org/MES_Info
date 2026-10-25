import { SectionLayout } from "@/components/shared/section-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CampusSwitcher from "@/components/university/campus-switcher";
import AdmissionsContactCard from "@/components/university/contact-card";
import BrochureDownloadCard from "@/components/university/programs-and-fees/brochure-download-card";
import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import { getUniversityDetail, toHeadingData } from "@/lib/api/universities";
import { apiName } from "@/lib/language";
import { getServerTranslator, readLang } from "@/lib/language.server";
import { universityTabs } from "@/lib/university-tabs";
import { Award, CheckCircle2, Info } from "lucide-react";
import { notFound } from "next/navigation";

interface ScholarshipsPageProps {
    params: Promise<{ university: string }>;
    searchParams?: Promise<{ campus?: string }>;
}

export default async function UniversityScholarshipsPage({ params, searchParams }: ScholarshipsPageProps) {
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
    const scholarships = activeDetail.scholarships ?? [];

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
                {/* Scholarship Overview Banner */}
                <Card className="border border-sky-100 dark:border-sky-900/40 bg-gradient-to-br from-sky-50/70 to-card dark:from-sky-950/20 dark:to-card shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-sky-100 dark:bg-sky-900/50 rounded-xl text-sky-700 dark:text-sky-300">
                                <Award className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-xl font-bold text-foreground">
                                    {t("university.scholarshipsHeading")}
                                </h1>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {activeDetail.scholarship_info ||
                                        t("university.scholarshipsDefaultInfo", { name: uniName })}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Scholarships List */}
                {scholarships.length > 0 ? (
                    <div className="space-y-4">
                        {scholarships.map(sch => {
                            const name = lang === "kh" ? sch.name_kh || sch.name_en : sch.name_en;
                            const coverage =
                                lang === "kh"
                                    ? sch.coverage_kh || sch.coverage_en
                                    : sch.coverage_en || sch.coverage_kh;

                            return (
                                <Card key={sch.id} className="border border-border shadow-sm rounded-2xl bg-card">
                                    <CardHeader className="pb-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <CardTitle className="text-lg font-bold text-foreground font-khmer">
                                                {name}
                                            </CardTitle>
                                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 border-0 font-semibold px-3 py-1 text-xs w-fit">
                                                {coverage}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    {sch.requirements && sch.requirements.length > 0 && (
                                        <CardContent className="space-y-2 pt-0">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                {t("university.requirementsLabel")}
                                            </p>
                                            <ul className="space-y-1.5 text-sm text-foreground">
                                                {sch.requirements.map((req: any, idx: number) => {
                                                    const reqText =
                                                        typeof req === "string"
                                                            ? req
                                                            : (lang === "kh" ? req?.kh || req?.en : req?.en || req?.kh) ||
                                                              JSON.stringify(req);
                                                    return (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <CheckCircle2 className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                                                            <span>{reqText}</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </CardContent>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card className="border border-border shadow-sm rounded-2xl bg-card p-8 text-center">
                        <div className="max-w-md mx-auto space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                                <Info className="h-6 w-6" />
                            </div>
                            <h2 className="text-base font-semibold text-foreground">
                                {t("university.noScholarshipsTitle")}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {activeDetail.has_scholarships
                                    ? t("university.scholarshipsAvailableNotice")
                                    : t("university.scholarshipsInquireNotice")}
                            </p>
                        </div>
                    </Card>
                )}
            </SectionLayout>
        </div>
    );
}
