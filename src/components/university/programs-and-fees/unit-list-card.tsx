import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { NamespacedText } from "@/data/universities";
import type { Lang } from "@/lib/language";
import { localize } from "@/lib/language";
import type { UnitRow } from "@/lib/unit-routes";
import { ChevronRight, GraduationCap, Layers } from "lucide-react";
import Link from "next/link";

export interface UnitListCardProps {
    title: NamespacedText;
    /** When set, the header becomes a link — the card's own unit page. */
    titleHref?: string;
    subtitle?: string;
    /** The units listed, each with the URL that reaches it. */
    rows: UnitRow[];
    lang: Lang;
    tuitionFee?: number;
    tuitionFemaleFee?: number;
}

/**
 * One card of the programs list: a faculty (or a department where a university
 * has none) and the units under it.
 *
 * The rows arrive with their own hrefs rather than being linked from an id
 * here. A row can sit at any depth below the card, and the URL of a unit is its
 * whole chain from the top-level unit — the card does not know that chain, and
 * used to invent one segment of it.
 */
export function UnitListCard({ title, titleHref, subtitle, rows, lang, tuitionFee, tuitionFemaleFee }: UnitListCardProps) {
    const Header = (
        <div className="bg-card border-b border-border p-5 flex items-center gap-4">
            <div className="bg-primary/10 text-primary p-2.5 rounded-lg border border-primary/20">
                <GraduationCap className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-xl font-bold font-khmer leading-tight text-foreground truncate">{localize(title, lang)}</h2>
                {subtitle ? (
                    <p className="text-muted-foreground text-xs md:text-sm mt-0.5">{subtitle}</p>
                ) : (
                    <p className="text-muted-foreground text-xs md:text-sm mt-0.5">{title.en}</p>
                )}
            </div>
            {tuitionFee != null && (
                <div className="text-right shrink-0">
                    <Badge variant="outline" className="font-semibold text-xs border-primary/30 text-foreground">
                        ${tuitionFee}{lang === "kh" ? "/ឆ្នាំ" : "/yr"}
                        {tuitionFemaleFee != null && (
                            <span className="ml-1 text-rose-600 dark:text-rose-400 font-bold">
                                (♀ ${tuitionFemaleFee})
                            </span>
                        )}
                    </Badge>
                </div>
            )}
            {titleHref && <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />}
        </div>
    );

    return (
        <Card className="overflow-hidden border border-border shadow-sm rounded-xl bg-card" padding="none">
            {titleHref ? (
                <Link href={titleHref} className="block hover:bg-muted/40 transition-colors">
                    {Header}
                </Link>
            ) : (
                Header
            )}

            <CardContent className="p-0">
                {rows.length === 0 && (
                    <p className="p-6 text-sm text-muted-foreground font-khmer">
                        {lang === "kh" ? "មិនទាន់មានដេប៉ាតឺម៉ង់ជាក់ស្តែងទេ។" : "No departments listed yet."}
                    </p>
                )}

                {rows.map(({ unit, href }, index) => (
                    <div key={unit.id}>
                        <div className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-muted/50 transition-colors">
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-xl font-bold text-foreground font-khmer">
                                        {localize(unit.name, lang)}
                                    </h3>
                                    <Badge className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/60 px-2 py-0.5 rounded-md text-xs font-normal font-khmer">
                                        {localize(unit.category, lang)}
                                    </Badge>
                                    {unit.units && unit.units.length > 0 && (
                                        <Badge className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/60 px-2 py-0.5 rounded-md text-xs font-normal font-khmer flex items-center gap-1">
                                            <Layers className="w-3 h-3" />
                                            {lang === "kh" ? "ដេប៉ាតឺម៉ង់ទន្ទឹម" : "Sub-departments"}
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-muted-foreground text-[15px]">{unit.name.en}</p>
                            </div>

                            <div className="flex md:items-end">
                                <Link
                                    href={href}
                                    className="inline-flex items-center gap-1 bg-muted hover:bg-border text-foreground font-khmer rounded-lg px-4 h-9 text-sm transition-colors"
                                >
                                    {lang === "kh" ? "ព័ត៌មានលម្អិត" : "View Details"}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>

                        {index < rows.length - 1 && <Separator className="bg-muted" />}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
