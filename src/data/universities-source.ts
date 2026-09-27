/**
 * How a school is looked up, and how the admin's own payload is turned into the
 * {@link University} shape the pages render.
 *
 * The detail pages used to import the bundled seed array directly, so every
 * school had to be hand-written into `universities.ts` before it could appear.
 * This module is the single seam: pages ask it for a school instead of reading
 * the seed, and `normalizeUniversity` turns any record in the admin's shape
 * into something they can render. Nothing here fetches — the list still comes
 * from the seed — so a school can be added, changed or removed without any
 * page knowing where the list came from.
 *
 * The payload types below are the subset of `src/lib/api/schema.d.ts` the
 * normaliser reads, written out by hand: the generated schema nests
 * `components` inside the `openapi` const and exports no standalone type for
 * it. They are here so the contract is written down even though no request is
 * made yet — see the note on {@link listUniversities} for where a real read
 * would go.
 */

import { universities as seededUniversities } from "./universities";
import type { Department, NamespacedText, University } from "./universities";

/* `DegreeLevel` and `UniversityType` from the generated schema. */
type ApiDegreeLevel = "DIPLOMA" | "ASSOCIATE" | "BACHELOR" | "MASTER" | "PHD";
type ApiUniversityType = "PUBLIC" | "PRIVATE";

export interface ApiProgram {
    id: string;
    name_en: string;
    name_kh?: string | null;
    faculty?: string | null;
    degree_level?: ApiDegreeLevel | null;
    duration_years?: number | null;
    tuition_fee?: number | null;
    fee_currency?: "USD" | "KHR";
    overview_en?: string | null;
    overview_kh?: string | null;
    /**
     * Present on `ProgramCreate` / `ProgramUpdate` only — see the note on
     * {@link splitRequirementLines}.
     */
    admission_req_en?: string | null;
    admission_req_kh?: string | null;
}

export interface ApiUniversity {
    id: string;
    name_en: string;
    name_kh?: string | null;
    abbreviation?: string | null;
    type: ApiUniversityType;
    province: string;
    logo_url?: string | null;
    moeys_accredited: boolean;
    established_year?: number | null;
    address?: string | null;
    website?: string | null;
    overview_en?: string | null;
    overview_kh?: string | null;
    has_scholarships: boolean;
    scholarship_info?: string | null;
    has_dormitory: boolean;
    dormitory_details?: string | null;
    programs?: ApiProgram[] | null;
}

/* ------------------------------------------------------------------ *
 * Labels                                                              *
 * ------------------------------------------------------------------ */

const UNIVERSITY_TYPE_LABEL: Record<ApiUniversityType, NamespacedText> = {
    PUBLIC: { kh: "សាធារណៈ", en: "Public" },
    PRIVATE: { kh: "ឯកជន", en: "Private" },
};

const DEGREE_LEVEL_LABEL: Record<ApiDegreeLevel, NamespacedText> = {
    DIPLOMA: { kh: "សញ្ញាបត្រ", en: "Diploma" },
    ASSOCIATE: { kh: "បុណ្យបទ", en: "Associate" },
    BACHELOR: { kh: "បុណ្យសាស្ត្រ", en: "Bachelor" },
    MASTER: { kh: "មុខណ្យ", en: "Master" },
    PHD: { kh: "បរិកិលា", en: "PhD" },
};

/** Shown when a school has not told us what kind of school it is. */
const MIXED_DEGREE_LABEL: NamespacedText = { kh: "គ្រប់កម្រិត", en: "All levels" };

/** The same string in both languages, for a field the API sends untranslated. */
function both(text: string): NamespacedText {
    return { kh: text, en: text };
}

/* ------------------------------------------------------------------ *
 * Free text → list                                                    *
 * ------------------------------------------------------------------ */

/**
 * The admin writes a program's requirements as one free-text field while the
 * page renders a list, so the text is split on line breaks — including the
 * literal `\n` some databases store — and on the bullet or numbering marker
 * each line starts with.
 *
 * NOTE: today's *read* schemas carry no `admission_req_*` at all
 * (`ProgramSummary`, which both public endpoints return, omits them; the
 * fields exist only on `ProgramCreate` / `ProgramUpdate`). With the backend as
 * it stands this returns an empty list and the requirements card shows its own
 * "not published yet" state. It is here so the page is already correct the
 * moment the fields reach the read schema.
 */
