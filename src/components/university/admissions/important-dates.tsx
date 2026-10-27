import { Button } from "@/components/ui/button";
import { CalendarDays, CalendarPlus, Clock, GraduationCap, Send } from "lucide-react";

const ImportantDates = () => {
    return (
        <div className="w-full max-w-sm mx-auto bg-card rounded-2xl shadow-xs border border-border p-5 font-sans">
            {/* --- Header --- */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-base md:text-lg font-bold text-foreground">កាលបរិច្ឆេទសំខាន់ៗ</h2>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <CalendarDays className="h-4.5 w-4.5" />
                </div>
            </div>

            {/* --- Countdown Card --- */}
            <div className="bg-primary/95 text-primary-foreground rounded-xl p-4 mb-6 relative overflow-hidden shadow-xs">
                <div className="flex justify-between items-start mb-3">
                    <p className="text-xs text-primary-foreground/80 uppercase tracking-wider font-semibold">
                        ថ្ងៃផុតកំណត់ដាក់ពាក្យ
                    </p>
                    <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                        Urgent
                    </span>
                </div>

                <h3 className="text-xl font-bold mb-0.5">៣០ កញ្ញា ២០២៥</h3>
                <p className="text-xs text-primary-foreground/75 mb-4">September 30, 2025 • 23:59 PM</p>

                <div className="flex items-center gap-2 mb-2.5 text-xs text-primary-foreground/90">
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
                            className="bg-primary-foreground/15 backdrop-blur-xs rounded-lg py-2 flex flex-col items-center justify-center border border-primary-foreground/10"
                        >
                            <span className="text-lg md:text-xl font-bold leading-none mb-1">{item.val}</span>
                            <span className="text-[10px] text-primary-foreground/80">{item.label}</span>
                            {item.sub && <span className="text-[9px] text-primary-foreground/70 mt-0.5">{item.sub}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Timeline List --- */}
            <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[17px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {/* Item 1 */}
                <div className="relative flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10 text-primary">
                        <CalendarDays className="h-4 w-4" />
                    </div>
                    <div className="pt-0.5">
                        <p className="text-xs text-muted-foreground mb-0.5">ថ្ងៃប្រឡងជ្រើសរើសចូលរៀន</p>
                        <h4 className="text-sm font-bold text-foreground leading-snug mb-0.5">
                            ១៥ តុលា ២០២៥ (15 Oct 2025)
                        </h4>
                        <p className="text-xs text-muted-foreground">មណ្ឌលប្រឡងស្ថិតនៅវិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (ITC)</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="relative flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10 text-primary">
                        <Send className="h-4 w-4" />
                    </div>
                    <div className="pt-0.5">
                        <p className="text-xs text-muted-foreground mb-0.5">ប្រកាសលទ្ធផលប្រឡងជាផ្លូវការ</p>
                        <h4 className="text-sm font-bold text-foreground leading-snug mb-0.5">
                            ២៨ តុលា ២០២៥ (28 Oct 2025)
                        </h4>
                        <p className="text-xs text-muted-foreground">ផ្សាយតាម Telegram & ITC Portal</p>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="relative flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10 text-primary">
                        <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="pt-0.5">
                        <p className="text-xs text-muted-foreground mb-0.5">ចាប់ផ្ដើមចុះឈ្មោះចូលរៀន</p>
                        <h4 className="text-sm font-bold text-foreground leading-snug mb-0.5">
                            ១៧ វិច្ឆិកា ២០២៥ (17 Nov 2025)
                        </h4>
                        <p className="text-xs text-muted-foreground">ផ្ទៀងផ្ទាត់ឯកសារនៅ (TRC)</p>
                    </div>
                </div>
            </div>

            {/* --- Footer Button --- */}
            <div className="mt-7">
                <Button
                    variant="outline"
                    className="w-full text-foreground font-medium py-5 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm"
                >
                    <CalendarPlus className="h-4 w-4 text-primary" />
                    បន្ថែមទៅក្នុង Google Calendar
                </Button>
            </div>
        </div>
    );
};

export default ImportantDates;
