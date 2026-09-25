"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/department";
import type { CourseSyllabusData } from "@/data/department";
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
        className: "gap-4",
        icon: <Icon name="BookOpen" className="w-6 h-6" />,
        iconTileClassName: "flex-shrink-0 rounded-lg bg-blue-100 p-3 text-blue-600",
        title: resolveText(data.header.title, lang),
        subtitle: data.header.subtitle,
        chip: (
          <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {data.header.highlight.label}
          </span>
        ),
      }}
    >
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
          <TagList>
            {section.tags.map((tag, tIdx) => (
              <Tag key={tIdx}>{tag}</Tag>
            ))}
          </TagList>
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
    </DetailCard>
  );
}
