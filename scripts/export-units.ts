import { writeFileSync } from "node:fs";
import { universities, type Unit } from "../src/data/universities";

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
        });
        if (unit.units) walk(universityNameEn, unit.units, unit.id);
    });
}

for (const university of universities) {
    walk(university.name.en, university.units, null);
}

writeFileSync("units-export.json", JSON.stringify(rows, null, 2));
console.log(`Exported ${rows.length} units`);
