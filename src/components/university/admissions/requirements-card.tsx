"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { RequirementsCardData } from "@/data/admissions-page";
import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";

export interface RequirementsCardProps {
  data: RequirementsCardData;
}

/**
 * Admission requirements of every program, grouped under the unit the school
 * itself names. A program whose requirements are not seeded shows a muted
 * "not published yet" line instead of disappearing — the card only falls back
 * to the empty state when the school publishes nothing at all.
 */
export const RequirementsCard = ({ data }: RequirementsCardProps) => {
  const { lang } = useLanguage();
  const published = data.groups.some((group) => group.lines.length > 0);

  return (
    <DetailCard
      className="rounded-3xl p-6 font-sans"
      header={{
        align: "start",
        padding: "",
        className: "mb-4",
        icon: <Icon name="ShieldCheck" size={26} strokeWidth={2.5} />,
        iconTileClassName: "text-blue-600",
        title: data.header.title,
        titleClassName: "text-lg font-bold text-slate-900",
        subtitle: data.header.subtitle,
        subtitleClassName: "text-slate-600 font-medium",
        badge: data.header.badge && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            {data.header.badge}
          </span>
        ),
      }}
      body={false}
    >
      {!published ? (
        <p className="text-sm leading-relaxed text-slate-600">
          {resolveText(data.empty, lang)}
        </p>
      ) : (
        data.groups.map((group, index) => (
          <div
            key={group.unit.en}
            className={
              index > 0 ? "mt-5 border-t border-slate-100 pt-5" : undefined
            }
          >
            <div className="mb-3 flex flex-wrap items-baseline gap-x-2">
              <Icon
                name="Building2"
                className="h-4 w-4 shrink-0 self-center text-slate-400"
              />
              <span className="text-sm font-semibold text-slate-700">
                {resolveText(group.unit, lang)}
              </span>
            </div>

            {group.lines.length === 0 ? (
              <p className="text-xs text-slate-400">
                {resolveText(data.pending, lang)}
              </p>
            ) : (
              <ul className="space-y-2.5">
                {group.lines.map((line, lineIndex) => (
                  <li key={lineIndex} className="flex items-start gap-2.5">
                    <Icon
                      name="CheckCircle2"
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                    />
                    <span className="text-sm leading-relaxed text-slate-700">
                      {resolveText(line, lang)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </DetailCard>
  );
};
