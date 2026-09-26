"use client";

import { useLanguage } from "@/lib/i18n";
import { resolveText } from "@/data/text";
import type { ApplyStepsCardData } from "@/data/admissions-page";
import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";

export interface ApplyStepsCardProps {
  data: ApplyStepsCardData;
}

/**
 * The application flow as numbered steps. Only schools that publish a flow
 * get steps; the others render the fallback pointing at their website, so the
 * tab never shows an empty section.
 */
export const ApplyStepsCard = ({ data }: ApplyStepsCardProps) => {
  const { lang } = useLanguage();

  return (
    <DetailCard
      className="rounded-3xl p-6 font-sans"
      header={{
        align: "start",
        padding: "",
        className: "mb-4",
        icon: <Icon name="Send" size={26} strokeWidth={2.5} />,
        iconTileClassName: "text-blue-600",
        title: data.header.title,
        titleClassName: "text-lg font-bold text-slate-900",
        subtitle: data.header.subtitle,
        subtitleClassName: "text-slate-600 font-medium",
      }}
      body={false}
    >
      {!data.items ? (
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm leading-relaxed text-slate-600">
            {resolveText(data.empty, lang)}
          </p>
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50"
            >
              <Icon name="Globe" className="h-4 w-4" />
              {resolveText(
                { kh: "បើកគេហទំព័រសាលា", en: "Open the school website" },
                lang
              )}
            </a>
          )}
        </div>
      ) : (
        <ol className="space-y-4">
          {data.items.map((step) => (
            <li key={step.index} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                {step.index}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Icon
                    name={step.icon}
                    className="h-4 w-4 shrink-0 text-blue-600"
                  />
                  <h4 className="text-sm font-semibold text-slate-800">
                    {resolveText(step.title, lang)}
                  </h4>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {resolveText(step.description, lang)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </DetailCard>
  );
};
