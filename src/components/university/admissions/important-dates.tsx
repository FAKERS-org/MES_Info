import { Button } from "@/components/ui/button";
import { CalendarDays, CalendarPlus, Clock, GraduationCap, Send } from "lucide-react";

const ImportantDates = () => {
    return (
        <div className="w-full max-w-sm mx-auto bg-card rounded-2xl shadow-sm border border-border p-5 font-sans">
            {/* --- Header --- */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-foreground">កាលបរិច្ឆេទសំខាន់ៗ</h2>
                <div className="text-sky-500 dark:text-sky-400">
                    <CalendarDays className="h-5 w-5" />
                </div>
            </div>

            {/* --- Countdown Card --- */}
            <div className="bg-[#0B1F3A] rounded-xl p-4 mb-6 text-white relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] text-sky-200 uppercase tracking-wider font-medium">
                        ថ្ងៃផុតកំណត់ដាក់ពាក្យ
                    </p>
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Urgent
                    </span>
                </div>

                <h3 className="text-xl font-bold mb-1">៣០ កញ្ញា ២០២៥</h3>
                <p className="text-xs text-sky-200 mb-4">September 30, 2025 • 23:59 PM</p>

                <div className="flex items-center gap-2 mb-3 text-xs text-sky-100">
                    <Clock className="h-3.5 w-3.5" />
                    <span>នៅសល់ពេលវេលា (Time Remaining):</span>
                </div>

                {/* Countdown Boxes */}
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { val: "18", label: "ថ្ងៃ", sub: "(Days)" },
                        { val: "09", label: "ម៉ោង", sub: "" },
                        { val: "42", label: "នាទី", sub: "" },
                        { val: "15", label: "វិនាទី", sub: "" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white/10 backdrop-blur-sm rounded-lg py-2 flex flex-col items-center justify-center border border-white/5"
                        >
                            <span className="text-xl font-bold leading-none mb-1">{item.val}</span>
                            <span className="text-[9px] text-sky-200">{item.label}</span>
                            {item.sub && <span className="text-[8px] text-sky-300 mt-0.5">{item.sub}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Timeline List --- */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {/* Item 1 */}
                <div className="relative flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center shrink-0 z-10 text-sky-600 dark:text-sky-400">
                        <CalendarDays className="h-5 w-5" />
                    </div>
                    <div className="pt-0.5">
                        <p className="text-xs text-muted-foreground mb-1">ថ្ងៃប្រឡងជ្រើសរើសចូលរៀន</p>
                        <h4 className="text-[15px] font-bold text-foreground leading-snug mb-1">
                            ១៥ តុលា ២០២៥ (15 Oct 2025)
                        </h4>
                        <p className="text-xs text-muted-foreground">មណ្ឌលប្រឡងស្ថិតនៅវិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (ITC)</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="relative flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0 z-10 text-emerald-500 dark:text-emerald-400">
                        <Send className="h-5 w-5 -ml-1 mt-1" />
                    </div>
                    <div className="pt-0.5">
                        <p className="text-xs text-muted-foreground mb-1">ប្រកាសលទ្ធផលប្រឡងជាផ្លូវការ</p>
                        <h4 className="text-[15px] font-bold text-foreground leading-snug mb-1">
                            ២៨ តុលា ២០២៥ (28 Oct 2025)
                        </h4>
                        <p className="text-xs text-muted-foreground">ផ្សាយតាម Telegram & ITC Portal</p>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="relative flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center shrink-0 z-10 text-indigo-500 dark:text-indigo-400">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="pt-0.5">
                        <p className="text-xs text-muted-foreground mb-1">ចាប់ផ្ដើមចុះឈ្មោះចូលរៀន</p>
                        <h4 className="text-[15px] font-bold text-foreground leading-snug mb-1">
                            ១៧ វិច្ឆិកា ២០២៥ (17 Nov 2025)
                        </h4>
                        <p className="text-xs text-muted-foreground">ផ្ទៀងផ្ទាត់ឯកសារនៅ (TRC)</p>
                    </div>
                </div>
            </div>

            {/* --- Footer Button --- */}
            <div className="mt-8">
                <Button
                    variant="secondary"
                    className="w-full bg-muted hover:bg-border text-foreground font-medium py-6 rounded-xl flex items-center justify-center gap-2"
                >
                    <CalendarPlus className="h-4 w-4" />
                    បន្ថែមទៅក្នុង Google Calendar
                </Button>
            </div>
        </div>
    );
};

export default ImportantDates;
