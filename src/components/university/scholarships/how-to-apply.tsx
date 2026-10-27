import { CalendarDays, ClipboardCheck } from "lucide-react";

const HowToApply = () => {
    const steps = [
        {
            number: "១",
            title: "ប្រើសិទ្ធិស្របច្បាប់អាហារូបករណ៍",
            description: 'គូសធីកជម្រើសប្រឡង "សិទ្ធិអាហារូបករណ៍" ក្នុងពេលដាក់ពាក្យ។',
        },
        {
            number: "២",
            title: "ចូលរួមប្រឡងប្រជែងដណ្តើមអាហារូបករណ៍",
            description:
                "ចូលរួមប្រឡងជ្រើសរើសជាមួយនឹងមុខវិជ្ជា គណិតវិទ្យា រូបវិទ្យា និងគីមីវិទ្យា តាមកាលវិភាគដែលបានកំណត់។",
        },
        {
            number: "៣",
            title: "ផ្ទៀងផ្ទាត់លទ្ធផល និងទទួលអាហារូបករណ៍",
            description: "លទ្ធផលនឹងត្រូវបានប្រកាសជាផ្លូវការ និងអាចពិនិត្យមើលបានតាមរយៈគេហទំព័រផ្លូវការរបស់វិទ្យាស្ថាន។",
        },
    ];

    return (
        <div className="w-full max-w-[400px] bg-card rounded-2xl shadow-xs border border-border p-6 font-sans">
            {/* --- Header --- */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <ClipboardCheck className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-foreground leading-tight">
                    របៀបដាក់ពាក្យអាហារូបករណ៍ (How to Apply)
                </h2>
            </div>

            {/* --- Steps Timeline --- */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-border"></div>

                <div className="space-y-6">
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex gap-4 items-start">
                            {/* Step Number Circle */}
                            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-xs ring-4 ring-background">
                                {step.number}
                            </div>

                            {/* Step Content */}
                            <div className="pt-1">
                                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 leading-snug">
                                    {step.title}
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Footer Alert --- */}
            <div className="mt-8 bg-muted/60 rounded-xl p-4 flex items-center gap-3.5 border border-border">
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                    <CalendarDays className="h-4.5 w-4.5" />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-0.5 font-medium">ថ្ងៃប្រឡងអាហារូបករណ៍</p>
                    <p className="text-sm font-bold text-foreground">១៥-១៦ តុលា ២០២៥</p>
                </div>
            </div>
        </div>
    );
};

export default HowToApply;
