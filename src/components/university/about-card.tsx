import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";
import { IconList, IconListItem } from "@/components/shared/icon-list";
import type { AboutCardData } from "@/data/university-page";

export interface AboutCardProps {
  data: AboutCardData;
}

/** Short description plus key facts of the university (aside widget). */
export const AboutCard = ({ data }: AboutCardProps) => {
  return (
    <DetailCard
      className="rounded-2xl p-4 font-sans"
      header={{
        align: "start",
        padding: "",
        className: "mb-3",
        icon: <Icon name="Info" size={24} strokeWidth={2.5} />,
        iconTileClassName: "text-blue-600",
        title: data.title,
        titleClassName: "text-lg font-bold text-slate-900",
        subtitle: data.subtitle,
        subtitleClassName: "text-slate-600 font-medium",
      }}
      body={false}
    >
      <p className="text-sm text-slate-600 leading-relaxed mb-3">
        {data.description}
      </p>

      <IconList as="ul" className="gap-2">
        {data.facts.map((fact) => (
          <IconListItem
            as="li"
            key={fact.label}
            icon={
              <Icon
                name={fact.icon}
                className="w-4 h-4 shrink-0 mt-0.5 text-blue-600"
              />
            }
          >
            <span className="text-sm text-slate-700">{fact.label}</span>
          </IconListItem>
        ))}
      </IconList>
    </DetailCard>
  );
};
