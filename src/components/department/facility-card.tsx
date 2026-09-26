"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { FacilityCardData, FacilityItem } from "@/data/department-page";
import { Icon } from "@/components/shared/icon-renderer";
import { DetailCard } from "@/components/shared/detail-card";
import { TileGrid } from "@/components/shared/tile-grid";
import Image from "next/image";

export interface FacilityCardProps {
  data: FacilityCardData;
  className?: string;
}

export default function FacilityCard({ data, className }: FacilityCardProps) {
  const { lang } = useLanguage();

  return (
    <DetailCard
      className={className}
      header={{
        padding: "p-6 pb-4",
        className: "gap-4",
        icon: <Icon name="Cpu" className="w-6 h-6" />,
        iconTileClassName: "flex-shrink-0 rounded-lg bg-emerald-100 p-3 text-emerald-600",
        title: resolveText(data.header.title, lang),
        subtitle: resolveText(data.header.subtitle, lang),
      }}
      body={{ padding: "p-6 pt-0" }}
    >
      <TileGrid className="md:grid-cols-3">
        {data.facilities.map((facility: FacilityItem, idx: number) => (
          <div
            key={idx}
            className="bg-slate-50 rounded-xl p-3 border border-slate-100/50 flex flex-col h-full"
          >
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3 bg-slate-200">
              <Image
                fill
                src={facility.image}
                alt={resolveText(facility.title, lang)}
                sizes="(min-width: 768px) 250px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-2 mb-2 text-slate-700">
              <span className="text-emerald-500">
                <Icon name={facility.icon} className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-slate-800 text-sm leading-tight">
                {resolveText(facility.title, lang)}
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {resolveText(facility.description, lang)}
            </p>
          </div>
        ))}
      </TileGrid>
    </DetailCard>
  );
}
