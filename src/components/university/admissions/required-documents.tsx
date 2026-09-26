import { Icon } from "@/components/shared/icon-renderer";
import { InsetPanel } from "@/components/shared/inset-panel";
import type { RequiredDocumentsData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";

export interface RequiredDocumentsProps {
  data: RequiredDocumentsData;
}

/** Checklist of the papers to hand in, two per row. */
export function RequiredDocuments({ data }: RequiredDocumentsProps) {
  return (
    <AdmissionsCard
      header={data.header}
      headerAction={
        data.action && (
          <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
            <Icon name={data.action.icon} className="h-3 w-3" />
            {data.action.label}
          </button>
        )
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.items.map((doc) => (
          <InsetPanel key={doc.index} className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {doc.index}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{doc.title}</h4>
              {doc.subtitle && (
                <p className="mb-1 text-xs text-slate-500">{doc.subtitle}</p>
              )}
              <p className="text-xs text-slate-600">{doc.description}</p>
            </div>
          </InsetPanel>
        ))}
      </div>
    </AdmissionsCard>
  );
}
