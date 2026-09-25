// components/UniversityCard.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Icon } from "@/components/shared/icon-renderer";
import {
  EntityHero,
  EntityHeroLogo,
  EntityHeroStats,
} from "@/components/shared/entity-hero";
import type { UniversityHeroData, UniversityHeroBadge } from "@/data/university";

/** Badge used in the banner (its icons keep the trailing `mr-1`). */
function BannerBadge({ badge }: { badge: UniversityHeroBadge }) {
  return (
    <Badge className={badge.className}>
      {badge.icon !== undefined && (
        <Icon name={badge.icon} className="w-3.5 h-3.5 mr-1" />
      )}
      {badge.label}
    </Badge>
  );
}

/** Badge used in the body, next to the logo. */
function BodyBadge({ badge }: { badge: UniversityHeroBadge }) {
  return (
    <Badge variant={badge.variant} className={badge.className}>
      {badge.icon !== undefined && (
        <Icon name={badge.icon} className="w-3.5 h-3.5" />
      )}
      {badge.label}
    </Badge>
  );
}

export interface UniversityIdCardProps {
  data: UniversityHeroData;
}

export default function UniversityIdCard({ data }: UniversityIdCardProps) {
  const [share, bookmark] = data.bannerActions;

  return (
    <EntityHero
      /* Mirrors the `Card` shell it replaced: border color, text and transition. */
      className="border-border text-card-foreground transition-all"
      bannerClassName="relative h-56 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900"
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
            {data.bannerBadges.map((badge) => (
              <BannerBadge key={badge.label} badge={badge} />
            ))}
          </div>

          {/* Action buttons top-right */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className={share.className}
            >
              <Icon name={share.icon} className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className={bookmark.className}
            >
              <Icon name={bookmark.icon} className="w-4 h-4" />
            </Button>
          </div>

          {/* Logo */}
          <EntityHeroLogo
            containerClassName="absolute left-6 -bottom-20"
            className="w-40 h-40 p-1 shadow-xl"
            innerClassName="bg-slate-100"
            src={data.logo.src}
            alt={data.logo.alt}
            check={
              <CheckCircle2 className="absolute -bottom-1 -right-1 w-6 h-6 text-green-500 fill-white" />
            }
          />

          {/* University name next to logo */}
          <div className="absolute left-[196px] top-[180px] -translate-y-1/2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-white">{data.name}</h1>
              <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
                {data.nameBadge}
              </Badge>
            </div>
            <p className="text-teal-100 text-sm mt-1">{data.subtitle}</p>
          </div>
        </>
      }
      bodyClassName="pt-24 pb-6 px-6"
    >
      {/* 3 badges + action buttons on the right — next to the logo, just below the split border */}
      <div className="absolute left-[196px] top-4 right-6 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {data.badges.map((badge) => (
            <BodyBadge key={badge.label} badge={badge} />
          ))}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button className={data.primaryAction.className}>
            <Icon
              name={data.primaryAction.icon}
              className="w-4 h-4"
            />
            {data.primaryAction.label}
          </Button>
          <a
            href={data.link.href}
            className={data.link.className}
          >
            <Icon name={data.link.icon} className="w-4 h-4" />
            {data.link.label}
          </a>
        </div>
      </div>

      <hr className="my-6 border-slate-200" />

      <EntityHeroStats
        className="grid-cols-2 md:grid-cols-4 gap-6"
        items={data.stats.map((stat) => ({
          ...stat,
          icon: <Icon name={stat.icon} className="w-5 h-5 text-slate-400" />,
          iconClassName: "mt-0.5",
          labelClassName: "text-xs text-slate-500 mb-0.5",
          valueClassName: "text-sm font-semibold text-slate-900",
          className: "items-start gap-3",
        }))}
      />
    </EntityHero>
  );
}
