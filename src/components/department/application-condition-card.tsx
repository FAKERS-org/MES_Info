"use client";

import { Calendar, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/department";
import type { ApplicationConditionData } from "@/data/department";
import { Icon } from "@/components/shared/icon-renderer";
import { DetailCard } from "@/components/shared/detail-card";
import { IconList, IconListItem } from "@/components/shared/icon-list";

export interface ApplicationConditionCardProps {
  data: ApplicationConditionData;
  className?: string;
}

export default function ApplicationConditionCard({
  data,
  className,
}: ApplicationConditionCardProps) {
  const { lang } = useLanguage();

  return (
    <DetailCard
      className={className}
      header={{
        icon: <Icon name="ShieldCheck" className="w-5 h-5" />,
        iconTileClassName:
          "flex-shrink-0 rounded-lg bg-indigo-50 p-2.5 text-indigo-500",
        title: resolveText(data.header.title, lang),
        titleClassName: "text-lg font-bold text-slate-800",
      }}
    >
      <IconList as="ul">
        {data.requirements.map((item, idx) => (
          <IconListItem
            key={idx}
            as="li"
            icon={<CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />}
          >
            <span className="text-sm text-slate-700">
              {resolveText(item.label, lang)}
            </span>
          </IconListItem>
        ))}
      </IconList>

      <div className="bg-[#eff6ff] rounded-xl p-4 flex items-center gap-3 mt-4">
        <div className="text-blue-600">
          <Calendar size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium mb-0.5">
            {resolveText(data.deadline.label, lang)}
          </p>
          <p className="text-sm font-bold text-slate-800">
            {data.deadline.value}
          </p>
        </div>
      </div>
    </DetailCard>
  );
}
