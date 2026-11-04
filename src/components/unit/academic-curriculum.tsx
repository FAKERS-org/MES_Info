import type { CurriculumSection } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { Laptop } from "lucide-react";

export interface AcademicCurriculumProps {
    curriculum: CurriculumSection;
    lang: Lang;
}

const AcademicCurriculum = ({ curriculum, lang }: AcademicCurriculumProps) => {
    return (
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-2 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="p-6 md:p-8 bg-card rounded-2xl font-sans">
                {/* --- Header Section --- */}
                <div className="flex items-start gap-3.5 mb-6">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Laptop className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-base md:text-xl font-bold text-foreground leading-tight mb-0.5">
                            {lang === "en" ? curriculum.headingEn : curriculum.headingKh}
                        </h1>
                        <p className="text-xs md:text-sm text-muted-foreground">
                            {lang === "en" ? curriculum.headingKh : curriculum.headingEn}
                        </p>
                    </div>
                </div>

                {/* --- Practical Labs Banner --- */}
                {curriculum.bannerText && (
                    <div className="flex items-center gap-2 mb-6 bg-muted/60 border border-border px-3.5 py-2 rounded-xl w-fit shadow-xs">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs md:text-sm font-semibold text-foreground">{curriculum.bannerText}</span>
                    </div>
                )}

                {/* --- Curriculum Blocks --- */}
                <div className="space-y-4">
                    {curriculum.blocks.map(block => (
                        <div
                            key={`${block.badgeText}-${block.title}`}
                            className="bg-card rounded-2xl p-5 md:p-6 shadow-xs border border-border"
                        >
                            {/* Block Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 mb-3">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span
                                        className={`${block.badgeBg ?? "bg-primary"} text-primary-foreground text-xs font-semibold px-2.5 py-0.5 rounded-md`}
                                    >
                                        {block.badgeText}
                                    </span>
                                    <h2 className="text-sm md:text-base font-bold text-foreground">
                                        {block.title}{" "}
                                        {block.englishTitle && (
                                            <span className="font-medium text-muted-foreground">{block.englishTitle}</span>
                                        )}
                                    </h2>
                                </div>
                                <span className="text-xs md:text-sm font-semibold text-muted-foreground whitespace-nowrap">
                                    {block.credits}
                                </span>
                            </div>

                            {/* Block Description */}
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">{block.description}</p>

                            {/* Course Tags */}
                            <div className="flex flex-wrap gap-2">
                                {block.courses.map(course => (
                                    <span
                                        key={course}
                                        className="bg-muted border border-border text-foreground text-xs font-medium px-3 py-1.5 rounded-lg"
                                    >
                                        {course}
                                    </span>
                                ))}

                                {/* Special Badge */}
                                {block.specialBadge && (
                                    <span className="bg-[#0F4C81] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                        {block.specialBadge}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AcademicCurriculum;
