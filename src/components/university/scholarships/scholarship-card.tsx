import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/shared/icon-renderer";
import { cn } from "@/lib/utils";
import type { ScholarshipsCardHeader } from "@/data/scholarships-page";
import { badgeTone, eyebrowTone, headerWashTone } from "./tones";

export interface ScholarshipCardProps {
  /** Card head. Omit for a card that opens with its own body header. */
  header?: ScholarshipsCardHeader;
  /** Paints the tone wash behind the head — the programme cards carry one. */
  wash?: boolean;
  /** Extra classes on the card surface. */
  className?: string;
  children: ReactNode;
}

/**
 * Shell of the `/explore-universities/{university}/scholarships` cards: the
 * `Card` surface plus the head every section repeats (eyebrow → title →
 * subtitle, with the badge and the icon on the right), so each section
 * component only writes its own body.
 *
 * It mirrors `university/admissions/admissions-card.tsx` on purpose — same
 * head order, same rhythm — but speaks `ScholarshipTone`, which carries the
 * slate, orange and pink the seat allocation needs and `AdmissionsTone`
 * does not, and can wash the head with the tone's gradient.
 *
 * The head is stacked on purpose: `ui/card`'s `CardHeader` is a flex *row*,
 * which lines the eyebrow, the title and the subtitle up side by side.
 */
export function ScholarshipCard({
  header,
  wash = false,
  className,
  children,
}: ScholarshipCardProps) {
  const tone = header?.tone ?? "blue";

  const badge =
    header?.badge && (
      <Badge className={badgeTone[tone]}>{header.badge}</Badge>
    );

  const subtitle = header?.subtitle && (
    <p className="mt-1 text-sm text-slate-500">{header.subtitle}</p>
  );

  return (
    <Card
      className={cn("overflow-hidden border-0 p-0 shadow-sm", className)}
    >
      {header && (
        <div
          className={cn(
            "flex flex-col px-5 py-4",
            wash && headerWashTone[tone]
          )}
        >
          {header.eyebrow ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <div
                  className={cn(
                    "flex min-w-0 items-center gap-2",
                    eyebrowTone[tone]
                  )}
                >
                  {header.icon && (
                    <Icon
                      name={header.icon}
                      className="h-5 w-5 shrink-0"
                    />
                  )}
                  <span className="truncate text-xs font-semibold uppercase tracking-wider">
                    {header.eyebrow}
                  </span>
                </div>
                {badge}
              </div>
              <CardTitle className="mt-2 text-xl font-bold text-slate-900">
                {header.title}
              </CardTitle>
              {subtitle}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="min-w-0 text-xl font-bold text-slate-900">
                  {header.title}
                </CardTitle>
                <div className="flex shrink-0 items-center gap-2">
                  {badge}
                  {header.icon && (
                    <Icon
                      name={header.icon}
                      className={cn("h-5 w-5", eyebrowTone[tone])}
                    />
                  )}
                </div>
              </div>
              {subtitle}
            </>
          )}
        </div>
      )}

      <CardContent className="space-y-4 px-5 pb-5 pt-4">{children}</CardContent>
    </Card>
  );
}
