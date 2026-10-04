import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Contact, Download, UserSquare2 } from "lucide-react";

const RequiredDocumentsRail = () => {
  const documents = [
    {
      id: 1,
      khmerNumber: "១.",
      title: "សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ",
      englishTitle: "(BacII Certificate with official stamp).",
      description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវសញ្ញាបត្រ ឬ លិខិតបញ្ជាក់ការសិក្សា ដែលមានបោះត្រាផ្លូវការពីសាលារៀន ឬ ក្រសួងអប់រំ យុវជន និងកីឡា។",
      icon: Award,
      iconBg: "bg-sky-50 dark:bg-sky-950/30",
      iconColor: "text-sky-600 dark:text-sky-400",
    },
    {
      id: 2,
      khmerNumber: "២.",
      title: "វេរព័ត៌មានលម្អិតពីសាលារៀន",
      englishTitle: "High School Transcript).",
      description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវព្រឹត្តិបត្រពិន្ទុថ្នាក់ទី ១២ ឬ ថ្នាក់ទី១២ ដែលមានការបញ្ជាក់ពីសាលារៀន។",
      icon: BookOpen,
      iconBg: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 3,
      khmerNumber: "៣.",
      title: "សញ្ញាបត្រកំណើត & អត្តសញ្ញាណប័ណ្ណ",
      englishTitle: "Birth Certificate & National ID).",
      description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវសញ្ញាបត្រកំណើត និងអត្តសញ្ញាណប័ណ្ណ ឬ លិខិតឆ្លងដែន។",
      icon: Contact,
      iconBg: "bg-sky-50 dark:bg-sky-950/30",
      iconColor: "text-sky-500 dark:text-sky-400",
    },
    {
      id: 4,
      khmerNumber: "៤.",
      title: "រូបថត 4x6 ចំនួន ៤សន្លឹក",
      englishTitle: "4x6 Recent Portrait Photos x 4).",
      description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវរូបថត ៤សន្លឹក ដែលមានផ្ទៃខាងក្រោយពណ៌ស។",
      icon: UserSquare2,
      iconBg: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-500 dark:text-blue-400",
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-card rounded-2xl border border-border shadow-sm font-sans">
      {/* --- Header Section --- */}
      <div className="flex flex-col justify-between items-start gap-3 mb-4">
        <div className="space-y-2">
          <Badge
            variant="secondary"
            className="bg-sky-100 text-sky-700 hover:bg-sky-100 dark:bg-sky-950/50 dark:text-sky-200 dark:hover:bg-sky-950/50 uppercase text-[10px] tracking-wider font-bold px-2 py-1"
          >
            Checklist
          </Badge>

          <h1 className="text-base font-bold text-foreground leading-tight">
            ឯកសារត្រូវភ្ជាប់មកជាមួយ
          </h1>
        </div>

        {/* Download Button */}
        <Button
          variant="ghost"
          className="text-sky-600 dark:text-sky-400 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/40 shrink-0 flex items-center gap-1.5 p-0 h-auto font-medium text-xs"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="flex flex-col items-start leading-none">
            <span>ទាញយក PDF</span>
          </span>
        </Button>
      </div>

      {/* --- Stacked List (single column for rail) --- */}
      <div className="space-y-3">
        {documents.map(doc => (
          <div
            key={doc.id}
            className="bg-muted/60 p-3 rounded-lg border border-border flex gap-3 items-start"
          >
            {/* Icon Box */}
            <div className={`${doc.iconBg} ${doc.iconColor} p-2 rounded-lg shrink-0`}>
              <doc.icon className="h-5 w-5" strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="font-semibold text-foreground text-sm flex gap-1.5">
                <span className="text-sky-600 dark:text-sky-400 text-xs">{doc.khmerNumber}</span>
                <span className="truncate">{doc.title}</span>
              </h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">
                {doc.description}
                <span className="text-muted-foreground/70 ml-1">({doc.englishTitle}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequiredDocumentsRail;