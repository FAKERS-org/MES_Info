"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { resolveText } from "@/data/department";
import type { DepartmentIdHeadingData } from "@/data/department";
import type { NamespacedText } from "@/data/universities";
import { Icon } from "@/components/shared/icon-renderer";
import {
  EntityHero,
  EntityHeroLogo,
  EntityHeroStats,
} from "@/components/shared/entity-hero";

export interface DepartmentIdHeadingProps {
  data: DepartmentIdHeadingData;
  /** Resolved `Department` of the URL: overrides title and logo. */
  entity?: { name: NamespacedText; logo: string };
  className?: string;
}

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
    <EntityHero
      className={cn(
        "border-border text-card-foreground transition-all mx-auto font-sans",
        className
      )}
      bannerClassName="relative h-56 bg-gradient-to-br from-[#0a4f7c] via-[#0e5a8a] to-[#167bb3]"
      banner={
        <>
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
            <Badge className="bg-white/15 hover:bg-white/25 text-white border-0">
              <Icon name="ShieldCheck" className="w-3.5 h-3.5 mr-1" />
              {data.accreditationBadge}
            </Badge>
            <Badge className="bg-white/15 hover:bg-white/25 text-white border-0">
              <Icon name="GraduationCap" className="w-3.5 h-3.5 mr-1" />
              {data.facultyBadge}
            </Badge>
          </div>

          {/* Logo */}
          <EntityHeroLogo
            containerClassName="absolute left-6 -bottom-20"
            className="w-40 h-40 p-1 shadow-xl"
            innerClassName="bg-[#0e5a8a] border-4 border-[#d4af37]"
            innerStyle={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            fallback={
              <span className="text-white text-xs text-center font-bold px-2">
                {resolveText(logoAlt, lang)}
              </span>
            }
            check={
              <CheckCircle2 className="absolute -bottom-1 -right-1 w-6 h-6 text-green-500 fill-white" />
            }
          />
        </>
      }
      bodyClassName="pt-24 pb-6 px-6"
    >
      {/* Department name next to the logo: in flow on mobile, on the banner
          split from md up, exactly like the university hero. */}
      <div className="md:absolute md:left-[196px] md:right-6 md:-top-11 md:-translate-y-1/2 mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-gray-900 md:text-white">
          {resolveText(title, lang)}
        </h1>
        <p className="text-gray-600 text-sm mt-1 md:text-teal-100">
          {resolveText(data.subtitle, lang)}
        </p>
      </div>

      {/* Badges + action buttons — next to the logo, just below the split border */}
      <div className="md:absolute md:left-[196px] md:top-4 md:right-6 mt-4 md:mt-0 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {data.badges.map((badge, idx) => (
            <Badge
              key={idx}
              className="bg-[#eef5fc] text-[#0e5a8a] gap-1 hover:bg-[#eef5fc]"
            >
              {badge}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-end md:flex-nowrap">
          <Button className="gap-2 rounded-lg px-5">
            {resolveText(data.actions.primary.label, lang)}
            <Icon name={data.actions.primary.icon} className="w-4 h-4" />
          </Button>
          <div className="flex gap-2">
            {data.actions.secondary.map((action, idx) => (
              <Button
                key={idx}
                variant="secondary"
                className="gap-2 rounded-lg"
              >
                <Icon name={action.icon} className="w-4 h-4" />
                {resolveText(action.label, lang)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-6 border-slate-200" />

      <EntityHeroStats
        className="grid-cols-2 md:grid-cols-4 gap-6"
        items={data.stats.map((stat) => ({
          icon: <Icon name={stat.icon} className="w-5 h-5 text-slate-400" />,
          iconClassName: "mt-0.5",
          label: resolveText(stat.label, lang),
          labelClassName: "text-xs text-slate-500 mb-0.5",
          value: resolveText(stat.value, lang),
          valueClassName: "text-sm font-semibold text-slate-900",
          className: "items-start gap-3",
        }))}
      />
    </EntityHero>
  );
}
