import { Button } from "@/components/ui/button";
import type { University } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { Headset, Phone, Send } from "lucide-react";

export interface AdmissionContactProps {
    university: University;
    lang: Lang;
}

/**
 * The aside card of the department page. Every line of it — the desk name, the
 * phone, the mailbox — was typed in as an ITC string, so it offered the ITC
 * admissions desk on the page of every other university in the catalogue.
 */
const AdmissionContact = ({ university, lang }: AdmissionContactProps) => {
    const { contact } = university;

    return (
        <div className="w-full max-w-md bg-[#0B1F3A] rounded-2xl p-6 font-sans shadow-lg border border-white/5 mx-auto">
            {/* --- Header Section --- */}
            <div className="flex items-center gap-3.5 mb-5">
                {/* Icon Container */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10">
                    <Headset className="h-6 w-6" strokeWidth={1.5} />
                </div>

                {/* Title Text */}
                <div className="flex flex-col">
                    <h2 className="text-[17px] font-bold text-white leading-snug">ផ្នែកប្រឹក្សាយាបល់ជំនាញ</h2>
                    <p className="text-[13px] text-sky-200/80 font-medium mt-0.5">
                        {university.id.toUpperCase()} {lang === "en" ? "Admissions Desk" : "ផ្នែកប្រឹក្សាយាបល់"}
                    </p>
                </div>
            </div>

            {/* --- Description --- */}
            <p className="text-[13px] text-sky-100/70 leading-relaxed mb-6">
                ត្រូវការការណែនាំពីការជ្រើសរើសមុខជំនាញ ឬការប្រឹក្សាផ្សេងៗ?
                ក្រុមការងារយើងខ្ញុំនៅទីនេះដើម្បីជួយសម្រួលគ្រប់ព័ត៌មានជាក់លាក់។
            </p>

            {/* --- Primary Action Button --- */}
            <Button className="w-full bg-[#15628F] hover:bg-[#114b6f] text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2.5 mb-6 shadow-md transition-colors text-[15px]">
                <Send className="h-4 w-4 shrink-0 -mt-0.5" />
                ទំនាក់ទំនង Telegram (Advisor)
            </Button>

            {/* --- Footer Contact Info --- */}
            {(contact?.phone || contact?.email) && (
                <div className="flex items-center justify-center gap-2.5 text-sky-200/90 text-[13px] font-medium pt-5 border-t border-white/10">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        {contact?.phone && <span>{contact.phone}</span>}
                        {contact?.phone && contact?.email && <span className="text-white/30">/</span>}
                        {contact?.email && (
                            <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                                {contact.email}
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdmissionContact;
