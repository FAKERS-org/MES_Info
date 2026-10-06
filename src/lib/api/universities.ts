import type { components } from "@/lib/api/schema";
import type { UniversityHeadingData } from "@/components/department/department-heading";
import type { Unit, UnitKind } from "@/data/universities";

export type UniversityDetail = components["schemas"]["UniversityDetail"];
export type UniversityProgram = components["schemas"]["ProgramSummary"];
export type UnitSummary = components["schemas"]["UnitSummary"];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

/**
 * Server-side read of one university through the public API.
 * 404 (unknown id) and 403 (not published) both read as "no page";
 * any other failure throws to the error boundary.
 */
export async function getUniversityDetail(id: string): Promise<UniversityDetail | null> {
    const res = await fetch(`${API_URL}/public/universities/${encodeURIComponent(id)}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
    });
    if (res.status === 404 || res.status === 403) return null;
    if (!res.ok) throw new Error(`API /public/universities/${id} failed: ${res.status}`);
    return (await res.json()) as UniversityDetail;
}

/** Map the API's detail payload onto the data the heading renders. */
export function toHeadingData(detail: UniversityDetail): UniversityHeadingData {
    return {
        id: detail.id,
        code: detail.abbreviation ?? undefined,
        name: { en: detail.name_en, kh: detail.name_kh ?? "" },
        logo: detail.logo_url ?? undefined,
        universityType: { en: detail.type === "PUBLIC" ? "Public" : "Private", kh: "" },
        address: detail.address ? { en: detail.address, kh: detail.address } : undefined,
        website: detail.website ?? undefined,
        stats: detail.established_year
            ? { established: `Est. ${detail.established_year}` }
            : undefined,
    };
}

/** A university's degree programs, flat, straight from the API. */
export async function getUniversityPrograms(universityId: string): Promise<UniversityProgram[]> {
    const res = await fetch(`${API_URL}/public/universities/${encodeURIComponent(universityId)}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
    });
    if (res.status === 404 || res.status === 403) return [];
    if (!res.ok) throw new Error(`API /public/universities/${universityId} failed: ${res.status}`);
    return ((await res.json()) as UniversityDetail).programs;
}

/**
 * A university's unit tree, flat with `parent_id` — the API's shape.
 * An unknown or unpublished university reads as "no units"; any other
 * failure throws to the error boundary.
 */
export async function getUniversityUnits(universityId: string): Promise<UnitSummary[]> {
    const res = await fetch(`${API_URL}/public/universities/${encodeURIComponent(universityId)}/units`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
    });
    if (res.status === 404 || res.status === 403) return [];
    if (!res.ok) throw new Error(`API /public/universities/${universityId}/units failed: ${res.status}`);
    return (await res.json()) as UnitSummary[];
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
    const nodes = new Map(
        units.map(row => [
            row.id,
            {
                id: row.id,
                kind: KIND_TO_UI[row.kind],
                name: { en: row.name_en, kh: row.name_kh ?? "" },
                category: { en: row.category_en, kh: row.category_kh ?? "" },
                logo: row.logo ?? undefined,
                requirements: [],
                units: [] as Unit[],
            } satisfies Unit,
        ]),
    );

    const roots: Unit[] = [];
    for (const row of units) {
        const node = nodes.get(row.id)!;
        const parent = row.parent_id ? nodes.get(row.parent_id) : undefined;
        if (parent) {
            parent.units.push(node);
        } else {
            roots.push(node);
        }
    }

    return roots;
}
