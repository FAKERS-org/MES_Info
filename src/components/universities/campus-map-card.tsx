import { ExternalLink, Map, MapPin } from "lucide-react";

export const CampusMapCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 w-full font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className="text-blue-600 mt-1">
            <Map size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              ទីតាំង និងផែនទី
            </h3>
            <p className="text-slate-600 font-medium">(Campus Map)</p>
          </div>
        </div>
        <span className="text-blue-700 font-bold text-sm bg-blue-50 px-2 py-1 rounded-md">
          Toul Kork
        </span>
      </div>

      {/* Map Image Container */}
      <div className="relative rounded-2xl overflow-hidden mb-4 h-48 bg-slate-100 border border-slate-200">
        {/* Placeholder for Map Image */}
        <img 
          src="https://maps.googleapis.com/maps/api/staticmap?center=Phnom+Penh,Cambodia&zoom=14&size=600x300&maptype=roadmap&key=YOUR_API_KEY_OR_PLACEHOLDER" 
          alt="Campus Map" 
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            // Fallback if no API key
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback background pattern if image fails */}
        <div className="absolute inset-0 bg-blue-50 flex items-center justify-center -z-10 text-slate-400">
           Map Preview
        </div>

        {/* Floating Direction Bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-50 p-1.5 rounded-full text-red-500">
              <MapPin size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-bold text-slate-700 truncate max-w-[80px]">
              Russian...
            </span>
          </div>
          
          <button className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:text-blue-700">
            <span>ទិសដៅ (Directions)</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-slate-600 text-sm leading-relaxed">
        ស្ថិតនៅតែមួយខណ្ឌជាមួយវិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (Techno Flyover), រាជធានីភ្នំពេញ។
      </p>
    </div>
  );
};