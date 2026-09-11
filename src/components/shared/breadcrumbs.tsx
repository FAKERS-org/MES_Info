import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/lib/i18n";
import { institutionLabels } from "@/data/institutions";
import { cn } from "@/lib/utils";

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

  if (segments.length === 0) {
    return [{ label: t("nav.overview") }];
  }

  const [section] = segments;

  if (section === "info") {
    if (segments.length === 1) {
      return [{ label: t("nav.info") }];
    }

    if (segments.length === 2) {
      const institutionId = segments[1]!;
      const institutionKey = institutionLabels[institutionId];

      return [
        {
          label: t("nav.info"),
          to: "/info",
        },
        {
          label: institutionKey
            ? t(institutionKey)
            : institutionId,
        },
      ];
    }
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
