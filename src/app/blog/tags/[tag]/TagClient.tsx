"use client";

import Link from "next/link";
import moment from "moment";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { useLanguage } from "../../../../components/LanguageContext";
import { Post } from "../../../../lib/types";

interface TagClientProps {
  tag: string;
  ptPosts: Post[];
  enPosts: Post[];
  ptTags: { name: string; count: number }[];
  enTags: { name: string; count: number }[];
}

export default function TagClient({ tag, ptPosts, enPosts, ptTags, enTags }: TagClientProps) {
  const { language, t } = useLanguage();
  const decodedTag = decodeURIComponent(tag);
  
  const posts = language === "pt" ? ptPosts : enPosts;
  const tags = language === "pt" ? ptTags : enTags;

  const filteredPosts = posts.filter((post) => 
    post.tags?.some(t => t.toLowerCase() === decodedTag.toLowerCase())
  );

  if (filteredPosts.length === 0 && posts.length > 0) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-sm text-zinc-500 transition-all hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
        >
          <ChevronLeft className="size-4" />
          {t("blog.back_all")}
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-sky-500 dark:text-sky-400">
            #{decodedTag}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {language === "pt" ? "Mostrando" : "Showing"} {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} {language === "pt" ? "com esta tag" : "with this tag"}.
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        <div className="flex-1 grid gap-6 order-2 lg:order-1">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold group-hover:text-sky-500 dark:group-hover:text-sky-400">
                  {post.title}
                </h2>
                <time className="text-xs text-zinc-500 shrink-0">
                  {moment(post.date).format("DD/MM/YYYY")}
                </time>
              </div>
              <p className="line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <aside className="lg:w-48 shrink-0 order-1 lg:order-2">
          <div className="sticky top-8 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              {t("blog.other_tags")}
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {tags.map((tagItem) => (
                <Link
                  key={tagItem.name}
                  href={`/blog/tags/${tagItem.name}`}
                  className={`inline-flex items-center justify-between gap-2 px-2 py-1 text-xs transition-colors ${
                    tagItem.name.toLowerCase() === decodedTag.toLowerCase()
                      ? "text-sky-500 font-semibold"
                      : "text-zinc-600 hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
                  }`}
                >
                  <span className="truncate">#{tagItem.name}</span>
                  <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">
                    {tagItem.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
