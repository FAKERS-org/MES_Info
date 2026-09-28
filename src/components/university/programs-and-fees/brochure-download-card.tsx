import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

export default function BrochureDownloadCard() {
    return (
        <Card className="w-full max-w-sm rounded-[24px] border-0 shadow-lg bg-gradient-to-br from-[#0f3455] to-[#0a253d] overflow-hidden">
            <div className="p-6 flex flex-col gap-5">
                    {/* --- Top Icon --- */}
                    <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <FileText className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>

                    {/* --- Text Content --- */}
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-bold text-white font-khmer leading-snug">
                            ទាញយកខិតប័ណ្ណព័ត៌មាន (Brochure)
                        </h2>
                        <p className="text-blue-100/80 text-sm leading-relaxed font-khmer">
                            សេចក្តីណែនាំពីជំនាញ មុខវិជ្ជាប្រឡង និងកាលវិភាគសិក្សា ឆ្នាំ ២០២៥-2026 (PDF, 8.4 MB)
                        </p>
                    </div>

                    {/* --- Download Action Button --- */}
                    <Button className="w-full bg-[#5ba4e6] hover:bg-[#4a93d5] text-[#0f3455] h-12 rounded-xl flex items-center justify-center gap-2 mt-2 transition-colors border-0">
                        <Download className="w-5 h-5 text-[#0f3455]" strokeWidth={2.5} />
                        <span className="font-bold text-[15px] font-khmer">ទាញយកខិតប័ណ្ណសិក្សា (PDF)</span>
                    </Button>
                </div>
            </Card>
    );
}
