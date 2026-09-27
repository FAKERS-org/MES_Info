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
        padding: "p-6 pb-4",
        className: "gap-4",
        icon: <Icon name="TrendingUp" className="w-6 h-6" />,
        iconTileClassName: "flex-shrink-0 rounded-lg bg-blue-100 p-3 text-blue-600",
        title: resolveText(data.header.title, lang),
        subtitle: resolveText(data.header.subtitle, lang),
        badge: (
          <span
            className={`px-3 py-1 font-semibold text-xs rounded-full whitespace-nowrap hidden md:inline-block ${data.header.badge.bg} ${data.header.badge.text}`}
          >
            {data.header.badge.label}
          </span>
        ),
      }}
      body={{ padding: "p-6 pt-0 space-y-6" }}
    >
      <TileGrid className="md:grid-cols-2">
        {data.careers.map((career: CareerItem, idx: number) => (
          <div
            key={idx}
            className="bg-slate-50 rounded-xl p-4 border border-slate-100/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 text-sm">
                  {resolveText(career.title, lang)}
                </h3>
                <Icon name={career.icon} className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed min-h-[40px]">
                {resolveText(career.description, lang)}
              </p>
            </div>
            <div className="flex justify-between items-center border-t border-slate-200 pt-3 mt-auto">
              
                {resolveText(data.labels.salary, lang)}
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {career.salary}
              </span>
            </div>
          </div>
        ))}
      </TileGrid>

      <div className="pt-2">
        
          {resolveText(data.labels.partners, lang)}
        </h4>
        <TagList>
          {data.partners.map((partner: string, idx: number) => (
            <Tag
              key={idx}
              className="bg-slate-50 px-3 py-1.5 gap-2"
              icon={<Icon name="Building2" className="w-4 h-4" />}
            >
              {partner}
            </Tag>
          ))}
        </TagList>
      </div>
    </DetailCard>
  );
}
