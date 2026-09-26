import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Clock, GraduationCap, MessageSquare } from "lucide-react";

export function ImportantDates() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-900">កាលបរិច្ឆេទសំខាន់</CardTitle>
                    <Calendar className="h-5 w-5 text-blue-600" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Urgent Date Banner */}
                <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm text-slate-300">ថ្ងៃផុតកំណត់ពាក្យសុំ</span>
                        <Badge className="bg-red-500 text-white hover:bg-red-600">Urgent</Badge>
                    </div>
                    <div className="mb-3">
                        <span className="text-3xl font-bold">30 កក្កដា ២២៥</span>
                        <p className="text-sm text-slate-400">September 30, 2025 • 23:59 PM</p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                        <Clock className="h-4 w-4" />
                        <span>ម៉ោងនៅសល់ (Time Remaining):</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { value: "18", label: "ថ្ងៃ", sub: "Days" },
                            { value: "09", label: "ម៉ោង", sub: "Hrs" },
                            { value: "42", label: "នាទី", sub: "Min" },
                            { value: "15", label: "វិនាទី", sub: "Sec" },
                        ].map(item => (
                            <div key={item.label} className="rounded-lg bg-slate-700/50 p-2 text-center">
                                <div className="text-2xl font-bold">{item.value}</div>
                                <div className="text-xs text-slate-400">{item.label}</div>
                                <div className="text-xs text-slate-500">{item.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Date List */}
                <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg border border-slate-100 p-3">
                        <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                        <div>
                            <p className="text-sm font-semibold text-slate-800">ថ្ងៃផុតកំណត់ពាក្យសុំ</p>
                            <p className="text-sm font-bold text-slate-900">១៥ តុលា ២០២៥ (15 Oct 2025)</p>
                            <p className="text-xs text-slate-500">ការផ្ទៀងផ្ទាត់ឯកសារនៅការិយាល័យ (ITC)</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-slate-100 p-3">
                        <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <div>
                            <p className="text-sm font-semibold text-slate-800">ប្រឡងចូលរៀនជាតិ</p>
                            <p className="text-sm font-bold text-slate-900">២៨ តុលា ២០២៥ (28 Oct 2025)</p>
                            <p className="text-xs text-slate-500">ផ្សាយតាម Telegram & ITC Portal</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-slate-100 p-3">
                        <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-purple-500" />
                        <div>
                            <p className="text-sm font-semibold text-slate-800">ផ្សាយលទ្ធផលជាផ្លូវការ</p>
                            <p className="text-sm font-bold text-slate-900">១៧ វិច្ឆិកា ២០២៥ (17 Nov 2025)</p>
                            <p className="text-xs text-slate-500">ចុះឈ្មោះចូលរៀន (TRC)</p>
                        </div>
                    </div>

                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                        <BookOpen className="h-4 w-4" />
                        បញ្ចូលទៅក្នុង Google Calendar
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
