import type { SimpleTab } from "@/components/university/university-menu";
import { universityHref } from "@/lib/unit-routes";

export function universityTabs(universityId: string): SimpleTab[] {
    return [
        { href: universityHref(universityId), icon: "BookOpen", label: "Programs" },
        { href: `/explore-universities/${universityId}`, icon: "Building2", label: "Admissions" },
    ];
}
