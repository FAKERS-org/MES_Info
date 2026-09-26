"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { ScholarshipsCardData } from "@/data/scholarships-page";
import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";

export interface ScholarshipListCardProps {
  data: ScholarshipsCardData;
}

/**
 * Scholarships the school publishes: coverage chip plus what it covers. A
 * school with none renders the empty state and points at the app's global
 * scholarship board instead of leaving the tab blank.
 */
export const ScholarshipListCard = ({ data }: ScholarshipListCardProps) => {
  const { lang } = useLanguage();

  return (
    <DetailCard
      className="rounded-3xl p-6 font-sans"
      header={{
        align: "start",
        padding: "",
        className: "mb-4",
        icon: <Icon name="Award" size={26} strokeWidth={2.5} />,
        iconTileClassName: "text-blue-600",
        title: data.header.title,
        titleClassName: "text-lg font-bold text-slate-900",
        subtitle: data.header.subtitle,
        subtitleClassName: "text-slate-600 font-medium",
        badge: data.header.badge && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {data.header.badge}
          </span>
        ),
      }}
      body={false}
    >
      {data.items.length === 0 ? (
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm leading-relaxed text-slate-600">
            {resolveText(data.empty, lang)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={data.board.href}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50"
            >
              <Icon name="Award" className="h-4 w-4" />
              {data.board.label}
            </Link>
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
              >
                <Icon name="Globe" className="h-4 w-4" />
                {resolveText(
                  { kh: "គេហទំព័រសាលា", en: "School website" },
                  lang
                )}
              </a>
            )}
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {data.items.map((item, index) => (
            <li
              key={index}
              className="rounded-2xl border border-slate-100 bg-white p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-800">
                  {resolveText(item.title, lang)}
                </h4>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.color}`}
                >
                  {item.discount}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {resolveText(item.description, lang)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </DetailCard>
  );
};
