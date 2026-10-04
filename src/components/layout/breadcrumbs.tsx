"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getUniversity } from "@/data";
import { localize } from "@/lib/language";
import { walkUnitPath } from "@/lib/unit-routes";
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
    // `/` is the university listing now (see app/page.tsx), so the root crumb is
    // the explore section, not the overview that used to live there.
    return [{ label: t("nav.exploreUniversities") }];
  }

  const [section, param, subParam] = segments;
  const safeSection = section ?? "";
  /** The unit ids of a unit page — one per level below the top-level unit. */
  const unitIds = segments.slice(3);

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
      // Admissions is the bare university path, so it has no segment of its own
      // and never gets a crumb of its own; `programs` is the only tab below it.
      const tabLabels: Record<string, string> = {
        programs: t("nav.programsAndFees"),
      };

      const tabLabel = tabLabels[subParam];
      if (tabLabel) {
        const crumbs: Crumb[] = [
          { label: sectionLabel, href: `/${safeSection}` },
          { label: paramLabel ?? param, href: `/${safeSection}/${param}` },
          { label: tabLabel },
        ];

        // A unit page: /explore-universities/{u}/programs/{faculty}/{unit}. The
        // whole chain is listed, so ISD is reachable from FIT and ISE instead
        // of arriving as an orphan. The path is walked level by level, so each
        // crumb is named by the level it sits at and its href is the path up to
        // that point.
        if (unitIds.length > 0 && university) {
            const chain = walkUnitPath(university, unitIds);
            const base = `/${safeSection}/${param}/${subParam}`;

            chain.forEach((unit, index) => {
                crumbs.push({
                    label: localize(unit.name, lang),
                    href: index < chain.length - 1 ? `${base}/${unitIds.slice(0, index + 1).join("/")}` : undefined,
                });
            });
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
