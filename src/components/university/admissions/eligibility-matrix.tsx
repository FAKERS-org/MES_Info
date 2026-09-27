import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Info } from "lucide-react";

const EligibilityMatrix = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-sm border border-slate-100 font-sans">
            {/* --- Header Section --- */}
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-3">
                    <Badge
                        variant="secondary"
                        className="bg-sky-100 text-sky-700 hover:bg-sky-100 uppercase text-[10px] tracking-wider font-bold px-2 py-1"
                    >
                        Eligibility Matrix
                    </Badge>

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                            លក្ខខណ្ឌជ្រើសរើស (General Entry Criteria & BacII)
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm md:text-base leading-relaxed">
                            បេក្ខជនត្រូវតែមានសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (ម.ក) ឬសញ្ញាបត្រស្រដៀងគ្នា (Science Stream)
                            <br className="hidden md:block" />
                            សម្រាប់គ្រឹះស្ថានឧត្តមសិក្សា និងវិទ្យាស្ថានបច្ចេកទេស។
                        </p>
                    </div>
                </div>

                {/* Top Right Icon */}
                <div className="hidden md:flex h-12 w-12 bg-sky-50 rounded-lg items-center justify-center text-sky-600">
                    <ClipboardList className="h-6 w-6" />
                </div>
            </div>

            {/* --- Cards Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Card 1: Science Track */}
                <Card className="bg-sky-50/50 border-0 shadow-none">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sky-900 font-semibold text-sm">វិទ្យាសាស្ត្រ</p>
                                <p className="text-sky-700 text-xs">ពាក់ព័ន្ធ</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
                                Grade A - C
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-slate-800 text-sm">ផ្នែកវិទ្យាសាស្ត្រពិត</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Science Track graduates receive first-priority qualification for technical faculties.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2: Subject Grades */}
                <Card className="bg-sky-50/50 border-0 shadow-none">
                    <CardContent className="p-4 space-y-4">
                        <div className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-sky-900 font-semibold">គណិតវិទ្យា</span>
                                <span className="text-sky-800">Math ≥ C+</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-sky-900 font-semibold">រូបវិទ្យា</span>
                                <span className="text-sky-800">Phys ≥ C</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-slate-800 text-sm">គីមីវិទ្យា</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                តម្រូវការពិសេសសម្រាប់ D (Chemistry ≥ D required for Chemical & Food Engineering).
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3: Language */}
                <Card className="bg-sky-50/50 border-0 shadow-none">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sky-900 font-semibold text-sm">ភាសាបរទេស</p>
                                <p className="text-sky-700 text-xs">ភាសាបរទេស</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
                                FR / EN
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-slate-800 text-sm">កម្រិតភាសា</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                French or English baseline; preparatory bilingual year (TRC) provided on enrollment.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- Progress / Competency Section --- */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 md:p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
                    <h3 className="font-bold text-slate-800">
                        កម្រិតវិញ្ញាសាសម្រាប់បេក្ខជន (Minimum Subject Competency Gauge)
                    </h3>
                    <span className="text-xs text-slate-400">ផ្អែកលើពិន្ទុមធ្យមភាគសរុប</span>
                </div>

                <div className="space-y-6">
                    {/* Item 1 */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-slate-700">គណិតវិទ្យា (Advanced Mathematics)</span>
                            <span className="text-sky-700 text-xs md:text-sm font-bold bg-sky-50 px-2 py-0.5 rounded">
                                តម្រូវ 65% ឬ និទ្ទេស C ឡើងទៅ
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-600 rounded-full w-[65%]"></div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-slate-700">រូបវិទ្យា (Physics)</span>
                            <span className="text-sky-700 text-xs md:text-sm font-bold bg-sky-50 px-2 py-0.5 rounded">
                                តម្រូវ 60% ឬ និទ្ទេស C ឡើងទៅ
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-600 rounded-full w-[60%]"></div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-slate-700">គីមីវិទ្យា / ជីវវិទ្យា (Chemistry / Biology)</span>
                            <span className="text-sky-700 text-xs md:text-sm font-bold bg-sky-50 px-2 py-0.5 rounded">
                                តម្រូវ 50% ឬ និទ្ទេស D ឡើងទៅ
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-600 rounded-full w-[50%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Footer Note --- */}
            <div className="flex gap-3 items-start text-slate-600 bg-slate-50 p-4 rounded-lg">
                <Info className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">
                    ចំណាំ៖ បេក្ខជនដែលបានបញ្ចប់ការសិក្សាថ្នាក់មធ្យមសិក្សា E អាចមានសិទ្ធិឈប់បន្តការសិក្សាតាមរយៈ
                    <span className="font-semibold text-slate-800 ml-1">(DUT / Associate Degree)</span> បាន។
                </p>
            </div>
        </div>
    );
};

export default EligibilityMatrix;
