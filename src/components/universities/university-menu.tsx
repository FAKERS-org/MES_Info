import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, CalendarDays } from "lucide-react";

const TABS = [
  {
    value: "majors",
    icon: BookOpen,
    label: "ជំនាញសិក្សា & ថ្លៃសិក្សា (Majors & Fees)",
    badge: 28,
  },
  {
    value: "admissions",
    icon: GraduationCap,
    label: "ការចុះឈ្មោះ & លក្ខខណ្ឌ (Admissions)",
  },
  {
    value: "scholarships",
    icon: CalendarDays,
    label: "អាហារូបករណ៍ (Scholarships)",
  },
] as const;

const TRIGGER_CLASS =
  "group relative flex items-center gap-3 px-6 py-4 h-full rounded-xl border-none text-gray-500 font-medium transition-all duration-200 outline-none hover:bg-gray-50 hover:text-gray-700 data-[state=active]:bg-blue-50 data-[state=active]:text-[#0056b3] data-[state=active]:font-semibold data-[state=active]:shadow-none";

export default function UniversityMenu() {
  const [activeTab, setActiveTab] = useState<string>("majors");

  return (
    <div className="w-full max-w-full rounded-2xl border shadow-sm bg-white overflow-hidden p-2">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex flex-wrap justify-start h-auto bg-transparent p-0 rounded-none gap-2 items-stretch">
          {TABS.map(({ value, icon: Icon, label, badge }) => (
            <TabsTrigger key={value} value={value} className={TRIGGER_CLASS}>
              <Icon className="w-5 h-5" strokeWidth={2.5} />
              <span className="flex items-center gap-2 whitespace-nowrap text-[15px]">
                {label}
                {badge != null && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-[#0056b3] hover:bg-blue-200 rounded-full px-2 py-0.5 text-xs font-bold ml-1"
                  >
                    {badge}
                  </Badge>
                )}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}