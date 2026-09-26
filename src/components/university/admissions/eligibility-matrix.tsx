import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon-renderer";
import { InsetPanel } from "@/components/shared/inset-panel";
import { NoticeBox } from "@/components/shared/notice-box";
import { softTone } from "@/lib/tones";
import type { EligibilityMatrixData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";

export interface EligibilityMatrixProps {
  data: EligibilityMatrixData;
}

/** Each entry of a multi-line field renders on its own line. */
function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/** Entry criteria, subject-competency gauges and the associate-degree note. */
export function EligibilityMatrix({ data }: EligibilityMatrixProps) {
  return (
    <AdmissionsCard header={data.header} bodyClassName="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {data.cells.map((cell, index) => (
          <InsetPanel key={index}>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">
                <Lines lines={cell.label} />
              </span>
              <Badge className={softTone[cell.tone]}>
                <Lines lines={cell.badge} />
              </Badge>
            </div>
            <p className="text-sm text-slate-600">
              <Lines lines={cell.note} />
            </p>
          </InsetPanel>
        ))}
      </div>

      <InsetPanel>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-800">
            {data.gauges.title}
          </h4>
          {data.gauges.note && (
            <span className="text-xs text-slate-500">{data.gauges.note}</span>
          )}
        </div>

        <div className="space-y-3">
          {data.gauges.items.map((gauge) => (
            <div key={gauge.label}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  {gauge.label}
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {gauge.requirement}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200">
                <div
                  className="h-2.5 rounded-full bg-blue-500"
                  style={{ width: `${gauge.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </InsetPanel>

      {data.notice && (
        <NoticeBox icon={<Icon name={data.notice.icon} />}>
          {data.notice.text}
        </NoticeBox>
      )}
    </AdmissionsCard>
  );
}
