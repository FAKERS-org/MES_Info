import { Badge } from "@/components/ui/badge";
import { InsetPanel } from "@/components/shared/inset-panel";
import { cn } from "@/lib/utils";
import { softTone } from "@/lib/tones";
import type { RegistrationFeeData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";

export interface RegistrationFeeProps {
  data: RegistrationFeeData;
}

/** What the application costs, in dollars and riel. */
export function RegistrationFee({ data }: RegistrationFeeProps) {
  return (
    <AdmissionsCard
      header={data.header}
      titleClassName="text-lg font-bold text-slate-900"
      subtitleClassName="text-xs text-slate-500"
    >
      <InsetPanel>
        <p className="mb-1 text-xs text-slate-500">{data.label}</p>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">
            {data.price}
          </span>
          {data.divider && (
            <span className="text-sm text-slate-500">{data.divider}</span>
          )}
          {data.strike && (
            <span className="text-sm text-slate-500 line-through">
              {data.strike}
            </span>
          )}
        </div>

        {data.badge && (
          <Badge className={cn("mt-2", softTone[data.badge.tone])}>
            {data.badge.label}
          </Badge>
        )}
      </InsetPanel>
    </AdmissionsCard>
  );
}
