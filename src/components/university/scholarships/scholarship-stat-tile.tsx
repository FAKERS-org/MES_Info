import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/shared/icon-renderer";
import { InsetPanel } from "@/components/shared/inset-panel";
import { cn } from "@/lib/utils";
import type { ScholarshipStatData } from "@/data/scholarships-page";
import { badgeTone, heroIconTone, iconTone } from "@/lib/tones";

export interface ScholarshipStatTileProps {
  data: ScholarshipStatData;
  /**
   * `glass` is the translucent tile on the dark hero banner, `muted` the
   * bordered slate tile inside a white section card.
   */
  variant?: "glass" | "muted";
}

/**
 * Label above a large value (plus an optional icon, chips and gloss) — the
 * unit the hero banner and every programme card build their stat rows from.
 */
export function ScholarshipStatTile({
  data,
  variant = "muted",
}: ScholarshipStatTileProps) {
  const { icon, tone = "blue", label, value, caption, chips } = data;
  const glass = variant === "glass";

  const body = (
    <>
      <div className="mb-2 flex items-center gap-2">
        {icon && (
          <Icon
            name={icon}
            className={cn(
              "h-5 w-5 shrink-0",
              glass ? heroIconTone[tone] : iconTone[tone]
            )}
          />
        )}
        <span
          className={cn(
            "text-xs",
            glass ? "text-slate-300" : "font-medium text-muted-foreground"
          )}
        >
          {label}
        </span>
      </div>

      {value && (
        <div
          className={cn(
            glass
              ? "text-3xl font-bold text-white"
              : "text-lg font-bold text-foreground"
          )}
        >
          {value}
        </div>
      )}

      {chips && (
        <div className="mt-1 flex flex-wrap gap-1">
          {chips.map((chip) => (
            <Badge key={chip.label} className={badgeTone[chip.tone]}>
              {chip.label}
            </Badge>
          ))}
        </div>
      )}

      {caption && (
        <p
          className={cn(
            "mt-1 text-xs",
            glass ? "text-slate-400" : "text-muted-foreground"
          )}
        >
          {caption}
        </p>
      )}
    </>
  );

  if (glass) {
    return (
      <Card className="border-0 bg-white/10 p-5 backdrop-blur-sm">
        <CardContent className="p-0">{body}</CardContent>
      </Card>
    );
  }

  return <InsetPanel className="p-3">{body}</InsetPanel>;
}
