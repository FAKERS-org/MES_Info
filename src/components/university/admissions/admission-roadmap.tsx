import { Badge } from "@/components/ui/badge";
import { StepList, StepListItem } from "@/components/shared/step-list";
import { softTone } from "@/lib/tones";
import type { AdmissionRoadmapData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";

export interface AdmissionRoadmapProps {
  data: AdmissionRoadmapData;
}

/** Numbered, dated steps of the application flow. */
export function AdmissionRoadmap({ data }: AdmissionRoadmapProps) {
  return (
    <AdmissionsCard header={data.header} bodyClassName="space-y-4">
      <StepList className="gap-4">
        {data.steps.map((step, index) => (
          <StepListItem
            key={step.number}
            number={step.number}
            connector={index < data.steps.length - 1}
            className="gap-4"
            contentClassName="pb-6"
          >
            <h4 className="mb-1 text-base font-bold text-slate-900">
              {step.title}
            </h4>
            <Badge className={`mb-2 ${softTone[step.dateTone]} hover:opacity-80`}>
              {step.date}
            </Badge>
            <p className="text-sm text-slate-600">{step.description}</p>
            {step.note && (
              <p className="mt-1 text-xs text-slate-500">{step.note}</p>
            )}
          </StepListItem>
        ))}
      </StepList>
    </AdmissionsCard>
  );
}
