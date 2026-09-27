"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { CourseSyllabusData } from "@/data/department-page";
import { Icon } from "@/components/shared/icon-renderer";
import { DetailCard } from "@/components/shared/detail-card";
import { Tag, TagList } from "@/components/shared/tag-list";

export interface CourseSyllabusCardProps {
  data: CourseSyllabusData;
  className?: string;
}

export default function CourseSyllabusCard({ data, className }: CourseSyllabusCardProps) {
  const { lang } = useLanguage();

  return (
    <DetailCard
      className={className}
      header={{
        align: "start",
        className: "gap-3",
        icon: <Icon name="BookOpen" className="w-5 h-5" />,
        iconTileClassName: "flex-shrink-0 rounded-lg bg-blue-100 p-2.5 text-blue-600",
        title: resolveText(data.header.title, lang),
        subtitle: resolveText(data.header.subtitle, lang),
        chip: (
          <span className="mt-2 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {resolveText(data.header.highlight.label, lang)}
          </span>
        ),
      }}
    >
      {data.sections.map((section, idx) => (
        <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-100/50">
          <div className="flex justify-between items-center mb-2">
            <span className="bg-[#1e293b] text-white rounded-md px-2 py-0.5 text-xs font-semibold">
              {resolveText(section.year, lang)}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {resolveText(section.credits, lang)}
            </span>
          </div>
          <h3 className="font-bold text-slate-800 mb-1.5">
            {resolveText(section.title, lang)}
          </h3>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed font-noto-khmer">
            {resolveText(section.description, lang)}
          </p>
          <TagList>
            {section.tags.map((tag, tIdx) => (
              <Tag key={tIdx}>{tag}</Tag>
            ))}
          </TagList>
          {section.badge && (
            <div className="mt-3">
              <span
                className={`inline-block px-2.5 py-1 rounded-md text-sm font-medium text-white ${section.badge.color}`}
              >
                {resolveText(section.badge.label, lang)}
              </span>
            </div>
          )}
        </div>
      ))}
    </DetailCard>
  );
}