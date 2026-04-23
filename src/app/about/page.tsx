"use client";

import { ChevronLeft, GraduationCap, History, Laptop, Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-12  pb-12">
      <header className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-zinc-500 transition-all hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
        >
          <ChevronLeft className="size-4" />
          {t("about.back")}
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">{t("about.title")}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {t("about.desc")}
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sky-500 font-semibold">
          <Star size={18} />
          <h3>{t("about.summary_title")}</h3>
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-4 leading-relaxed">
          <p>{t("about.summary_p1")}</p>
          <p>{t("about.summary_p2")}</p>
          <p>{t("about.summary_p3")}</p>
        </div>
      </section>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

      <section className="grid sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sky-500 font-semibold text-sm uppercase tracking-wider">
            <Laptop size={16} />
            <h4>{t("about.delivery_title")}</h4>
          </div>
          <ul className="list-inside list-disc space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {(t("about.delivery_items") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sky-500 font-semibold text-sm uppercase tracking-wider">
            <History size={16} />
            <h4>{t("about.highlights_title")}</h4>
          </div>
          <ul className="list-inside list-disc space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {(t("about.highlights_items") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

      <section className="flex flex-col gap-4 italic text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-l-4 border-sky-500 pl-6">
        <p>{t("about.passion")}</p>
        <p>{t("about.open")}</p>
      </section>

      <footer className="mt-8">
        <Link 
          href="mailto:marcosfw7@outlook.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-bold transition-transform hover:scale-105 active:scale-95"
        >
          {t("about.cta")}
        </Link>
      </footer>
    </div>
  );
}
