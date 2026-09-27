"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";
import { useLanguage } from "@/lib/i18n";
import type { FacultyCardData } from "@/data/university-page";

type Course = FacultyCardData["groups"][number]["courses"][number];

/** Widget wording the card owns, in both languages. */
const COPY = {
  duration: { kh: "រយៈពេល", en: "Duration" },
  perYear: { kh: "/ ឆ្នាំ", en: "/ year" },
  details: { kh: "ព័ត៌មានលម្អិត", en: "Details" },
  programs: { kh: "ជំនាញ", en: "Programs" },
} as const;

const CourseItem = ({
  titleKh,
  titleEn,
  badge,
  typeLabel,
  typeWarn,
  note,
  degree,
  years,
  price,
  seats,
  cta,
  deptHref,
}: Course & { deptHref: string }) => {
  const { lang } = useLanguage();
  /* The heading follows the reader's language and the other name becomes the
     sub-line, rather than pinning Khmer as the heading for everyone — which is
     what left an English reader looking at a Khmer course list. */
  const heading = lang === "en" ? titleEn : titleKh;
  const subheading = lang === "en" ? titleKh : titleEn;

  return (
  <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 last:border-0 sm:flex-row sm:items-center">
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-semibold text-gray-900 font-sans">{heading}</h3>
        {/* What the row is at its own school: readers should not have to parse
            the official title to know it is a faculty, a department or a
            foundation year. */}
        <span
          className={
            typeWarn
              ? "rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700"
              : "rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500"
          }
        >
          {typeLabel}
        </span>
        {badge && (
          <span className="rounded bg-[#E5F5E9] px-1.5 py-0.5 text-[10px] font-medium text-[#2E7D32]">
            {badge}
          </span>
        )}
      </div>
      {subheading !== heading && (
        <p className="text-sm text-gray-500">{subheading}</p>
      )}

      {/* Non-degree entries (foundation year) explain themselves in one line. */}
      {note && (
        <p className="inline-block rounded border border-amber-100 bg-amber-50 px-2 py-1 text-[11px] leading-relaxed text-amber-700">
          {note}
        </p>
      )}

      {/* Degree / duration — only shown for departments that publish them. */}
      {(degree || years) && (
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-600">
          {degree && (
            <span className="flex items-center gap-1">
              <Icon name="GraduationCap" className="h-3.5 w-3.5" /> {degree}
            </span>
          )}
          {years && (
            <span className="flex items-center gap-1">
              <Icon name="Clock" className="h-3.5 w-3.5" /> {COPY.duration[lang]} {years}
            </span>
          )}
        </div>
      )}
    </div>

    <div className="flex flex-row items-center justify-between gap-6 sm:flex-col sm:items-end">
      {/* Tuition — hidden when the department has no published fee. */}
      {(price || seats) && (
        <div className="text-right">
          {price && (
            <div className="font-semibold text-gray-900 text-lg">
              {price} <span className="text-xs font-normal text-gray-500">{COPY.perYear[lang]}</span>
            </div>
          )}
          {seats && <div className="text-[11px] text-gray-400">{seats}</div>}
        </div>
      )}
      <Link
        href={deptHref}
        className="flex items-center gap-1 rounded bg-[#F0F4F8] px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-[#E2E8F0] transition-colors"
      >
        {cta || COPY.details[lang]} <Icon name="ChevronRight" className="h-3 w-3" />
      </Link>
    </div>
  </div>
  );
};

export interface FacultyCardProps {
  data: FacultyCardData;
}

export function FacultyCard({ data }: FacultyCardProps) {
  const params = useParams<{ university: string }>();
  const { lang } = useLanguage();

  return (
    <DetailCard
      className="border-gray-200"
      header={{
        padding: "p-4",
        className: "bg-[#0B1B36] text-white",
        icon: <Icon name="Zap" className="h-5 w-5 text-white" />,
        iconTileClassName: "flex h-10 w-10 items-center justify-center rounded bg-white/10",
        title: data.header.title,
        titleClassName: "font-bold font-sans text-white",
        subtitle: data.header.subtitle,
        subtitleClassName: "text-xs text-gray-300",
        badge: (
          <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium">
            {data.header.badge}
          </span>
        ),
      }}
      body={{ padding: "", className: "flex flex-col" }}
    >
      {/* One section per parent unit when the school has a faculty layer;
          a single untitled section when it is flat. */}
      {data.groups.map((group, groupIndex) => (
        <div
          key={group.title ?? "all"}
          className={groupIndex > 0 ? "border-t border-gray-100" : undefined}
        >
          {group.title && (
            <div className="flex items-center justify-between gap-3 bg-gray-50 px-5 py-3">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icon name="Building2" className="h-4 w-4 text-gray-400" />
                {group.title}
              </span>
              <span className="shrink-0 text-xs text-gray-400">
                {group.courses.length} {COPY.programs[lang]}
              </span>
            </div>
          )}

          {group.courses.map((course) => (
            <CourseItem
              key={course.departmentId}
              {...course}
              deptHref={`/explore-universities/${params.university}/${course.departmentId}`}
            />
          ))}
        </div>
      ))}
    </DetailCard>
  );
}
