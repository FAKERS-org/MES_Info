import type { components } from "@/lib/api/schema";
import type { UniversityHeadingData } from "@/components/department/department-heading";

export type UniversityDetail = components["schemas"]["UniversityDetail"];
export type UniversityProgram = components["schemas"]["ProgramSummary"];

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
