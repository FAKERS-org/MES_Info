"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon-renderer";
import type { IconName } from "@/lib/icons";

export interface SimpleTab {
  href: string;
  icon: IconName;
  label: string;
  badge?: number;
  active?: boolean;
}

/**
 * Tabs of `/explore-universities/{university}` — three real routes, so every
 * tab can be deep-linked and the back button walks between them.
 */
export default function UniversityMenu({ tabs }: { tabs: SimpleTab[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="University sections"
      className="w-full max-w-full rounded-xl border shadow-sm bg-white overflow-hidden p-1"
    >
      <div className="w-full flex flex-wrap justify-start items-stretch gap-1.5">
        {tabs.map(({ href, icon, label, badge, active }) => {
          const isActive = active ?? pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex flex-1 basis-[220px] items-center justify-center gap-2 px-3 py-3 h-full rounded-lg border-none font-medium transition-all duration-200 outline-none ${
                isActive
                  ? "bg-blue-50 text-[#0056b3] font-semibold shadow-none"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <Icon name={icon} className="w-4.5 h-4.5" strokeWidth={2.5} />
              <span className="flex items-center gap-1.5 whitespace-nowrap text-sm">
                {label}
                {badge != null && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-[#0056b3] hover:bg-blue-200 rounded-full px-1.5 py-0.5 text-xs font-bold ml-1"
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
