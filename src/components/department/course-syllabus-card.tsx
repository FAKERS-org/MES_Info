"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/department";
import type { CourseSyllabusData } from "@/data/department";
import { Icon } from "./icon-renderer";

export interface CourseSyllabusCardProps {
  data: CourseSyllabusData;
  className?: string;
}

export default function CourseSyllabusCard({ data, className }: CourseSyllabusCardProps) {
  const { lang } = useLanguage();

  return (
    <div className={className}>
      <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 pb-2">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
              <Icon name="BookOpen" className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {resolveText(data.header.title, lang)}
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {data.header.subtitle}
              </p>
              <div className="mt-3 inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                {data.header.highlight.label}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 pt-4 space-y-4">
          {data.sections.map((section, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100/50">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-[#1e293b] text-white rounded-md px-2.5 py-1 text-xs font-semibold">
                  {section.year}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {section.credits}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">
                {resolveText(section.title, lang)}
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed font-noto-khmer">
                {resolveText(section.description, lang)}
              </p>
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-white text-slate-700 border border-slate-200 text-xs px-2.5 py-1 rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {section.badge && (
                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1.5 rounded-md text-sm font-medium text-white ${section.badge.color}`}
                  >
                    {section.badge.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}