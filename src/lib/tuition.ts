import type { UniversityDetail, UniversityProgram } from "@/lib/api/universities";

export interface ResolvedTuition {
    hasPrice: boolean;
    hasGenderDifference: boolean;
    maleAmount?: number;
    femaleAmount?: number;
    currency: string;
    uniformAmount?: number;
    discountPercent?: number;
}

export function resolveProgramTuition(
    program: UniversityProgram,
    university?: Pick<UniversityDetail, "default_tuition_per_year" | "default_tuition_female_per_year"> | null,
): ResolvedTuition {
    const currency = program.fee_currency || "USD";
    const baseAmount = program.tuition_per_year ?? university?.default_tuition_per_year ?? undefined;
    const femaleAmount =
        program.tuition_female_per_year ??
        (program.tuition_per_year == null ? university?.default_tuition_female_per_year : undefined) ??
        undefined;

    if (baseAmount == null && femaleAmount == null) {
        return { hasPrice: false, hasGenderDifference: false, currency };
    }

    if (femaleAmount != null && baseAmount != null && femaleAmount < baseAmount) {
        const discountPercent = Math.round(((baseAmount - femaleAmount) / baseAmount) * 100);
        return {
            hasPrice: true,
            hasGenderDifference: true,
            maleAmount: baseAmount,
            femaleAmount,
            currency,
            discountPercent,
        };
    }

    const price = baseAmount ?? femaleAmount;
    return {
        hasPrice: true,
        hasGenderDifference: false,
        uniformAmount: price,
        currency,
    };
}
