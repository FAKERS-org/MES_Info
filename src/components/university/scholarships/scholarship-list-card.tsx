"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { ScholarshipsCardData } from "@/data/scholarships-page";
import { Icon } from "@/components/shared/icon-renderer";
import { ScholarshipCard } from "./scholarship-card";

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
    <ScholarshipCard
      header={{
        icon: "Award",
        tone: "blue",
        title: data.header.title,
        subtitle: data.header.subtitle,
        badge: data.header.badge,
      }}
    >
      {data.items.length === 0 ? (
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm leading-relaxed text-slate-600">
            {resolveText(data.empty, lang)}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Link
              href={data.board.href}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50"
            >
              <Icon name="Award" className="h-3.5 w-3.5" />
              {data.board.label}
            </Link>
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
              >
                <Icon name="Globe" className="h-3.5 w-3.5" />
                {resolveText({ kh: "គេហទំព័រសាលា", en: "School website" }, lang)}
              </a>
            )}
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {data.items.map((item, index) => (
            <li
              key={index}
              className="rounded-xl border border-slate-100 bg-white p-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <h4 className="text-sm font-bold text-slate-800">
                  {resolveText(item.title, lang)}
                </h4>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${item.color}`}
                >
                  {resolveText(item.discount, lang)}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {resolveText(item.description, lang)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </ScholarshipCard>
  );
};