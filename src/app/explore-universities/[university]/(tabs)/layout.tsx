import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import UniversityIdCard from "@/components/university/university-id-card";
import UniversityMenu from "@/components/university/university-menu";
import { AboutCard } from "@/components/university/about-card";
import { HotNewsCard } from "@/components/university/hot-news-card";
import { AdmissionsCard } from "@/components/university/admissions-card";
import { BrochureCard } from "@/components/university/brochure-card";
import { CampusMapCard } from "@/components/university/campus-map-card";
import { SectionLayout } from "@/components/shared/section-layout";
import { getUniversityPageData } from "@/data/university-page";
import { universities } from "@/data/universities";

interface UniversityTabsLayoutProps {
  params: Promise<{ university: string }>;
  children: ReactNode;
}

/**
 * Chrome shared by the three tabs of `/explore-universities/{university}`
 * (Programs & Fees, Admissions, Scholarships): hero, linked menu and the
 * right-hand rail, with the tab itself supplying the left column.
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

  const { hero, about, hotNews, campusMap, admissions, brochure, menu } =
    getUniversityPageData(university);

  return (
    <div className="space-y-8">
      <UniversityIdCard data={hero} />
      <UniversityMenu tabs={menu} />

      <SectionLayout
        breakpoint="md"
        mainClassName="space-y-6"
        aside={
          /* Right Column (About, Hot News, Campus Map, Admissions, Brochure) */
          <>
            <AboutCard data={about} />
            {hotNews && <HotNewsCard data={hotNews} />}
            <CampusMapCard data={campusMap} />
            <AdmissionsCard data={admissions} />
            {brochure && <BrochureCard data={brochure} />}
          </>
        }
      >
        {children}
      </SectionLayout>
    </div>
  );
}
