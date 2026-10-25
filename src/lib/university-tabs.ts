import type { SimpleTab } from "@/components/university/university-menu";
import { universityHref } from "@/lib/unit-routes";

export function universityTabs(universityId: string): SimpleTab[] {
    return [
        { href: `/explore-universities/${universityId}`, icon: "Building2", label: "Overview" },
        { href: `/explore-universities/${universityId}/programs`, icon: "BookOpen", label: "Programs & Faculties" },
        { href: `/explore-universities/${universityId}/admissions`, icon: "GraduationCap", label: "Admissions" },
        { href: `/explore-universities/${universityId}/scholarships`, icon: "Award", label: "Scholarships" },
    ];
}
