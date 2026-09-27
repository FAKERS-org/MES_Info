import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Contact, Download, UserSquare2 } from "lucide-react";

const RequiredDocuments = () => {
    const documents = [
        {
            id: 1,
            khmerNumber: "១.",
            title: "សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ",
            englishTitle: "(BacII Certificate with official stamp).",
            description:
                "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវសញ្ញាបត្រ ឬ លិខិតបញ្ជាក់ការសិក្សា ដែលមានបោះត្រាផ្លូវការពីសាលារៀន ឬ ក្រសួងអប់រំ យុវជន និងកីឡា។",
            icon: Award,
            iconBg: "bg-sky-50",
            iconColor: "text-sky-600",
        },
        {
            id: 2,
            khmerNumber: "២.",
            title: "វេរព័ត៌មានលម្អិតពីសាលារៀន",
            englishTitle: "High School Transcript).",
            description:
                "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវព្រឹត្តិបត្រពិន្ទុថ្នាក់ទី ១២ ឬ ថ្នាក់ទី១២ ដែលមានការបញ្ជាក់ពីសាលារៀន។",
            icon: BookOpen,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            id: 3,
            khmerNumber: "៣.",
            title: "សញ្ញាបត្រកំណើត & អត្តសញ្ញាណប័ណ្ណ",
            englishTitle: "Birth Certificate & National ID).",
            description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវសញ្ញាបត្រកំណើត និងអត្តសញ្ញាណប័ណ្ណ ឬ លិខិតឆ្លងដែន។",
            icon: Contact,
            iconBg: "bg-sky-50",
            iconColor: "text-sky-500",
        },
        {
            id: 4,
            khmerNumber: "៤.",
            title: "រូបថត 4x6 ចំនួន ៤សន្លឹក",
            englishTitle: "4x6 Recent Portrait Photos x 4).",
            description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវរូបថត ៤សន្លឹក ដែលមានផ្ទៃខាងក្រោយពណ៌ស។",
            icon: UserSquare2,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 bg-slate-50/50 rounded-2xl font-sans">
            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div className="space-y-3">
                    <Badge
                        variant="secondary"
                        className="bg-sky-100 text-sky-700 hover:bg-sky-100 uppercase text-[10px] tracking-wider font-bold px-2 py-1"
                    >
                        Checklist
                    </Badge>

                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                        ឯកសារត្រូវភ្ជាប់មកជាមួយ (Required Application Documents)
                    </h1>
                </div>

                {/* Download Button */}
                <Button
                    variant="ghost"
                    className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 shrink-0 flex items-center gap-2 p-0 h-auto font-medium"
                >
                    <Download className="h-4 w-4" />
                    <span className="flex flex-col items-start leading-none">
                        <span className="text-xs">ទាញយកព័ត៌មានបន្ថែម</span>
                        <span className="text-[10px] font-normal opacity-80">PDF</span>
                    </span>
                </Button>
            </div>

            {/* --- Grid Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {documents.map(doc => (
                    <div
                        key={doc.id}
                        className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex gap-4 items-start"
                    >
                        {/* Icon Box */}
                        <div className={`${doc.iconBg} ${doc.iconColor} p-3 rounded-xl shrink-0`}>
                            <doc.icon className="h-6 w-6" strokeWidth={1.5} />
                        </div>

                        {/* Content */}
                        <div className="space-y-1.5 pt-0.5">
                            <h3 className="font-bold text-slate-800 text-[15px] flex gap-1.5">
                                <span className="text-sky-600">{doc.khmerNumber}</span>
                                {doc.title}
                            </h3>
                            <p className="text-[13px] text-slate-500 leading-relaxed">
                                {doc.description}
                                <span className="text-slate-400 ml-1">({doc.englishTitle}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RequiredDocuments;
