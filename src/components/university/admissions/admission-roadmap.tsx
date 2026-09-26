import { Badge } from "@/components/ui/badge";
import type { AdmissionRoadmapData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";
import { softTone } from "./tones";

export interface AdmissionRoadmapProps {
  data: AdmissionRoadmapData;
}

/** Numbered, dated steps of the application flow. */
export function AdmissionRoadmap({ data }: AdmissionRoadmapProps) {
  return (
    <AdmissionsCard header={data.header} bodyClassName="space-y-4">
      {data.steps.map((step, index) => (
        <div key={step.number} className="flex gap-4">
          <div className="flex shrink-0 flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {step.number}
            </div>
            {index < data.steps.length - 1 && (
              <div className="mt-2 h-full w-0.5 bg-slate-200" />
            )}
          </div>

          <div className="flex-1 pb-6">
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
          </div>
        </div>
      ))}
    </AdmissionsCard>
  );
}
