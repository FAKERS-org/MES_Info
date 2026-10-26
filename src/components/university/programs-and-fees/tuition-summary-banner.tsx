import { Badge } from "@/components/ui/badge";
import type { Lang } from "@/lib/language";
import type { UniversityTuitionSummary } from "@/lib/tuition";
import { Coins, Sparkles, Wallet } from "lucide-react";

interface TuitionSummaryBannerProps {
    summary: UniversityTuitionSummary;
    lang: Lang;
}

export function TuitionSummaryBanner({ summary, lang }: TuitionSummaryBannerProps) {
    if (summary.model === "UNSET") {
        return null;
    }

    const isKhmer = lang === "kh";

    if (summary.model === "UNIFORM" && summary.uniformAnnualFee != null) {
        return (
            <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/20 p-5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 shrink-0">
                            <Coins className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-base text-foreground font-khmer">
                                    {isKhmer ? "តម្លៃសិក្សាស្មើភាពទូទាំងសាកលវិទ្យាល័យ" : "Uniform Annual Tuition"}
                                </h3>
                                <Badge className="bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 border-0 text-[11px] font-semibold">
                                    {isKhmer ? "អត្រាស្មើគ្នាគ្រប់ជំនាញ" : "Flat Rate Across Majors"}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 font-khmer">
                                {isKhmer
                                    ? "គ្រប់ជំនាញទាំងអស់អនុវត្តតាមតម្លៃសិក្សាប្រចាំឆ្នាំស្មើគ្នា។"
                                    : "All degree programs share the same annual tuition rate."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        <div className="text-left md:text-right">
                            <span className="text-xs text-muted-foreground block font-khmer">
                                {summary.femaleAnnualFee != null ? (isKhmer ? "ទូទៅ / បុរស" : "Standard") : isKhmer ? "តម្លៃសិក្សា" : "Annual Tuition"}
                            </span>
                            <span className="text-lg font-bold text-foreground">
                                ${summary.uniformAnnualFee} <span className="text-xs font-normal text-muted-foreground">{isKhmer ? "/ ឆ្នាំ" : "/ yr"}</span>
                            </span>
                        </div>

                        {summary.femaleAnnualFee != null && (
                            <div className="pl-3 border-l border-border text-left md:text-right">
                                <div className="flex items-center gap-1.5 justify-start md:justify-end">
                                    <span className="text-xs font-medium text-rose-600 dark:text-rose-400 font-khmer">
                                        {isKhmer ? "និស្សិតនារី" : "Female Incentive"}
                                    </span>
                                    {summary.discountPercent != null && (
                                        <Badge className="bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-0 text-[10px] px-1.5 py-0 font-bold">
                                            -{summary.discountPercent}%
                                        </Badge>
                                    )}
                                </div>
                                <span className="text-lg font-bold text-rose-600 dark:text-rose-400">
                                    ${summary.femaleAnnualFee} <span className="text-xs font-normal text-muted-foreground">{isKhmer ? "/ ឆ្នាំ" : "/ yr"}</span>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (summary.model === "VARIABLE" && summary.minFee != null && summary.maxFee != null) {
        return (
            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shrink-0">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-base text-foreground font-khmer">
                                    {isKhmer ? "តម្លៃសិក្សាតាមជំនាញនីមួយៗ" : "Major-Based Tuition Schedule"}
                                </h3>
                                <Badge className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-0 text-[11px] font-semibold">
                                    {isKhmer ? "ប្រែប្រួលតាមជំនាញ" : "Variable by Major"}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 font-khmer">
                                {isKhmer
                                    ? "តម្លៃសិក្សាប្រែប្រួលទៅតាមមុខជំនាញដែលបានជ្រើសរើស (សូមពិនិត្យតាមជំនាញខាងក្រោម)។"
                                    : "Tuition fees vary depending on the faculty and major chosen."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        <div className="text-left md:text-right">
                            <span className="text-xs text-muted-foreground block font-khmer">
                                {isKhmer ? "ចន្លោះតម្លៃសិក្សា" : "Annual Fee Range"}
                            </span>
                            <span className="text-lg font-bold text-foreground">
                                ${summary.minFee} – ${summary.maxFee} <span className="text-xs font-normal text-muted-foreground">{isKhmer ? "/ ឆ្នាំ" : "/ yr"}</span>
                            </span>
                        </div>

                        {summary.hasFemaleDiscountInPrograms && (
                            <Badge className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs py-1 px-2.5 font-khmer flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                {isKhmer ? "មានការបញ្ចុះតម្លៃសម្រាប់នារីលើជំនាញមួយចំនួន" : "Female discount on select majors"}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
