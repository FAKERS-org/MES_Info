import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Info, Languages, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function ExamInfoCard() {
    return (
        <Card className="w-full rounded-2xl border border-border shadow-xs bg-card overflow-hidden">
            <div className="p-5 flex flex-col gap-5">
                    {/* --- Header --- */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <Info className="w-4.5 h-4.5" />
                            </div>
                            <h2 className="text-base md:text-lg font-bold text-foreground font-khmer">ព័ត៌មានសង្ខេបសំខាន់ៗ</h2>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground tracking-wider">ITC-INFO</span>
                    </div>

                    <hr className="border-border" />

                    {/* --- BacII Requirement Box --- */}
                    <div className="bg-muted/60 rounded-xl p-4 flex gap-3 border border-border">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-foreground font-khmer text-sm">លក្ខខណ្ឌចូលរៀន (BacII)</h3>
                            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-khmer">
                                សញ្ញាបត្របាក់ឌុបថ្នាក់ទី១២ វិទ្យាសាស្ត្រ (A, B ឬ C) ឬ ថ្នាក់វិទ្យាសាស្ត្រ ឬ
                                វិទ្យាសាស្ត្រ ឬ វិទ្យាសាស្ត្រ ឬ វិទ្យាសាស្ត្រ ឬ វិទ្យាសាស្ត្រ។
                            </p>
                        </div>
                    </div>

                    {/* --- Exam Date Box --- */}
                    <div className="bg-muted/80 rounded-xl p-4 flex flex-col gap-2 relative border border-border">
                        {/* Top Row: Label + Badge */}
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-muted-foreground font-khmer text-xs md:text-sm">ការប្រឡងចូលរៀនគ្រប់កម្រិត</span>
                            <Badge variant="destructive" className="rounded-full px-3 py-0.5 text-xs font-khmer font-normal">
                                នៅសល់ 42 ថ្ងៃ
                            </Badge>
                        </div>

                        {/* Main Date Text */}
                        <h3 className="text-foreground font-bold text-lg md:text-xl font-khmer">ថ្ងៃទី ១៥ ខែ តុលា ២០២៥</h3>

                        {/* Location Text */}
                        <p className="text-muted-foreground text-xs">October 15, 2025 • Phnom Penh ITC Center</p>
                    </div>

                    {/* --- Stats List --- */}
                    <div className="flex flex-col gap-4 mt-1">
                        {/* Languages */}
                        <div className="flex gap-3">
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                                <Languages className="w-4.5 h-4.5" />
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="font-semibold text-foreground font-khmer text-sm">ភាសាបង្រៀន</h4>
                                <p className="text-muted-foreground text-xs md:text-sm font-khmer">
                                    ភាសាខ្មែរ, ភាសាបារាំង &amp; អង់គ្លេស (Khmer, FR, EN)
                                </p>
                            </div>
                        </div>

                        {/* Enrollment */}
                        <div className="flex gap-3">
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                                <Users className="w-4.5 h-4.5" />
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="font-semibold text-foreground font-khmer text-sm">ចំនួននិស្សិតសរុប</h4>
                                <p className="text-muted-foreground text-xs md:text-sm font-khmer">
                                    12,500+ Enrolled (និស្សិតស្រីគិតជាភាគរយ 35%)
                                </p>
                            </div>
                        </div>

                        {/* Pass Rate */}
                        <div className="flex gap-3">
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                                <TrendingUp className="w-4.5 h-4.5" />
                            </div>
                            <div className="space-y-1.5 w-full">
                                <h4 className="font-semibold text-foreground font-khmer text-sm">
                                    អត្រាការជាប់ជាតិ ៦ ឆ្នាំ
                                </h4>
                                {/* Progress Bar */}
                                <div className="flex items-center gap-3 w-full">
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: "94.8%" }} />
                                    </div>
                                    <span className="text-primary font-bold text-xs shrink-0">94.8%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
    );
}
