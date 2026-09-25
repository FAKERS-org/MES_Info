"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";
import type { FacultyCardData } from "@/data/university";

const CourseItem = ({ 
  titleKh, 
  titleEn, 
  badge, 
  degree, 
  years, 
  price, 
  seats, 
  cta,
  deptHref
}: FacultyCardData["courses"][number] & { deptHref: string }) => (
  <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 last:border-0 sm:flex-row sm:items-center">
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-gray-900 font-sans">{titleKh}</h3>
        {badge && (
          <span className="rounded bg-[#E5F5E9] px-1.5 py-0.5 text-[10px] font-medium text-[#2E7D32]">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500">{titleEn}</p>
      
      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <Icon name="GraduationCap" className="h-3.5 w-3.5" /> {degree}
        </span>
        <span className="flex items-center gap-1">
          <Icon name="Clock" className="h-3.5 w-3.5" /> រយៈពេល {years} (5 Years Full-time)
        </span>
      </div>
    </div>

    <div className="flex flex-row items-center justify-between gap-6 sm:flex-col sm:items-end">
      <div className="text-right">
        <div className="font-semibold text-gray-900 text-lg">
          {price} <span className="text-xs font-normal text-gray-500">/ ឆ្នាំ</span>
        </div>
        {seats && <div className="text-[11px] text-gray-400">{seats}</div>}
      </div>
      
      <Link
        href={deptHref}
        className="flex items-center gap-1 rounded bg-[#F0F4F8] px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-[#E2E8F0] transition-colors"
      >
        {cta || "ព័ត៌មានលម្អិត"} <Icon name="ChevronRight" className="h-3 w-3" />
      </Link>
    </div>
  </div>
);

export interface FacultyCardProps {
  data: FacultyCardData;
}

export function FacultyCard({ data }: FacultyCardProps) {
  const params = useParams<{ university: string }>();

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
      {data.courses.map((course, idx) => (
        <CourseItem
          key={idx}
          {...course}
          deptHref={`/explore-universities/${params.university}/${course.departmentId}`}
        />
      ))}
    </DetailCard>
  );
}
