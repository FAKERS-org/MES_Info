import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Headphones, Mail, MessageSquare, Phone } from "lucide-react";
import LocalizedText from "../shared/localized-text";

export interface AdmissionsContactCardProps {
    phone?: string | null;
    email?: string | null;
    telegram?: string | null;
    website?: string | null;
    universityName?: string | null;
}

export default function AdmissionsContactCard({
    phone,
    email,
    telegram,
    website,
    universityName,
}: AdmissionsContactCardProps) {
    const telegramUsername = telegram?.replace(/^@/, "").trim();
    const telegramUrl = telegramUsername
        ? telegramUsername.startsWith("http")
            ? telegramUsername
            : `https://t.me/${telegramUsername}`
        : null;

    return (
        <Card className="w-full rounded-[24px] border border-border shadow-sm bg-card overflow-hidden">
            <div className="p-5 flex flex-col gap-4">
                {/* --- Header --- */}
                <div className="flex items-center gap-2 mb-1">
                    <Headphones className="w-5 h-5 text-sky-600 dark:text-sky-400" strokeWidth={2} />
                    <h2 className="text-[16px] font-bold text-foreground font-khmer">
                        <LocalizedText translationKey="miscellaneous.advisor" />
                    </h2>
                </div>

                {/* --- Office Info --- */}
                <div className="bg-muted/70 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center shrink-0 text-sky-600 dark:text-sky-400 font-bold">
                        MES
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h3 className="font-semibold text-foreground text-sm truncate">
                            {universityName || "Admissions Office"}
                        </h3>
                        <p className="text-muted-foreground text-xs">Official Student Guidance</p>
                    </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="flex flex-col gap-2 mt-1">
                    {telegramUrl && (
                        <Button
                            asChild
                            variant="secondary"
                            className="w-full bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-950/70 text-sky-700 dark:text-sky-300 h-11 rounded-xl flex items-center justify-center gap-2 transition-colors border-0"
                        >
                            <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                                <MessageSquare className="w-4 h-4" strokeWidth={2} />
                                <span className="font-semibold text-sm font-khmer">
                                    <LocalizedText translationKey="contact.telegram" />
                                </span>
                            </a>
                        </Button>
                    )}

                    {phone && (
                        <Button
                            asChild
                            variant="outline"
                            className="w-full bg-card hover:bg-muted text-foreground h-11 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                            <a href={`tel:${phone.replace(/\s+/g, "")}`}>
                                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                                <span className="font-medium text-sm truncate">{phone}</span>
                            </a>
                        </Button>
                    )}

                    {email && (
                        <Button
                            asChild
                            variant="outline"
                            className="w-full bg-card hover:bg-muted text-foreground h-11 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                            <a href={`mailto:${email}`}>
                                <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" strokeWidth={2} />
                                <span className="font-medium text-sm truncate">{email}</span>
                            </a>
                        </Button>
                    )}

                    {website && (
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full text-muted-foreground hover:text-foreground h-9 rounded-xl flex items-center justify-center gap-2 text-xs"
                        >
                            <a
                                href={website.startsWith("http") ? website : `https://${website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Globe className="w-3.5 h-3.5" strokeWidth={2} />
                                <span className="truncate">{website.replace(/^https?:\/\//, "")}</span>
                            </a>
                        </Button>
                    )}

                    {!telegramUrl && !phone && !email && !website && (
                        <p className="text-xs text-center text-muted-foreground py-2">
                            No direct hotline listed. Check official website or campus desk.
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
}
