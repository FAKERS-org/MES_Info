import { Search } from "lucide-react";

export const DegreeSearch = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm w-full max-w-fit">
      {/* Search Input */}
      <div className="flex items-center gap-2 pl-3 pr-4 border-r border-gray-200">
        <Search className="h-4 w-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="ស្វែងរកជំនាញ (Search)" 
          className="w-40 bg-transparent text-sm outline-none placeholder:text-gray-400 md:w-48 font-sans"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        <button className="whitespace-nowrap rounded-full bg-[#0B1B36] px-4 py-1.5 text-xs font-medium text-white transition-colors">
          គ្រប់ជំនាញ (All Degrees)
        </button>
        <button className="whitespace-nowrap rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors">
          វិស្វករ (Ingénieur 5Y)
        </button>
        <button className="whitespace-nowrap rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors">
          បរិញ្ញាបត្រ
        </button>
      </div>
    </div>
  );
};