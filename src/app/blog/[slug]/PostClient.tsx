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

  // Extract topics (h1, h2, h3) from markdown content
  const extractTopics = (markdown: string) => {
    const lines = markdown.split("\n");
    return lines
      .filter((line) => line.startsWith("#") || line.startsWith("##") || line.startsWith("###"))
      .map((line) => {
        const level = line.split(" ")[0].length;
        const text = line.replace(/^#+\s+/, "");
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return { level, text, id };
      });
  };

  const topics = extractTopics(activePost.content);

  return (
    <div className="flex flex-col gap-8 pb-12">
      <Link
        href="/blog"
        className="flex items-center gap-2 text-sm text-zinc-500 transition-all hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
      >
        <ChevronLeft className="size-4" />
        {t("blog.back")}
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        <article className="flex-1 flex flex-col gap-8 min-w-0">
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

        {topics.length > 0 && (
          <aside className="lg:w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 flex flex-col gap-4">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
                {language === "pt" ? "Neste Post" : "In this Post"}
              </h3>
              <nav className="flex flex-col gap-2">
                {topics.map((topic, index) => (
                  <Link
                    key={index}
                    href={`#${topic.id}`}
                    className={`text-xs text-zinc-500 hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors py-1 ${
                      topic.level === 1 ? "pl-0 font-semibold" : topic.level === 2 ? "pl-2" : "pl-4"
                    }`}
                  >
                    {topic.text}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
