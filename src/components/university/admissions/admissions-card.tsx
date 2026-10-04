import type { ReactNode } from "react";
import { Icon } from "@/components/shared/icon-renderer";
import {
  FeatureCard,
  type FeatureCardHeader,
} from "@/components/shared/feature-card";
import { iconTone } from "@/lib/tones";
import type { AdmissionsCardHeader } from "@/data/admissions-page";

export interface AdmissionsCardProps {
  /** Card head. Omit for a card that opens with its own body header. */
  header?: AdmissionsCardHeader;
  /** Right aligned slot of the head: download link, badge… */
  headerAction?: ReactNode;
  /** Merged into the `text-xl font-bold text-foreground` title. */
  titleClassName?: string;
  /** Merged into the `text-sm text-muted-foreground` subtitle. */
  subtitleClassName?: string;
  /** Merged into the `px-5 pb-5 pt-4` body. */
  bodyClassName?: string;
  children: ReactNode;
}

/**
 * Shell of the `/explore-universities/{university}/admissions` cards: a thin
 * translation of the section's `AdmissionsCardHeader` (and its 5-tone
 * palette) onto the shared {@link FeatureCard}, so each section component
 * only writes its own body.
 */
export function AdmissionsCard({
  header,
  headerAction,
  titleClassName,
  subtitleClassName,
  bodyClassName,
  children,
}: AdmissionsCardProps) {
  const head: FeatureCardHeader | undefined = header && {
    eyebrow: header.eyebrow,
    title: header.title,
    subtitle: header.subtitle,
    icon: header.icon && (
      <Icon name={header.icon} className="h-5 w-5 shrink-0" />
    ),
    action:
      (header.meta || headerAction) && (
        <>
          {header.meta && (
            <span className="text-xs text-muted-foreground/70">{header.meta}</span>
          )}
          {headerAction}
        </>
      ),
    accentClassName: iconTone[header.tone ?? "blue"],
    titleClassName,
    subtitleClassName,
  };

  return (
    <FeatureCard header={head} bodyClassName={bodyClassName}>
      {children}
    </FeatureCard>
  );
}
