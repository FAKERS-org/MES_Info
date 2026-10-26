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
    unit?: {
        defaultTuition?: number;
        defaultTuitionFemale?: number;
        default_tuition_per_year?: number | null;
        default_tuition_female_per_year?: number | null;
    } | null,
): ResolvedTuition {
    const currency = program.fee_currency || "USD";

    // Use backend-computed effective tuition if present, else fallback to hierarchy
    const baseAmount =
        program.effective_tuition_per_year ??
        program.tuition_per_year ??
        unit?.defaultTuition ??
        unit?.default_tuition_per_year ??
        university?.default_tuition_per_year ??
        undefined;

    const femaleAmount =
        program.effective_tuition_female_per_year ??
        program.tuition_female_per_year ??
        (program.tuition_per_year == null
            ? (unit?.defaultTuitionFemale ??
               unit?.default_tuition_female_per_year ??
               university?.default_tuition_female_per_year)
            : undefined) ??
        undefined;

    if (baseAmount == null && femaleAmount == null) {
        return { hasPrice: false, hasGenderDifference: false, currency };
    }

    if (femaleAmount != null && baseAmount != null && femaleAmount < baseAmount) {
        const discountPercent =
            program.tuition_discount_percent ??
            Math.round(((baseAmount - femaleAmount) / baseAmount) * 100);
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

export type TuitionModel = "UNIFORM" | "VARIABLE" | "UNSET";

export interface UniversityTuitionSummary {
    model: TuitionModel;
    currency: string;
    uniformAnnualFee?: number;
    femaleAnnualFee?: number;
    discountPercent?: number;
    minFee?: number;
    maxFee?: number;
    hasFemaleDiscountInPrograms: boolean;
}

export function resolveUniversityTuitionSummary(
    university?: (Pick<UniversityDetail, "default_tuition_per_year" | "default_tuition_female_per_year"> & {
        tuition_model?: string | null;
        tuition_min_per_year?: number | null;
        tuition_max_per_year?: number | null;
        has_female_tuition_discount?: boolean;
    }) | null,
    programs: UniversityProgram[] = [],
): UniversityTuitionSummary {
    const currency = programs[0]?.fee_currency || "USD";

    // Directly use backend calculation if provided by the API
    if (university?.tuition_model) {
        const model = university.tuition_model as TuitionModel;
        return {
            model,
            currency,
            uniformAnnualFee: model === "UNIFORM" ? (university.tuition_min_per_year ?? university.default_tuition_per_year ?? undefined) : undefined,
            femaleAnnualFee: model === "UNIFORM" ? (university.default_tuition_female_per_year ?? undefined) : undefined,
            discountPercent:
                university.default_tuition_female_per_year != null &&
                university.default_tuition_per_year != null &&
                university.default_tuition_female_per_year < university.default_tuition_per_year
                    ? Math.round(
                          ((university.default_tuition_per_year - university.default_tuition_female_per_year) /
                              university.default_tuition_per_year) *
                              100,
                      )
                    : undefined,
            minFee: university.tuition_min_per_year ?? undefined,
            maxFee: university.tuition_max_per_year ?? undefined,
            hasFemaleDiscountInPrograms: Boolean(university.has_female_tuition_discount),
        };
    }

    // Fallback if API hasn't resolved it
    const resolvedPrices: { base: number; female?: number }[] = [];
    for (const prog of programs) {
        const res = resolveProgramTuition(prog, university);
        if (res.hasPrice) {
            const base = res.maleAmount ?? res.uniformAmount;
            if (base != null) {
                resolvedPrices.push({ base, female: res.femaleAmount });
            }
        }
    }

    if (resolvedPrices.length === 0) {
        if (university?.default_tuition_per_year != null) {
            const base = university.default_tuition_per_year;
            const female = university.default_tuition_female_per_year ?? undefined;
            const discountPercent =
                female != null && female < base ? Math.round(((base - female) / base) * 100) : undefined;
            return {
                model: "UNIFORM",
                currency,
                uniformAnnualFee: base,
                femaleAnnualFee: female,
                discountPercent,
                hasFemaleDiscountInPrograms: Boolean(female && female < base),
            };
        }
        return {
            model: "UNSET",
            currency,
            hasFemaleDiscountInPrograms: false,
        };
    }

    const uniqueBasePrices = Array.from(new Set(resolvedPrices.map(p => p.base)));
    const hasFemaleDiscount = resolvedPrices.some(p => p.female != null && p.female < p.base);

    if (uniqueBasePrices.length === 1) {
        const uniformPrice = uniqueBasePrices[0];
        const femaleFee =
            resolvedPrices.find(p => p.female != null)?.female ??
            university?.default_tuition_female_per_year ??
            undefined;
        const discountPercent =
            femaleFee != null && femaleFee < uniformPrice
                ? Math.round(((uniformPrice - femaleFee) / uniformPrice) * 100)
                : undefined;

        return {
            model: "UNIFORM",
            currency,
            uniformAnnualFee: uniformPrice,
            femaleAnnualFee: femaleFee,
            discountPercent,
            hasFemaleDiscountInPrograms: hasFemaleDiscount,
        };
    }

    const minFee = Math.min(...uniqueBasePrices);
    const maxFee = Math.max(...uniqueBasePrices);

    return {
        model: "VARIABLE",
        currency,
        minFee,
        maxFee,
        hasFemaleDiscountInPrograms: hasFemaleDiscount,
    };
}
