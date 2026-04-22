"use client";

import Link from "next/link";
import moment from "moment";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { useLanguage } from "../../../../components/LanguageContext";
import { Post } from "../../../../lib/types";

interface CategoryClientProps {
  category: string;
  ptPosts: Post[];
  enPosts: Post[];
}

export default function CategoryClient({ category, ptPosts, enPosts }: CategoryClientProps) {
  const { language, t } = useLanguage();
  const decodedCategory = decodeURIComponent(category);
  
  const posts = language === "pt" ? ptPosts : enPosts;
  const filteredPosts = posts.filter((post) => 
    post.categories?.some(c => c.toLowerCase() === decodedCategory.toLowerCase())
  );

  if (filteredPosts.length === 0 && posts.length > 0) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto pb-12">
      <header className="flex flex-col gap-4">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-sm text-zinc-500 transition-all hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
        >
          <ChevronLeft className="size-4" />
          {t("blog.back")}
        </Link>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            {language === "pt" ? "Categoria" : "Category"}
          </span>
          <h1 className="text-3xl font-bold tracking-tight">
            {decodedCategory}
          </h1>
        </div>
      </header>

      <div className="grid gap-6">
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
    </div>
  );
}
