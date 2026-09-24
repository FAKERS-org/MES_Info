"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/department";
import type { FacilityCardData, FacilityItem } from "@/data/department";
import { Icon } from "./icon-renderer";

export interface FacilityCardProps {
  data: FacilityCardData;
  className?: string;
}

export default function FacilityCard({ data, className }: FacilityCardProps) {
  const { lang } = useLanguage();

  return (
    <div className={className}>
      <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 flex-shrink-0">
              <Icon name="Cpu" className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {resolveText(data.header.title, lang)}
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {resolveText(data.header.subtitle, lang)}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.facilities.map((facility: FacilityItem, idx: number) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-3 border border-slate-100/50 flex flex-col h-full"
              >
                <div className="w-full h-32 rounded-lg overflow-hidden mb-3 relative bg-slate-200">
                  <img
                    src={facility.image}
                    alt={resolveText(facility.title, lang)}
                    className="w-full h-full object-cover"
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
          </div>
        </div>
      </div>
    </div>
  );
}