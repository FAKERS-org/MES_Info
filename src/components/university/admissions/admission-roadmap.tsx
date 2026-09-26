import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
    {
        number: 1,
        title: "បំពេញពាក្យសុំអនឡាញ (Online Registration & Form Submission)",
        date: "08 កញ្ញា - 30 កញ្ញា ០២៥",
        dateColor: "bg-blue-100 text-blue-700",
        description:
            "ចុះឈ្មោះនៅលើ ITC Admissions Portal បង្កើតគណនី បំពេញព័ត៌មានផ្ទាល់ខ្លួន និងជ្រើសរើសមុខវិជជាចំនួន ២ (First & Second Choice)។",
        note: "ពេលវេលាប្រហែល ១៥ នាទី  រួមទាំងការបង់ ~15 ដុល្លារ",
    },
    {
        number: 2,
        title: "ផ្ទៀងផ្ទាត់ឯកសារ & បង់ថ្លៃពិនិត្យ (Document Verification & Fee)",
        date: "15 តុលា ២០២៥ (15 Oct 2025)",
        dateColor: "bg-green-100 text-green-700",
        description:
            "មកផ្ទាល់នៅការិយាល័យ ITC ដើម្បីផ្ទៀងផ្ទាត់ឯកសារដើម និងបង់ថ្លៃពិនិត្យ $15.00 តាមរយៈ Bakong KHQR ឬធនាគារ (ABA / ACLEDA / Canadia / Wing)។",
        note: "ទទួលបានវិក្យបត្រ Bakong KHQR / ABA / Wing Bank",
    },
    {
        number: 3,
        title: "ប្រឡងចូលរៀនជាតិ (National Entrance Examination)",
        date: "28 តុលា ២០២៥ (ITC Campus)",
        dateColor: "bg-red-100 text-red-700",
        description:
            "ប្ឡងនៅ ITC Campus រួមមាន ៣ មុខវិជ្ជា៖ គណិតវិទ្យា (150min), រូបវិទ្យា (90min), និង ូជីខល & វិទ្យាសាស្ត្រទូទៅ (60min)។",
        note: "ម៉ោង: 08:00 - 12:30",
    },
    {
        number: 4,
        title: "ប្រកាសលទ្ផល & ចុះឈមោះចូលរៀន (Official Results & Enrollment)",
        date: "17 វិច្ឆិកា ២០២៥",
        dateColor: "bg-purple-100 text-purple-700",
        description:
            "លទ្ធផលផលូវការផ្សាយនៅលើ ITC Portal និង Telegram។ សិស្សជាប់ត្រូវមកចុះឈ្មោះចូលរៀនផ្ទាល់នៅ ITC ក្នុងរយៈពេល ៧ ថ្ងៃ។",
        note: "",
    },
];

export function AdmissionRoadmap() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white pb-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        Step-by-Step Flow
                    </span>
                    <span className="text-xs text-slate-400">Updated 2025</span>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">
                    ដំណាក់កាលនៃការចូលរៀន៖ ៤ ជំហាន (4-Step Admission Roadmap)
                </CardTitle>
                <p className="text-sm text-slate-500">
                    ដំណើរការចូលរៀននៅ ITC មាន ៤ ជំហានសំខាន់ៗ ចាប់ពីខែកញ្ញា ដល់ខែវិច្ឆិកា ២០២៥។
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {steps.map(step => (
                    <div key={step.number} className="flex gap-4">
                        <div className="flex shrink-0 flex-col items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                                {step.number}
                            </div>
                            {step.number < steps.length && <div className="mt-2 h-full w-0.5 bg-slate-200" />}
                        </div>
                        <div className="flex-1 pb-6">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                                <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                            </div>
                            <Badge className={`mb-2 ${step.dateColor} hover:opacity-80`}>{step.date}</Badge>
                            <p className="text-sm text-slate-600">{step.description}</p>
                            {step.note && <p className="mt-1 text-xs text-slate-500"> {step.note}</p>}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
