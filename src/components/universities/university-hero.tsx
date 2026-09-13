import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Building2, MapPin, BadgeCheck } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function UniversityHero() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-8 px-4">
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center gap-6">
        
        {/* Verified Badge */}
        <Badge 
          variant="secondary" 
          className="bg-sky-100 text-sky-700 hover:bg-sky-100 px-4 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 border-0"
        >
          <BadgeCheck className="h-4 w-4 text-sky-600" />
          បញ្ជាក់សាលារៀនដែលមានអនុម័ត • Verified Accreditation
        </Badge>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight">
          {t("explore.title")}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed">
          {t("explore.subtitle")}
        </p>

        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          
          <Button 
            variant="outline" 
            className="h-auto py-3 px-6 rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-3"
          >
            <GraduationCap className="h-5 w-5 text-sky-600" />
            <span className="font-medium">{t('miscellaneous.university.plural')}</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto py-3 px-6 rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-3"
          >
            <Building2 className="h-5 w-5 text-sky-600" />
            <span className="font-medium">{t('miscellaneous.faculty.plural')}</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto py-3 px-6 rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-3"
          >
            <MapPin className="h-5 w-5 text-sky-600" />
            <span className="font-medium">{t('miscellaneous.location')}</span>
          </Button>

        </div>

      </div>
    </section>
  )
}