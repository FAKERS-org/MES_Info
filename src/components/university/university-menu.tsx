"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon-renderer";
import type { UniversityMenuTab } from "@/data/university-page";

/**
 * Tabs of `/explore-universities/{university}` — three real routes, so every
 * tab can be deep-linked and the back button walks between them. The active
 * state is derived from the path instead of local state: the menu lives in a
 * layout shared by all three routes and would otherwise reset on navigation.
 */
export default function UniversityMenu({ tabs }: { tabs: UniversityMenuTab[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="University sections"
      className="w-full max-w-full rounded-2xl border shadow-sm bg-white overflow-hidden p-2"
    >
      <div className="w-full flex flex-wrap justify-start items-stretch gap-2">
        {tabs.map(({ href, icon, label, badge }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`group relative flex flex-1 basis-[240px] items-center justify-center gap-3 px-4 py-4 h-full rounded-xl border-none font-medium transition-all duration-200 outline-none ${
                active
                  ? "bg-blue-50 text-[#0056b3] font-semibold shadow-none"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <Icon name={icon} className="w-5 h-5" strokeWidth={2.5} />
              <span className="flex items-center gap-2 whitespace-nowrap text-[15px]">
                {label}
                {badge != null && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-[#0056b3] hover:bg-blue-200 rounded-full px-2 py-0.5 text-xs font-bold ml-1"
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
