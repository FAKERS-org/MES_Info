import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon-renderer";
import { InsetPanel } from "@/components/shared/inset-panel";
import { NoticeBox } from "@/components/shared/notice-box";
import { cn } from "@/lib/utils";
import { buttonTone, iconTone, iconTileTone } from "@/lib/tones";
import type { ResourceHubData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";

export interface ResourceHubProps {
  data: ResourceHubData;
}

/** Exam formats and past papers, plus the calculator rule. */
export function ResourceHub({ data }: ResourceHubProps) {
  return (
    <AdmissionsCard header={data.header} bodyClassName="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.items.map((item) => (
          <InsetPanel key={item.title}>
            <div className="mb-3 flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  iconTileTone[item.tone]
                )}
              >
                <Icon
                  name={item.icon}
                  className={cn("h-4 w-4", iconTone[item.tone])}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h4>
                {item.meta && (
                  <p className="text-xs text-slate-500">{item.meta}</p>
                )}
              </div>
            </div>

            <p className="mb-3 text-xs text-slate-600">{item.description}</p>

            <div className="flex items-center gap-2">
              <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-300">
                {item.file}
              </Badge>
              <button
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-white",
                  buttonTone[item.tone]
                )}
              >
                <Icon name="Download" className="h-3 w-3" />
                {item.downloadLabel}
              </button>
            </div>
          </InsetPanel>
        ))}
      </div>

      {data.note && (
        <NoticeBox
          icon={<Icon name={data.note.icon} />}
          title={data.note.title}
          action={
            data.note.action && (
              <button className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700">
                {data.note.action}
              </button>
            )
          }
        >
          {data.note.text}
        </NoticeBox>
      )}
    </AdmissionsCard>
  );
}
