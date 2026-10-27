import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Mail, MessageCircle, Phone, Send } from "lucide-react";
import LocalizedText from "../shared/localized-text";

export interface AdmissionsContactCardProps {
    phone?: string | null;
    email?: string | null;
    telegram?: string | null;
    universityName?: string | null;
    website?: string | null;
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
        <Card className="w-full rounded-2xl border border-border shadow-xs bg-card overflow-hidden">
            <div className="p-5 flex flex-col gap-4">
                {/* --- Header --- */}
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                        <MessageCircle className="h-4.5 w-4.5" />
                    </div>
                    <h2 className="text-base font-semibold text-foreground font-khmer">
                        <LocalizedText translationKey="miscellaneous.advisor" />
                    </h2>
                </div>

                {/* --- Office Info --- */}
                <div className="bg-muted/50 border border-border/60 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold text-xs tracking-wider">
                        MES
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h3 className="font-semibold text-foreground text-xs sm:text-sm truncate">
                            {universityName || "Admissions Office"}
                        </h3>
                        <p className="text-muted-foreground text-xs">Official Student Guidance</p>
                    </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="flex flex-col gap-2">
                    {telegramUrl && (
                        <Button
                            asChild
                            variant="secondary"
                            className="w-full bg-primary/10 hover:bg-primary/15 text-primary h-10 rounded-xl flex items-center justify-center gap-2 transition-colors border-0 text-xs font-semibold"
                        >
                            <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                                <Send className="h-3.5 w-3.5" />
                                <span className="font-khmer">
                                    <LocalizedText translationKey="contact.telegram" />
                                </span>
                            </a>
                        </Button>
                    )}

                    {phone && (
                        <Button
                            asChild
                            variant="outline"
                            className="w-full bg-card hover:bg-muted text-foreground h-10 rounded-xl flex items-center justify-center gap-2 transition-colors border-border text-xs font-medium"
                        >
                            <a href={`tel:${phone.replace(/\s+/g, "")}`}>
                                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="truncate">{phone}</span>
                            </a>
                        </Button>
                    )}

                    {email && (
                        <Button
                            asChild
                            variant="outline"
                            className="w-full bg-card hover:bg-muted text-foreground h-10 rounded-xl flex items-center justify-center gap-2 transition-colors border-border text-xs font-medium"
                        >
                            <a href={`mailto:${email}`}>
                                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="truncate">{email}</span>
                            </a>
                        </Button>
                    )}

                    {website && (
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full text-muted-foreground hover:text-foreground h-8 rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium"
                        >
                            <a
                                href={website.startsWith("http") ? website : `https://${website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Globe className="h-3.5 w-3.5" />
                                <span className="truncate">{website.replace(/^https?:\/\//, "")}</span>
                            </a>
                        </Button>
                    )}

                    {!telegramUrl && !phone && !email && !website && (
                        <p className="text-xs text-center text-muted-foreground py-2 font-khmer">
                            No direct hotline listed. Check official website or campus desk.
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
}
