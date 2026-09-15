import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Globe, MapPin, GraduationCap, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { University } from "@/data";

export interface UniversityCardProps {
  university: University;
  className?: string;
}   

export function UniversityCard({ university, className }: UniversityCardProps) {
  const { lang, t } = useLanguage();
  const name = university.name[lang] ?? university.name.en;
  const description = university.description[lang] ?? university.description.en;
  const address = university.address ? (university.address[lang] ?? university.address.en) : "";
  const programCount = university.departments.length;
  const universityType = university.universityType[lang] ?? university.universityType.en;
  const universityCategory = university.universityCategory[lang] ?? university.universityCategory.en;

  return (
    <Card padding="none" className={cn("w-full overflow-hidden rounded-3xl border-slate-200 shadow-xl flex flex-col", className)}>
      {/* Header */}
      <div className="relative rounded-t-3xl bg-gradient-to-br from-[#0a3d62] to-[#1e5f8e] pt-4 pb-16">
        <div className="flex items-center justify-between px-5">
          <Badge
            variant="secondary"
            className="bg-white/15 text-white hover:bg-white/20 backdrop-blur rounded-full gap-1.5"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Top 1 Tech
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Logo + Public Badge */}
      <div className="relative -mt-10 flex items-end justify-between px-5">
        <div className="relative z-10 w-20 h-20 rounded-full bg-white shadow-lg ring-4 ring-white flex items-center justify-center overflow-hidden">
          <img
            src={university.logo}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-row items-end gap-1">
        <Badge className="relative z-10 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          {universityCategory}
        </Badge>
        <Badge className="relative z-10 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          {universityType} 
        </Badge>
        </div>
      </div>

    <CardContent className="flex flex-col px-5 pt-4 pb-5">
        {/* Title */}
        <h2 className="text-slate-800 text-xl font-bold leading-snug">
          {name}
        </h2>
        <p className="text-slate-500 text-sm mt-1 line-clamp-2">
          {description}
        </p>

        {/* Info rows - always 3 rows for consistent layout */}
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center gap-2.5 text-slate-600 text-sm">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{university.website || "\u00A0"}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600 text-sm">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{address || "\u00A0"}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600 text-sm">
            <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{programCount} Degree Programs (កម្រិត & បរិន្ញាបត្រ)</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-5 flex items-center gap-3">
          <Button
            asChild
            variant="secondary"
            className="flex-1 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-2xl h-12 font-semibold p-0"
          >
            <Link to={`/explore-universities/${university.id}`}
            className="flex items-center justify-center w-full h-full"
            >
              { t('miscellaneous.viewProgram') }
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="w-11 h-11 rounded-2xl border-slate-200 text-slate-500 shrink-0 p-0"
          >
            <Link to={`/explore-universities/${university.id}`}
            className="flex items-center justify-center w-full h-full"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}