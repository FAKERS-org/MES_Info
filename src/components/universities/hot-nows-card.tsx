import { BarChart3, BookOpen, GraduationCap, Info, ShieldCheck, Users } from "lucide-react";

export const HotNewsCard = () => {
  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Info className="h-5 w-5 text-[#1E3A8A]" />
        <h2 className="font-semibold text-gray-900">ព័ត៌មានសំខាន់បំផុតចំនួន២</h2>
        <span className="ml-auto text-xs text-gray-400">ITC-INFO</span>
      </div>

      {/* Card 1: BacII */}
      <div className="rounded-lg bg-[#F8FAFC] p-4 text-sm">
        <div className="mb-2 flex items-center gap-1.5 font-medium text-gray-800">
          <ShieldCheck className="h-4 w-4 text-[#1E3A8A]" />
          លទ្ធផលខាងចូលរៀន (BacII)
        </div>
        <p className="text-xs leading-relaxed text-gray-600">
          សូម្បីតែកូនសិស្សថ្នាក់ទី១២ ដែលប្រឡងធ្លាក់ ឬ បោះបង់ការប្រឡង BacII ក៏អាចចុះឈ្មោះចូលរៀននៅវិទ្យាស្ថានបានដែរ។
        </p>
        <a href="#" className="mt-2 inline-block text-xs font-medium text-[#1E3A8A] hover:underline">
          ចុះឈ្មោះចូលរៀន
        </a>
      </div>

      {/* Card 2: Exam Date */}
      <div className="rounded-lg bg-[#F8FAFC] p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
            ការប្រឡងចូលរៀន
          </div>
          <span className="rounded bg-[#FFE4E6] px-2 py-0.5 text-[10px] font-semibold text-[#E11D48]">
            ចុះឈ្មោះ 42 នាក់
          </span>
        </div>
        <h4 className="mb-1 font-semibold text-gray-900">ថ្ងៃទី ១៥ ខែ តុលា ២០២៥</h4>
        <p className="text-xs text-gray-500">October 15, 2025 • Phnom Penh ITC Center</p>
      </div>

      {/* Stats Section */}
      <div className="space-y-3 pt-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#1E3A8A]" />
          <span>ភាសាបរទេស: ខ្មែរ, អង់គ្លេស, បារាំង (Khmer, FR, EN)</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#1E3A8A]" />
          <span>និស្សិតសរុប: 12,500+ Enrolled (35% Female)</span>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5 text-gray-600">
              <BarChart3 className="h-3.5 w-3.5 text-[#1E3A8A]" /> 
              អត្រាជាប់ការងារ ៦ ខែ
            </span>
            <span className="text-gray-900">94.8%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full bg-[#0B1B36] rounded-full" style={{ width: '94.8%' }}></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-gray-800">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា
        </div>
        <span className="text-[#1E3A8A]">Toul</span>
      </div>
    </div>
  );
};