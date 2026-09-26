import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon-renderer";
import { EntityProfileHero } from "@/components/shared/entity-profile-hero";
import type {
  UniversityHeroData,
  UniversityHeroBadge,
} from "@/data/university-page";

/** Badge used in the banner (its icons keep the trailing `mr-1`). */
function BannerBadge({ badge }: { badge: UniversityHeroBadge }) {
  return (
    <Badge className={badge.className}>
      {badge.icon !== undefined && (
        <Icon name={badge.icon} className="mr-1 h-3.5 w-3.5" />
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
        <Icon name={badge.icon} className="h-3.5 w-3.5" />
      )}
      {badge.label}
    </Badge>
  );
}

export interface UniversityIdCardProps {
  data: UniversityHeroData;
}

/**
 * Profile header of `/explore-universities/{university}`: the school's
 * `UniversityHeroData` laid out by the shared {@link EntityProfileHero}.
 */
export default function UniversityIdCard({ data }: UniversityIdCardProps) {
  const [share, bookmark] = data.bannerActions;

  return (
    <EntityProfileHero
      bannerClassName="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900"
      bannerBadges={data.bannerBadges.map((badge) => (
        <BannerBadge key={badge.label} badge={badge} />
      ))}
      bannerActions={
        <>
          <Button size="icon" variant="ghost" className={share.className}>
            <Icon name={share.icon} className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className={bookmark.className}>
            <Icon name={bookmark.icon} className="h-4 w-4" />
          </Button>
        </>
      }
      logo={{ src: data.logo.src, alt: data.logo.alt, innerClassName: "bg-slate-100" }}
      title={data.name}
      titleBadge={
        <Badge className="border-0 bg-white/20 text-white hover:bg-white/30">
          {data.nameBadge}
        </Badge>
      }
      subtitle={data.subtitle}
      badges={data.badges.map((badge) => (
        <BodyBadge key={badge.label} badge={badge} />
      ))}
      actions={
        <>
          {data.primaryAction.href ? (
            <Button asChild className={data.primaryAction.className}>
              <a
                href={data.primaryAction.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Icon name={data.primaryAction.icon} className="h-4 w-4" />
                {data.primaryAction.label}
              </a>
            </Button>
          ) : (
            <Button className={data.primaryAction.className}>
              <Icon name={data.primaryAction.icon} className="h-4 w-4" />
              {data.primaryAction.label}
            </Button>
          )}
          <a href={data.link.href} className={data.link.className}>
            <Icon name={data.link.icon} className="h-4 w-4" />
            {data.link.label}
          </a>
        </>
      }
      stats={data.stats.map(({ icon, label, value }) => ({ icon, label, value }))}
    />
  );
}
