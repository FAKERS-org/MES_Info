import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Mail, MessageSquare, Phone } from "lucide-react";

export interface AdmissionsContactCardProps {
    phone?: string | null;
    email?: string | null;
    telegram?: string | null;
    universityName?: string | null;
    website?: string | null;
    advisorName?: string | null;
    advisorRole?: string | null;
    advisorAvatar?: string | null;
}

function AdvisorIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 14v-3a8 8 0 1 1 16 0v3" />
            <path d="M18 19a2 2 0 0 1-2 2h-4" />
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="15" cy="12" r="1" fill="currentColor" />
            <path d="M9.5 15.5c1 1 4 1 5 0" />
            <rect x="2" y="13" width="3" height="5" rx="1.5" />
            <rect x="19" y="13" width="3" height="5" rx="1.5" />
        </svg>
    );
}

export default function AdmissionsContactCard({
    phone,
    email,
    telegram,
    website,
    universityName,
    advisorName,
    advisorRole,
    advisorAvatar,
}: AdmissionsContactCardProps) {
    const telegramUsername = telegram?.replace(/^@/, "").trim();
    const telegramUrl = telegramUsername
        ? telegramUsername.startsWith("http")
            ? telegramUsername
            : `https://t.me/${telegramUsername}`
        : "https://t.me/mes_cambodia";

    const displayPhone = phone || "023 880 370";

    return (
        <Card className="w-full rounded-3xl border border-border/80 shadow-xs bg-card p-4 sm:p-5 font-sans space-y-4">
            {/* --- Header Section --- */}
            <div className="flex items-center gap-2.5">
                <AdvisorIcon className="w-6 h-6 text-[#0d557a] dark:text-sky-400 shrink-0" />
                <h2 className="text-base sm:text-lg font-bold text-foreground font-khmer">
                    ទីប្រឹក្សាការសិក្សា (Admissions)
                </h2>
            </div>

            {/* --- Advisor Profile Box --- */}
            <div className="bg-[#eef5fc] dark:bg-sky-950/30 border border-sky-100/80 dark:border-sky-900/40 rounded-2xl p-4 flex items-center gap-3.5">
                <img
                    src={advisorAvatar || "/images/advisor-avatar.jpg"}
                    alt={advisorName || "Head of Admissions"}
                    className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-white dark:border-slate-800 shadow-xs"
                />
                <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-foreground text-sm sm:text-base font-khmer truncate">
                        {advisorName || "លោកគ្រូ វណ្ណារ៉ា (Vannara)"}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-normal">
                        {advisorRole || "Head of Student Admissions"}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 font-khmer">
                            Online ឥឡូវនេះ
                        </span>
                    </div>
                </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="flex flex-col gap-2.5">
                <Button
                    asChild
                    className="w-full bg-[#e6f4fa] hover:bg-[#d8edf7] text-[#0d557a] dark:bg-sky-950/60 dark:hover:bg-sky-900/60 dark:text-sky-300 font-khmer font-semibold text-sm h-11.5 rounded-2xl flex items-center justify-center gap-2 transition-colors border-0 shadow-none cursor-pointer"
                >
                    <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-4.5 w-4.5 shrink-0" />
                        <span>ផ្ញើសារសាកសួរ (Telegram Q&A)</span>
                    </a>
                </Button>

                <Button
                    asChild
                    className="w-full bg-[#f1f3f5] hover:bg-[#e6e9ec] text-[#343a40] dark:bg-muted dark:hover:bg-muted/80 dark:text-foreground font-sans font-semibold text-sm h-11.5 rounded-2xl flex items-center justify-center gap-2 transition-colors border-0 shadow-none cursor-pointer"
                >
                    <a href={`tel:${displayPhone.replace(/\s+/g, "")}`}>
                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>Hotline: {displayPhone}</span>
                    </a>
                </Button>

                {/* Subtle auxiliary contact links if available */}
                {(email || website) && (
                    <div className="flex items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                className="hover:text-primary transition-colors flex items-center gap-1"
                            >
                                <Mail className="h-3 w-3" />
                                <span className="truncate max-w-[150px]">{email}</span>
                            </a>
                        )}
                        {website && (
                            <a
                                href={website.startsWith("http") ? website : `https://${website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors flex items-center gap-1"
                            >
                                <Globe className="h-3 w-3" />
                                <span className="truncate max-w-[150px]">{website.replace(/^https?:\/\//, "")}</span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
}
