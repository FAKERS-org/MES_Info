"use client";

import { ChevronDown, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const flagByLang: Record<string, string> = {
  kh: "fi-kh",
  en: "fi-gb",
};

/**
 * Language and theme controls. They read from their own hooks rather than
 * taking props, so the same pair can be rendered by the top bar (from `sm` up)
 * and by the drawer (below `sm`) without either parent plumbing state through.
 * Exactly one copy is visible at any width, so the two never disagree.
 */
export default function ChromeSettings({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={cn("flex shrink-0 items-center gap-3", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={t("topbar.selectLanguage")}
          >
            <span className={`fi ${flagByLang[lang]} size-5 rounded-full`} />
            <span>{lang.toUpperCase()}</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={lang}
            onValueChange={(value) => setLang(value === "en" ? "en" : "kh")}
          >
            <DropdownMenuRadioItem value="kh">
              <span className={`fi ${flagByLang.kh} size-4 rounded-full`} />
              {t("lang.kh")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="en">
              <span className={`fi ${flagByLang.en} size-4 rounded-full`} />
              {t("lang.en")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-md p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label={t("topbar.toggleTheme")}
      >
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </button>
    </div>
  );
}