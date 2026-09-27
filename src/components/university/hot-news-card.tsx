import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";
import { IconList, IconListItem } from "@/components/shared/icon-list";
import type { HotNewsCardData } from "@/data/university-page";

export interface HotNewsCardProps {
  data: HotNewsCardData;
}

export const HotNewsCard = ({ data }: HotNewsCardProps) => {
  return (
    <DetailCard
      className="border-gray-200 p-4 space-y-3 font-sans"
      header={{
        padding: "",
        className: "gap-2 border-b border-gray-100 pb-2",
        icon: <Icon name="Info" className="h-4.5 w-4.5 text-[#1E3A8A]" />,
        iconTileClassName: "flex-shrink-0",
        title: data.header.title,
        titleClassName: "font-semibold text-gray-900",
        badge: <span className="text-xs text-gray-400">{data.header.badge}</span>,
      }}
      body={false}
    >
      {/* Card 1: BacII */}
      <div className="rounded-lg bg-[#F8FAFC] p-3 text-sm">
        <div className="mb-1.5 flex items-center gap-1.5 font-medium text-gray-800">
          <Icon name="ShieldCheck" className="h-4 w-4 text-[#1E3A8A]" />
          {data.highlight.title}
        </div>
        <p className="text-xs leading-relaxed text-gray-600">
          {data.highlight.description}
        </p>
        <a href="#" className="mt-1.5 inline-block text-xs font-medium text-[#1E3A8A] hover:underline">
          {data.highlight.action}
        </a>
      </div>

      {/* Card 2: Exam Date */}
      <div className="rounded-lg bg-[#F8FAFC] p-3">
        <div className="mb-1.5 flex items-start justify-between">
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
            {data.exam.label}
          </div>
          <span className="rounded bg-[#FFE4E6] px-2 py-0.5 text-[10px] font-semibold text-[#E11D48]">
            {data.exam.registrants}
          </span>
        </div>
        <h4 className="mb-0.5 font-semibold text-gray-900">{data.exam.date}</h4>
        <p className="text-xs text-gray-500">{data.exam.place}</p>
      </div>

      {/* Stats Section */}
      <IconList className="pt-1.5 text-sm text-gray-700">
        {data.facts.map((fact, idx) => (
          <IconListItem
            key={idx}
            className="items-center gap-1.5"
            icon={<Icon name={fact.icon} className="h-4 w-4 text-[#1E3A8A]" />}
          >
            <span>{fact.label}</span>
          </IconListItem>
        ))}

        {/* Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5 text-gray-600">
              <Icon name={data.employment.icon} className="h-3.5 w-3.5 text-[#1E3A8A]" /> 
              {data.employment.label}
            </span>
            <span className="text-gray-900">{data.employment.value}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-[#0B1B36] rounded-full"
              style={{ width: data.employment.width }}
            ></div>
          </div>
        </div>
      </IconList>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm font-semibold text-gray-800">
        <div className="flex items-center gap-1.5">
          <Icon name="GraduationCap" className="h-4 w-4" />
          {data.footer.name}
        </div>
        <span className="text-[#1E3A8A]">{data.footer.campus}</span>
      </div>
    </DetailCard>
  );
};
