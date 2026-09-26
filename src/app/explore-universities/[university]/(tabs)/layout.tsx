import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import UniversityIdCard from "@/components/university/university-id-card";
import UniversityMenu from "@/components/university/university-menu";
import { getUniversityPageData } from "@/data/university-page";
import { universities } from "@/data/universities";

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
 */
export default async function UniversityTabsLayout({
  params,
  children,
}: UniversityTabsLayoutProps) {
  const { university: id } = await params;
  const university = universities.find((u) => u.id === id);

  if (!university) notFound();

  const { hero, menu } = getUniversityPageData(university);

  return (
    <div className="space-y-8">
      <UniversityIdCard data={hero} />
      <UniversityMenu tabs={menu} />
      {children}
    </div>
  );
}
