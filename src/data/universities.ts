import type { components } from "@/lib/api/schema";

// ─── Shared primitive types ─────────────────────────────────────────────────

export interface NamespacedText {
    kh: string;
    en: string;
}

/** What a Unit is at its own level. */
export type UnitKind =
    | "faculty"
    | "department"
    | "sub-department"
    | "foundation"
    | "institute"
    | "school"
    | "college"
    | "center"
    | "academy"
    | "division"
    | "other";

/** A single curriculum block, rendered as one card. */
export interface CurriculumBlock {
    badgeText: string;
    badgeBg?: string;
    title: string;
    englishTitle?: string;
    credits: string;
    description: string;
    courses: string[];
    specialBadge?: string;
}

/** A group of curriculum blocks with its own heading. */
export interface CurriculumSection {
    headingKh: string;
    headingEn: string;
    bannerText?: string;
    blocks: CurriculumBlock[];
}

/**
 * One card of the facilities strip.
 */
export interface Facility {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    image: string;
}

/** How to reach the admissions desk. */
export interface UniversityContact {
    phone?: string;
    email?: string;
    telegram?: string;
}

export interface UnitScholarship {
    id: string;
    name: NamespacedText;
    /** What it covers, already formatted for display ("50% of tuition"). */
    coverage: NamespacedText;
    requirements: NamespacedText[];
}

/** The fact row of the hero. */
export interface UniversityStats {
    students?: string;
    tuition?: string;
    established?: string;
    programsCount?: number;
    shifts?: string[];
}

// ─── The recursive Unit ─────────────────────────────────────────────────────

export interface Unit {
    id: string;
    kind: UnitKind;
    name: NamespacedText;
    category: NamespacedText;
    logo?: string;
    is_autonomous?: boolean;
    acronym?: string;
    requirements: NamespacedText[];
    curriculum?: CurriculumSection;
    facilities?: Facility[];
    scholarships?: UnitScholarship[];
    units?: Unit[];
    programs?: components["schemas"]["ProgramSummary"][];
    defaultTuition?: number;
    defaultTuitionFemale?: number;
}

export interface University {
    id: string;
    name: NamespacedText;
    universityType: NamespacedText;
    universityCategory: NamespacedText;
    description: NamespacedText;
    logo?: string;
    website?: string;
    address?: NamespacedText;
    embedMapUrl?: string;
    contact?: UniversityContact;
    stats?: UniversityStats;
    units: Unit[];
}
