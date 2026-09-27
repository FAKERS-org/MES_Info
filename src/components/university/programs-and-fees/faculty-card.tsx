import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, ChevronRight, Clock, GraduationCap, MonitorPlay, Star } from "lucide-react";
import React from "react";

// --- Types ---
interface Major {
    id: string;
    titleKhmer: string;
    titleEng: string;
    tags?: { label: string; color: string }[];
    degreeKhmer: string;
    degreeEng: string;
    duration: string;
    extraInfo?: string;
    price: string;
    pricePeriod: string;
    subPriceInfo?: string;
    subPriceHighlight?: boolean;
}

// --- Mock Data ---
const majorsData: Major[] = [
    {
        id: "cs-ai",
        titleKhmer: "វិទ្យាសាស្ត្រកុំព្យូទ័រ & AI",
        titleEng: "Computer Science & Artificial Intelligence (CS-AI)",
        tags: [{ label: "High Demand", color: "bg-blue-50 text-blue-500 border border-blue-100" }],
        degreeKhmer: "បរិញ្ញាបត្រវិទ្យាសាស្ត្រ",
        degreeEng: "Bachelor of Science",
        duration: "៤ ឆ្នាំ (4 Years)",
        extraInfo: "French/English bilingual tracks",
        price: "$700",
        pricePeriod: "ឆ្នាំ",
        subPriceInfo: "98% Employment",
        subPriceHighlight: true,
    },
    {
        id: "cyber",
        titleKhmer: "សន្តិសុខសាយប័រ និងប្រព័ន្ធទិន្នន័យ",
        titleEng: "Cybersecurity & Data Systems",
        degreeKhmer: "បរិញ្ញាបត្រវិទ្យាសាស្ត្រ",
        degreeEng: "B.Sc",
        duration: "៤ ឆ្នាំ",
        price: "$700",
        pricePeriod: "ឆ្នាំ",
        subPriceInfo: "ចំណុះ 80 នាក់",
    },
    {
        id: "se",
        titleKhmer: "វិស្វកម្មសូហ្វវែរ",
        titleEng: "Software Engineering (Ingénieur Informatique)",
        tags: [{ label: "Internship Partnered", color: "bg-green-50 text-green-600 border border-green-100" }],
        degreeKhmer: "បរិញ្ញាបត្រវិស្វកម្ម",
        degreeEng: "Engineering",
        duration: "៥ ឆ្នាំ (5 Years)",
        price: "$700",
        pricePeriod: "ឆ្នាំ",
        subPriceInfo: "Dual Degree (France)",
    },
];

export default function FacultyCard() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 font-sans">
            {/* Main Container Card */}
            <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl bg-white">
                {/* --- Header Section --- */}
                <div className="bg-[#124f70] text-white p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Icon Box */}
                        <div className="bg-[#0b3c56] p-2.5 rounded-lg border border-[#1e607f]">
                            <MonitorPlay className="w-6 h-6 text-white" strokeWidth={1.5} />
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-lg md:text-xl font-bold font-khmer leading-tight">
                                មហាវិទ្យាល័យព័ត៌មានវិទ្យា និងគមនាគមន៍
                            </h1>
                            <p className="text-blue-100 text-xs md:text-sm mt-0.5">
                                Faculty of Information and Communication Technology (FICT)
                            </p>
                        </div>
                    </div>

                    {/* Top Rated Badge */}
                    <Badge className="bg-[#3b9ae1] hover:bg-[#3b9ae1]/90 text-white border-0 px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 whitespace-nowrap">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        Top Rated in Cambodia
                    </Badge>
                </div>

                {/* --- Body Section (List of Majors) --- */}
                <CardContent className="p-0">
                    {majorsData.map((major, index) => (
                        <React.Fragment key={major.id}>
                            <div className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                                {/* Left Side: Info */}
                                <div className="flex-1 space-y-2">
                                    {/* Title Row */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-xl font-bold text-slate-900 font-khmer">
                                            {major.titleKhmer}
                                        </h3>
                                        {major.tags?.map((tag, i) => (
                                            <Badge
                                                key={i}
                                                className={`${tag.color} border-0 font-khmer font-normal px-2 py-0.5 rounded-md text-xs`}
                                            >
                                                {tag.label}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* English Subtitle */}
                                    <p className="text-slate-600 text-[15px]">{major.titleEng}</p>

                                    {/* Meta Data (Degree, Duration) */}
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 pt-1">
                                        <div className="flex items-center gap-1.5">
                                            <GraduationCap className="w-4 h-4 text-blue-500" strokeWidth={2} />
                                            <span className="font-khmer">
                                                {major.degreeKhmer} ({major.degreeEng})
                                            </span>
                                        </div>
                                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-blue-500" strokeWidth={2} />
                                            <span className="font-khmer">រយៈពេល: {major.duration}</span>
                                        </div>
                                    </div>

                                    {/* Extra Info (Optional) */}
                                    {major.extraInfo && (
                                        <p className="text-slate-700 text-sm pt-1">{major.extraInfo}</p>
                                    )}
                                </div>

                                {/* Right Side: Price & Action */}
                                <div className="flex flex-row md:flex-col justify-between md:items-end gap-4 min-w-[160px]">
                                    <div className="text-right flex flex-col items-end">
                                        <div className="flex items-baseline justify-end gap-1">
                                            <span className="text-[22px] font-bold text-slate-900">{major.price}</span>
                                            <span className="text-[13px] text-slate-500 font-khmer">
                                                / {major.pricePeriod}
                                            </span>
                                        </div>

                                        {/* Sub Price Info */}
                                        {major.subPriceInfo && (
                                            <div className="flex items-center justify-end gap-1 text-xs text-slate-500 mt-1 font-khmer">
                                                {major.subPriceHighlight && <Briefcase className="w-3.5 h-3.5" />}
                                                {major.subPriceInfo}
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        variant="secondary"
                                        className="bg-[#f0f4f8] text-[#1e3a5f] hover:bg-[#e2e8f0] font-khmer gap-1 rounded-lg px-4 h-9 text-sm"
                                    >
                                        ព័ត៌មាន
                                        <br />
                                        លម្អិត
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </div>

                            {/* Separator (Don't show on last item) */}
                            {index < majorsData.length - 1 && <Separator className="bg-slate-100" />}
                        </React.Fragment>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
