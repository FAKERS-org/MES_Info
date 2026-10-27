import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, Landmark } from "lucide-react";

export interface AdmissionRoadmapProps {
    universityName?: string;
    website?: string | null;
}

const AdmissionRoadmap = ({ universityName, website }: AdmissionRoadmapProps) => {
    const uniLabel = universityName || "សាកលវិទ្យាល័យ";
    const regUrl = website
        ? website.startsWith("http")
            ? website
            : `https://${website}`
        : "#";

    return (
        <div className="max-w-4xl mx-auto bg-muted/50 rounded-2xl font-sans">
            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="space-y-2">
                    <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/10 uppercase text-xs tracking-wider font-semibold px-2.5 py-1 rounded-md"
                    >
                        Step-by-Step Flow
                    </Badge>

                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                            ដំណាក់កាលនៃការចុះឈ្មោះ និងជ្រើសរើស (Admission Roadmap)
                        </h1>
                        <p className="text-muted-foreground mt-1.5 text-xs md:text-sm leading-relaxed">
                            ដំណើរការនៃការដាក់ពាក្យ និងការប្រឡងជ្រើសរើសសម្រាប់ {uniLabel}
                        </p>
                    </div>
                </div>

                {/* Top Right Updated Badge */}
                <div className="bg-card rounded-xl px-4 py-2 flex flex-col items-center justify-center shrink-0 border border-border shadow-xs">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Academic Year</span>
                    <span className="text-foreground font-bold text-sm">2025–2026</span>
                </div>
            </div>

            {/* --- Timeline Section --- */}
            <div className="relative border-l-2 border-border ml-4 md:ml-6 space-y-8 pb-4">
                {/* STEP 1 */}
                <div className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-xs ring-4 ring-background">
                        1
                    </div>

                    <Card className="border border-border shadow-xs bg-card overflow-hidden">
                        <CardContent className="p-5">
                            <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5">
                                បំពេញពាក្យចុះឈ្មោះ (Online Registration & Application)
                            </h3>
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-0 mb-3 font-medium rounded-md text-xs">
                                ដំណាក់កាលទី ១
                            </Badge>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                បេក្ខជនត្រូវបំពេញពាក្យសុំចូលរៀនតាមរយៈគេហទំព័រ ឬការិយាល័យចុះឈ្មោះផ្ទាល់របស់ {uniLabel} ដោយជ្រើសរើសជំនាញ និងមហាវិទ្យាល័យដែលចង់បន្តការសិក្សា។
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground bg-muted p-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-primary" />
                                    <span className="font-medium">គេហទំព័រ / ព័ត៌មានចុះឈ្មោះ:</span>
                                    {website ? (
                                        <a href={regUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                            {website.replace(/^https?:\/\//, "")}
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground">ទាក់ទងផ្ទាល់នៅសាកលវិទ្យាល័យ</span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* STEP 2 */}
                <div className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-xs ring-4 ring-background">
                        2
                    </div>

                    <Card className="border border-border shadow-xs bg-card overflow-hidden">
                        <CardContent className="p-5">
                            <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5">
                                ផ្ទៀងផ្ទាត់ឯកសារ & បង់ថ្លៃពាក្យ (Document Verification & Fee)
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-200 dark:hover:bg-amber-950/50 border-0 font-medium rounded-md text-xs">
                                    ដំណាក់កាលទី ២
                                </Badge>
                            </div>

                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                                គណៈកម្មការពិនិត្យឯកសារសម្គាល់ខ្លួន និងសញ្ញាបត្របាក់ឌុប ឬលិខិតបញ្ជាក់ការសិក្សា។ បេក្ខជនបង់ថ្លៃរដ្ឋបាល/ពាក្យប្រឡងតាមរយៈប្រព័ន្ធធនាគារ ឬបញ្ជរផ្ទាល់។
                            </p>

                            <div className="flex items-center gap-2 text-xs md:text-sm text-foreground bg-muted p-3 rounded-md">
                                <Landmark className="h-4 w-4 text-primary" />
                                <span className="font-medium">ការទូទាត់ប្រាក់:</span>
                                <span className="text-muted-foreground">Bakong KHQR / ធនាគារដៃគូ ឬការិយាល័យគណនេយ្យ</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* STEP 3 */}
                <div className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-xs ring-4 ring-background">
                        3
                    </div>

                    <Card className="border border-border shadow-xs bg-card overflow-hidden">
                        <CardContent className="p-5">
                            <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5">
                                ការវាយតម្លៃ / ប្រឡងជ្រើសរើស (Assessment & Entrance Exam)
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-200 dark:hover:bg-rose-950/50 border-0 font-medium rounded-md text-xs">
                                    ដំណាក់កាលទី ៣
                                </Badge>
                            </div>

                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                បេក្ខជនចូលរួមប្រឡង ឬឆ្លងកាត់ការវាយតម្លៃលក្ខណៈសម្បត្តិយោងតាមជំនាញនីមួយៗ (វិទ្យាសាស្ត្រ បច្ចេកវិទ្យា ភាសា ឬសម្ភាសន៍ផ្ទាល់មាត់)។
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* STEP 4 */}
                <div className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-xs ring-4 ring-background">
                        4
                    </div>

                    <Card className="border border-border shadow-xs bg-card overflow-hidden">
                        <CardContent className="p-5">
                            <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5">
                                ប្រកាសលទ្ធផល & ចុះឈ្មោះចូលរៀន (Official Results & Enrollment)
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-200 dark:hover:bg-emerald-950/50 border-0 font-medium rounded-md text-xs">
                                    ដំណាក់កាលទី ៤
                                </Badge>
                            </div>

                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                លទ្ធផលនឹងត្រូវប្រកាសជាផ្លូវការតាមរយៈគេហទំព័រ ឬក្តារព័ត៌មានរបស់ {uniLabel}។ បេក្ខជនជាប់ត្រូវមកបញ្ជាក់ការចុះឈ្មោះ និងទទួលកាលវិភាគសិក្សា។
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdmissionRoadmap;
