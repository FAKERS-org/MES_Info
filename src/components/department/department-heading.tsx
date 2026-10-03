import { EntityLogo } from "@/components/shared/entity-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Unit, University } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { localize } from "@/lib/language";
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

export interface DepartmentHeadingProps {
    university: University;
    unit?: Unit;
    faculty?: Unit;
    lang: Lang;
}

export default function DepartmentHeading({ university, unit, faculty, lang }: DepartmentHeadingProps) {
    const name = unit?.name ?? university.name;
    const code = (unit?.id ?? university.id).toUpperCase();
    const logo = unit?.logo ?? university.logo;
    const stats = [
        { icon: MapPin, label: "ទីតាំង (Campus)", value: localize(university.address, lang) },
        { icon: Users, label: "និស្សិតកំពុងសិក្សា", value: university.stats?.students },
        { icon: Wallet, label: "ថ្លៃសិក្សាជាមធ្យម", value: university.stats?.tuition },
        { icon: Phone, label: "ទំនាក់ទំនងផ្លូវការ", value: university.contact?.phone },
    ].filter(stat => Boolean(stat.value));

    return (
        <div className="w-full max-w-full mx-auto font-sans bg-gray-50/50">
            <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden" padding="none">
                {/* =========================================
                    TOP SECTION: Blue Header
                   ========================================= */}
                <div className="relative bg-[#0d3b5c] h-[200px] sm:h-[220px] overflow-hidden">
                    {/* Subtle Background Graphic */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute right-0 top-0 w-1/2 h-full border-l border-white/20 transform skew-x-12" />
                        <div className="absolute right-1/4 top-0 w-px h-full bg-white/20" />
                        <div className="absolute right-1/4 top-1/2 w-32 h-32 border border-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                    </div>

                    {/* Top Bar: Badges & Actions */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-blue-100">
                            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                <span className="font-khmer">MoEYS Verified (ឌីជីថលផ្ទៀងផ្ទាត់ដោយ ក្រសួងអប់រំ)</span>
                            </div>
                            {university.stats?.established && (
                                <span className="font-khmer hidden sm:inline">{university.stats.established}</span>
                            )}
                        </div>

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

                    <div className="absolute bottom-0 left-6 sm:left-6 right-6 z-10 pb-4 sm:pb-6 pl-28 sm:pl-32 md:pl-36">
                        <div className="space-y-0.5 max-w-full">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-xl sm:text-2xl font-bold font-khmer text-white leading-tight">
                                    {localize(name, lang)}
                                </h1>
                                <Badge className="bg-white text-[#0d3b5c] border border-white/40 rounded-md font-bold px-1.5 py-0.5 text-xs shadow-sm">
                                    {code}
                                </Badge>
                            </div>
                            <p className="text-blue-100/80 text-sm leading-tight">
                                {unit ? localize(university.name, lang) : localize(university.name, "en")}
                            </p>
                            {faculty && (
                                <p className="text-blue-100/70 text-xs font-khmer leading-tight">
                                    {localize(faculty.name, lang)} — {faculty.name.en}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* =========================================
                    MIDDLE SECTION: Logo (original position) + CTA (on seam)
                   ========================================= */}
                <div className="px-6 relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        {/* --- Logo: stays in original overlapping position --- */}
                        <div className="flex items-start z-20">
                            <div className="relative -mt-16 sm:-mt-20">
                                <EntityLogo
                                    src={logo}
                                    alt={localize(name, lang)}
                                    className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-full shadow-md border-4 border-white"
                                    fallbackClassName="p-2"
                                    fallback={
                                        <span className="flex flex-col text-slate-800">
                                            <span className="text-lg font-bold tracking-tight">{code}</span>
                                        </span>
                                    }
                                />
                                <div className="absolute bottom-0 right-0 -translate-x-[3px] -translate-y-[3px] w-8 h-8 rounded-full bg-[#0d3b5c] border-[3px] border-white flex items-center justify-center">
                                    <CheckCircle2 className="w-[18px] h-[18px] text-white" />
                                </div>
                            </div>
                        </div>

                        {/* --- CTA Button: straddles the blue/white seam --- */}
                        <div className="w-full md:w-auto z-20 -mt-8 sm:-mt-9 md:-mt-9 md:mb-4">
                            <Button className="w-full md:w-auto bg-[#2583c4] hover:bg-[#1f70a8] text-white rounded-xl h-12 px-6 flex items-center gap-2 shadow-md border-0">
                                <MessageSquare className="w-5 h-5 fill-white" />
                                <span className="font-bold font-khmer text-[15px]">Chat Telegram (រៀងគ្នា)</span>
                            </Button>
                        </div>
                    </div>

                    {/* --- Metadata Row: the 3 badges (white area) --- */}
                    <div className="flex flex-wrap items-center gap-3 mt-6">
                        <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 hover:bg-slate-100 font-normal rounded-full px-3 py-1 flex items-center gap-1.5 text-xs"
                        >
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-khmer">
                                {localize(university.universityType, lang)} (
                                {localize(university.universityCategory, lang)})
                            </span>
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

                        <div className="flex-1 hidden lg:block" />

                        {university.website && (
                            <a
                                href={`https://${university.website.replace(/^https?:\/\//, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm group"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="font-medium">{university.website}</span>
                                <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                            </a>
                        )}
                    </div>
                </div>

                {/* =========================================
                    BOTTOM SECTION: Key Statistics
                   ========================================= */}
                <div className="mt-6 border-t border-slate-100 bg-[#fafbfc] px-6 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map(stat => (
                            <div key={stat.label} className="flex items-start gap-3">
                                <div className="bg-blue-50 p-2 rounded-xl">
                                    <stat.icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-khmer mb-0.5">{stat.label}</p>
                                    <p className="text-sm font-semibold text-slate-800">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
