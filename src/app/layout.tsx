import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Kantumruy_Pro, Lexend } from "next/font/google";
import AppShell from "./app-shell";
import { langAttributes } from "@/lib/language";
import { readLang } from "@/lib/language.server";

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

/**
 * Reads the language cookie once per request and hands it to the shell, which
 * seeds both the client provider and — through the builders it calls — the copy
 * every Server Component renders. That is what lets a page be written in one
 * language instead of showing Khmer and English side by side.
 *
 * The cost is that reading a cookie opts the whole tree out of static
 * prerendering, so these routes are now rendered per request. That is the
 * trade for correct server-rendered language; with a database behind the app
 * they were dynamic anyway.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await readLang();
  const { htmlLang, fontStack } = langAttributes(lang);

  return (
    <html
      lang={htmlLang}
      /* Set here, not from an effect, so the first paint already uses the
       * right face — the Khmer stack is narrower than the Latin one and the
       * swap is visible. */
      style={{ "--font-current": fontStack } as CSSProperties}
      className={`${lexend.variable} ${kantumruyPro.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppShell initialLang={lang}>{children}</AppShell>
      </body>
    </html>
  );
}
