import type { ReactNode } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/shared/icon-renderer";
import { cn } from "@/lib/utils";
import type { AdmissionsCardHeader } from "@/data/admissions-page";
import { accentTone } from "./tones";

export interface AdmissionsCardProps {
  /** Card head. Omit for a card that opens with its own body header. */
  header?: AdmissionsCardHeader;
  /** Right aligned slot of the head: download link, badge… */
  headerAction?: ReactNode;
  /** Replaces the `text-xl` default of the head title. */
  titleClassName?: string;
  /** Replaces the `text-sm text-slate-500` default of the subtitle. */
  subtitleClassName?: string;
  /** Replaces the `px-5 pt-2` default of the body. */
  bodyClassName?: string;
  children: ReactNode;
}

/**
 * Shell of the `/explore-universities/{university}/admissions` cards: the
 * `Card` surface plus the head every section repeats (eyebrow → title →
 * subtitle, with `meta`, the icon and an action on the right), so each
 * section component only writes its own body.
 *
 * The head is stacked on purpose: `ui/card`'s `CardHeader` is a flex *row*,
 * which lines the eyebrow, the title and the subtitle up side by side.
 */
export function AdmissionsCard({
  header,
  headerAction,
  titleClassName,
  subtitleClassName,
  bodyClassName,
  children,
}: AdmissionsCardProps) {
  const right =
    header &&
    (header.meta || header.icon || headerAction) && (
      <div className="flex shrink-0 items-center gap-2">
        {header.meta && (
          <span className="text-xs text-slate-400">{header.meta}</span>
        )}
        {header.icon && (
          <Icon
            name={header.icon}
            className={cn("h-5 w-5", accentTone[header.tone ?? "blue"])}
          />
        )}
        {headerAction}
      </div>
    );

  const title = header && (
    <CardTitle
      className={cn("text-xl font-bold text-slate-900", titleClassName)}
    >
      {header.title}
    </CardTitle>
  );

  const subtitle = header?.subtitle && (
    <p className={cn("mt-1 text-sm text-slate-500", subtitleClassName)}>
      {header.subtitle}
    </p>
  );

  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      {header && (
        <div className="flex flex-col px-5 pb-3">
          {header.eyebrow ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider",
                    accentTone[header.tone ?? "blue"]
                  )}
                >
                  {header.eyebrow}
                </span>
                {right}
              </div>
              <div className="mt-1">{title}</div>
              {subtitle}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                {title}
                {right}
              </div>
              {subtitle}
            </>
          )}
        </div>
      )}

      <CardContent className={bodyClassName}>{children}</CardContent>
    </Card>
  );
}
