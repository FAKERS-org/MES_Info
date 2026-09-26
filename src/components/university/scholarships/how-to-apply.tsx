import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon-renderer";
import { IconList, IconListItem } from "@/components/shared/icon-list";
import { InsetPanel } from "@/components/shared/inset-panel";
import { StepList, StepListItem } from "@/components/shared/step-list";
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
      <StepList>
        {steps.map((step) => (
          <StepListItem key={step.number} number={step.number} size="sm">
            <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
            <p className="text-xs text-slate-500">{step.subtitle}</p>
            <p className="text-xs text-slate-600">{step.description}</p>
          </StepListItem>
        ))}
      </StepList>

      {download && (
        <InsetPanel>
          <div className="mb-2 flex items-center gap-2">
            <Icon name="Download" className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-slate-800">
              {download.title}
            </span>
          </div>
          <p className="mb-3 text-xs text-slate-500">{download.caption}</p>
          <Button variant="outline" className="w-full text-sm">
            <Icon name="Download" className="h-4 w-4" />
            {download.file}
          </Button>
        </InsetPanel>
      )}

      {contact && (
        <InsetPanel>
          <h4 className="mb-3 text-sm font-semibold text-slate-800">
            {contact.title}
          </h4>
          <IconList className="gap-2">
            {contact.rows.map((row) => (
              <IconListItem
                key={row.text}
                className="items-center gap-2 text-sm text-slate-700"
                icon={
                  <Icon
                    name={row.icon}
                    className="h-4 w-4 shrink-0 text-blue-500"
                  />
                }
              >
                {row.text}
              </IconListItem>
            ))}
          </IconList>
        </InsetPanel>
      )}

      {action && <ScholarshipApplyButton action={action} block />}
    </ScholarshipCard>
  );
}
