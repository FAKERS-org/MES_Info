import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText } from "lucide-react";

export function EligibilityMatrix() {
    return (
        <Card className="overflow-hidden border-0 shadow-sm">
            <CardHeader className="bg-white pb-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        Eligibility Matrix
                    </span>
                    <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">
                    លក្ខខណ្ឌចូលរៀនទូទៅ (General Entry Criteria & BacII)
                </CardTitle>
                <p className="text-sm text-slate-500">
                    លក្ខខណ្ឌទូទៅសម្រាប់សិស្សដែលបានបញ្ប់ថ្នាក់បមសិក្សា (BacII) ឬស្មើគ្នា ដែលចង់ចូលរៀននៅផ្នែកវិទ្ាសាស្ត្
                    (Science Stream) សម្ាប់កម្មវិីបរិញ្ញាបត្ររយៈពេល ៤ ឆ្ាំ និងបរិញ្ញាបត្ររង។
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Top Row - 3 columns */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">
                                ពិន្ទុសមមូល
                                <br />
                                ជាមធ្យម
                            </span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Grade A - C</Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                            Science Track graduates receive first-priority qualification for technical faculties.
                        </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">
                                ពិន្ទុសមមូលគណិត
                                <br />
                                វិទ្យា & រូបវិទ្យា
                            </span>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                Math ≥ C+
                                <br />
                                Phys ≥ C
                            </Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                            គីមីវិទ្យាជាជម្រើស
                            <br />
                            (Chemistry ≥ D required for Chemical & Food Engineering).
                        </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">ភាសាបរទេស</span>
                            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">FR / EN</Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                            កម្រិតមូលដ្ឋាន
                            <br />
                            French or English baseline; preparatory bilingual year (TRC) provided on enrollment.
                        </p>
                    </div>
                </div>

                {/* Minimum Subject Competency Gauge */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-slate-800">
                            កម្រិតសមត្ថភាពមុខវិជជាអប្បបរមា (Minimum Subject Competency Gauge)
                        </h4>
                        <span className="text-xs text-slate-500">ផ្ែកលើពិន្ទុប្រឡងជាតិបាច់ទី</span>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                    គណិតវិទ្យា (Advanced Mathematics)
                                </span>
                                <span className="text-sm font-semibold text-blue-600">តម្រូវ 65% ≥ ពិន្ទុ C ឡើងទៅ</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-slate-200">
                                <div className="h-2.5 rounded-full bg-blue-500" style={{ width: "65%" }} />
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">រូបវិទ្ា (Physics)</span>
                                <span className="text-sm font-semibold text-blue-600">តម្រូវ 60% ≥ ពិន្ទុ C ឡើងទៅ</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-slate-200">
                                <div className="h-2.5 rounded-full bg-blue-500" style={{ width: "60%" }} />
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                    គីមីវិទយា / ជីវវិទយា (Chemistry / Biology)
                                </span>
                                <span className="text-sm font-semibold text-blue-600">តម្រូវ 50% ≥ ពិន្ទុ D ឡើងទៅ</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-slate-200">
                                <div className="h-2.5 rounded-full bg-blue-500" style={{ width: "50%" }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warning Note */}
                <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                        <p className="text-sm font-medium text-amber-800">
                            ចំណាំសំខាន់៖ បុគ្គលដែលមានបរិញ្ញាបតររង ឬសមមូល (DUT / Associate Degree)
                            តរូវបានចាត់ទុកថាមានលក្ខខណ្ឌគ្រប់គ្រាន់។ សូមពិគ្រោះជាមួយក្រុមប្រឹក្សា (DUT / Associate
                            Degree) បន្ថែម។
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
