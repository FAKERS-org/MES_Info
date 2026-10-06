import DepartmentHeading from "@/components/department/department-heading";
import type { UniversityHeadingData } from "@/components/department/department-heading";
import type { Lang } from "@/lib/language";

export interface UniversityHeroProps {
    university: UniversityHeadingData;
    lang: Lang;
}

export default function UniversityHero({ university, lang }: UniversityHeroProps) {
    return (
        <div className="w-full max-w-full mt-auto font-sans">
            <DepartmentHeading university={university} lang={lang} />
        </div>
    );
}
