import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";
import type { AdmissionsCardData } from "@/data/university";

export interface AdmissionsCardProps {
  data: AdmissionsCardData;
}

export const AdmissionsCard = ({ data }: AdmissionsCardProps) => {
  const { advisor } = data;

  return (
    <DetailCard
      className="rounded-3xl p-6 font-sans"
      header={{
        padding: "",
        className: "mb-5",
        icon: <Icon name="Headphones" size={26} strokeWidth={2.5} />,
        iconTileClassName: "text-blue-600",
        title: data.header,
        titleClassName: "text-lg font-bold text-slate-900",
      }}
      body={false}
    >
      {/* Profile Card Section */}
      <div className="bg-slate-50 rounded-2xl p-3 flex gap-3 mb-4 items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
           {/* Replace with actual image */}
           <img 
             src={advisor.avatar} 
             alt="Profile" 
             className="w-full h-full object-cover"
           />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            {advisor.name}
          </h4>
          <p className="text-slate-500 text-xs">{advisor.role}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={
                advisor.isOnline
                  ? "w-2 h-2 rounded-full bg-green-500"
                  : "w-2 h-2 rounded-full bg-slate-400"
              }
            ></span>
            <span
              className={
                advisor.isOnline
                  ? "text-green-700 text-xs font-medium"
                  : "text-slate-500 text-xs font-medium"
              }
            >
              {advisor.status}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {data.actions.map((action) => (
          <button
            key={action.label}
            className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${action.className}`}
          >
            <Icon name={action.icon} size={18} />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </DetailCard>
  );
};
