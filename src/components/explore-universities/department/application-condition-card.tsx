import { Calendar, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/department";
import type { ApplicationConditionData } from "@/data/department";
import { Icon } from "./icon-renderer";

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
    <div className={className}>
      <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-2.5 rounded-lg text-indigo-500 flex-shrink-0">
              <Icon name="ShieldCheck" className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              {resolveText(data.header.title, lang)}
            </h2>
          </div>
        </div>
        <div className="p-6 pt-4 space-y-4">
          <ul className="space-y-3">
            {data.requirements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  {resolveText(item.label, lang)}
                </span>
              </li>
            ))}
          </ul>
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
        </div>
      </div>
    </div>
  );
}