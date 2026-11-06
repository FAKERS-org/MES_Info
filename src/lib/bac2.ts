import type { UniversitySummary } from "@/hooks/use-universities";

export type Bac2Grade = "ALL" | "A" | "B" | "C" | "D" | "E";

export interface AdjustedTuitionResult {
    baseAmount: number | null;
    adjustedAmount: number | null;
    discountPercent: number;
    hasWaiver: boolean;
    policyNote?: string;
}

export const PHNOM_PENH_KHANS = [
    "Toul Kork",
    "Daun Penh",
    "Chamkar Mon",
    "Sen Sok",
    "Boeung Keng Kang",
    "Russey Keo",
    "Chbar Ampov",
    "Meanchey",
    "Dangkao",
    "Por Senchey",
    "Chroy Changvar",
    "Prek Pnov",
    "Kamboul",
] as const;

export type DeliveryShift = "Morning" | "Afternoon" | "Evening" | "Weekend";

export const DELIVERY_SHIFTS: { id: DeliveryShift; labelEn: string; labelKh: string; icon: string }[] = [
    { id: "Morning", labelEn: "Morning", labelKh: "ព្រឹក", icon: "☀️" },
    { id: "Afternoon", labelEn: "Afternoon", labelKh: "រសៀល", icon: "🌤️" },
    { id: "Evening", labelEn: "Evening", labelKh: "យប់", icon: "🌙" },
    { id: "Weekend", labelEn: "Weekend", labelKh: "ចុងសប្តាហ៍", icon: "📅" },
];

/**
 * Calculates adjusted Year 1 tuition based on student's Bac II grade.
 * Uses institutional metadata_json.bac2_waivers if defined; falls back
 * to standard Cambodian university scholarship policy when has_scholarships is true.
 */
export function calculateBac2Tuition(
    university: Pick<UniversitySummary, "default_tuition_per_year" | "has_scholarships" | "metadata_json">,
    grade: Bac2Grade,
): AdjustedTuitionResult {
    const base = university.default_tuition_per_year ?? null;
    if (grade === "ALL" || base == null) {
        return {
            baseAmount: base,
            adjustedAmount: base,
            discountPercent: 0,
            hasWaiver: false,
        };
    }

    const meta = (university.metadata_json as Record<string, unknown> | null | undefined) ?? {};
    const waivers = (meta.bac2_waivers || meta.bac2_discounts || meta.merit_waivers) as
        | Record<string, unknown>
        | undefined;

    let discountPercent = 0;
    let policyNote: string | undefined;

    if (waivers && typeof waivers === "object") {
        const val =
            waivers[grade] ??
            waivers[`Grade ${grade}`] ??
            waivers[`grade_${grade.toLowerCase()}`];

        if (typeof val === "number") {
            discountPercent = val;
        } else if (typeof val === "string") {
            const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
            if (!Number.isNaN(num)) discountPercent = num;
        }

        if (typeof waivers.details === "string") policyNote = waivers.details;
        else if (typeof waivers.summary === "string") policyNote = waivers.summary;
    } else if (university.has_scholarships) {
        // Standard Cambodian university merit scholarship tier:
        // Grade A: 100%, Grade B: 50%, Grade C: 25%
        if (grade === "A") discountPercent = 100;
        else if (grade === "B") discountPercent = 50;
        else if (grade === "C") discountPercent = 25;
    }

    const adjustedAmount = Math.max(0, Math.round(base * (1 - discountPercent / 100)));
    return {
        baseAmount: base,
        adjustedAmount,
        discountPercent,
        hasWaiver: discountPercent > 0,
        policyNote,
    };
}

/**
 * Extracts localized Khan / District name from university metadata or address string.
 */
export function getUniversityKhan(
    university: Pick<UniversitySummary, "metadata_json"> & { address?: string | null },
): string | null {
    const meta = (university.metadata_json as Record<string, unknown> | null | undefined) ?? {};
    if (typeof meta.khan === "string" && meta.khan) return meta.khan;
    if (typeof meta.district === "string" && meta.district) return meta.district;

    const addr = (university.address || "").toLowerCase();
    for (const k of PHNOM_PENH_KHANS) {
        const needle = k.toLowerCase();
        if (addr.includes(needle) || addr.includes(needle.replace(/\s+/g, ""))) {
            return k;
        }
    }
    return null;
}

/**
 * Extracts delivery shifts from university metadata. Defaults to standard
 * day and evening shifts if not specified.
 */
export function getUniversityShifts(
    university: Pick<UniversitySummary, "metadata_json">,
): DeliveryShift[] {
    const meta = (university.metadata_json as Record<string, unknown> | null | undefined) ?? {};
    if (Array.isArray(meta.shifts)) {
        return meta.shifts as DeliveryShift[];
    }
    if (Array.isArray(meta.delivery_shifts)) {
        return meta.delivery_shifts as DeliveryShift[];
    }
    return ["Morning", "Afternoon", "Evening"];
}

/**
 * Filters universities by qualification level (CQF Level 5 Associate vs CQF Level 6 Bachelor).
 */
export function hasQualification(
    university: Pick<UniversitySummary, "abbreviation" | "metadata_json">,
    qual: "ALL" | "BACHELOR" | "ASSOCIATE",
): boolean {
    if (qual === "ALL") return true;
    const meta = (university.metadata_json as Record<string, unknown> | null | undefined) ?? {};
    const quals = Array.isArray(meta.qualifications)
        ? (meta.qualifications as string[]).map(s => s.toLowerCase())
        : [];

    if (qual === "ASSOCIATE") {
        if (quals.some(q => q.includes("associate") || q.includes("cqf 5") || q.includes("level 5"))) {
            return true;
        }
        const abbrev = (university.abbreviation || "").toUpperCase();
        return ["ITC", "CADT", "NPIC", "NUBB"].includes(abbrev);
    }

    if (qual === "BACHELOR") {
        return true; // All undergraduate institutions in scope offer Bachelor degrees
    }

    return true;
}
