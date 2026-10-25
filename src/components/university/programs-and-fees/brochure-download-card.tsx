import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, FileText } from "lucide-react";

export interface BrochureDownloadCardProps {
    website?: string | null;
    universityName?: string | null;
}

export default function BrochureDownloadCard({ website, universityName }: BrochureDownloadCardProps) {
    const targetUrl = website
        ? website.startsWith("http")
            ? website
            : `https://${website}`
        : null;

    if (!targetUrl) return null;

    return (
        <Card className="w-full rounded-[24px] border-0 shadow-lg bg-gradient-to-br from-[#0f3455] to-[#0a253d] overflow-hidden">
            <div className="p-6 flex flex-col gap-4">
                <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <FileText className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>

                <div className="space-y-1">
                    <h2 className="text-lg font-bold text-white font-khmer leading-snug">
                        គេហទំព័រ និងឯកសារផ្លូវការ
                    </h2>
                    <p className="text-blue-100/80 text-xs leading-relaxed font-khmer">
                        ស្វែងយល់បន្ថែមអំពីកម្មវិធីសិក្សា និងសេចក្តីប្រកាសផ្លូវការរបស់ {universityName || "សាកលវិទ្យាល័យ"}។
                    </p>
                </div>

                <Button
                    asChild
                    className="w-full bg-[#5ba4e6] hover:bg-[#4a93d5] text-[#0f3455] h-11 rounded-xl flex items-center justify-center gap-2 mt-1 transition-colors border-0"
                >
                    <a href={targetUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 text-[#0f3455]" strokeWidth={2.5} />
                        <span className="font-bold text-sm font-khmer">ចូលទៅកាន់គេហទំព័រផ្លូវការ</span>
                    </a>
                </Button>
            </div>
        </Card>
    );
}
