import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Info } from "lucide-react";

const EligibilityMatrix = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 bg-card rounded-xl shadow-sm border border-border font-sans">
            {/* --- Header Section --- */}
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-3">
                    <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/10 uppercase text-xs tracking-wider font-semibold px-2.5 py-1 rounded-md"
                    >
                        Eligibility Matrix
                    </Badge>

                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                            លក្ខខណ្ឌជ្រើសរើស (General Entry Criteria & BacII)
                        </h1>
                        <p className="text-muted-foreground mt-1.5 text-xs md:text-sm leading-relaxed">
                            បេក្ខជនត្រូវតែមានសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (ម.ក) ឬសញ្ញាបត្រស្រដៀងគ្នា (Science Stream)
                            <br className="hidden md:block" />
                            សម្រាប់គ្រឹះស្ថានឧត្តមសិក្សា និងវិទ្យាស្ថានបច្ចេកទេស។
                        </p>
                    </div>
                </div>

                {/* Top Right Icon */}
                <div className="hidden md:flex p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <ClipboardList className="h-5 w-5" />
                </div>
            </div>

            {/* --- Cards Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Card 1: Science Track */}
                <Card className="bg-muted/50 border border-border shadow-none rounded-xl">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-foreground font-semibold text-sm">វិទ្យាសាស្ត្រ</p>
                                <p className="text-muted-foreground text-xs">ពាក់ព័ន្ធ</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-200 dark:hover:bg-emerald-950/50 border-0 text-xs">
                                Grade A - C
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-foreground text-sm">ផ្នែកវិទ្យាសាស្ត្រពិត</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Science Track graduates receive first-priority qualification for technical faculties.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2: Subject Grades */}
                <Card className="bg-muted/50 border border-border shadow-none rounded-xl">
                    <CardContent className="p-4 space-y-3">
                        <div className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-foreground font-semibold">គណិតវិទ្យា</span>
                                <span className="text-primary font-medium">Math ≥ C+</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-foreground font-semibold">រូបវិទ្យា</span>
                                <span className="text-primary font-medium">Phys ≥ C</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-foreground text-sm">គីមីវិទ្យា</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                តម្រូវការពិសេសសម្រាប់ D (Chemistry ≥ D required for Chemical & Food Engineering).
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3: Language */}
                <Card className="bg-muted/50 border border-border shadow-none rounded-xl">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-foreground font-semibold text-sm">ភាសាបរទេស</p>
                                <p className="text-muted-foreground text-xs">ភាសាបរទេស</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-200 dark:hover:bg-emerald-950/50 border-0 text-xs">
                                FR / EN
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-foreground text-sm">កម្រិតភាសា</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                French or English baseline; preparatory bilingual year (TRC) provided on enrollment.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- Progress / Competency Section --- */}
            <div className="bg-muted/60 border border-border rounded-xl p-4 md:p-5 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-2">
                    <h3 className="font-bold text-foreground text-sm md:text-base">
                        កម្រិតវិញ្ញាសាសម្រាប់បេក្ខជន (Minimum Subject Competency Gauge)
                    </h3>
                    <span className="text-xs text-muted-foreground">ផ្អែកលើពិន្ទុមធ្យមភាគសរុប</span>
                </div>

                <div className="space-y-5">
                    {/* Item 1 */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs md:text-sm font-medium">
                            <span className="text-foreground">គណិតវិទ្យា (Advanced Mathematics)</span>
                            <span className="text-primary text-xs font-semibold bg-primary/10 px-2 py-0.5 rounded">
                                តម្រូវ 65% ឬ និទ្ទេស C ឡើងទៅ
                            </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[65%]"></div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs md:text-sm font-medium">
                            <span className="text-foreground">រូបវិទ្យា (Physics)</span>
                            <span className="text-primary text-xs font-semibold bg-primary/10 px-2 py-0.5 rounded">
                                តម្រូវ 60% ឬ និទ្ទេស C ឡើងទៅ
                            </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[60%]"></div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs md:text-sm font-medium">
                            <span className="text-foreground">គីមីវិទ្យា / ជីវវិទ្យា (Chemistry / Biology)</span>
                            <span className="text-primary text-xs font-semibold bg-primary/10 px-2 py-0.5 rounded">
                                តម្រូវ 50% ឬ និទ្ទេស D ឡើងទៅ
                            </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[50%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Footer Note --- */}
            <div className="flex gap-3 items-start text-muted-foreground bg-muted/60 p-4 rounded-xl border border-border">
                <div className="p-1 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Info className="h-4 w-4" />
                </div>
                <p className="text-xs md:text-sm leading-relaxed">
                    ចំណាំ៖ បេក្ខជនដែលបានបញ្ចប់ការសិក្សាថ្នាក់មធ្យមសិក្សា E អាចមានសិទ្ធិឈប់បន្តការសិក្សាតាមរយៈ
                    <span className="font-semibold text-foreground ml-1">(DUT / Associate Degree)</span> បាន។
                </p>
            </div>
        </div>
    );
};

export default EligibilityMatrix;
