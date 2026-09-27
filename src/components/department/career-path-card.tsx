"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { CareerPathData, CareerItem } from "@/data/department-page";
import { Icon } from "@/components/shared/icon-renderer";
import { DetailCard } from "@/components/shared/detail-card";
import { Tag, TagList } from "@/components/shared/tag-list";
import { TileGrid } from "@/components/shared/tile-grid";

export interface CareerPathCardProps {
  data: CareerPathData;
  className?: string;
}

export default function CareerPathCard({ data, className }: CareerPathCardProps) {
  const { lang } = useLanguage();

  return (
    <DetailCard
      className={className}
      header={{
        align: "start",
        padding: "p-4 pb-2",
        className: "gap-3",
        icon: <Icon name="TrendingUp" className="w-5 h-5" />,
        iconTileClassName: "flex-shrink-0 rounded-lg bg-blue-100 p-2.5 text-blue-600",
        title: resolveText(data.header.title, lang),
        subtitle: resolveText(data.header.subtitle, lang),
        badge: (
          <span
            className={`px-2.5 py-0.5 font-semibold text-xs rounded-full whitespace-nowrap hidden md:inline-block ${data.header.badge.bg} ${data.header.badge.text}`}
          >
            {resolveText(data.header.badge.label, lang)}
          </span>
        ),
      }}
      body={{ padding: "p-4 pt-0 space-y-4" }}
    >
      <TileGrid className="md:grid-cols-2">
        {data.careers.map((career: CareerItem, idx: number) => (
          <div
            key={idx}
            className="bg-slate-50 rounded-lg p-3 border border-slate-100/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-bold text-slate-800 text-sm">
                  {resolveText(career.title, lang)}
                </h3>
                <Icon name={career.icon} className="w-4.5 h-4.5 text-blue-500" />
              </div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed min-h-[36px]">
                {resolveText(career.description, lang)}
              </p>
            </div>
            <div className="flex justify-between items-center border-t border-slate-200 pt-2 mt-auto">
              <span className="text-xs text-slate-500">
                {resolveText(data.labels.salary, lang)}
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {career.salary}
              </span>
            </div>
          </div>
        ))}
      </TileGrid>

      <div className="pt-1.5">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">
          {resolveText(data.labels.partners, lang)}
        </h4>
        <TagList>
          {data.partners.map((partner: string, idx: number) => (
            <Tag
              key={idx}
              className="bg-slate-50 px-2.5 py-1 gap-1.5"
              icon={<Icon name="Building2" className="w-3.5 h-3.5" />}
            >
              {partner}
            </Tag>
          ))}
        </TagList>
      </div>
    </DetailCard>
  );
}