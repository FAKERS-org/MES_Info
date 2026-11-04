import type { Facility } from "@/data/universities";
import { FlaskConical } from "lucide-react";

export interface FacilitiesProps {
    facilities: Facility[];
}

const Facilities = ({ facilities }: FacilitiesProps) => {
    if (facilities.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto bg-card rounded-2xl border border-border p-6 md:p-8 font-sans">
            {/* --- Header Section --- */}
            <div className="flex items-center gap-3.5 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <FlaskConical className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-base md:text-lg font-bold text-foreground leading-tight mb-0.5">
                        មជ្ឈមណ្ឌលសិក្សា & បច្ចេកវិទ្យា
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">
                        High-Performance Computing Facilities & Innovation Centers
                    </p>
                </div>
            </div>

            {/* --- Cards Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {facilities.map(item => (
                    <div key={item.id} className="flex flex-col">
                        {/* Image Container */}
                        {item.image && (
                            <div className="w-full h-44 rounded-xl overflow-hidden mb-3 shadow-xs border border-border">
                                <img
                                    src={item.image}
                                    alt={`${item.title} ${item.subtitle ?? ""}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                                />
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="px-0.5 space-y-1">
                            <h2 className="text-sm md:text-base font-bold text-foreground leading-snug">
                                {item.title}
                                {item.subtitle && (
                                    <>
                                        <br className="hidden md:block" />
                                        {item.subtitle}
                                    </>
                                )}
                            </h2>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facilities;
