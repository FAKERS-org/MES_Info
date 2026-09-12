import type { TranslationKey } from "@/lib/i18n";

export interface Department {
  id: string;
  nameKey: TranslationKey;
  enNameKey: TranslationKey;
  categoryKey: TranslationKey;
  logo: string;
  requirementKeys: TranslationKey[];
}

export interface University {
  id: string;
  nameKey: TranslationKey;
  descriptionKey: TranslationKey;
  logo: string;
  website?: string;
  address?: string;
  departments: Department[];
}

export const universities: University[] = [
  {
    id: "itc",
    nameKey: "overview.universities.itc",
    descriptionKey: "info.about.institutions.itc",
    logo: "/images/ITC-logo.png",
    website: "itc.edu.kh",
    address: "Russian Federation Blvd., Toul Kork District, Phnom Penh",
    departments: [
      {
        id: "gic",
        nameKey: "departments.itc.gic.name",
        enNameKey: "departments.itc.gic.enName",
        categoryKey: "departments.categories.engineering",
        logo: "/images/GIC-logo.png",
        requirementKeys: [
          "departments.itc.gic.req.1",
          "departments.itc.gic.req.2",
          "departments.itc.gic.req.3",
          "departments.itc.gic.req.4",
          "departments.itc.gic.req.5",
        ],
      },
    ],
  },
  {
    id: "usha",
    nameKey: "overview.universities.usha",
    descriptionKey: "info.about.institutions.uhs",
    logo: "/images/UHS-logo.png",
    website: "uhs.edu.kh",
    address: "Phnom Penh, Cambodia",
    departments: [],
  },
  {
    id: "rupp",
    nameKey: "overview.universities.rupp",
    descriptionKey: "info.about.institutions.rupp",
    logo: "/images/RUPP-logo.png",
    website: "rupp.edu.kh",
    address: "Phnom Penh, Cambodia",
    departments: [],
  },
  {
    id: "ifl",
    nameKey: "overview.universities.ifl",
    descriptionKey: "info.about.institutions.ifl",
    logo: "/images/IFL-logo.png",
    website: "ifl.rupp.edu.kh",
    address: "Phnom Penh, Cambodia",
    departments: [],
  },
];

export const universityLabels: Record<string, TranslationKey> = Object.fromEntries(
  universities.map((university) => [university.id, university.nameKey]),
);