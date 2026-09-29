"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getAncestors, getUniversity } from "@/data";
import { localize } from "@/lib/language";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  crumbs?: Crumb[];
  className?: string;
}

function useDefaultCrumbs(): Crumb[] {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return [{ label: t("nav.overview") }];
  }

  const [section, param, subParam, unitParam] = segments;
  const safeSection = section ?? "";

  const sectionLabels: Record<string, string> = {
    "explore-universities": t("nav.exploreUniversities"),
    "majors-and-careers": t("nav.majors&Careers"),
    scholarships: t("nav.scholarships"),
    compare: t("nav.compare"),
  };

  const sectionLabel = sectionLabels[safeSection] as string | undefined;

  if (sectionLabel) {
    let paramLabel = param;
    // Read from the catalogue, not from the react-query provider: that query
    // has no data on the first server render, so the university crumb came out
    // as the raw slug ("itc") and the unit crumbs were missing entirely until
    // hydration rewrote them. The data is a static import in both passes, so
    // the first paint is already correct.
    const university = getUniversity(param);
    if (university) {
      paramLabel = localize(university.name, lang);
    }

    // Handle university sub-pages (tabs and units)
    if (safeSection === "explore-universities" && param && subParam) {
      const tabLabels: Record<string, string> = {
        programs: t("nav.programsAndFees"),
        admissions: t("nav.admissions"),
        scholarships: t("nav.scholarships"),
      };

      const tabLabel = tabLabels[subParam];
      if (tabLabel) {
        const crumbs: Crumb[] = [
          { label: sectionLabel, href: `/${safeSection}` },
          { label: paramLabel ?? param, href: `/${safeSection}/${param}` },
          { label: tabLabel },
        ];

        // A unit page: /explore-universities/{u}/programs/{unitId}. The whole
        // ancestor chain is listed, so GIC is reachable from FOE and GEE
        // instead of arriving as an orphan.
        if (unitParam && university) {
          const chain = getAncestors(university, unitParam);
          if (chain.length > 0) {
            const base = `/${safeSection}/${param}/${subParam}`;
            for (const [index, unit] of chain.entries()) {
              crumbs.push({
                label: localize(unit.name, lang),
                href: index < chain.length - 1 ? `${base}/${unit.id}` : undefined,
              });
            }
          }
        }

        return crumbs;
      }
    }

    if (param) {
      return [
        { label: sectionLabel, href: `/${safeSection}` },
        { label: paramLabel ?? param },
      ];
    }

    return [{ label: sectionLabel }];
  }

  return [
    {
      label: t("nav.overview"),
    },
    {
      label: t("error.heading"),
    },
  ];
}

function Breadcrumbs({ crumbs, className }: BreadcrumbsProps) {
  const defaultCrumbs = useDefaultCrumbs();
  const resolved = crumbs ?? defaultCrumbs;

  return (
    <nav aria-label="Breadcrumb" className={cn("px-1", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {resolved.map((crumb, i) => {
          const isLast = i === resolved.length - 1;
          return (
            <Fragment key={`${crumb.label}-${i}`}>
              {i > 0 && (
                <li className="flex text-muted-foreground/50">
                  <ChevronRight className="size-4" />
                </li>
              )}
              <li aria-current={isLast ? "page" : undefined}>
                {isLast || !crumb.href ? (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
