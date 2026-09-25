"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/department";
import type { DiscussionCardData, ContactItem } from "@/data/department";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/shared/icon-renderer";
import { PromoCard } from "@/components/shared/promo-card";
import { IconList, IconListItem } from "@/components/shared/icon-list";

export interface DiscussionCardProps {
  data: DiscussionCardData;
  className?: string;
}

export default function DiscussionCard({ data, className }: DiscussionCardProps) {
  const { lang } = useLanguage();

  return (
    <PromoCard
      className={cn("rounded-2xl border-0 bg-[#0e3a53] shadow-md", className)}
      icon={<Icon name="MessageCircle" className="w-6 h-6" />}
      iconTileClassName="flex-shrink-0 rounded-full bg-white/10 p-2.5 text-white"
      title={resolveText(data.header.title, lang)}
      titleClassName="text-lg font-bold text-white mb-1"
      subtitle={resolveText(data.header.subtitle, lang)}
      subtitleClassName="text-xs font-medium text-slate-300"
      headerPadding="p-6 pb-4"
      description={resolveText(data.description, lang)}
      descriptionClassName="text-sm text-slate-200 leading-relaxed font-noto-khmer"
      action={{
        icon: <Icon name={data.action.icon} className="w-4 h-4" />,
        label: resolveText(data.action.label, lang),
        className:
          "bg-[#2a7fa8] hover:bg-[#236b8e] text-white font-semibold py-3 rounded-lg text-sm border-none cursor-pointer",
      }}
      bodyPadding="p-6 pt-2 space-y-6"
      bodyClassName="relative z-10"
      decor={
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      }
    >
      <IconList className="pt-4 border-t border-white/10">
        {data.contacts.map((contact: ContactItem, idx: number) => (
          <IconListItem
            key={idx}
            className="items-center text-slate-300 text-xs"
            icon={<Icon name={contact.icon} className="w-4 h-4 text-slate-400" />}
          >
            <span>{contact.value}</span>
          </IconListItem>
        ))}
      </IconList>
    </PromoCard>
  );
}
