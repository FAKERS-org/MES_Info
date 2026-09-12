import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { universityLabels } from "@/data";

export interface Crumb {
  label: string;
  to?: string;
}

export interface BreadcrumbsProps {
  crumbs?: Crumb[];
  className?: string;
}

function useDefaultCrumbs(): Crumb[] {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const segments = pathname.split("/").filter(Boolean);
  console.log(segments);

  if (segments.length === 0) {
    return [{ label: t("nav.overview") }];
  }

  // jab route
  const [section, param] = segments;
  console.log(section, param);

  if (section === "explore-universities") {
    if (param) {
      const universityLabel = universityLabels[param]
        ? t(universityLabels[param])
        : param

      return [
        { label: t("nav.exploreUniversities"), to: "/explore-universities" },
        { label: universityLabel },
      ]
    }

    return [
      { label: t("nav.exploreUniversities") },
    ];
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
                {isLast || !crumb.to ? (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.to}
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
