import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon-renderer";
import { cn } from "@/lib/utils";
import type { ImportantDatesData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";
import { iconSoftTone } from "@/lib/tones";

export interface ImportantDatesProps {
  data: ImportantDatesData;
}

/** Deadline banner, the dated milestones and the calendar hand-off. */
export function ImportantDates({ data }: ImportantDatesProps) {
  const { countdown } = data;

  return (
    <AdmissionsCard
      header={data.header}
      titleClassName="text-lg font-bold text-slate-900"
      bodyClassName="space-y-4"
    >
      {countdown && (
        <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm text-slate-300">{countdown.label}</span>
            {countdown.badge && (
              <Badge className="bg-red-500 text-white hover:bg-red-600">
                {countdown.badge}
              </Badge>
            )}
          </div>

          <div className="mb-3">
            <span className="text-3xl font-bold">{countdown.value}</span>
            {countdown.note && (
              <p className="text-sm text-slate-400">{countdown.note}</p>
            )}
          </div>

          {countdown.remainingLabel && (
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
              <Icon name="Clock" className="h-4 w-4" />
              <span>{countdown.remainingLabel}</span>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2">
            {countdown.units.map((unit) => (
              <div
                key={unit.label}
                className="rounded-lg bg-slate-700/50 p-2 text-center"
              >
                <div className="text-2xl font-bold">{unit.value}</div>
                <div className="text-xs text-slate-400">{unit.label}</div>
                <div className="text-xs text-slate-500">{unit.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {data.items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-slate-100 p-3"
          >
            <Icon
              name={item.icon}
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0",
                iconSoftTone[item.tone]
              )}
            />
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {item.title}
              </p>
              <p className="text-sm font-bold text-slate-900">{item.value}</p>
              {item.note && (
                <p className="text-xs text-slate-500">{item.note}</p>
              )}
            </div>
          </div>
        ))}

        {data.action && (
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <Icon name={data.action.icon} className="h-4 w-4" />
            {data.action.label}
          </button>
        )}
      </div>
    </AdmissionsCard>
  );
}
