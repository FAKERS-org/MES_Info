import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

const documents = [
    {
        number: "១",
        title: "សញ្ញាបត្របឋមសិក្ាឬមធ្យមសិក្សា",
        subtitle: "Official Stamps",
        description: "ច្បាប់ដើមដែលមានត្រាផ្លូវការ ឬច្បាប់ចម្លងដែលបានបញ្ជាក់ពីសាលា (Official stamps).",
    },
    {
        number: "២",
        title: "សេចក្តីថ្លែងការណ៍ពិន្ទុ",
        subtitle: "High School Transcript",
        description: "ពិន្ទុប្រឡងជាតិបាច់ទី២ ឬ ៣ ដែលមានតរាផ្លូវការពីក្រសួងអប់រំ (High School Transcript).",
    },
    {
        number: "៣",
        title: "សំបុត្រកំណើត & អតតសញ្ញាណប័ណ្ណ",
        subtitle: "Birth Certificate & National ID",
        description: "ច្បាប់ចម្លងសំបុត្រកំណើត និងអតតសញ្ញាណបណ្ណ (Birth Certificate & National ID).",
    },
    {
        number: "៤",
        title: "រូបថត ៤x៦ ចំនួន ៤ សន្ឹក",
        subtitle: "4x6 Photos x 4",
        description: "រូបថតទំហំ ៤x៦ ចំនួន ៤ សនលឹក (ផ្ទៃខាងក្រោយពណ៌ស ឬខៀវ) (4x6 Portrait Photos x 4).",
    },
];

export function RequiredDocuments() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white pb-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Checklist</span>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                            <Download className="h-3 w-3" />
                            ទាញយកជា PDF
                        </button>
                    </div>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">
                    ឯកសារដែលត្រូវដាក់បញ្ចូល (Required Application Documents)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {documents.map(doc => (
                        <div key={doc.number} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                {doc.number}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">{doc.title}</h4>
                                <p className="mb-1 text-xs text-slate-500">{doc.subtitle}</p>
                                <p className="text-xs text-slate-600">{doc.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
