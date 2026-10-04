import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, CheckCircle2, ChevronRight, Info, MonitorPlay } from "lucide-react";

// --- Reusable Card Component ---
const ScholarshipCard = ({ data }: { data: any }) => {
    const isMoEYS = data.type === "moEYS";

    // Theme Colors
    const theme = {
        iconBg: isMoEYS ? "bg-sky-50 dark:bg-sky-950/30" : "bg-blue-50 dark:bg-blue-950/30",
        iconColor: isMoEYS ? "text-sky-600 dark:text-sky-400" : "text-blue-600 dark:text-blue-400",
        titleColor: "text-foreground",
        subtitleColor: "text-muted-foreground",
        buttonBg: isMoEYS ? "bg-[#15628F] hover:bg-[#114b6f]" : "bg-[#15628F] hover:bg-[#114b6f]",
        badgeBg: isMoEYS
            ? "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800/60"
            : "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/60",
    };

    return (
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border font-sans mb-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex items-start gap-4">
                    <div className={`${theme.iconBg} ${theme.iconColor} p-3 rounded-xl shrink-0 mt-1`}>
                        {isMoEYS ? <Building2 className="h-7 w-7" /> : <MonitorPlay className="h-7 w-7" />}
                    </div>
                    <div>
                        <h2 className={`text-xl md:text-[22px] font-bold ${theme.titleColor} leading-snug mb-1`}>
                            {data.title}
                        </h2>
                        <p className={`text-sm ${theme.subtitleColor} max-w-xl leading-relaxed`}>{data.subtitle}</p>
                    </div>
                </div>

                {/* Badges */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {data.badges.map((badge: any, idx: number) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap ${badge.colorClass}`}
                        >
                            {badge.icon && <badge.icon className="h-3.5 w-3.5" />}
                            {badge.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-muted/80 rounded-xl p-4 mb-6 border border-border">
                {data.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="flex flex-col">
                        <span className="text-xs text-muted-foreground mb-1">{stat.label}</span>
                        <span
                            className={`text-[15px] font-bold ${stat.valueColor || "text-foreground"} leading-tight mb-0.5`}
                        >
                            {stat.value}
                        </span>
                        <span className="text-[11px] text-muted-foreground/70">{stat.subValue}</span>
                    </div>
                ))}
            </div>

            {/* Key Selection Criteria */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    {data.criteriaTitle}
                    {!isMoEYS && <Info className="h-4 w-4 text-muted-foreground/70" />}
                </h3>
                <ul className="space-y-2.5">
                    {data.criteria.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border">
                <Button
                    variant="link"
                    className="text-foreground font-semibold hover:no-underline flex items-center gap-1 p-0 h-auto text-sm"
                >
                    {data.detailsText}
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    className={`w-full sm:w-auto ${theme.buttonBg} text-white rounded-lg px-6 py-2.5 font-medium flex items-center gap-2 text-sm`}
                >
                    {data.applyText}
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

// --- Main Component ---
const ScholarshipOptions = () => {
    const scholarshipData = [
        {
            type: "moEYS",
            title: "អាហារូបករណ៍រដ្ឋាភិបាលកម្ពុជា MoEYS (Cambodian Government State Quota)",
            subtitle: "ក្រសួងអប់រំ យុវជន និងកីឡា (Ministry of Education, Youth and Sport)",
            badges: [
                { text: "១០០% កម្ចីសិក្សា", colorClass: "bg-muted text-muted-foreground border-border" },
                { text: "ជ្រើសរើស៖ មាន កញ្ចប់ថវិកា", colorClass: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/60" },
            ],
            stats: [
                { label: "រយៈពេលសិក្សា", value: "៥ ឆ្នាំ (Full 5 Years)", subValue: "គិតជាឆ្នាំ (Including)" },
                { label: "ចំនួនកៅអីសរុប", value: "១០០ កៅអី (Seats)", subValue: "ជ្រើសរើសតាមការប្រឡងជ្រើសរើស" },
                { label: "លក្ខខណ្ឌចូលរៀន", value: "ប្រឡងជ្រើសរើស ITC", subValue: "និទ្ទេស A, B, C" },
            ],
            criteriaTitle: "លក្ខខណ្ឌជ្រើសរើសជាក់លាក់ (Key Selection Criteria):",
            criteria: [
                "មានសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ និងត្រូវបានជាប់ឈ្មោះក្នុងបញ្ជីជាប់ជាផ្លូវការ ITC ឬឆ្នាំទី១ (National Entrance Rank 1 - 200)។",
                "ជាសិស្សដែលមានលទ្ធផលសិក្សាល្អប្រសើរ (ជាពិសេស គណិតវិទ្យា រូបវិទ្យា គីមីវិទ្យា)។",
                "មានភាពចាំបាច់ខ្ពស់ (GPA) មិនតិចជាង 2.75 និងមានឆន្ទៈក្នុងការបម្រើសង្គម។",
            ],
            detailsText: "មើលលក្ខខណ្ឌលម្អិត (View Criteria)",
            applyText: "ដាក់ពាក្យ (Apply Now)",
        },
        {
            type: "mptc",
            title: "អាហារូបករណ៍ពីក្រសួងប្រៃសណីយ៍ (Techo Digital Talent - MPTC)",
            subtitle: "ក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍ (Ministry of Post and Telecommunications)",
            badges: [
                {
                    text: "១០០% + ជូនថវិកា",
                    colorClass: "bg-muted text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/60",
                    icon: CheckCircle2,
                },
                { text: "STEM Priority", colorClass: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800/60" },
            ],
            stats: [
                {
                    label: "អាហារូបករណ៍ពិសេស",
                    value: "100% Fee + $120/m",
                    subValue: "រួមទាំងថវិកាឧបត្ថម្ភ Laptop ផងដែរ",
                    valueColor: "text-amber-500",
                },
                {
                    label: "ជំនាញអាទិភាព",
                    value: "GIC, AI, Telecom",
                    subValue: "Computer Science & Cybersecurity",
                    valueColor: "text-foreground",
                },
                {
                    label: "ចំនួនកៅអីសរុប",
                    value: "៥០ កៅអី",
                    subValue: "សម្រាប់និស្សិត MPTC",
                    valueColor: "text-amber-500",
                },
            ],
            criteriaTitle: "លក្ខខណ្ឌជ្រើសរើស (Eligibility):",
            criteria: [
                "លក្ខខណ្ឌជ្រើសរើសផ្តោតលើនិស្សិតដែលមានទេពកោសល្យខ្ពស់ និងមានចំណាប់អារម្មណ៍ខ្លាំងលើ GIC, AI, និងជំនាញព័ត៌មានវិទ្យា។",
                "លក្ខខណ្ឌជ្រើសរើសផ្តោតលើ និស្សិតដែលមានសមត្ថភាព និងការលះបង់ ដើម្បីបន្តការសិក្សាក្នុងវិស័យបច្ចេកវិទ្យា។",
            ],
            detailsText: "មើលលក្ខខណ្ឌលម្អិត (View Criteria)",
            applyText: "ដាក់ពាក្យ (Apply)",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 bg-muted min-h-screen font-sans">
            {scholarshipData.map((data, index) => (
                <ScholarshipCard key={index} data={data} />
            ))}
        </div>
    );
};

export default ScholarshipOptions;
