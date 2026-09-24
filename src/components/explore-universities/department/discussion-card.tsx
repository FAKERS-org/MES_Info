"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/department";
import type { DiscussionCardData, ContactItem } from "@/data/department";
import { Icon } from "./icon-renderer";

export interface DiscussionCardProps {
  data: DiscussionCardData;
  className?: string;
}

export default function DiscussionCard({ data, className }: DiscussionCardProps) {
  const { lang } = useLanguage();

  return (
    <div className={className}>
      <div className="w-full bg-[#0e3a53] text-white shadow-md rounded-2xl overflow-hidden relative">
        <div className="p-6 pb-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2.5 rounded-full text-white flex-shrink-0">
              <Icon name="MessageCircle" className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                {resolveText(data.header.title, lang)}
              </h2>
              <p className="text-slate-300 font-medium text-xs">
                {resolveText(data.header.subtitle, lang)}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 pt-2 space-y-6 relative z-10">
          <p className="text-sm text-slate-200 leading-relaxed font-noto-khmer">
            {resolveText(data.description, lang)}
          </p>
          <button className="w-full bg-[#2a7fa8] hover:bg-[#236b8e] text-white font-semibold py-3 rounded-lg text-sm flex justify-center items-center gap-2 transition-colors border-none cursor-pointer">
            <Icon name={data.action.icon} className="w-4 h-4" />
            {resolveText(data.action.label, lang)}
          </button>
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            {data.contacts.map((contact: ContactItem, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-slate-300 text-xs"
              >
                <Icon name={contact.icon} className="w-4 h-4 text-slate-400" />
                <span>{contact.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      </div>
    </div>
  );
}