import type { SimpleTab } from "@/components/university/university-menu";

/**
 * The tab bar of every `/explore-universities/{university}` page.
 *
 * Three pages each built their own copy of this list, and the one that mattered
 * most — the programs page — had none, so the tabs vanished on the page the
 * university root redirects to. One list, and the active tab is derived from
 * the pathname by the menu itself, so no page has to name the page it is on.
 */
export function universityTabs(universityId: string): SimpleTab[] {
    const base = `/explore-universities/${universityId}`;

    return [
        { href: `${base}/programs`, icon: "BookOpen", label: "Programs & Fees" },
        { href: `${base}/admissions`, icon: "GraduationCap", label: "Admissions" },
        { href: `${base}/scholarships`, icon: "Award", label: "Scholarships" },
    ];
}
