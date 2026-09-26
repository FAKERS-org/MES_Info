"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { KeyDatesCardData } from "@/data/admissions-page";
import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";

export interface KeyDatesCardProps {
  data: KeyDatesCardData;
}

/** Intake calendar: one row per date. Only rendered for schools that publish one. */
export const KeyDatesCard = ({ data }: KeyDatesCardProps) => {
  const { lang } = useLanguage();

  return (
    <DetailCard
      className="rounded-3xl p-6 font-sans"
      header={{
        align: "start",
        padding: "",
        className: "mb-4",
        icon: <Icon name="CalendarDays" size={26} strokeWidth={2.5} />,
        iconTileClassName: "text-blue-600",
        title: data.header.title,
        titleClassName: "text-lg font-bold text-slate-900",
        subtitle: data.header.subtitle,
        subtitleClassName: "text-slate-600 font-medium",
      }}
      body={false}
    >
      <ul className="space-y-3">
        {data.items.map((date, index) => (
          <li
            key={index}
            className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
          >
            <Icon
              name={date.icon}
              className="h-5 w-5 shrink-0 text-blue-600"
            />
            <span className="min-w-0 flex-1 text-sm font-medium text-slate-700">
              {resolveText(date.label, lang)}
            </span>
            <span className="shrink-0 text-sm font-bold text-slate-900">
              {date.value}
            </span>
          </li>
        ))}
      </ul>
    </DetailCard>
  );
};
