"use client";

import { getUniversity } from "@/data";
import { useLanguage } from "@/lib/i18n";
import { localize } from "@/lib/language";
import { walkUnitPath } from "@/lib/unit-routes";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

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
        return [{ label: t("nav.exploreUniversities") }];
    }

    const [section, param, subParam] = segments;
    const safeSection = section ?? "";
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
        const university = getUniversity(param);
        if (university) {
            paramLabel = localize(university.name, lang);
        }

        if (safeSection === "explore-universities" && param && subParam) {
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

                if (unitIds.length > 0 && university) {
                    const chain = walkUnitPath(university.units, unitIds);
                    const base = `/${safeSection}/${param}/${subParam}`;

                    chain.forEach((unit, index) => {
                        crumbs.push({
                            label: localize(unit.name, lang),
                            href:
                                index < chain.length - 1
                                    ? `${base}/${unitIds.slice(0, index + 1).join("/")}`
                                    : undefined,
                        });
                    });
                }

                return crumbs;
            }
        }

        if (param) {
            return [{ label: sectionLabel, href: `/${safeSection}` }, { label: paramLabel ?? param }];
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
