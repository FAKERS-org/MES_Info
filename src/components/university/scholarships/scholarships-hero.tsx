import { Icon } from "@/components/shared/icon-renderer";
import { cn } from "@/lib/utils";
import type { ScholarshipsHeroData } from "@/data/scholarships-page";
import { ScholarshipStatTile } from "./scholarship-stat-tile";
import { heroIconTone } from "./tones";

export interface ScholarshipsHeroProps {
  data: ScholarshipsHeroData;
}

/**
 * Banner opening the scholarships tab: headline over the school's own figures.
 * The stats come from the data file, so a school without sample content gets
 * the same banner with its published counts instead of ITC's totals.
 */
export function ScholarshipsHero({ data }: ScholarshipsHeroProps) {
  const { icon, tone, eyebrow, title, accent, description, stats } = data;

  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-6 py-10 text-white">
      <div className="mb-2 flex items-center gap-2">
        <Icon name={icon} className={cn("h-5 w-5", heroIconTone[tone])} />
        <span className="text-sm font-medium text-blue-300">{eyebrow}</span>
      </div>

      <h1 className="mb-4 text-3xl font-bold md:text-4xl">
        {title}
        <br />
        <span className="text-blue-400">{accent}</span>
      </h1>

      <p className="mb-8 max-w-2xl text-sm text-slate-300">{description}</p>

      {stats.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <ScholarshipStatTile
              key={stat.label}
              data={stat}
              variant="glass"
            />
          ))}
        </div>
      )}
    </div>
  );
}
