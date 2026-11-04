import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, FileText } from "lucide-react";

export interface BrochureDownloadCardProps {
    universityName?: string | null;
    website?: string | null;
}

export default function BrochureDownloadCard({ website, universityName }: BrochureDownloadCardProps) {
    const targetUrl = website
        ? website.startsWith("http")
            ? website
            : `https://${website}`
        : null;

    if (!targetUrl) return null;

    return (
        <Card className="w-full rounded-2xl border-0 shadow-xs bg-gradient-to-br from-primary to-slate-900 text-primary-foreground overflow-hidden">
            <div className="p-5 flex flex-col gap-3.5">
                <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <FileText className="h-5 w-5 text-white" />
                </div>

                <div className="space-y-1">
                    <h2 className="text-base font-semibold text-white font-khmer leading-snug">
                        គេហទំព័រ និងឯកសារផ្លូវការ
                    </h2>
                    <p className="text-blue-100/80 text-xs leading-relaxed font-khmer">
                        ស្វែងយល់បន្ថែមអំពីកម្មវិធីសិក្សា និងសេចក្តីប្រកាសផ្លូវការរបស់ {universityName || "សាកលវិទ្យាល័យ"}។
                    </p>
                </div>

                <Button
                    asChild
                    className="w-full bg-white text-primary hover:bg-white/90 h-10 rounded-xl flex items-center justify-center gap-2 mt-1 transition-colors border-0 text-xs font-semibold"
                >
                    <a href={targetUrl} target="_blank" rel="noopener noreferrer">
                        <span className="font-khmer">ចូលទៅកាន់គេហទំព័រផ្លូវការ</span>
                        <ExternalLink className="h-3.5 w-3.5 text-primary" />
                    </a>
                </Button>
            </div>
        </Card>
    );
}
