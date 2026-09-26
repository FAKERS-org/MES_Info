import { InsetPanel } from "@/components/shared/inset-panel";
import type { AdmissionsFaqData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";

export interface AdmissionsFaqProps {
  data: AdmissionsFaqData;
}

/** Numbered question and answer pairs. */
export function AdmissionsFAQ({ data }: AdmissionsFaqProps) {
  return (
    <AdmissionsCard header={data.header} bodyClassName="space-y-3">
      {data.items.map((faq, index) => (
        <InsetPanel key={index}>
          <div className="mb-2 flex items-start gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              {index + 1}
            </span>
            <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
          </div>
          <p className="ml-8 text-sm text-slate-600">{faq.answer}</p>
        </InsetPanel>
      ))}
    </AdmissionsCard>
  );
}
