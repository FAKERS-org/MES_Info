import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "តើអ្នកដែលបានបញ្ចប់ថ្នាក់ DUT/Associate Degree អាចចូលរៀនបានដែរឬទេ?",
        answer: "បាទ/ចាស! សិសសដែលមានបរិញ្ញាបត្ររង (DUT) ឬសមមូល អាចដាក់ពាក្យចូលរៀនបានដោយផ្ទាល់នៅ ITC ដោយគ្រាន់តែផ្តល់ឯកសារបញ្ជាក់ពីសាលាចាស់។ សូមទាក់ទងការិយាល័យចូលរៀនសម្រាប់ព័ត៌មានបន្ថែម។",
    },
    {
        question: "តើសិស្ប្រភេទ A ទទួលបានអាហារូបករណ៍អ្វីខ្លះ?",
        answer: "សិស្សប្រភេទ A (ពិន្ទុខ្ពស់បំផុត) អាចទទួលបានអាហារូបករណ៍ពេញលេញរហូតដល់ 100% រួមទាំងថ្លៃសិក្សា និងថលៃស្នាក់នៅ។ សូមពិនិត្យលក្ខខណ្លម្អិតនៅលើគេហទំព័រ ITC។",
    },
];

export function AdmissionsFAQ() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-slate-900">
                        សំណួរដែលសួរញឹកញាប់ (Admissions FAQ)
                    </CardTitle>
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-slate-500">ចម្លើយសម្រាប់សំណួរដែលសួរញឹកញាប់អំពីការចូលរៀននៅ ITC។</p>
            </CardHeader>
            <CardContent className="space-y-3">
                {faqs.map((faq, index) => (
                    <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-2 flex items-start gap-2">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                                {index + 1}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                        </div>
                        <p className="ml-8 text-sm text-slate-600">{faq.answer}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
