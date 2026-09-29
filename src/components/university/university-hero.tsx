import DepartmentHeading from "@/components/department/department-heading";
import type { University } from "@/data/universities";
import type { Lang } from "@/lib/language";

export interface UniversityHeroProps {
    university: University;
    lang: Lang;
}

/**
 * The hero of the university page. The markup lives in
 * `department-heading.tsx` — the two were the same component with ITC typed
 * into both, so this is now just the entry point that omits `unit`.
 */
export default function UniversityHero({ university, lang }: UniversityHeroProps) {
    return (
        <div className="w-full max-w-full mt-auto font-sans">
            <DepartmentHeading university={university} lang={lang} />
        </div>
    );
}
