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
            className="rounded-2xl p-4 font-sans"
            header={{
                align: "start",
                padding: "",
                className: "mb-3",
                icon: <Icon name="Map" size={26} strokeWidth={2.5} />,
                iconTileClassName: "mt-0.5 text-blue-600",
                title: data.header.title,
                titleClassName: "text-lg font-bold text-slate-900 leading-tight",
                subtitle: data.header.subtitle,
                subtitleClassName: "text-slate-600 font-medium",
                badge: (
                    <span className="text-blue-700 font-bold text-sm bg-blue-50 px-2 py-0.5 rounded-md">
                        {data.header.campus}
                    </span>
                ),
            }}
            body={false}
        >
            {/* Map iframe Container */}
            <div className="relative rounded-xl overflow-hidden mb-3 h-44 bg-slate-100 border border-slate-200">
                {data.map.iframeUrl ? (
                    <iframe
                        src={data.map.iframeUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={data.map.alt}
                    />
                ) : (
                    <div className="absolute inset-0 bg-blue-50 flex items-center justify-center text-slate-400">
                        {data.map.fallback}
                    </div>
                )}

                {/* Floating Direction Bar */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-sm p-1.5 rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="bg-red-50 p-1 rounded-full text-red-500">
                            <Icon name="MapPin" size={15} fill="currentColor" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 truncate max-w-[80px]">{data.map.place}</span>
                    </div>

                    {data.directionsHref ? (
                        <a
                            href={data.directionsHref}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:text-blue-700"
                        >
                            <span>{data.directions}</span>
                            <Icon name="ExternalLink" size={13} />
                        </a>
                    ) : (
                        <button className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:text-blue-700">
                            <span>{data.directions}</span>
                            <Icon name="ExternalLink" size={13} />
                        </button>
                    )}
                </div>
            </div>

            {/* Footer Text */}
            <p className="text-slate-600 text-sm leading-relaxed">{data.address}</p>
        </DetailCard>
    );
};
