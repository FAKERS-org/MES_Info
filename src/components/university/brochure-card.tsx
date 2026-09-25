import { PromoCard } from "@/components/shared/promo-card";
import { Icon } from "@/components/shared/icon-renderer";
import type { BrochureCardData } from "@/data/university";

export interface BrochureCardProps {
  data: BrochureCardData;
}

export const BrochureCard = ({ data }: BrochureCardProps) => {
  return (
    <PromoCard
      className="bg-[#0e3f5e] rounded-3xl p-6 shadow-md w-full font-sans border-0"
      layout="stacked"
      iconTileClassName="bg-[#1a537a] w-12 h-12 rounded-xl flex items-center justify-center mb-4"
      icon={<Icon name={data.icon} size={24} className="text-white" />}
      title={data.title}
      titleClassName="text-xl font-bold mb-1 leading-snug"
      subtitle={data.subtitle}
      subtitleClassName="text-lg font-semibold text-blue-100 mb-3"
      description={data.description}
      descriptionClassName="text-blue-100 text-sm mb-6 opacity-90 leading-relaxed"
      action={{
        icon: <Icon name={data.action.icon} size={20} />,
        label: data.action.label,
        className:
          "bg-[#4da6ff] hover:bg-[#3b8fd9] text-[#0e3f5e] font-bold py-3 px-4 rounded-xl",
      }}
      bodyPadding=""
    />
  );
};
