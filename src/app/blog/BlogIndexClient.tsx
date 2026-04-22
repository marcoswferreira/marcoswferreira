"use client";

import Link from "next/link";
import moment from "moment";
import BlogSearch from "../../components/BlogSearch";
import { useLanguage } from "../../components/LanguageContext";
import { Post } from "../../lib/types";

interface BlogIndexClientProps {
  ptPosts: Post[];
  enPosts: Post[];
  ptTags: { name: string; count: number }[];
  enTags: { name: string; count: number }[];
}

export default function BlogIndexClient({ ptPosts, enPosts, ptTags, enTags }: BlogIndexClientProps) {
  const { language, t } = useLanguage();
  const posts = language === "pt" ? ptPosts : enPosts;
  const tags = language === "pt" ? ptTags : enTags;

  // Extract unique categories
  const categories = Array.from(new Set(posts.flatMap(p => p.categories || []))).sort();

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{t("blog.title")}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {t("blog.desc")}
          </p>
        </div>
        
        <BlogSearch allPosts={posts} />
      </header>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        <div className="flex-1 flex flex-col gap-8 order-2 lg:order-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">{t("blog.latest")}</h3>
          <div className="grid gap-6">
            {posts.map((post) => (
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
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {post.categories && post.categories.length > 0 && (
                    <span className="text-[10px] font-bold text-sky-600 dark:text-sky-500 uppercase tracking-tighter">
                      {post.categories[0]}
                    </span>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-zinc-400 dark:text-zinc-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:w-48 shrink-0 order-1 lg:order-2 flex flex-col gap-10">
          <div className="sticky top-8 flex flex-col gap-10">
            {categories.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
                  {t("blog.categories")}
                </h3>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/blog/categories/${cat}`}
                      className="text-xs text-zinc-500 hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors py-1"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
                {t("blog.tags")}
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/blog/tags/${tag.name}`}
                    className="inline-flex items-center justify-between gap-2 px-2 py-1 text-xs text-zinc-600 hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors"
                  >
                    <span className="truncate">#{tag.name}</span>
                    <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">
                      {tag.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
