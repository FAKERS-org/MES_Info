import { Download, FileText } from "lucide-react";

export const BrochureCard = () => {
  return (
    <div className="bg-[#0e3f5e] rounded-3xl p-6 shadow-md w-full text-white font-sans">
      {/* Icon Badge */}
      <div className="bg-[#1a537a] w-12 h-12 rounded-xl flex items-center justify-center mb-4">
        <FileText size={24} className="text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-1 leading-snug">
        ទាញយកគម្រោងបោះពុម្ពផ្សាយ
      </h3>
      <h4 className="text-lg font-semibold text-blue-100 mb-3">(Brochure)</h4>

      {/* Description */}
      <p className="text-blue-100 text-sm mb-6 opacity-90 leading-relaxed">
        សេចក្តីលម្អិតអំពីវគ្គសិក្សា និងកាលវិភាគសិក្សា ២០២៥-២០២៦ (PDF, 8.4 MB)
      </p>

      {/* Download Button */}
      <button className="w-full bg-[#4da6ff] hover:bg-[#3b8fd9] text-[#0e3f5e] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
        <Download size={20} />
        <span>ទាញយកគម្រោងបោះពុម្ព (PDF)</span>
      </button>
    </div>
  );
};