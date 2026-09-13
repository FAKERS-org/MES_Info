import { ChevronRight, Clock, GraduationCap, Zap } from "lucide-react";

const CourseItem = ({ 
  titleKh, 
  titleEn, 
  badge, 
  degree, 
  years, 
  price, 
  seats, 
  cta 
}: { 
  titleKh: string; 
  titleEn: string; 
  badge?: string; 
  degree: string; 
  years: string; 
  price: string; 
  seats?: string; 
  cta?: string 
}) => (
  <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 last:border-0 sm:flex-row sm:items-center">
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-gray-900 font-sans">{titleKh}</h3>
        {badge && (
          <span className="rounded bg-[#E5F5E9] px-1.5 py-0.5 text-[10px] font-medium text-[#2E7D32]">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500">{titleEn}</p>
      
      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <GraduationCap className="h-3.5 w-3.5" /> {degree}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> រយៈពេល {years} (5 Years Full-time)
        </span>
      </div>
    </div>

    <div className="flex flex-row items-center justify-between gap-6 sm:flex-col sm:items-end">
      <div className="text-right">
        <div className="font-semibold text-gray-900 text-lg">
          {price} <span className="text-xs font-normal text-gray-500">/ ឆ្នាំ</span>
        </div>
        {seats && <div className="text-[11px] text-gray-400">{seats}</div>}
      </div>
      
      <button className="flex items-center gap-1 rounded bg-[#F0F4F8] px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-[#E2E8F0] transition-colors">
        {cta || "ព័ត៌មានលម្អិត"} <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  </div>
);

export const FacultyCard = () => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#0B1B36] p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-white/10">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold font-sans">មហាវិទ្យាល័យវិស្វកម្មអគ្គិសនី និងជាមពល</h2>
            <p className="text-xs text-gray-300">Faculty of Electrical and Energy Engineering (FEE)</p>
          </div>
        </div>
        <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium">
          3 Majors Offered
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col">
        <CourseItem 
          titleKh="វិស្វកម្មទូរគមនាគមន៍ និងបណ្តាញ"
          titleEn="Telecommunication & Network Engineering (GTR)"
          badge="ពេញនិយម"
          degree="បរិញ្ញាបត្រវិស្វកម្ម (Diplôme d'Ingénieur)"
          years="៥ ឆ្នាំ"
          price="$650"
          seats="មានអាហារូបករណ៍"
        />
        <CourseItem 
          titleKh="វិស្វកម្មអគ្គិសនី"
          titleEn="Electrical Power Engineering (GEE)"
          degree="បរិញ្ញាបត្រវិស្វកម្ម (Engineering)"
          years="៥ ឆ្នាំ"
          price="$650"
          seats="ចំណុះ 120 នាក់"
        />
        <CourseItem 
          titleKh="ស្វ័យប្រវត្តិកម្ម និងមនុស្សយន្ត"
          titleEn="Automation & Robotics Engineering (GAR)"
          badge="ថ្មីពិសេស"
          degree="បរិញ្ញាបត្រវិស្វកម្ម (Engineering Degree)"
          years="៥ ឆ្នាំ"
          price="$750"
          seats="Smart Lab ITC"
        />
      </div>
    </div>
  );
};
