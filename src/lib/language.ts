import { LANGUAGE_CONFIG } from "@/config";
import type { NamespacedText } from "@/data/universities";

/** The languages the UI ships. */
export type Lang = (typeof LANGUAGE_CONFIG.supportedLanguages)[number];

/**
 * Cookie holding the language choice. Named after
 * {@link LANGUAGE_CONFIG.storageKey} so the existing setting and this one are
 * the same knob.
 */
export const LANG_COOKIE = LANGUAGE_CONFIG.storageKey;

/** A year: reading language is a durable preference, not a session setting. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function resolveLang(value: unknown): Lang {
    return LANGUAGE_CONFIG.supportedLanguages.includes(value as Lang)
        ? (value as Lang)
        : LANGUAGE_CONFIG.defaultLanguage;
}

export function langAttributes(lang: Lang): { htmlLang: string; fontStack: string } {
    return {
        htmlLang: lang === "en" ? "en" : "km",
        fontStack: lang === "en" ? "var(--font-lexend)" : "var(--font-sans)",
    };
}

export function localize(text: NamespacedText | undefined, lang: Lang): string {
    if (!text) return "";
    return text[lang] || text.en;
}

export function apiName(row: { name_en: string; name_kh?: string | null }, lang: Lang): string {
    return lang === "kh" ? row.name_kh || row.name_en : row.name_en;
}

/** Bilingual overview from the API; English fallback, `undefined` when absent. */
export function apiOverview(
    row: { overview_en?: string | null; overview_kh?: string | null },
    lang: Lang,
): string | undefined {
    return lang === "kh"
        ? row.overview_kh || row.overview_en || undefined
        : row.overview_en || undefined;
}

/** Bilingual description or overview from the API. */
export function apiDescription(
    row: {
        description_en?: string | null;
        description_kh?: string | null;
        overview_en?: string | null;
        overview_kh?: string | null;
    },
    lang: Lang,
): string | undefined {
    const desc =
        lang === "kh"
            ? row.description_kh || row.description_en
            : row.description_en || row.description_kh;
    return desc || apiOverview(row, lang);
}

export type Ministry = "MOEYS" | "MLVT" | "MOH" | "MAFF" | "MPTC" | "MCFA" | "MEF" | "OTHER";

export const MINISTRIES: Ministry[] = [
    "MOEYS",
    "MLVT",
    "MOH",
    "MAFF",
    "MPTC",
    "MCFA",
    "MEF",
    "OTHER",
];

export const MINISTRY_LABELS: Record<Ministry, { en: string; kh: string; short: string }> = {
    MOEYS: {
        short: "MoEYS",
        en: "Ministry of Education, Youth and Sport",
        kh: "ក្រសួងអប់រំ យុវជន និងកីឡា",
    },
    MLVT: {
        short: "MLVT",
        en: "Ministry of Labour and Vocational Training",
        kh: "ក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ",
    },
    MOH: {
        short: "MOH",
        en: "Ministry of Health",
        kh: "ក្រសួងសុខាភិបាល",
    },
    MAFF: {
        short: "MAFF",
        en: "Ministry of Agriculture, Forestry and Fisheries",
        kh: "ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ",
    },
    MPTC: {
        short: "MPTC",
        en: "Ministry of Post and Telecommunications",
        kh: "ក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍",
    },
    MCFA: {
        short: "MCFA",
        en: "Ministry of Culture and Fine Arts",
        kh: "ក្រសួងវប្បធម៌ និងវិចិត្រសិល្បៈ",
    },
    MEF: {
        short: "MEF",
        en: "Ministry of Economy and Finance",
        kh: "ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ",
    },
    OTHER: {
        short: "Other",
        en: "Other / Private Independent",
        kh: "ផ្សេងៗ",
    },
};

export function getMinistryLabel(ministry: Ministry | string | undefined | null, lang: Lang) {
    if (!ministry || !(ministry in MINISTRY_LABELS)) return null;
    const item = MINISTRY_LABELS[ministry as Ministry];
    return {
        short: item.short,
        full: lang === "kh" ? item.kh : item.en,
    };
}

export type StudyShift = "MORNING" | "AFTERNOON" | "EVENING" | "WEEKEND";

export const STUDY_SHIFTS: StudyShift[] = ["MORNING", "AFTERNOON", "EVENING", "WEEKEND"];

export const STUDY_SHIFT_LABELS: Record<StudyShift, { en: string; kh: string; time: string }> = {
    MORNING: {
        en: "Morning",
        kh: "ព្រឹក",
        time: "07:30 - 11:00",
    },
    AFTERNOON: {
        en: "Afternoon",
        kh: "រសៀល",
        time: "13:30 - 17:00",
    },
    EVENING: {
        en: "Evening",
        kh: "យប់",
        time: "17:30 - 20:30",
    },
    WEEKEND: {
        en: "Weekend",
        kh: "ចុងសប្តាហ៍",
        time: "Sat PM + Sun",
    },
};

export function getStudyShiftLabel(shift: StudyShift | string | undefined | null, lang: Lang) {
    if (!shift || !(shift in STUDY_SHIFT_LABELS)) return null;
    const item = STUDY_SHIFT_LABELS[shift as StudyShift];
    return {
        label: lang === "kh" ? item.kh : item.en,
        time: item.time,
    };
}

export type DegreeLevel = "DIPLOMA" | "ASSOCIATE" | "BACHELOR" | "ENGINEERING" | "MASTER" | "PHD";

export const DEGREE_LABELS: Record<string, { en: string; kh: string }> = {
    DIPLOMA: { en: "Diploma", kh: "វិញ្ញាបនបត្រ" },
    ASSOCIATE: { en: "Associate", kh: "បរិញ្ញាបត្ររង" },
    BACHELOR: { en: "Bachelor", kh: "បរិញ្ញាបត្រ" },
    ENGINEERING: { en: "Engineering", kh: "វិស្វករ" },
    MASTER: { en: "Master", kh: "បរិញ្ញាបត្រជាន់ខ្ពស់" },
    PHD: { en: "PhD", kh: "បណ្ឌិត" },
};

export function getDegreeLabel(degree: string | undefined | null, lang: Lang): string {
    if (!degree) return "";
    const item = DEGREE_LABELS[degree];
    if (!item) return degree;
    return lang === "kh" ? item.kh : item.en;
}

export const UNIT_KIND_LABELS: Record<string, { en: string; kh: string }> = {
    FACULTY: { en: "Faculty", kh: "មហាវិទ្យាល័យ" },
    faculty: { en: "Faculty", kh: "មហាវិទ្យាល័យ" },
    DEPARTMENT: { en: "Department", kh: "ដេប៉ាតឺម៉ង់" },
    department: { en: "Department", kh: "ដេប៉ាតឺម៉ង់" },
    SUB_DEPARTMENT: { en: "Section / Sub-department", kh: "ផ្នែក" },
    "sub-department": { en: "Section / Sub-department", kh: "ផ្នែក" },
    FOUNDATION: { en: "Foundation Year", kh: "ឆ្នាំសិក្សាមូលដ្ឋាន" },
    foundation: { en: "Foundation Year", kh: "ឆ្នាំសិក្សាមូលដ្ឋាន" },
};

export function getUnitKindLabel(kind: string | undefined | null, lang: Lang): string {
    if (!kind) return lang === "kh" ? "កម្មវិធីសិក្សា" : "Academic Program";
    const item = UNIT_KIND_LABELS[kind];
    if (!item) return kind;
    return lang === "kh" ? item.kh : item.en;
}

