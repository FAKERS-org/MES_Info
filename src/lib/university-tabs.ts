import type { SimpleTab } from "@/components/university/university-menu";

/**
 * The two pages of a university: the university itself, and its programs.
 *
 * Admissions and scholarships were tabs once, and were removed: both are open to
 * any applicant regardless of faculty, so they belong on the university page. A
 * scholarship limited to one unit is declared on that unit and shown on its own
 * page. The active tab comes from the pathname, so no page names itself.
 */
export function universityTabs(universityId: string): SimpleTab[] {
    const base = `/explore-universities/${universityId}`;

    return [
        { href: base, icon: "Building2", label: "University" },
        { href: `${base}/programs`, icon: "BookOpen", label: "Programs & Fees" },
    ];
}
