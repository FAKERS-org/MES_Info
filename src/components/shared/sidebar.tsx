import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface NavItem {
  icon: ReactNode;
  label: string;
  active?: boolean;
  to?: string;
  comingSoon?: boolean;
}

export interface SidebarProps {
  open: boolean;
  navItems: NavItem[];
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
}

function Sidebar({
  open,
  navItems,
  logoSrc = "/images/MES-logo-horizontal.png",
  logoAlt = "MES Logo",
  className,
}: SidebarProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleNav = (item: NavItem) => {
    if (item.to) {
      navigate(item.to);
    }
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-screen w-full flex-col overflow-hidden border-r border-sidebar-border bg-sidebar transition-[transform,width] duration-300 ease-in-out sm:w-64 lg:static",
        open ? "translate-x-0 lg:w-64" : "-translate-x-full lg:translate-x-0 lg:w-0",
        className
      )}
    >
      <div className="flex h-full w-64 flex-col">
        <div className="flex items-center justify-center px-5 py-6">
          <img src={logoSrc} alt={logoAlt} className="h-7 w-auto object-contain" />
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNav(item)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-sky-100 font-semibold text-sky-900 dark:bg-sky-950/80 dark:text-sky-100"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
              {item.comingSoon && (
                <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary">
                  {t("nav.comingSoon")}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
