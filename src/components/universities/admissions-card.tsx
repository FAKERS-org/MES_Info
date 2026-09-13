import { Headphones, MessageCircle, Phone } from "lucide-react";

export const AdmissionsCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 w-full font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="text-blue-600">
          <Headphones size={26} strokeWidth={2.5} />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          ទីប្រឹក្សាការសិក្សា (Admissions)
        </h3>
      </div>

      {/* Profile Card Section */}
      <div className="bg-slate-50 rounded-2xl p-3 flex gap-3 mb-4 items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
           {/* Replace with actual image */}
           <img 
             src="/api/placeholder/100/100" 
             alt="Profile" 
             className="w-full h-full object-cover"
           />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            លោកគ្រូ វណ្ណា (Vanna...)
          </h4>
          <p className="text-slate-500 text-xs">Head of Student Admissions</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-green-700 text-xs font-medium">Online ឥឡូវនេះ</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors">
          <MessageCircle size={18} />
          <span>ផ្ញើសារសួរ (Telegram Q&A)</span>
        </button>
        
        <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors">
          <Phone size={18} />
          <span>Hotline: 023 880 370</span>
        </button>
      </div>
    </div>
  );
};
