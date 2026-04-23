import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "../components/scroll-to-top";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Marcos W. Ferreira",
  description: "Marcos W. Ferreira personal website",
};

const karla = Karla({
  subsets: ["latin"],
  weight: "400",
});

const Header = dynamic(() => import("./Header"), { ssr: false });

import { LanguageProvider } from "../components/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${karla.className} min-h-screen bg-zinc-50 px-6 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200`}
      >
        <LanguageProvider>
          <Analytics />
          <Script id="theme-toggle" strategy="afterInteractive">
            {`document.documentElement.classList.toggle("dark", localStorage.theme ===
          "dark" || (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches))`}
          </Script>
          <Header />
          <main className="mx-auto max-w-5xl pb-4 px-6 sm:px-8">
            {children}
            <ScrollToTop />
          </main>
          <footer className="mx-auto flex max-w-prose flex-col max-sm:items-start items-center gap-2 py-6 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-4">
              <a
                className="decoration-zinc-500 underline-offset-4 transition-all sm:hover:underline dark:decoration-zinc-400"
                href="https://github.com/marcoswferreira/blog"
                target="_blank"
              >
                Code
              </a>
            </div>
            <blockquote className="text-zinc-800 dark:text-zinc-300">
              Smile, you&apos;re alive :)
            </blockquote>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
