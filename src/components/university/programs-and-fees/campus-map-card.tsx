import { Card } from "@/components/ui/card";
import { ExternalLink, Map, MapPin } from "lucide-react";

export default function CampusMapCard() {
    return (
        <Card className="w-full rounded-[24px] border-0 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-card overflow-hidden">
            <div className="p-5 flex flex-col gap-4">
                    {/* --- Header --- */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Map className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" strokeWidth={2} />
                            <h2 className="text-[17px] font-bold text-foreground font-khmer leading-tight">
                                ទីតាំង និងផែនទី (Campus Map)
                            </h2>
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-sm whitespace-nowrap pt-1">Toul Kork</span>
                    </div>

                    {/* --- Map Container --- */}
                    <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-muted shrink-0">
                        {/* Map Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Campus Map View"
                            className="w-full h-full object-cover opacity-90"
                        />

                        {/* Floating Info Bar */}
                        <div className="absolute bottom-3 left-3 right-3 bg-card rounded-xl p-2.5 flex items-center justify-between shadow-md">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <MapPin className="w-5 h-5 text-[#e55c5c] shrink-0" strokeWidth={2.5} />
                                <span className="text-foreground font-bold text-sm truncate">Russian ...</span>
                            </div>

                            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline shrink-0">
                                <span className="font-bold text-sm font-khmer">ទិសដៅ (Directions)</span>
                                <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    {/* --- Description Text --- */}
                    <p className="text-muted-foreground text-[14px] leading-relaxed font-khmer mt-1">
                        ស្ថិតនៅលើមហាវិថីព្រះចន្ទចំបូរ ជិតស្ថានអាកាសព្យាបាល ប្រទេសកម្ពុជា និងជិតស្ថានីយ៍ប្រេងឥន្ធនៈ
                        (Techno Flyover), រាជធានីភ្នំពេញ។
                    </p>
                </div>
            </Card>
    );
}
