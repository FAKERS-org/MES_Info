import { Button } from "@/components/ui/button";
import type { UniversityHeadingData } from "@/components/department/department-heading";
import type { Lang } from "@/lib/language";
import { Headset, Phone, Send } from "lucide-react";

export interface AdmissionContactProps {
    university: UniversityHeadingData;
    lang: Lang;
}

/**
 * The aside card of the department page. Every line of it — the desk
 * name, the phone, the mailbox — was typed in as an ITC string, so it
 * offered the ITC admissions desk on the page of every other university
 * in the catalogue. The API serves no contact fields yet, so the card
 * renders without them until the detail payload grows them.
 */
const AdmissionContact = ({ university, lang }: AdmissionContactProps) => {
    const { contact } = university;
    const code = (university.code ?? university.id).toUpperCase();

    return (
        <div className="w-full max-w-md bg-card rounded-2xl p-5 md:p-6 font-sans shadow-xs border border-border mx-auto">
            {/* --- Header Section --- */}
            <div className="flex items-center gap-3.5 mb-5">
                {/* Icon Container */}
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Headset className="h-5 w-5" />
                </div>

                {/* Title Text */}
                <div className="flex flex-col">
                    <h2 className="text-base md:text-lg font-bold text-foreground leading-snug">ផ្នែកប្រឹក្សាយាបល់ជំនាញ</h2>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        {code} {lang === "en" ? "Admissions Desk" : "ផ្នែកប្រឹក្សាយាបល់"}
                    </p>
                </div>
            </div>

            {/* --- Description --- */}
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6">
                ត្រូវការការណែនាំពីការជ្រើសរើសមុខជំនាញ ឬការប្រឹក្សាផ្សេងៗ?
                ក្រុមការងារយើងខ្ញុំនៅទីនេះដើម្បីជួយសម្រួលគ្រប់ព័ត៌មានជាក់លាក់។
            </p>

            {/* --- Primary Action Button --- */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 rounded-xl flex items-center justify-center gap-2 mb-6 shadow-xs transition-colors text-xs md:text-sm">
                <Send className="h-4 w-4 shrink-0" />
                ទំនាក់ទំនង Telegram (Advisor)
            </Button>

            {/* --- Footer Contact Info --- */}
            {(contact?.phone || contact?.email) && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs font-medium pt-4 border-t border-border">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        {contact?.phone && <span>{contact.phone}</span>}
                        {contact?.phone && contact?.email && <span className="text-border">/</span>}
                        {contact?.email && (
                            <a href={`mailto:${contact.email}`} className="hover:text-foreground hover:underline transition-colors">
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
