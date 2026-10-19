"use client";

import { useState, type ChangeEvent } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChromeSettings from "@/components/layout/chrome-settings";
import { useLanguage } from "@/lib/i18n";

interface TopBarProps {
  onSearch?: (query: string) => void;
  onOpenSidebar?: () => void;
}

function TopBar({ onSearch, onOpenSidebar }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="flex w-full items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {onOpenSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onOpenSidebar}
            aria-label={t("topbar.toggleMenu")}
          >
            <Menu className="size-5" />
          </Button>
        )}
        {/* min-w-0 + flex-1 so the field yields to the buttons instead of
            pushing them past the card; sm:flex-none pins the wide width back. */}
        <div className="relative min-w-0 flex-1 sm:w-72 sm:flex-none">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="size-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t("topbar.searchPlaceholder")}
            className="w-full rounded-xl border-none bg-muted py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:bg-card focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Below `sm` this row cannot hold them beside the search field, so the
          drawer owns them there. */}
      <ChromeSettings className="hidden sm:flex" />
    </header>
  );
}

export default TopBar;