export function splitRequirementLines(text: string | null | undefined): string[] {
    if (!text) return [];

    return text
        .replace(/\\n/g, "\n")
        .split(/\r?\n/)
        .map(line => line.replace(/^\s*(?:[-*•·‣▪–—]\s+|\d+[.)]\s*)/, "").trim())
        .filter(line => line.length > 0);
}

/**
 * Pairs the Khmer and English requirement lists line by line. The two fields
 * are written independently, so a line that has only one side borrows the
 * other: a requirement row is never blank, and an untranslated row shows in
 * the language it was actually written in.
 */
export function pairRequirements(
    kh: string | null | undefined,
    en: string | null | undefined,
): NamespacedText[] {
    const khmer = splitRequirementLines(kh);
    const english = splitRequirementLines(en);
    const count = Math.max(khmer.length, english.length);

    return Array.from({ length: count }, (_, index) => ({
        kh: khmer[index] ?? english[index] ?? "",
        en: english[index] ?? khmer[index] ?? "",
    }));
}

/* ------------------------------------------------------------------ *
 * Normalisation                                                       *
 * ------------------------------------------------------------------ */

/**
 * The level most of the school's programs sit at — the API has no category
 * field, and a school offering mostly master's programmes is better described
 * by that than by a blank tag.
 */
function commonDegreeLabel(programs: ApiProgram[]): NamespacedText {
    const tally = new Map<ApiDegreeLevel, number>();

    for (const program of programs) {
        const level = program.degree_level;
        if (!level) continue;
        tally.set(level, (tally.get(level) ?? 0) + 1);
    }

    const top = [...tally.entries()].sort((a, b) => b[1] - a[1])[0];
    if (!top) return MIXED_DEGREE_LABEL;
    if (tally.size > 1) return MIXED_DEGREE_LABEL;
    return DEGREE_LEVEL_LABEL[top[0]];
}

function normalizeProgram(program: ApiProgram, university: ApiUniversity): Department {
    return {
        id: program.id,
        name: { kh: program.name_kh || program.name_en, en: program.name_en },
        /* The API has no unit taxonomy: a program is listed under its faculty
         * exactly as the school writes it. */
        kind: "department",
        faculty: program.faculty ? both(program.faculty) : undefined,
        category: program.degree_level
            ? DEGREE_LEVEL_LABEL[program.degree_level]
            : MIXED_DEGREE_LABEL,
        /* Programs carry no artwork of their own, so they wear the school's. */
        logo: university.logo_url ?? undefined,
        requirements: pairRequirements(program.admission_req_kh, program.admission_req_en),
    };
}

/** An admin-created university in the shape the pages render. */
export function normalizeUniversity(raw: ApiUniversity): University {
    const programs = raw.programs ?? [];

    return {
        /* The API ids are UUIDs; they are still a usable route segment. */
        id: raw.id,
        name: { kh: raw.name_kh || raw.name_en, en: raw.name_en },
        universityType: UNIVERSITY_TYPE_LABEL[raw.type] ?? both(raw.type),
        universityCategory: commonDegreeLabel(programs),
        description: {
            kh: raw.overview_kh || raw.name_en,
            en: raw.overview_en || raw.name_en,
        },
        logo: raw.logo_url ?? undefined,
        website: raw.website ?? undefined,
        /* One address string, so it is shown in whichever language is active. */
        address: raw.address ? both(raw.address) : undefined,
        departments: programs.map(program => normalizeProgram(program, raw)),
    };
}

/* ------------------------------------------------------------------ *
 * Read                                                                *
 * ------------------------------------------------------------------ */

/**
 * Every school.
 *
 * This is the only line a real backend read would replace: swap the seed for a
 * `GET /public/universities/` and map the result through
 * {@link normalizeUniversity}. The function is already `async` and every caller
 * already awaits it, so that change needs no edits anywhere else.
 *
 * It stays `async` even though the seed is in memory, precisely so adding the
 * read later is a one-line change rather than a refactor of every page.
 */
export async function listUniversities(): Promise<University[]> {
    return seededUniversities;
}

/**
 * One school, or `undefined` when there is no such school — which the callers
 * turn into `notFound()`.
 */
export async function findUniversity(id: string): Promise<University | undefined> {
    return seededUniversities.find(university => university.id === id);
}
