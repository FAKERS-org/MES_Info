import { CheckCircle2 } from "lucide-react";
import { Icon } from "@/components/shared/icon-renderer";
import { cn } from "@/lib/utils";
import type {
  ScholarshipGroupData,
  ScholarshipListRow,
  ScholarshipPanelData,
  ScholarshipProgramData,
  ScholarshipTone,
} from "@/data/scholarships-page";
import { ScholarshipApplyButton } from "./scholarship-apply-button";
import { ScholarshipCard } from "./scholarship-card";
import { ScholarshipStatTile } from "./scholarship-stat-tile";
import { iconTone, markerTone, panelTone, panelTitleTone } from "./tones";

export interface ScholarshipProgramCardProps {
  data: ScholarshipProgramData;
}

/**
 * One scholarship programme — government quota, ministry award, partner
 * grant… The head, the stat row, the tinted panels, the grouped sub-cards,
 * the note and the deadline/apply footer are all driven by
 * `ScholarshipProgramData`, so a new programme is data, not a new component.
 */
export function ScholarshipProgramCard({ data }: ScholarshipProgramCardProps) {
  const { header, stats, panels, groups, notice, deadline, action } = data;
  const tone = header.tone ?? "blue";

  return (
    <ScholarshipCard header={header} wash>
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {stats.map((stat) => (
            <ScholarshipStatTile key={stat.label} data={stat} />
          ))}
        </div>
      )}

      {panels?.map((panel) => (
        <ScholarshipPanel key={panel.title} panel={panel} />
      ))}

      {groups && groups.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <ScholarshipGroup key={group.title} group={group} />
          ))}
        </div>
      )}

      {notice && (
        <div
          className={cn(
            "flex items-start gap-2 rounded-lg border p-3 text-sm",
            panelTone.amber
          )}
        >
          <Icon
            name={notice.icon ?? "Info"}
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
          />
          <span className="text-amber-800">
            {notice.title && <strong>{notice.title} </strong>}
            {notice.text}
          </span>
        </div>
      )}

      {(deadline || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {deadline && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Icon name="Calendar" className="h-4 w-4" />
              <span>{deadline}</span>
            </div>
          )}
          {action && (
            <ScholarshipApplyButton action={action} fallbackTone={tone} />
          )}
        </div>
      )}
    </ScholarshipCard>
  );
}

/** Tinted block of rows: benefits, eligibility, criteria… */
function ScholarshipPanel({ panel }: { panel: ScholarshipPanelData }) {
  const tone = panel.accent ?? panel.tone;

  return (
    <div className={cn("rounded-lg border p-4", panelTone[panel.tone])}>
      <h4
        className={cn(
          "mb-3 text-sm font-semibold",
          panelTitleTone[panel.tone]
        )}
      >
        {panel.title}
      </h4>

      <div
        className={cn(
          panel.layout === "grid"
            ? "grid grid-cols-1 gap-2 md:grid-cols-3"
            : "space-y-1.5"
        )}
      >
        {panel.items.map((row) => (
          <PanelRow
            key={row.title}
            row={row}
            tone={tone}
            marker={panel.marker}
          />
        ))}
      </div>
    </div>
  );
}

function PanelRow({
  row,
  tone,
  marker,
}: {
  row: ScholarshipListRow;
  tone: ScholarshipTone;
  marker: ScholarshipPanelData["marker"];
}) {
  return (
    <div className="flex items-start gap-2">
      {marker === "check" ? (
        <CheckCircle2
          className={cn("mt-0.5 h-4 w-4 shrink-0", iconTone[tone])}
        />
      ) : (
        <span
          className={cn(
            "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
            markerTone[tone]
          )}
        />
      )}
      <div className="min-w-0">
        <p
          className={cn(
            "text-sm text-slate-600",
            row.caption && "font-medium text-slate-800"
          )}
        >
          {row.title}
        </p>
        {row.caption && <p className="text-xs text-slate-500">{row.caption}</p>}
      </div>
    </div>
  );
}

/** Sub-card of a grouped body: an international partner, an internal fund… */
function ScholarshipGroup({ group }: { group: ScholarshipGroupData }) {
  const accent = group.accent ?? "green";

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon
          name={group.icon}
          className={cn("h-5 w-5 shrink-0", iconTone[group.tone])}
        />
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900">{group.title}</h4>
          {group.subtitle && (
            <p className="text-xs text-slate-500">{group.subtitle}</p>
          )}
        </div>
      </div>

      <ul className="space-y-1.5 text-sm text-slate-600">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle2
              className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", iconTone[accent])}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {group.action && (
        <div className="mt-3">
          <ScholarshipApplyButton
            action={group.action}
            fallbackTone={group.tone}
            variant="outline"
            block
          />
        </div>
      )}
    </div>
  );
}
