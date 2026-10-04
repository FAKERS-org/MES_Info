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
        <div className="w-full max-w-[400px] bg-card rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-border p-6 font-sans">
            {/* --- Header --- */}
            <div className="flex items-center gap-3 mb-8">
                <div className="text-sky-600 dark:text-sky-400">
                    <ClipboardCheck className="h-6 w-6" strokeWidth={2} />
                </div>
                <h2 className="text-[17px] font-bold text-foreground leading-tight">
                    របៀបដាក់ពាក្យអាហារូបករណ៍ (How to Apply)
                </h2>
            </div>

            {/* --- Steps Timeline --- */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-6 bottom-6 w-[1.5px] bg-muted"></div>

                <div className="space-y-7">
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex gap-5 items-start">
                            {/* Step Number Circle */}
                            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#15628F] text-white font-bold text-sm shadow-sm ring-4 ring-white">
                                {step.number}
                            </div>

                            {/* Step Content */}
                            <div className="pt-1.5">
                                <h3 className="text-[15px] font-bold text-foreground mb-1.5 leading-snug">
                                    {step.title}
                                </h3>
                                <p className="text-[13px] text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Footer Alert --- */}
            <div className="mt-8 bg-muted rounded-xl p-4 flex items-center gap-4 border border-border">
                <div className="text-foreground">
                    <CalendarDays className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-0.5 font-medium">ថ្ងៃប្រឡងអាហារូបករណ៍</p>
                    <p className="text-[15px] font-bold text-foreground">១៥-១៦ តុលា ២០២៥</p>
                </div>
            </div>
        </div>
    );
};

export default HowToApply;
