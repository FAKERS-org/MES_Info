import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon-renderer";
import type { HowToApplyData } from "@/data/scholarships-page";
import { ScholarshipApplyButton } from "./scholarship-apply-button";
import { ScholarshipCard } from "./scholarship-card";

export interface HowToApplyProps {
  data: HowToApplyData;
}

/**
 * Right-hand rail of the scholarships tab: the four steps, the downloadable
 * guide, the office contacts and the button that starts the application.
 * Everything except the steps comes from the data, so a school without a
 * published contact simply omits it.
 */
export function HowToApply({ data }: HowToApplyProps) {
  const { header, steps, download, contact, action } = data;

  return (
    <ScholarshipCard header={header}>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {step.number}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
              <p className="text-xs text-slate-500">{step.subtitle}</p>
              <p className="text-xs text-slate-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {download && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon
              name="Download"
              className="h-4 w-4 shrink-0 text-blue-600"
            />
            <span className="text-sm font-semibold text-slate-800">
              {download.title}
            </span>
          </div>
          <p className="mb-3 text-xs text-slate-500">{download.caption}</p>
          <Button variant="outline" className="w-full text-sm">
            <Icon name="Download" className="h-4 w-4" />
            {download.file}
          </Button>
        </div>
      )}

      {contact && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-800">
            {contact.title}
          </h4>
          <div className="space-y-2">
            {contact.rows.map((row) => (
              <div
                key={row.text}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <Icon
                  name={row.icon}
                  className="h-4 w-4 shrink-0 text-blue-500"
                />
                <span>{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {action && <ScholarshipApplyButton action={action} block />}
    </ScholarshipCard>
  );
}
