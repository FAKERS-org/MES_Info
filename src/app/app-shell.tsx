"use client";

import Breadcrumbs from "@/components/layout/breadcrumbs";
import Sidebar, { type NavItem } from "@/components/layout/sidebar";
import TopBar from "@/components/layout/top-bar";
import { UniversitiesProvider } from "@/hooks/use-universities";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import type { Lang } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import { QueryProvider } from "@/providers/query-provider";
import { BookOpen, Coins, Diff, LayoutGrid, University } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

/**
 * Dashboard chrome: sidebar, top bar, breadcrumbs and the routed page.
 * Replaces the react-router `RootLayout` (its `<Outlet />` is `children`).
 * Providers sit above the chrome because it consumes their contexts.
 *
 * `initialLang` is resolved by the root layout from the language cookie, so
 * the chrome and the server-rendered page body below it always agree.
 */
export default function AppShell({ children, initialLang }: { children: ReactNode; initialLang: Lang }) {
    return (
        <QueryProvider>
            <LanguageProvider initialLang={initialLang}>
                <UniversitiesProvider>
                    <ShellChrome>{children}</ShellChrome>
                </UniversitiesProvider>
            </LanguageProvider>
        </QueryProvider>
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
        {
            icon: <University className="size-4" />,
            label: t("nav.exploreUniversities"),
            active: isExplore,
            href: "/explore-universities",
        },
        { icon: <BookOpen className="size-4" />, label: t("nav.majors&Careers"), href: "/majors-and-careers" },
        { icon: <Coins className="size-4" />, label: t("nav.scholarships"), href: "/scholarships" },
        { icon: <Diff className="size-4" />, label: t("nav.compare"), href: "/compare" },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar open={sidebarOpen} navItems={navItems} />

            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
                    sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                onClick={() => setSidebarOpen(false)}
            />

            <div className="flex min-w-0 flex-1 flex-col bg-muted/50 dark:bg-background">
                <main className="flex h-screen flex-1 flex-col gap-4 overflow-y-auto [scrollbar-gutter:stable] pt-4 md:pt-6">
                    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                        <TopBar
                            onOpenSidebar={() => setSidebarOpen(o => !o)}
                            isDark={isDark}
                            onThemeToggle={toggleTheme}
                        />
                        <div className="mt-4">
                            <Breadcrumbs />
                        </div>
                    </div>
                    <div className="w-full max-w-7xl mx-auto flex-1 px-4 md:px-6 lg:px-8 pb-4 md:pb-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
