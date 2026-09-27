import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Award,
    Bookmark,
    Building2,
    CheckCircle2,
    ExternalLink,
    Globe,
    Leaf,
    MapPin,
    MessageSquare,
    Phone,
    Share2,
    Users,
    Wallet,
} from "lucide-react";

export default function UniversityHeaderCard() {
    return (
        <div className="w-full max-w-full mx-auto p-4 font-sans bg-gray-50/50">
            <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
                {/* =========================================
            TOP SECTION: Blue Header Background
           ========================================= */}
                <div className="relative bg-[#0d3b5c] h-[200px] sm:h-[220px] overflow-hidden">
                    {/* Subtle Background Graphic (Abstract Lines/Grid) */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        {/* Simple CSS representation of the background graphic */}
                        <div className="absolute right-0 top-0 w-1/2 h-full border-l border-white/20 transform skew-x-12" />
                        <div className="absolute right-1/4 top-0 w-px h-full bg-white/20" />
                        <div className="absolute right-1/4 top-1/2 w-32 h-32 border border-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                    </div>

                    {/* Top Bar: Badges & Actions */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                        {/* Left: Trust Badges */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-blue-100">
                            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                <span className="font-khmer">MoEYS Verified (ឌីជីថលផ្ទៀងផ្ទាត់ដោយ ក្រសួងអប់រំ)</span>
                            </div>
                            <span className="font-khmer hidden sm:inline">Est. 1964 • ៦០ ឆ្នាំនៃឧត្តមភាព</span>
                        </div>

                        {/* Right: Action Icons */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white"
                            >
                                <Share2 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white"
                            >
                                <Bookmark className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* =========================================
            MIDDLE SECTION: Info & CTA (Overlapping)
           ========================================= */}
                <div className="px-6 pb-6 relative">
                    {/* Flex container for Logo, Title, and CTA */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-20 sm:-mt-24">
                        {/* --- Logo & Titles --- */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 z-20 pt-16 sm:pt-0">
                            {/* Logo Wrapper (Overlapping Element) */}
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white shrink-0">
                                <div className="text-center p-2">
                                    <p className="text-[10px] font-khmer text-slate-600 leading-tight">វិទ្យាស្ថាន</p>
                                    <p className="text-xs font-khmer font-bold text-slate-800 leading-tight">
                                        បច្ចេកវិទ្យាកម្ពុជា
                                    </p>
                                    <p className="text-[9px] font-bold text-slate-500 mt-1 leading-tight">
                                        Institute of Technology
                                    </p>
                                </div>
                                {/* Verification Checkmark */}
                                <div className="absolute -bottom-1 -right-1 bg-[#0d3b5c] rounded-full p-1 border-2 border-white">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            {/* Titles */}
                            <div className="space-y-1 md:mb-4">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold font-khmer text-white">
                                        វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា
                                    </h1>
                                    <Badge className="bg-white text-[#0d3b5c] border border-slate-200 rounded-md font-bold px-1.5 py-0.5 text-xs shadow-sm">
                                        ITC
                                    </Badge>
                                </div>
                                <p className="text-slate-500 text-sm">Institute of Technology of Cambodia</p>
                            </div>
                        </div>

                        {/* --- Right CTA Button --- */}
                        <div className="w-full md:w-auto md:mb-4 z-20">
                            <Button className="w-full md:w-auto bg-[#2583c4] hover:bg-[#1f70a8] text-white rounded-xl h-12 px-6 flex items-center gap-2 shadow-sm border-0">
                                <MessageSquare className="w-5 h-5 fill-white" />
                                <span className="font-bold font-khmer text-[15px]">Chat Telegram (រៀងគ្នា)</span>
                            </Button>
                        </div>
                    </div>

                    {/* --- Metadata Row --- */}
                    <div className="flex flex-wrap items-center gap-3 mt-6">
                        <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 hover:bg-slate-100 font-normal rounded-full px-3 py-1 flex items-center gap-1.5 text-xs"
                        >
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-khmer">គ្រឹះស្ថានឧត្តមសិក្សា (Public University)</span>
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="bg-green-50 text-green-700 hover:bg-green-50 font-normal rounded-full px-3 py-1 flex items-center gap-1.5 text-xs"
                        >
                            <Leaf className="w-3.5 h-3.5 text-green-600" />
                            <span>STEM Excellence Leader</span>
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-50 font-normal rounded-full px-3 py-1 flex items-center gap-1.5 text-xs"
                        >
                            <Award className="w-3.5 h-3.5 text-blue-600" />
                            <span>AUN-QA Accredited</span>
                        </Badge>

                        {/* Spacer to push website to the right */}
                        <div className="flex-1 hidden lg:block" />

                        {/* Website Link */}
                        <a
                            href="#"
                            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm group"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="font-medium">itc.edu.kh</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                        </a>
                    </div>
                </div>

                {/* =========================================
            BOTTOM SECTION: Key Statistics
           ========================================= */}
                <div className="border-t border-slate-100 bg-[#fafbfc] px-6 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Stat 1: Location */}
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-xl">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-khmer mb-0.5">ទីតាំង (Campus)</p>
                                <p className="text-sm font-semibold text-slate-800">Russian Blvd, Toul Kork</p>
                            </div>
                        </div>

                        {/* Stat 2: Students */}
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-xl">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-khmer mb-0.5">និស្សិតកំពុងសិក្សា</p>
                                <p className="text-sm font-semibold text-slate-800">12,000+ Students</p>
                            </div>
                        </div>

                        {/* Stat 3: Tuition */}
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-xl">
                                <Wallet className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-khmer mb-0.5">ថ្លៃសិក្សាជាមធ្យម</p>
                                <p className="text-sm font-semibold text-slate-800">$600 - $850 / ឆ្នាំ (Year)</p>
                            </div>
                        </div>

                        {/* Stat 4: Phone */}
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-xl">
                                <Phone className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-khmer mb-0.5">ទំនាក់ទំនងផ្លូវការ</p>
                                <p className="text-sm font-semibold text-slate-800">(+855) 23 880 370</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
