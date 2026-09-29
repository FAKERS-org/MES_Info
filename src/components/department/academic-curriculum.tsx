import type { CurriculumSection } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { Laptop } from "lucide-react";

export interface AcademicCurriculumProps {
    curriculum: CurriculumSection;
    lang: Lang;
}

/**
 * The curriculum cards of a unit. The three blocks it used to declare inline
 * were a hand copy of the faculty's curriculum in the data file, so a unit
 * without one of its own showed the faculty's blocks under its own heading —
 * and any edit to the real data never reached this card. The blocks now come
 * from the page, already resolved through `getCurriculumFor`, so this file
 * renders what it is given and holds no curriculum of its own.
 */
const AcademicCurriculum = ({ curriculum, lang }: AcademicCurriculumProps) => {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 bg-slate-50/50 rounded-2xl font-sans">
            {/* --- Header Section --- */}
            <div className="flex items-start gap-4 mb-8">
                <div className="bg-sky-100 p-3 rounded-xl shrink-0 mt-1 text-[#0F4C81]">
                    <Laptop className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#0B1F3A] leading-tight mb-1">
                        {lang === "en" ? curriculum.headingEn : curriculum.headingKh}
                    </h1>
                    <p className="text-sm text-slate-500">
                        {lang === "en" ? curriculum.headingKh : curriculum.headingEn}
                    </p>
                </div>
            </div>

            {/* --- Practical Labs Banner --- */}
            {curriculum.bannerText && (
                <div className="flex items-center gap-2 mb-6 bg-white border border-slate-100 px-4 py-3 rounded-xl w-fit shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    <span className="text-sm font-semibold text-slate-700">{curriculum.bannerText}</span>
                </div>
            )}

            {/* --- Curriculum Blocks --- */}
            <div className="space-y-4">
                {curriculum.blocks.map(block => (
                    <div
                        key={`${block.badgeText}-${block.title}`}
                        className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] border border-slate-100"
                    >
                        {/* Block Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 mb-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`${block.badgeBg ?? "bg-[#0F4C81]"} text-white text-xs font-bold px-3 py-1 rounded-md`}>
                                    {block.badgeText}
                                </span>
                                <h2 className="text-[15px] md:text-base font-bold text-[#0B1F3A]">
                                    {block.title}{" "}
                                    {block.englishTitle && (
                                        <span className="font-medium text-slate-500">{block.englishTitle}</span>
                                    )}
                                </h2>
                            </div>
                            <span className="text-sm font-bold text-slate-500 whitespace-nowrap">{block.credits}</span>
                        </div>

                        {/* Block Description */}
                        <p className="text-[13px] text-slate-500 leading-relaxed mb-5">{block.description}</p>

                        {/* Course Tags */}
                        <div className="flex flex-wrap gap-2">
                            {block.courses.map(course => (
                                <span
                                    key={course}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg"
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
    );
};

export default AcademicCurriculum;
