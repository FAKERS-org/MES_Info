"use client";

import Link from "next/link";
import { ArrowUpRight, Bookmark, Globe, GraduationCap, MapPin } from "lucide-react";
import { EntityLogo } from "@/components/shared/entity-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconList, IconListItem } from "@/components/shared/icon-list";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getFlatUnits, type University } from "@/data";

export interface UniversityTileProps {
  university: University;
  /**
   * `featured` is the rich card of `/explore-universities` (gradient head,
   * fact rows, call to action); `compact` the link tile of the overview and
   * the coming-soon boards. Both share the surface, the head with its logo
   * and the fact rows, so the grids read as one system.
   */
  variant?: "featured" | "compact";
  className?: string;
}

/**
 * One university in a grid. The two cards that used to serve those grids —
 * `university-card.tsx` and `uni-info-card.tsx` — had drifted into two
 * design systems (hex gradients, `rounded-3xl`, no shared markup); this is
 * their single implementation, with the entity specific bits gated by
 * `variant`.
 */
export function UniversityTile({
  university,
  variant = "compact",
  className,
}: UniversityTileProps) {
  const { lang, t } = useLanguage();
  const featured = variant === "featured";

  const name = university.name[lang] ?? university.name.en;
  const description =
    university.description[lang] ?? university.description.en;
  const address = university.address
    ? university.address[lang] ?? university.address.en
    : "";
  const href = `/explore-universities/${university.id}`;
  // Every unit at every depth, not just the top-level ones: a university with
  // one faculty and four departments offers five programs, not one.
  const programCount = getFlatUnits(university.id).length;
  const universityType =
    university.universityType[lang] ?? university.universityType.en;
  const universityCategory =
    university.universityCategory[lang] ?? university.universityCategory.en;

  const surface = cn(
    "relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-shadow",
    featured ? "hover:shadow-md" : "hover:shadow-xl",
    className
  );

  const content = (
    <>
      {/* Head: brand strip the logo hangs out of. */}
      <div
        className={cn(
          "relative bg-primary",
          featured
            ? "bg-gradient-to-br from-primary to-slate-900 pb-16 pt-4"
            : "h-24"
        )}
      >
        {featured && (
          <div className="flex items-center justify-between px-6">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/20"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              Top 1 Tech
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="absolute -bottom-10 left-6 right-6 z-10 flex items-end justify-between gap-3">
          <EntityLogo
            src={university.logo}
            alt={name}
            className="h-20 w-20 shrink-0 border-4 border-white bg-white shadow-lg"
            fallbackClassName="text-sm font-bold text-slate-700"
            fallback={university.id.toUpperCase()}
          />
          {featured && (
            <div className="flex flex-row items-end gap-1 pb-1">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                {universityCategory}
              </Badge>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                {universityType}
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
        <h2 className="text-xl font-bold leading-snug text-slate-900">
          {name}
        </h2>

        {featured && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {description}
          </p>
        )}

        <IconList className="mt-4 gap-2.5">
          <IconListItem
            className="gap-2.5 text-sm text-slate-600"
            icon={<Globe className="h-4 w-4 shrink-0 text-slate-400" />}
          >
            <span className="truncate">{university.website || "\u00A0"}</span>
          </IconListItem>
          <IconListItem
            className="gap-2.5 text-sm text-slate-600"
            icon={<MapPin className="h-4 w-4 shrink-0 text-slate-400" />}
          >
            <span className="truncate">{address || "\u00A0"}</span>
          </IconListItem>
          {featured && (
            <IconListItem
              className="gap-2.5 text-sm text-slate-600"
              icon={
                <GraduationCap className="h-4 w-4 shrink-0 text-slate-400" />
              }
            >
              {programCount} {t("miscellaneous.programs.plural")}
            </IconListItem>
          )}
        </IconList>

        {featured && (
          <div className="mt-auto flex items-center gap-3 pt-5">
            <Button
              asChild
              variant="secondary"
              className="h-12 flex-1 rounded-2xl bg-sky-50 p-0 font-semibold text-sky-600 hover:bg-sky-100"
            >
              <Link
                href={href}
                className="flex h-full w-full items-center justify-center"
              >
                {t("miscellaneous.viewProgram")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0 rounded-2xl border-slate-200 p-0 text-slate-500"
            >
              <Link
                href={href}
                className="flex h-full w-full items-center justify-center"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );

  if (featured) {
    return <article className={surface}>{content}</article>;
  }

  return (
    <Link href={href} className={surface}>
      {content}
    </Link>
  );
}
