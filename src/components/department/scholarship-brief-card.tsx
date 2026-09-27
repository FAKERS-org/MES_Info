"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { ScholarshipBriefData } from "@/data/department-page";
import { Icon } from "@/components/shared/icon-renderer";
import { DetailCard } from "@/components/shared/detail-card";

export interface ScholarshipBriefCardProps {
  data: ScholarshipBriefData;
  className?: string;
}

export default function ScholarshipBriefCard({
  data,
  className,
}: ScholarshipBriefCardProps) {
  const { lang } = useLanguage();

  return (
    <DetailCard
      className={className}
      header={{
        icon: <Icon name="Wallet" className="w-5 h-5" />,
        iconTileClassName: "flex-shrink-0 rounded-lg bg-emerald-100 p-2 text-emerald-600",
        title: resolveText(data.header.title, lang),
        titleClassName: "text-lg font-bold text-slate-800",
        badge: (
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-semibold ${data.header.status.bg} ${data.header.status.text}`}
          >
            {resolveText(data.header.status.label, lang)}
          </span>
        ),
      }}
      body={{ padding: "p-4 pt-2 space-y-3" }}
    >
      {data.scholarships.map((item, idx) => (
        <div key={idx}>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-start gap-2">
              <h4 className="font-bold text-slate-800 text-sm">
                {resolveText(item.title, lang)}
              </h4>
              <span
                className={`${item.color} px-2 py-0.5 rounded-md font-bold text-xs whitespace-nowrap`}
              >
                {resolveText(item.discount, lang)}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {resolveText(item.description, lang)}
            </p>
          </div>
          {idx !== data.scholarships.length - 1 && (
            <div className="h-px bg-slate-100 w-full my-3" />
          )}
        </div>
      ))}
    </DetailCard>
  );
}