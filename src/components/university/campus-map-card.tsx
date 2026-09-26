"use client";

import { DetailCard } from "@/components/shared/detail-card";
import { Icon } from "@/components/shared/icon-renderer";
import type { CampusMapCardData } from "@/data/university-page";

export interface CampusMapCardProps {
  data: CampusMapCardData;
}

export const CampusMapCard = ({ data }: CampusMapCardProps) => {
  return (
    <DetailCard
      className="rounded-3xl p-6 font-sans"
      header={{
        align: "start",
        padding: "",
        className: "mb-4",
        icon: <Icon name="Map" size={28} strokeWidth={2.5} />,
        iconTileClassName: "mt-1 text-blue-600",
        title: data.header.title,
        titleClassName: "text-lg font-bold text-slate-900 leading-tight",
        subtitle: data.header.subtitle,
        subtitleClassName: "text-slate-600 font-medium",
        badge: (
          <span className="text-blue-700 font-bold text-sm bg-blue-50 px-2 py-1 rounded-md">
            {data.header.campus}
          </span>
        ),
      }}
      body={false}
    >
      {/* Map Image Container */}
      <div className="relative rounded-2xl overflow-hidden mb-4 h-48 bg-slate-100 border border-slate-200">
        {/* Placeholder for Map Image */}
        <img 
          src={data.map.src} 
          alt={data.map.alt} 
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            // Fallback if no API key
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback background pattern if image fails */}
        <div className="absolute inset-0 bg-blue-50 flex items-center justify-center -z-10 text-slate-400">
           {data.map.fallback}
        </div>

        {/* Floating Direction Bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-50 p-1.5 rounded-full text-red-500">
              <Icon name="MapPin" size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-bold text-slate-700 truncate max-w-[80px]">
              {data.map.place}
            </span>
          </div>
          
          <button className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:text-blue-700">
            <span>{data.directions}</span>
            <Icon name="ExternalLink" size={14} />
          </button>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-slate-600 text-sm leading-relaxed">
        {data.address}
      </p>
    </DetailCard>
  );
};
