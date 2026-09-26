import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon-renderer";
import type { ContactCardData } from "@/data/admissions-page";
import { AdmissionsCard } from "./admissions-card";
import { softTone } from "./tones";

export interface ContactCardProps {
  data: ContactCardData;
}

/**
 * Admissions officer and how to reach them. A person without a photo shows
 * their initials — `public/` ships no placeholder avatar, so the old
 * `<img src="/avatar-placeholder.png">` was a broken image on every school.
 */
export function ContactCard({ data }: ContactCardProps) {
  const { person, rows, action } = data;

  return (
    <AdmissionsCard
      header={data.header}
      titleClassName="text-lg font-bold text-slate-900"
      bodyClassName="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-500">
              {person.name.slice(0, 2)}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900">{person.name}</p>
          {person.role && (
            <p className="text-xs text-slate-500">{person.role}</p>
          )}
          {person.badge && (
            <Badge className={`mt-1 ${softTone.green}`}>{person.badge}</Badge>
          )}
        </div>
      </div>

      <div className="space-y-2 rounded-lg bg-slate-50 p-3">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-slate-700"
          >
            <Icon
              name={row.icon}
              className="h-4 w-4 shrink-0 text-blue-500"
            />
            <span>{row.text}</span>
          </div>
        ))}
      </div>

      {action && (
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 text-sm font-medium text-white transition hover:bg-blue-700">
          <Icon name={action.icon} className="h-4 w-4" />
          {action.label}
        </button>
      )}
    </AdmissionsCard>
  );
}
