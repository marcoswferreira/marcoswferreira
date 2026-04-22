"use client";

import Markdown from "../../../components/Markdown";
import moment from "moment";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "../../../components/LanguageContext";
import { Post } from "../../../lib/types";
import { notFound } from "next/navigation";

interface PostClientProps {
  ptPost: Post | null;
  enPost: Post | null;
}

export default function PostClient({ ptPost, enPost }: PostClientProps) {
  const { language, t } = useLanguage();
  const post = language === "pt" ? ptPost : enPost;

  // Fallback if one version is missing but the other exists
  const activePost = post || ptPost || enPost;

  if (!activePost) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8  pb-12">
      <Link
        href="/blog"
        className="flex items-center gap-2 text-sm text-zinc-500 transition-all hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
      >
        <ChevronLeft className="size-4" />
        {t("blog.back")}
      </Link>

      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{activePost.title}</h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <time>
              {language === "pt" 
                ? moment(activePost.date).format("DD [de] MMMM [de] YYYY")
                : moment(activePost.date).format("MMMM DD, YYYY")}
            </time>
            {activePost.categories && activePost.categories.length > 0 && (
              <>
                <span>•</span>
                <span className="text-sky-500 font-medium">{activePost.categories.join(", ")}</span>
              </>
            )}
          </div>
          {activePost.tags && activePost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <Markdown content={activePost.content} />
      </article>
    </div>
  );
}
