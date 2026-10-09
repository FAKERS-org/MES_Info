// src/lib/api/fetch.ts
// SERVER-side HTTP helper for Server Components and route handlers.
// The counterpart of "@/lib/api/client": `apiClient` (axios) is client-only,
// this is the server path — it opts into Next.js fetch caching (`revalidate`).
import { API_CONFIG } from "@/config";

/**
 * Typed GET against the MES API.
 *
 * 404 (unknown id) and 403 (not published) read as `null` — "no such page";
 * any other failure throws to the error boundary.
 */
export async function apiFetch<T>(path: string): Promise<T | null> {
    const res = await fetch(`${API_CONFIG.baseUrl}${path}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
    });
    if (res.status === 404 || res.status === 403) return null;
    if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
    return (await res.json()) as T;
}
