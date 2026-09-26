import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DepartmentAllocationData } from "@/data/scholarships-page";
import { ScholarshipCard } from "./scholarship-card";
import { badgeTone, barTone } from "./tones";

export interface DepartmentAllocationProps {
  data: DepartmentAllocationData;
}

/**
 * Seats per department with each one's share of the total. The total and the
 * percentages are summed from the data, so editing a count can never leave
 * the header badge and the bars disagreeing.
 */
export function DepartmentAllocation({ data }: DepartmentAllocationProps) {
  const { header, departments, summary } = data;
  const total = departments.reduce((sum, dept) => sum + dept.count, 0);

  return (
    <ScholarshipCard
      wash
      header={{
        ...header,
        badge: header.badge?.replace("{total}", String(total)),
      }}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {departments.map((dept) => {
          const share = total > 0 ? (dept.count / total) * 100 : 0;

          return (
            <div
              key={dept.code}
              className="rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <Badge className={badgeTone[dept.tone]}>{dept.code}</Badge>
                <span className="text-2xl font-bold text-slate-900">
                  {dept.count}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{dept.name}</h4>
              <p className="text-xs text-slate-500">{dept.nameEn}</p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className={cn("h-1.5 rounded-full", barTone[dept.tone])}
                  style={{ width: `${share}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {share.toFixed(1)}% of total
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg bg-slate-50 p-4 text-center">
        <p className="text-sm text-slate-600">
          {summary.label}{" "}
          <span className="font-bold text-slate-900">
            {total} {summary.unit}
          </span>
        </p>
        <p className="text-xs text-slate-500">{summary.caption}</p>
      </div>
    </ScholarshipCard>
  );
}
