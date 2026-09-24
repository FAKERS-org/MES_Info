import type { Metadata } from "next";
import AppShell from "./app-shell";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "MES Universities",
    template: "%s | MES Universities",
  },
  description:
    "Discover and browse Cambodian universities, their departments, and admission requirements.",
};

/**
 * Applies the persisted theme before first paint so SSR-rendered markup
 * never flashes the wrong theme while the client hydrates.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="km" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
