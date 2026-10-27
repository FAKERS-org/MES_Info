import { Badge } from "@/components/ui/badge";
import type { Lang } from "@/lib/language";
import type { UniversityTuitionSummary } from "@/lib/tuition";
import { Banknote, Sparkles, Wallet } from "lucide-react";

interface TuitionSummaryBannerProps {
    lang: Lang;
    summary: UniversityTuitionSummary;
}

export function TuitionSummaryBanner({ summary, lang }: TuitionSummaryBannerProps) {
    if (summary.model === "UNSET") {
        return null;
    }

    const isKhmer = lang === "kh";

    if (summary.model === "UNIFORM" && summary.uniformAnnualFee != null) {
        return (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4.5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                            <Banknote className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-base text-foreground font-khmer">
                                    {isKhmer ? "តម្លៃសិក្សាស្មើភាពទូទាំងសាកលវិទ្យាល័យ" : "Uniform Annual Tuition"}
                                </h3>
                                <Badge className="bg-primary/10 text-primary border-0 text-xs font-medium">
                                    {isKhmer ? "អត្រាស្មើគ្នាគ្រប់ជំនាញ" : "Flat Rate Across Majors"}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 font-khmer leading-relaxed">
                                {isKhmer
                                    ? "គ្រប់ជំនាញទាំងអស់អនុវត្តតាមតម្លៃសិក្សាប្រចាំឆ្នាំស្មើគ្នា។"
                                    : "All degree programs share the same annual tuition rate."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end shrink-0">
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
                                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 font-khmer">
                                        {isKhmer ? "និស្សិតនារី" : "Female Incentive"}
                                    </span>
                                    {summary.discountPercent != null && (
                                        <Badge className="bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-0 text-xs px-1.5 py-0 font-bold">
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
            <div className="rounded-2xl border border-border bg-card p-4.5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-base text-foreground font-khmer">
                                    {isKhmer ? "តម្លៃសិក្សាតាមជំនាញនីមួយៗ" : "Major-Based Tuition Schedule"}
                                </h3>
                                <Badge className="bg-muted text-muted-foreground border-0 text-xs font-medium">
                                    {isKhmer ? "ប្រែប្រួលតាមជំនាញ" : "Variable by Major"}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 font-khmer leading-relaxed">
                                {isKhmer
                                    ? "តម្លៃសិក្សាប្រែប្រួលទៅតាមមុខជំនាញដែលបានជ្រើសរើស (សូមពិនិត្យតាមជំនាញខាងក្រោម)។"
                                    : "Tuition fees vary depending on the faculty and major chosen."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end shrink-0">
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
                                <Sparkles className="h-3.5 w-3.5" />
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
