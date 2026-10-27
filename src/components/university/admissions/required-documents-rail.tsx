import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Contact, UserSquare2 } from "lucide-react";

const RequiredDocumentsRail = () => {
  const documents = [
    {
      id: 1,
      khmerNumber: "១.",
      title: "សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ",
      englishTitle: "BacII Certificate with official stamp",
      description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវសញ្ញាបត្រ ឬ លិខិតបញ្ជាក់ការសិក្សា ដែលមានបោះត្រាផ្លូវការពីសាលារៀន ឬ ក្រសួងអប់រំ យុវជន និងកីឡា។",
      icon: Award,
    },
    {
      id: 2,
      khmerNumber: "២.",
      title: "វេរព័ត៌មានលម្អិតពីសាលារៀន",
      englishTitle: "High School Transcript",
      description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវព្រឹត្តិបត្រពិន្ទុថ្នាក់ទី ១២ ឬ ថ្នាក់ទី១២ ដែលមានការបញ្ជាក់ពីសាលារៀន។",
      icon: BookOpen,
    },
    {
      id: 3,
      khmerNumber: "៣.",
      title: "សញ្ញាបត្រកំណើត & អត្តសញ្ញាណប័ណ្ណ",
      englishTitle: "Birth Certificate & National ID",
      description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវសញ្ញាបត្រកំណើត និងអត្តសញ្ញាណប័ណ្ណ ឬ លិខិតឆ្លងដែន។",
      icon: Contact,
    },
    {
      id: 4,
      khmerNumber: "៤.",
      title: "រូបថត 4x6 ចំនួន ៤សន្លឹក",
      englishTitle: "4x6 Recent Portrait Photos x 4",
      description: "គ្រប់បេក្ខជនត្រូវភ្ជាប់មកជាមួយ នូវរូបថត ៤សន្លឹក ដែលមានផ្ទៃខាងក្រោយពណ៌ស។",
      icon: UserSquare2,
    },
  ];

  return (
    <div className="p-4 md:p-5 bg-card rounded-2xl border border-border shadow-xs font-sans">
      {/* --- Header Section --- */}
      <div className="flex flex-col justify-between items-start gap-2 mb-4">
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary hover:bg-primary/10 uppercase text-xs tracking-wider font-semibold px-2.5 py-1 rounded-md"
        >
          Checklist
        </Badge>

        <h2 className="text-base md:text-lg font-bold text-foreground leading-tight">
          ឯកសារត្រូវភ្ជាប់មកជាមួយ
        </h2>
      </div>

      {/* --- Stacked List (single column for rail) --- */}
      <div className="space-y-3">
        {documents.map(doc => (
          <div
            key={doc.id}
            className="bg-muted/60 p-3 rounded-xl border border-border flex gap-3 items-start"
          >
            {/* Icon Box */}
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <doc.icon className="h-4.5 w-4.5" />
            </div>

            {/* Content */}
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="font-semibold text-foreground text-xs md:text-sm flex gap-1.5">
                <span className="text-primary text-xs font-bold">{doc.khmerNumber}</span>
                <span className="truncate">{doc.title}</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {doc.description}
                <span className="text-muted-foreground/70 ml-1">({doc.englishTitle})</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequiredDocumentsRail;