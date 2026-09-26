"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { resolveText } from "@/data/text";
import type { DepartmentIdHeadingData } from "@/data/department-page";
import type { NamespacedText } from "@/data/universities";
import { Icon } from "@/components/shared/icon-renderer";
import { EntityProfileHero } from "@/components/shared/entity-profile-hero";

export interface DepartmentIdHeadingProps {
  data: DepartmentIdHeadingData;
  /** Resolved `Department` of the URL: overrides title and logo. */
  entity?: { name: NamespacedText; logo: string };
  className?: string;
}

/**
 * Profile header of `/explore-universities/{university}/{department}`: the
 * department's `DepartmentIdHeadingData` laid out by the shared
 * {@link EntityProfileHero}.
 */
export default function DepartmentIdHeading({
  data,
  entity,
  className,
}: DepartmentIdHeadingProps) {
  const { lang } = useLanguage();
  const title = entity?.name ?? data.title;
  const logo = entity?.logo ?? data.logo;
  const logoAlt = entity?.name ?? data.logoAlt;

  return (
    <EntityProfileHero
      className={cn("mx-auto font-sans", className)}
      bannerClassName="bg-gradient-to-br from-[#0a4f7c] via-[#0e5a8a] to-[#167bb3]"
      bannerBadges={
        <>
          <Badge className="border-0 bg-white/15 text-white hover:bg-white/25">
            <Icon name="ShieldCheck" className="mr-1 h-3.5 w-3.5" />
            {data.accreditationBadge}
          </Badge>
          <Badge className="border-0 bg-white/15 text-white hover:bg-white/25">
            <Icon name="GraduationCap" className="mr-1 h-3.5 w-3.5" />
            {data.facultyBadge}
          </Badge>
        </>
      }
      logo={{
        // `|| undefined` keeps the text fallback for a department without a logo.
        src: logo || undefined,
        alt: resolveText(logoAlt, lang),
        // The circle only letterboxes the logo, like the old
        // `background-size: contain` did — never crop it.
        imageClassName: "object-contain",
        innerClassName: "border-4 border-[#d4af37] bg-[#0e5a8a]",
        fallback: (
          <span className="px-2 text-center text-xs font-bold text-white">
            {resolveText(logoAlt, lang)}
          </span>
        ),
      }}
      title={resolveText(title, lang)}
      subtitle={resolveText(data.subtitle, lang)}
      badges={data.badges.map((badge, idx) => (
        <Badge
          key={idx}
          className="gap-1 bg-[#eef5fc] text-[#0e5a8a] hover:bg-[#eef5fc]"
        >
          {badge}
        </Badge>
      ))}
      actions={
        <>
          <Button className="gap-2 rounded-lg px-5">
            {resolveText(data.actions.primary.label, lang)}
            <Icon name={data.actions.primary.icon} className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {data.actions.secondary.map((action, idx) => (
              <Button key={idx} variant="secondary" className="gap-2 rounded-lg">
                <Icon name={action.icon} className="h-4 w-4" />
                {resolveText(action.label, lang)}
              </Button>
            ))}
          </div>
        </>
      }
      stats={data.stats.map((stat) => ({
        icon: stat.icon,
        label: resolveText(stat.label, lang),
        value: resolveText(stat.value, lang),
      }))}
    />
  );
}
