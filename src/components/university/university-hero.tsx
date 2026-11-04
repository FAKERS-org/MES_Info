import UnitHeading from "@/components/unit/unit-heading";
import type { UniversityHeadingData } from "@/components/unit/unit-heading";
import type { Lang } from "@/lib/language";

export interface UniversityHeroProps {
    university: UniversityHeadingData;
    lang: Lang;
}

export default function UniversityHero({ university, lang }: UniversityHeroProps) {
    return (
        <div className="w-full max-w-full mt-auto font-sans">
            <UnitHeading university={university} lang={lang} />
        </div>
    );
}
