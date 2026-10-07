import { writeFileSync } from "node:fs";
import { universities, type Unit } from "../src/data/universities";

type BlockRow = {
    badge_text: string;
    badge_bg: string | null;
    title: string;
    english_title: string | null;
    credits: string;
    description: string;
    courses: string[];
    special_badge: string | null;
};

type UnitRow = {
    universityNameEn: string;
    slug: string;
    parentSlug: string | null;
    kind: Unit["kind"];
    nameEn: string;
    nameKh: string;
    categoryEn: string;
    categoryKh: string;
    logo: string | null;
    position: number;
    curriculum: {
        headingEn: string;
        headingKh: string;
        bannerText: string | null;
        blocks: BlockRow[];
    } | null;
    facilities: {
        title: string;
        subtitle: string | null;
        description: string;
        image: string;
    }[];
    scholarships: {
        name: { kh: string; en: string };
        coverage: { kh: string; en: string };
        requirements: { kh: string; en: string }[];
    }[];
};

const rows: UnitRow[] = [];

function walk(universityNameEn: string, units: Unit[], parentSlug: string | null) {
    units.forEach((unit, position) => {
        rows.push({
            universityNameEn,
            slug: unit.id,
            parentSlug,
            kind: unit.kind,
            nameEn: unit.name.en,
            nameKh: unit.name.kh,
            categoryEn: unit.category.en,
            categoryKh: unit.category.kh,
            logo: unit.logo ?? null,
            position,
            curriculum: unit.curriculum
                ? {
                      headingEn: unit.curriculum.headingEn,
                      headingKh: unit.curriculum.headingKh,
                      bannerText: unit.curriculum.bannerText ?? null,
                      blocks: unit.curriculum.blocks.map(block => ({
                          badge_text: block.badgeText,
                          badge_bg: block.badgeBg ?? null,
                          title: block.title,
                          english_title: block.englishTitle ?? null,
                          credits: block.credits,
                          description: block.description,
                          courses: block.courses,
                          special_badge: block.specialBadge ?? null,
                      })),
                  }
                : null,
            facilities: (unit.facilities ?? []).map(facility => ({
                title: facility.title,
                subtitle: facility.subtitle ?? null,
                description: facility.description,
                image: facility.image,
            })),
            scholarships: (unit.scholarships ?? []).map(scholarship => ({
                name: scholarship.name,
                coverage: scholarship.coverage,
                requirements: scholarship.requirements,
            })),
        });
        if (unit.units) walk(universityNameEn, unit.units, unit.id);
    });
}

for (const university of universities) {
    walk(university.name.en, university.units, null);
}

writeFileSync("units-export.json", JSON.stringify(rows, null, 2));
console.log(`Exported ${rows.length} units`);
