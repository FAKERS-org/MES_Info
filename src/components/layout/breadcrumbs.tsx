"use client";

import { getUniversity } from "@/data";
import { useUniversities } from "@/hooks/use-universities";
import apiClient from "@/lib/api/client";
import { buildUnitTree, type PageUnitSummary, type UnitSummary, type UniversityDetail } from "@/lib/api/universities";
import { useLanguage } from "@/lib/i18n";
import { apiName, localize } from "@/lib/language";
import { walkUnitPath } from "@/lib/unit-routes";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
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

const isUuid = (val: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

function useDefaultCrumbs(): Crumb[] {
    const pathname = usePathname();
    const { lang, t } = useLanguage();
    const { universities } = useUniversities();
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
        return [{ label: t("nav.exploreUniversities") }];
    }

    const [section, param, subParam] = segments;
    const safeSection = section ?? "";
    const unitIds = segments.slice(3);

    const isUniSection = safeSection === "explore-universities" && Boolean(param);

    const staticUniversity = param ? getUniversity(param) : undefined;
    const uniFromList = param
        ? universities.find(u => u.public_id === param || String(u.id) === param)
        : undefined;

    const { data: uniDetail } = useQuery({
        queryKey: ["university-detail", param],
        queryFn: async () => {
            const res = await apiClient.get<UniversityDetail>(`/public/universities/${encodeURIComponent(param)}`);
            return res.data;
        },
        enabled: Boolean(isUniSection && !uniFromList && !staticUniversity),
    });

    const { data: units = [] } = useQuery({
        queryKey: ["university-units", param],
        queryFn: async () => {
            const res = await apiClient.get<PageUnitSummary | UnitSummary[]>(
                `/public/universities/${encodeURIComponent(param)}/units?limit=100`,
            );
            const data = res.data;
            return Array.isArray(data) ? data : (data.items ?? []);
        },
        enabled: Boolean(isUniSection && unitIds.length > 0),
    });

    const sectionLabels: Record<string, string> = {
        "explore-universities": t("nav.exploreUniversities"),
        "majors-and-careers": t("nav.majors&Careers"),
        scholarships: t("nav.scholarships"),
        compare: t("nav.compare"),
    };

    const sectionLabel = sectionLabels[safeSection] as string | undefined;

    if (sectionLabel) {
        let paramLabel = param;
        if (uniFromList) {
            paramLabel = apiName(uniFromList, lang);
        } else if (uniDetail) {
            paramLabel = apiName(uniDetail, lang);
        } else if (staticUniversity) {
            paramLabel = localize(staticUniversity.name, lang);
        } else if (param && isUuid(param)) {
            paramLabel = "...";
        }

        if (safeSection === "explore-universities" && param && subParam) {
            const tabLabels: Record<string, string> = {
                programs: t("nav.programsAndFees"),
            };

            const tabLabel = tabLabels[subParam] ?? subParam;
            if (tabLabel) {
                const crumbs: Crumb[] = [
                    { label: sectionLabel, href: `/${safeSection}` },
                    { label: paramLabel ?? param, href: `/${safeSection}/${param}` },
                    {
                        label: tabLabel,
                        href: unitIds.length > 0 ? `/${safeSection}/${param}/${subParam}` : undefined,
                    },
                ];

                if (unitIds.length > 0) {
                    const tree = units.length > 0 ? buildUnitTree(units) : staticUniversity?.units ?? [];
                    const chain = walkUnitPath(tree, unitIds);
                    const base = `/${safeSection}/${param}/${subParam}`;

                    if (chain.length > 0) {
                        chain.forEach((unit, index) => {
                            crumbs.push({
                                label: localize(unit.name, lang),
                                href:
                                    index < chain.length - 1
                                        ? `${base}/${unitIds.slice(0, index + 1).join("/")}`
                                        : undefined,
                            });
                        });
                    } else if (unitIds.some(isUuid)) {
                        unitIds.forEach((_, index) => {
                            crumbs.push({
                                label: "...",
                                href:
                                    index < unitIds.length - 1
                                        ? `${base}/${unitIds.slice(0, index + 1).join("/")}`
                                        : undefined,
                            });
                        });
                    }
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
