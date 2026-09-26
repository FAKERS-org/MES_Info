import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon-renderer";
import {
  FeatureCard,
  type FeatureCardHeader,
} from "@/components/shared/feature-card";
import { headerWashTone, iconTone, badgeTone } from "@/lib/tones";
import type { ScholarshipsCardHeader } from "@/data/scholarships-page";

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
 * Shell of the `/explore-universities/{university}/scholarships` cards: a
 * thin translation of the section's `ScholarshipsCardHeader` (and its 8-tone
 * palette, which carries the slate, orange and pink `AdmissionsTone` does
 * not) onto the shared {@link FeatureCard}, so each section component only
 * writes its own body.
 */
export function ScholarshipCard({
  header,
  wash = false,
  className,
  children,
}: ScholarshipCardProps) {
  const tone = header?.tone ?? "blue";

  const head: FeatureCardHeader | undefined = header && {
    eyebrow: header.eyebrow,
    title: header.title,
    subtitle: header.subtitle,
    icon: header.icon && (
      <Icon name={header.icon} className="h-5 w-5 shrink-0" />
    ),
    action: header.badge && <Badge className={badgeTone[tone]}>{header.badge}</Badge>,
    accentClassName: iconTone[tone],
    washClassName: wash ? headerWashTone[tone] : undefined,
  };

  return (
    <FeatureCard
      header={head}
      className={className}
      /* The scholarship bodies stack their blocks; the admissions ones ask
         for it explicitly, so the default lives on this wrapper. */
      bodyClassName="space-y-4"
    >
      {children}
    </FeatureCard>
  );
}
