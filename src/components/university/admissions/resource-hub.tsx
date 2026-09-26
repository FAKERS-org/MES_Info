import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calculator, Download } from "lucide-react";

export function ResourceHub() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-green-600">Resource Hub</span>
                <CardTitle className="text-xl font-bold text-slate-900">
                    ទម្រង់ប្រឡងសិក្សា និងសំណួរពីមុន (Exam Format & Past Papers)
                </CardTitle>
                <p className="text-sm text-slate-500">
                    ទាញយកឯកសារប្រឡងសិស្សចាស់ៗ និងទម្រង់សំណួរប្រឡង ដើមបីរៀបចំខ្លួន។ ឯកសារទាំងអស់មានជាភាសាខ្មែរ
                    និងអង់គ្លេស។
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Mathematics */}
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                <BookOpen className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">គណិតវិទយា (Mathematics)</h4>
                                <p className="text-xs text-slate-500">ពេលវេលា: 150min</p>
                            </div>
                        </div>
                        <p className="mb-3 text-xs text-slate-600">
                            រួមមាន ពិជគណិត, ត្រីកោណមាត្រ, កាល់គុលុស, និងស្ថិតិ។
                        </p>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-300">
                                PDF • 15.4 MB (Khmer-French)
                            </Badge>
                            <button className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                                <Download className="h-3 w-3" />
                                ទាញយក PDF
                            </button>
                        </div>
                    </div>

                    {/* Applied Physics */}
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                                <BookOpen className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">រូបវិទ្ាអនុវត្ត (Applied Physics)</h4>
                                <p className="text-xs text-slate-500">ពេលវេលា: 90min</p>
                            </div>
                        </div>
                        <p className="mb-3 text-xs text-slate-600">
                            រួមមាន៖ មេកានិច, អគ្គិសនី, អុបទិក, និងរូបវិទ្យាទំនើប។
                        </p>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-300">
                                PDF • 14.6 MB (Khmer-French)
                            </Badge>
                            <button className="flex items-center gap-1 rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700">
                                <Download className="h-3 w-3" />
                                ទាញយក Physics PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calculator Note */}
                <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <Calculator className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                        <p className="text-sm font-medium text-amber-800">ច្បាប់អំពីម៉ាស៊ីនគិតលេខ</p>
                        <p className="text-xs text-amber-700">
                            អនុញ្ញាតឱ្យប្រើម៉ាស៊ីនគិតលេខវិទ្ាសាស្ត្តែប៉ុណ្ណោះ (Non-programmable Casio fx-570/9860/991)។
                        </p>
                        <button className="mt-2 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700">
                            អានបទបញ្ជាបន្ថែម
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
