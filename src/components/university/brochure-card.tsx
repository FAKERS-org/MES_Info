import { PromoCard } from "@/components/shared/promo-card";
import { Icon } from "@/components/shared/icon-renderer";
import type { BrochureCardData } from "@/data/university-page";

export interface BrochureCardProps {
  data: BrochureCardData;
}

export const BrochureCard = ({ data }: BrochureCardProps) => {
  return (
    <PromoCard
      className="bg-[#0e3f5e] rounded-2xl p-4 shadow-md w-full font-sans border-0"
      layout="stacked"
      iconTileClassName="bg-[#1a537a] w-10 h-10 rounded-lg flex items-center justify-center mb-2.5"
      icon={<Icon name={data.icon} size={22} className="text-white" />}
      title={data.title}
      titleClassName="text-lg font-bold mb-0.5 leading-snug"
      subtitle={data.subtitle}
      subtitleClassName="text-base font-semibold text-blue-100 mb-2"
      description={data.description}
      descriptionClassName="text-blue-100 text-sm mb-4 opacity-90 leading-relaxed"
      action={{
        icon: <Icon name={data.action.icon} size={18} />,
        label: data.action.label,
        className:
          "bg-[#4da6ff] hover:bg-[#3b8fd9] text-[#0e3f5e] font-bold py-2.5 px-3.5 rounded-lg",
      }}
      bodyPadding=""
    />
  );
};
