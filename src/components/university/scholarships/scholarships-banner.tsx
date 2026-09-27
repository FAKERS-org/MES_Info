import React from 'react';
import { Badge } from "@/components/ui/badge";

const ScholarshipBanner = () => {
  const stats = [
    {
      value: '៤៥០+',
      label: 'កៅអីសរុប (Total Seats)',
      valueColor: 'text-slate-200',
      bgColor: 'bg-white/5',
      borderColor: 'border-white/10',
    },
    {
      value: '$350,000+',
      label: 'តម្លៃសរុប (Total Value)',
      valueColor: 'text-sky-300',
      bgColor: 'bg-white/5',
      borderColor: 'border-white/10',
    },
    {
      value: '១០០% &',
      secondValue: '៥០%',
      label: 'ពិន្ទុពេញ និងពាក់កណ្តាល',
      valueColor: 'text-emerald-400',
      secondValueColor: 'text-emerald-300',
      bgColor: 'bg-white/5',
      borderColor: 'border-white/10',
    }
  ];

  return (
    <div className="w-full bg-[#0B1F3A] rounded-xl overflow-hidden font-sans shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 md:p-8 gap-8">
        
        {/* --- Left Section: Text Content --- */}
        <div className="flex-1 space-y-4 max-w-2xl">
          <Badge 
            variant="outline" 
            className="bg-transparent border-sky-800/50 text-sky-200 hover:bg-transparent rounded-full px-3 py-1 text-[10px] md:text-xs font-medium flex items-center gap-2 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            ផ្នែកសិក្សា ២០២៥ - ២០២៦ (ACADEMIC YEAR 2025-2026)
          </Badge>

          <h1 className="text-2xl md:text-[28px] font-bold leading-snug md:leading-tight">
            <span className="text-white">ឱកាសអាហារូបករណ៍ប្រចាំឆ្នាំសិក្សា នៅវិទ្យា</span>
            <br className="hidden md:block" />
            <span className="text-sky-300">ស្ថានបច្ចេកវិទ្យាកម្ពុជា</span>
          </h1>

          <p className="text-sm md:text-[15px] text-sky-100/70 leading-relaxed max-w-xl">
            អាហារូបករណ៍ ផ្តល់ឱកាសដល់និស្សិតឆ្នើមដែលមានសមត្ថភាព និងការលះបង់ ដើម្បីបន្តការសិក្សាក្នុងវិស័យបច្ចេកវិទ្យា និងវិទ្យាសាស្ត្រ ដែលមានសក្តានុពលខ្ពស់បំផុត។
          </p>
        </div>

        {/* --- Right Section: Statistic Cards --- */}
        <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-3 gap-3 shrink-0">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 flex flex-col justify-center min-w-[120px] md:min-w-[130px] h-full`}
            >
              <div className="flex flex-col gap-1 mb-2">
                <span className={`text-xl md:text-2xl font-bold ${stat.valueColor}`}>
                  {stat.value}
                </span>
                {stat.secondValue && (
                  <span className={`text-xl md:text-2xl font-bold ${stat.secondValueColor}`}>
                    {stat.secondValue}
                  </span>
                )}
              </div>
              <span className="text-[10px] md:text-xs text-sky-200/60 font-medium leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ScholarshipBanner;