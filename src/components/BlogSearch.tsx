"use client";

import { useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, X } from "lucide-react";
import moment from "moment";
import { Post } from "../lib/types";
import { useLanguage } from "./LanguageContext";

export default function BlogSearch({ allPosts }: { allPosts: Post[] }) {
  const [query, setQuery] = useState("");
  const { t } = useLanguage();

  const filteredPosts = allPosts.filter((post) => {
    const searchStr = `${post.title} ${post.excerpt} ${post.tags?.join(" ")} ${post.categories?.join(" ")}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon className="size-4 text-zinc-400 group-focus-within:text-sky-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder={t("blog.search_placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {query && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {filteredPosts.length} {t("blog.results")}
          </p>
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center justify-between p-3 rounded border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="text-sm font-medium truncate">{post.title}</span>
                  <span className="text-[10px] text-zinc-500">{moment(post.date).format("DD/MM/YYYY")}</span>
                </div>
                <SearchIcon className="size-3 text-zinc-300 dark:text-zinc-700 shrink-0" />
              </Link>
            ))}
            {filteredPosts.length === 0 && (
              <p className="text-sm text-zinc-500 italic py-4">{t("blog.no_results")}</p>
            )}
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
        </div>
      )}
    </div>
  );
}
