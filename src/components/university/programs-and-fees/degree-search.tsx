import { Search } from "lucide-react";
import { Tag, TagList } from "@/components/shared/tag-list";

const FILTER_ACTIVE_CLASS =
  "whitespace-nowrap rounded-full border-0 bg-[#0B1B36] px-4 py-1.5 text-white";

const FILTER_CLASS =
  "whitespace-nowrap rounded-full border-0 bg-gray-100 px-4 py-1.5 text-gray-600 hover:bg-gray-200";

export const DegreeSearch = ({ pills }: { pills: string[] }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm w-full">
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
      <TagList className="items-center gap-1.5 overflow-x-auto flex-nowrap">
        {pills.map((label, index) => (
          <Tag
            key={label}
            as="button"
            type="button"
            className={index === 0 ? FILTER_ACTIVE_CLASS : FILTER_CLASS}
          >
            {label}
          </Tag>
        ))}
      </TagList>
    </div>
  );
};
