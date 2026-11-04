import { Card } from "@/components/ui/card";
import { ExternalLink, MapPin } from "lucide-react";

export interface CampusMapCardProps {
    address?: string | null;
    locationName?: string | null;
    mapUrl?: string | null;
}

export default function CampusMapCard({
    address,
    mapUrl,
    locationName,
}: CampusMapCardProps = {}) {
    return (
        <Card className="w-full rounded-2xl border border-border shadow-xs bg-card overflow-hidden">
            <div className="p-5 flex flex-col gap-3.5">
                {/* --- Header --- */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                            <MapPin className="h-4.5 w-4.5" />
                        </div>
                        <h2 className="text-base font-semibold text-foreground font-khmer">
                            ទីតាំង និងផែនទី (Campus Map)
                        </h2>
                    </div>
                    {locationName && (
                        <span className="text-primary font-medium text-xs whitespace-nowrap bg-primary/10 px-2.5 py-0.5 rounded-full">
                            {locationName}
                        </span>
                    )}
                </div>

                {/* --- Map Container --- */}
                <div className="relative w-full h-[170px] rounded-xl overflow-hidden bg-muted shrink-0 border border-border/60">
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Campus Map View"
                        className="w-full h-full object-cover opacity-90"
                    />

                    {/* Floating Info Bar */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-card/95 backdrop-blur-sm rounded-xl p-2.5 flex items-center justify-between shadow-xs border border-border/80">
                        <div className="flex items-center gap-2 overflow-hidden mr-2">
                            <MapPin className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-foreground font-medium text-xs truncate">
                                {address || "Main Campus Location"}
                            </span>
                        </div>

                        {mapUrl && (
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-primary cursor-pointer hover:underline shrink-0 text-xs font-semibold font-khmer"
                            >
                                <span>ទិសដៅ</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
