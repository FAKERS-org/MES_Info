import UniversityHero from "@/components/university/university-hero";
import UniversityMenu from "@/components/university/university-menu";
import { findUniversity } from "@/data/universities-source";
import { getUniversityPageData } from "@/data/university-page";
import { readLang } from "@/lib/language.server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

interface UniversityTabsLayoutProps {
    params: Promise<{ university: string }>;
    children: ReactNode;
}

/**
 * Chrome shared by the three tabs of `/explore-universities/{university}`
 * (Programs & Fees, Admissions, Scholarships): hero and linked menu, with the
 * tabs themselves supplying the columns below it. The Programs tab adds the
 * right-hand rail (About, Hot News, Campus Map, Admissions, Brochure) — the
 * other two carry their own content, so a shared rail here would show up as a
 * second right column on top of theirs.
 *
 * It lives in the `(tabs)` route group on purpose — the group does not exist
 * in the URL, so `[department]` stays outside it and keeps its own layout
 * instead of growing a hero, a menu and a rail it never had.
 *
 * The school is resolved through `findUniversity` rather than read off the
 * bundled seed, because this layout runs before the tabs: a lookup that only
 * knew the seed would 404 a school an admin added before its Admissions tab
 * ever got the chance to render.
 */
export default async function UniversityTabsLayout({ params, children }: UniversityTabsLayoutProps) {
    const { university: id } = await params;
    const university = await findUniversity(id);

    if (!university) notFound();

    const { hero, menu } = getUniversityPageData(university, await readLang());

    return (
        <div className="space-y-5">
            {/* <UniversityIdCard data={hero} /> */}
            <UniversityHero />
            <UniversityMenu tabs={menu} />
            {children}
        </div>
    );
}
