import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Info, Languages, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function ExamInfoCard() {
    return (
        <div className="w-full max-w-sm p-4 bg-gray-50/50">
            <Card className="rounded-[24px] border border-slate-100 shadow-sm bg-white overflow-hidden">
                <div className="p-5 flex flex-col gap-5">
                    {/* --- Header --- */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-50 p-1 rounded-full">
                                <Info className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 font-khmer">ព័ត៌មានសង្ខេបសំខាន់ៗ</h2>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 tracking-wider">ITC-INFO</span>
                    </div>

                    <hr className="border-slate-100" />

                    {/* --- BacII Requirement Box --- */}
                    <div className="bg-[#eef5f9] rounded-2xl p-4 flex gap-3">
                        <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" strokeWidth={2} />
                        <div className="space-y-1">
                            <h3 className="font-bold text-[#1e3a5f] font-khmer text-[15px]">លក្ខខណ្ឌចូលរៀន (BacII)</h3>
                            <p className="text-[#1e3a5f] text-sm leading-relaxed font-khmer">
                                សញ្ញាបត្របាក់ឌុបថ្នាក់ទី១២ វិទ្យាសាស្ត្រ (A, B ឬ C) ឬ ថ្នាក់វិទ្យាសាស្ត្រ ឬ
                                វិទ្យាសាស្ត្រ ឬ វិទ្យាសាស្ត្រ ឬ វិទ្យាសាស្ត្រ ឬ វិទ្យាសាស្ត្រ។
                            </p>
                        </div>
                    </div>

                    {/* --- Exam Date Box --- */}
                    <div className="bg-[#f4f6fb] rounded-2xl p-4 flex flex-col gap-2 relative">
                        {/* Top Row: Label + Badge */}
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-slate-600 font-khmer text-sm">ការប្រឡងចូលរៀនគ្រប់កម្រិត</span>
                            <Badge className="bg-[#e55c5c] hover:bg-[#e55c5c]/90 text-white rounded-full px-3 py-0.5 text-xs font-khmer font-normal border-0">
                                នៅសល់ 42 ថ្ងៃ
                            </Badge>
                        </div>

                        {/* Main Date Text */}
                        <h3 className="text-[#1e3a5f] font-bold text-xl font-khmer">ថ្ងៃទី ១៥ ខែ តុលា ២០២៥</h3>

                        {/* Location Text */}
                        <p className="text-slate-600 text-sm">October 15, 2025 • Phnom Penh ITC Center</p>
                    </div>

                    {/* --- Stats List --- */}
                    <div className="flex flex-col gap-4 mt-1">
                        {/* Languages */}
                        <div className="flex gap-3">
                            <Languages className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2} />
                            <div className="space-y-0.5">
                                <h4 className="font-bold text-[#1e3a5f] font-khmer text-[15px]">ភាសាបង្រៀន</h4>
                                <p className="text-slate-600 text-sm font-khmer">
                                    ភាសាខ្មែរ, ភាសាបារាំង &amp; អង់គ្លេស (Khmer, FR, EN)
                                </p>
                            </div>
                        </div>

                        {/* Enrollment */}
                        <div className="flex gap-3">
                            <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2} />
                            <div className="space-y-0.5">
                                <h4 className="font-bold text-[#1e3a5f] font-khmer text-[15px]">ចំនួននិស្សិតសរុប</h4>
                                <p className="text-slate-600 text-sm font-khmer">
                                    12,500+ Enrolled (និស្សិតស្រីគិតជាភាគរយ 35%)
                                </p>
                            </div>
                        </div>

                        {/* Pass Rate */}
                        <div className="flex gap-3">
                            <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2} />
                            <div className="space-y-1.5 w-full">
                                <h4 className="font-bold text-[#1e3a5f] font-khmer text-[15px]">
                                    អត្រាការជាប់ជាតិ ៦ ឆ្នាំ
                                </h4>
                                {/* Progress Bar */}
                                <div className="flex items-center gap-3 w-full">
                                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#0f766e] rounded-full" style={{ width: "94.8%" }} />
                                    </div>
                                    <span className="text-[#0f766e] font-bold text-sm shrink-0">94.8%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
