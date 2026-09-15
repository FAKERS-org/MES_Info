import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function UniversityPagination() {

    const { t } = useLanguage();

  return (
    // Container wrapper to simulate the card/list boundary
    <div className="w-full max-w-full mx-auto bg-white p-6 border rounded-xl shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Side: Info Text */}
        <div className="text-sm font-medium text-gray-600 order-1">
          {t('miscellaneous.showing')} 6 {t('miscellaneous.of')} 42 {t('miscellaneous.university.plural')}  {" "}
          <span className="text-gray-400 hidden sm:inline">
            ({t('miscellaneous.showing')} 6 {t('miscellaneous.of')} 42 {t('miscellaneous.university.plural')})
          </span>
        </div>

        {/* Right Side: Pagination Controls */}
        <div className="flex items-center gap-2 order-2 sm:order-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 w-8 p-0 bg-gray-900 hover:bg-gray-800"
          >
            1
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 bg-transparent text-gray-700"
          >
            2
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 bg-transparent text-gray-700"
          >
            3
          </Button>

          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Middle: Load More Button */}
        <div className="order-3 sm:order-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-gray-700 bg-transparent"
          >
            {t('miscellaneous.loadMoreUniversities')}
          </Button>
        </div>

      </div>
    </div>
  );
}