import type { Metadata } from "next";
import { Kantumruy_Pro, Lexend } from "next/font/google";
import AppShell from "./app-shell";

import "@/styles/globals.css";

/**
 * Self-hosted Google Fonts: downloaded at build time, served from `/_next`
 * and preloaded from the document head. Replaces the two render-blocking
 * `@import url('https://fonts.googleapis.com/…')` rules that used to sit at
 * the top of `globals.css` and gated first paint on two round trips.
 *
 * `variable` exposes each family to CSS as a custom property, composed into
 * the `--font-sans` / `--font-lexend` stacks in `styles/fonts.css`. The `-family`
 * suffix keeps them from colliding with those Tailwind `@theme` tokens.
 */
const lexend = Lexend({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    variable: "--font-lexend-family",
});

const kantumruyPro = Kantumruy_Pro({
    // `khmer` is the primary script of this app (`<html lang="km">`).
    subsets: ["khmer", "latin"],
    display: "swap",
    variable: "--font-kantumruy-family",
});

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
    <html
      lang="km"
      className={`${lexend.variable} ${kantumruyPro.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
