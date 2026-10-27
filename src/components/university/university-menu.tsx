"use client";

import { Icon } from "@/components/shared/icon-renderer";
import { Badge } from "@/components/ui/badge";
import type { IconName } from "@/lib/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SimpleTab {
  badge?: number;
  href: string;
  icon: IconName;
  label: string;
}

export default function UniversityMenu({ tabs }: { tabs: SimpleTab[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="University sections"
      className="w-full max-w-full rounded-2xl border border-border shadow-xs bg-card overflow-hidden p-1.5"
    >
      <div className="w-full flex flex-wrap justify-start items-stretch gap-1.5">
        {tabs.map(({ href, icon, label, badge }) => {
          const isProgramsTab = href.endsWith("/programs");
          const isActive = isProgramsTab
            ? pathname === href || pathname.startsWith(`${href}/`)
            : pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex flex-1 basis-[200px] items-center justify-center gap-2 px-3.5 py-2.5 h-full rounded-xl border-none transition-all duration-200 outline-none text-xs sm:text-sm font-medium ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold shadow-none"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <Icon name={icon} className="h-4 w-4 shrink-0" />
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                {label}
                {badge != null && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/15 text-primary rounded-full px-1.5 py-0 text-xs font-bold ml-0.5"
                  >
                    {badge}
                  </Badge>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
