import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, Landmark } from "lucide-react";

const AdmissionRoadmap = () => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-50/50 rounded-2xl font-sans">
            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="space-y-3">
                    <Badge
                        variant="secondary"
                        className="bg-sky-100 text-sky-700 hover:bg-sky-100 uppercase text-[10px] tracking-wider font-bold px-2 py-1"
                    >
                        Step-by-Step Flow
                    </Badge>

                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-sky-900 leading-tight">
                            ដំណាក់កាលនៃការចុះឈ្មោះ និងជ្រើសរើស (4-Step Admission Roadmap)
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                            វិធីសាស្ត្រចុះឈ្មោះចូលរៀនសម្រាប់វិទ្យាស្ថានបច្ចេកវិទ្យា ឆ្នាំសិក្សា ២០២៥-២០២៦
                        </p>
                    </div>
                </div>

                {/* Top Right Updated Badge */}
                <div className="bg-sky-50 rounded-full px-4 py-1.5 flex flex-col items-center justify-center shrink-0 border border-sky-100">
                    <span className="text-[10px] text-sky-600 font-medium uppercase tracking-wide">Updated</span>
                    <span className="text-sky-800 font-bold text-sm">2025</span>
                </div>
            </div>

            {/* --- Timeline Section --- */}
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pb-4">
                {/* STEP 1 */}
                <div className="relative pl-8 md:pl-10">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-bold shadow-md ring-4 ring-slate-50">
                        1
                    </div>

                    <Card className="border-0 shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-5">
                            <h3 className="text-lg font-bold text-sky-900 mb-2">
                                បញ្ជាក់ព័ត៌មានអនឡាញ (Online Registration & Form Submission)
                            </h3>
                            <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 border-0 mb-3 font-medium rounded-sm">
                                ០៨ មិថុនា - ០៥ កក្កដា ២០២៥
                            </Badge>

                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                បេក្ខជនត្រូវបំពេញពាក្យសុំចូលរៀន តាមរយៈគេហទំព័រ ITC Admissions Portal
                                បន្ទាប់មកទើបគណៈកម្មការចម្រាញ់ និងជ្រើសរើសបេក្ខជនតាមរយៈបញ្ជីឈ្មោះជម្រើសទី១ (First &
                                Second Choice)។
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700 bg-slate-50 p-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-sky-600" />
                                    <span className="font-medium">គេហទំព័រចុះឈ្មោះ:</span>
                                    <a href="#" className="text-sky-600 hover:underline">
                                        ចុចទីនេះ
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 border-l border-slate-300 pl-4">
                                    <Clock className="h-4 w-4 text-sky-600" />
                                    <span className="font-medium">រយៈពេលប្រឡង:</span>
                                    <span className="text-slate-500">~ 15 ថ្ងៃ</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* STEP 2 */}
                <div className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-bold shadow-md ring-4 ring-slate-50">
                        2
                    </div>

                    <Card className="border-0 shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-5">
                            <h3 className="text-lg font-bold text-sky-900 mb-2">
                                ផ្ទៀងផ្ទាត់ឯកសារ & បង់ថ្លៃសិក្សា (Document Verification & Fee)
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 font-medium rounded-sm">
                                    អត្រាថ្លៃ $15 (60,000៛)
                                </Badge>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                ក្រុមការងារនឹងពិនិត្យឯកសារផ្ទាល់ខ្លួនរបស់បេក្ខជនដូចជា៖ ព័ត៌មានលើប័ណ្ណសម្គាល់ខ្លួន និង
                                វិញ្ញាសាប្រឡង។ បេក្ខជនត្រូវបង់ថ្លៃសិក្សាតាមរយៈធនាគារ KHQR ដើម្បីទទួលបានសិទ្ធិប្រឡង (Exam
                                Hall Ticket)។
                            </p>

                            <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-md">
                                <Landmark className="h-4 w-4 text-sky-600" />
                                <span className="font-medium">ធនាគារដែលអាចបង់បាន:</span>
                                <span className="text-slate-600">Bakong KHQR / ABA / Wing Bank</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* STEP 3 */}
                <div className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-bold shadow-md ring-4 ring-slate-50">
                        3
                    </div>

                    <Card className="border-0 shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-5">
                            <h3 className="text-lg font-bold text-sky-900 mb-2">
                                ប្រឡងជ្រើសរើសចូលរៀន (National Entrance Examination)
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-0 font-medium rounded-sm">
                                    ១៥ កក្កដា ២០២៥ (Tech Campus)
                                </Badge>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                បេក្ខជនត្រូវមកប្រឡងដោយផ្ទាល់នៅវិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (ភ្នំពេញ)។ មានវិញ្ញាសាចំនួន
                                ៣ គឺ៖ គណិតវិទ្យា (Math), រូបវិទ្យា (Physics), និង អក្សរសាស្ត្រខ្មែរ/អង់គ្លេស ឬ
                                តក្កវិជ្ជា (Logic & General Science)។
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-md">
                                <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0">
                                    <span className="text-xs text-slate-500">ព្រឹក (08:00 - 10:30)</span>
                                    <span className="font-semibold text-slate-700 text-sm">គណិតវិទ្យា (150mn)</span>
                                </div>
                                <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pl-2">
                                    <span className="text-xs text-slate-500">រសៀល (13:30 - 15:00)</span>
                                    <span className="font-semibold text-slate-700 text-sm">រូបវិទ្យា (90mn)</span>
                                </div>
                                <div className="flex flex-col gap-1 md:pl-2">
                                    <span className="text-xs text-slate-500">ល្ងាច (15:30 - 16:30)</span>
                                    <span className="font-semibold text-slate-700 text-sm">
                                        អក្សរសាស្ត្រ & តក្ក (60mn)
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* STEP 4 */}
                <div className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-bold shadow-md ring-4 ring-slate-50">
                        4
                    </div>

                    <Card className="border-0 shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-5">
                            <h3 className="text-lg font-bold text-sky-900 mb-2">
                                ប្រកាសលទ្ធផល & ចុះឈ្មោះចូលរៀន (Official Results & Enrollment)
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 font-medium rounded-sm">
                                    ២៨ កក្កដា ២០២៥
                                </Badge>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                លទ្ធផលប្រឡងនឹងត្រូវប្រកាសជាផ្លូវការ និងផ្សព្វផ្សាយតាមគេហទំព័រផ្លូវការរបស់វិទ្យាស្ថាន។
                                បេក្ខជនដែលជាប់ត្រូវមកចុះឈ្មោះចូលរៀនផ្ទាល់នៅវិទ្យាស្ថានរយៈពេល ១ សប្តាហ៍ដំបូង។
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdmissionRoadmap;
