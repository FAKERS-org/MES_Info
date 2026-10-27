import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { NamespacedText } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { localize } from "@/lib/language";
import type { UnitRow } from "@/lib/unit-routes";
import { ChevronRight, FolderTree, GraduationCap } from "lucide-react";
import Link from "next/link";

export interface UnitListCardProps {
    lang: Lang;
    rows: UnitRow[];
    subtitle?: string;
    title: NamespacedText;
    titleHref?: string;
    tuitionFee?: number;
    tuitionFemaleFee?: number;
}

export function UnitListCard({
    title,
    titleHref,
    subtitle,
    rows,
    lang,
    tuitionFee,
    tuitionFemaleFee,
}: UnitListCardProps) {
    const isKhmer = lang === "kh";

    const Header = (
        <div className="bg-card border-b border-border p-4 sm:p-5 flex items-center gap-3.5">
            <div className="bg-primary/10 text-primary p-2 rounded-xl shrink-0">
                <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold font-khmer leading-tight text-foreground truncate">
                    {localize(title, lang)}
                </h2>
                {subtitle ? (
                    <p className="text-muted-foreground text-xs mt-0.5">{subtitle}</p>
                ) : (
                    <p className="text-muted-foreground text-xs mt-0.5">{title.en}</p>
                )}
            </div>
            {tuitionFee != null && (
                <div className="text-right shrink-0">
                    <Badge variant="outline" className="font-semibold text-xs border-primary/30 text-foreground">
                        ${tuitionFee}{isKhmer ? "/ឆ្នាំ" : "/yr"}
                        {tuitionFemaleFee != null && (
                            <span className="ml-1 text-rose-600 dark:text-rose-400 font-bold">
                                (♀ ${tuitionFemaleFee})
                            </span>
                        )}
                    </Badge>
                </div>
            )}
            {titleHref && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
        </div>
    );

    return (
        <Card className="overflow-hidden border border-border shadow-xs rounded-2xl bg-card" padding="none">
            {titleHref ? (
                <Link href={titleHref} className="block hover:bg-muted/40 transition-colors">
                    {Header}
                </Link>
            ) : (
                Header
            )}

            <CardContent className="p-0">
                {rows.length === 0 && (
                    <p className="p-6 text-sm text-muted-foreground font-khmer text-center">
                        {isKhmer ? "មិនទាន់មានដេប៉ាតឺម៉ង់ជាក់ស្តែងទេ។" : "No departments listed yet."}
                    </p>
                )}

                {rows.map(({ unit, href }, index) => (
                    <div key={unit.id}>
                        <div className="p-4 sm:p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-muted/30 transition-colors">
                            <div className="flex-1 space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-semibold text-foreground font-khmer">
                                        {localize(unit.name, lang)}
                                    </h3>
                                    <Badge className="bg-primary/10 text-primary border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer">
                                        {localize(unit.category, lang)}
                                    </Badge>
                                    {unit.units && unit.units.length > 0 && (
                                        <Badge className="bg-muted text-muted-foreground border-0 px-2 py-0.5 rounded-md text-xs font-medium font-khmer flex items-center gap-1">
                                            <FolderTree className="h-3 w-3" />
                                            {isKhmer ? "ដេប៉ាតឺម៉ង់ទន្ទឹម" : "Sub-departments"}
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-muted-foreground text-xs">{unit.name.en}</p>
                            </div>

                            <div className="flex md:items-center">
                                <Link
                                    href={href}
                                    className="inline-flex items-center gap-1 bg-muted hover:bg-border text-foreground font-khmer rounded-lg px-3 h-8 text-xs font-medium transition-colors cursor-pointer"
                                >
                                    <span>{isKhmer ? "ព័ត៌មានលម្អិត" : "View Details"}</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>

                        {index < rows.length - 1 && <Separator className="bg-border/60" />}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
