import type { UniversityHeadingData } from "@/components/department/department-heading";
import type { CurriculumSection, Facility, Unit, UnitKind, UnitScholarship } from "@/data/universities";
import { apiFetch } from "@/lib/api/fetch";
import type { components } from "@/lib/api/schema";

export type UniversityDetail = components["schemas"]["UniversityDetail"];
export type UnitDetail = components["schemas"]["UnitDetail"];
export type UniversityProgram = components["schemas"]["ProgramSummary"];
export type UnitSummary = components["schemas"]["UnitSummary"];

/**
 * Server-side read of one university through the public API.
 * 404 (unknown id) and 403 (not published) both read as "no page";
 * any other failure throws to the error boundary.
 */
export async function getUniversityDetail(id: string): Promise<UniversityDetail | null> {
    return apiFetch<UniversityDetail>(`/public/universities/${encodeURIComponent(id)}`);
}

/** Map the API's detail payload onto the data the heading renders. */
export function toHeadingData(detail: UniversityDetail): UniversityHeadingData {
    const stats = {
        students: detail.stats_students ?? undefined,
        tuition: detail.stats_tuition ?? undefined,
        established:
            detail.stats_established ??
            (detail.established_year ? `Est. ${detail.established_year}` : undefined),
    };
    return {
        id: detail.public_id,
        code: detail.abbreviation ?? undefined,
        name: { en: detail.name_en, kh: detail.name_kh ?? "" },
        logo: detail.logo_url ?? undefined,
        universityType: { en: detail.type === "PUBLIC" ? "Public" : "Private", kh: "" },
        universityCategory:
            detail.university_category_en || detail.university_category_kh
                ? { en: detail.university_category_en ?? "", kh: detail.university_category_kh ?? "" }
                : undefined,
        address: detail.address ? { en: detail.address, kh: detail.address } : undefined,
        website: detail.website ?? undefined,
        contact:
            detail.contact_phone || detail.contact_email || detail.contact_telegram
                ? {
                      phone: detail.contact_phone ?? undefined,
                      email: detail.contact_email ?? undefined,
                      telegram: detail.contact_telegram ?? undefined,
                  }
                : undefined,
        stats: stats.students || stats.tuition || stats.established ? stats : undefined,
    };
}

/**
 * A university's unit tree, flat with `parent_id` — the API's shape.
 * An unknown or unpublished university reads as "no units"; any other
 * failure throws to the error boundary.
 */
export async function getUniversityUnits(universityId: string): Promise<UnitSummary[]> {
    const units = await apiFetch<UnitSummary[]>(
        `/public/universities/${encodeURIComponent(universityId)}/units`,
    );
    return units ?? [];
}

export async function getUnitDetail(
    universityId: string,
    unitId: string,
): Promise<{ curriculum: CurriculumSection[]; facilities: Facility[]; scholarships: UnitScholarship[] } | null> {
    const detail = await apiFetch<UnitDetail>(
        `/public/universities/${encodeURIComponent(universityId)}/units/${encodeURIComponent(unitId)}`,
    );
    if (!detail) return null;

    // Map API snake_case → UI camelCase so downstream consumers see the
    // static-data shapes they already type against.
    const mapCurriculum = (sec: any): CurriculumSection => ({
        headingKh: sec.heading_kh,
        headingEn: sec.heading_en,
        bannerText: sec.banner_text ?? undefined,
        blocks: sec.blocks.map((b: any) => ({
            badgeText: b.badge_text,
            badgeBg: b.badge_background ?? undefined,
            title: b.title,
            englishTitle: b.english_title ?? undefined,
            credits: b.credits,
            description: b.description,
            courses: b.courses,
            specialBadge: b.special_badge ?? undefined,
        })),
    });

    const facilities: Facility[] = detail.facilities.map((facility, index) => ({
        id: `${unitId}-facility-${index}`,
        title: facility.title,
        subtitle: facility.subtitle ?? undefined,
        description: facility.description,
        image: facility.image,
    }));
    const scholarships: UnitScholarship[] = detail.scholarships.map((scholarship, index) => ({
        id: `${unitId}-scholarship-${index}`,
        name: { en: scholarship.name_en, kh: scholarship.name_kh ?? "" },
        coverage: { en: scholarship.coverage_en, kh: scholarship.coverage_kh ?? "" },
        requirements: (scholarship.requirements ?? []).map(requirement => ({
            en: String(requirement.en ?? ""),
            kh: String(requirement.kh ?? ""),
        })),
    }));

    return {
        curriculum: detail.curriculum_sections.map(mapCurriculum),
        facilities,
        scholarships,
    };
}

/** API kind → the UI's unit kind; the tree components match on these. */
const KIND_TO_UI: Record<UnitSummary["kind"], UnitKind> = {
    FACULTY: "faculty",
    DEPARTMENT: "department",
    SUB_DEPARTMENT: "sub-department",
    FOUNDATION: "foundation",
};

/**
 * Build the nested unit tree from the API's flat list. Siblings keep
 * the position order the API returns them in.
 *
 * ponytail: `requirements` is hard-empty — the API does not serve
 * admission requirements yet (stage 3b); SubDepartmentList hides that
 * section when the list is empty.
 */
export function buildUnitTree(units: UnitSummary[]): Unit[] {
    // Rows are linked by the integer `parent_id`, but the public URLs carry
    // `public_id` - so nodes are keyed by public_id for routing, and a second
    // map by the integer PK is kept purely to reassemble the parent chain.
    const byPublicId = new Map<string, Unit>();
    const byPk = new Map<number, Unit>();

    for (const row of units) {
        const node: Unit = {
            id: row.public_id,
            kind: KIND_TO_UI[row.kind],
            name: { en: row.name_en, kh: row.name_kh ?? "" },
            category: { en: row.category_en, kh: row.category_kh ?? "" },
            logo: row.logo ?? undefined,
            requirements: [],
            units: [],
        };
        byPublicId.set(row.public_id, node);
        byPk.set(row.id, node);
    }

    const roots: Unit[] = [];
    for (const row of units) {
        const node = byPublicId.get(row.public_id)!;
        const parent = row.parent_id != null ? byPk.get(row.parent_id) : undefined;
        if (parent) {
            parent.units!.push(node);
        } else {
            roots.push(node);
        }
    }

    return roots;
}
