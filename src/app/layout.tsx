import { langAttributes } from "@/lib/language";
import { readLang } from "@/lib/language.server";
import type { Metadata } from "next";
import { Kantumruy_Pro, Lexend } from "next/font/google";
import type { CSSProperties } from "react";
import AppShell from "./app-shell";

import "@/styles/globals.css";

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
    description: "Discover and browse Cambodian universities, their departments, and admission requirements.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t="light";}if(t==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
