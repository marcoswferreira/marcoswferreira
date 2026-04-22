"use client";

import { ChevronLeft, Moon, Sun, Triangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../components/LanguageContext";

function isThemeSetToDark() {
  if (typeof window === "undefined") return;

  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export default function Header() {
  const path = usePathname();
  const isHome = path === "/";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setIsDarkMode(isThemeSetToDark() || false);
    if (isThemeSetToDark()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <header className="mx-auto max-w-5xl py-8 px-6 sm:px-8 max-sm:pt-4">
      <nav className="flex items-center justify-between max-sm:flex-col max-sm:gap-6">
        <Link
          className={`group relative -m-12 -my-2 -mr-4 flex items-center rounded py-2 pl-12 pr-4 ${isHome ? "ring-0" : "ring-1"} ring-sky-500 ring-opacity-0 transition-all max-sm:text-center sm:hover:ring-opacity-100 dark:ring-sky-600 dark:ring-opacity-0`}
          href="/"
          aria-label="Back to home"
        >
          <div
            className={`${isHome ? "hidden" : "absolute"} left-1 flex size-4 h-full w-12 items-center px-2`}
          >
            <ChevronLeft strokeWidth={1.4} />
          </div>
          <div className="flex flex-col max-sm:items-center text-zinc-900 dark:text-zinc-100 font-bold">
            Marcos W. Ferreira
            <span className="text-zinc-500 dark:text-zinc-400 font-normal">
              Software Engineer
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className={`text-sm transition-all hover:text-sky-500 dark:hover:text-sky-400 ${path.startsWith("/about") ? "text-sky-500 dark:text-sky-400 font-semibold" : ""}`}
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/blog"
            className={`text-sm transition-all hover:text-sky-500 dark:hover:text-sky-400 ${path.startsWith("/blog") ? "text-sky-500 dark:text-sky-400 font-semibold" : ""}`}
          >
            {t("nav.blog")}
          </Link>
          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1" />
          <button
            onClick={() => setLanguage(language === "en" ? "pt" : "en")}
            className="text-xs font-bold px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-800 dark:text-zinc-200"
          >
            {language === "en" ? "PT" : "EN"}
          </button>
          <button
            onClick={() => toggleTheme()}
            className="group relative flex items-center"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Moon
                strokeWidth={1.4}
                className="size-5 fill-gray-700 transition-all"
              />
            ) : (
              <Sun
                strokeWidth={1.4}
                className="size-5 fill-yellow-300 transition-all sm:hover:rotate-45"
              />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
