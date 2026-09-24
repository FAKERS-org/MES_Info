"use client";

import { Building2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/department";
import type { CareerPathData, CareerItem } from "@/data/department";
import { Icon } from "./icon-renderer";

export interface CareerPathCardProps {
  data: CareerPathData;
  className?: string;
}

export default function CareerPathCard({ data, className }: CareerPathCardProps) {
  const { lang } = useLanguage();

  return (
    <div className={className}>
      <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                <Icon name="TrendingUp" className="w-6 h-6" />
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
            <span
              className={`px-3 py-1 font-semibold text-xs rounded-full whitespace-nowrap hidden md:inline-block ${data.header.badge.bg} ${data.header.badge.text}`}
            >
              {data.header.badge.label}
            </span>
          </div>
        </div>
        <div className="p-6 pt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.careers.map((career: CareerItem, idx: number) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-4 border border-slate-100/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 text-sm">
                      {career.title}
                    </h3>
                    <Icon name={career.icon} className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed min-h-[40px]">
                    {resolveText(career.description, lang)}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 pt-3 mt-auto">
                  <span className="text-xs font-semibold text-slate-500">
                    ចន្លោះប្រាក់ខែជាមូល
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    {career.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              ដៃគូរួមសហការជាមួយ (TOP HIRING PARTNERS & INDUSTRY SPONSORS)
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.partners.map((partner: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 font-medium flex items-center gap-2 text-xs rounded-md"
                >
                  <Building2 className="w-4 h-4" /> {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}