"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, Coins, Diff, LayoutGrid, University } from "lucide-react";
import Sidebar, { type NavItem } from "@/components/shared/sidebar";
import TopBar from "@/components/shared/top-bar";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { useTheme } from "@/lib/theme";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { UniversitiesProvider } from "@/hooks/use-universities";

/**
 * Dashboard chrome: sidebar, top bar, breadcrumbs and the routed page.
 * Replaces the react-router `RootLayout` (its `<Outlet />` is `children`).
 * Providers sit above the chrome because it consumes their contexts.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <UniversitiesProvider>
        <ShellChrome>{children}</ShellChrome>
      </UniversitiesProvider>
    </LanguageProvider>
  );
}

function ShellChrome({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const pathname = usePathname();

  const isDashboard = pathname === "/";
  const isExplore = pathname.startsWith("/explore-universities");

  const navItems: NavItem[] = [
    { icon: <LayoutGrid className="size-4" />, label: t("nav.overview"), active: isDashboard, href: "/" },
    { icon: <University className="size-4" />, label: t("nav.exploreUniversities"), active: isExplore, href: "/explore-universities" },
    { icon: <BookOpen className="size-4" />, label: t("nav.majors&Careers"), href: "/majors-and-careers" },
    { icon: <Coins className="size-4" />, label: t("nav.scholarships"), href: "/scholarships" },
    { icon: <Diff className="size-4" />, label: t("nav.compare"), href: "/compare" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} navItems={navItems} />

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col bg-muted/40 dark:bg-background">
        <main className="flex h-screen flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6">
          <TopBar onOpenSidebar={() => setSidebarOpen((o) => !o)} isDark={isDark} onThemeToggle={toggleTheme} />
          <Breadcrumbs />
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
