"use client";

import {
  SiGithub,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import { ArrowRight, Code2, Rocket, Send } from "lucide-react";
import Link from "next/link";
import { FC, ReactNode } from "react";
import moment from "moment";
import { useLanguage } from "../components/LanguageContext";
import { Post } from "../lib/types";

interface HomeClientProps {
  ptPosts: Post[];
  enPosts: Post[];
}

interface LinkItem {
  name: string;
  url: string;
  icon?: ReactNode;
}

const socialLinks: LinkItem[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/marcoswferreira",
    icon: <SiLinkedin className="size-4 fill-[#0077B5] dark:fill-zinc-300" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/marcoswferreira",
    icon: <SiGithub className="size-4 fill-[#181717] dark:fill-zinc-300" />,
  },
];

export default function HomeClient({ ptPosts, enPosts }: HomeClientProps) {
  const { language, t } = useLanguage();
  const latestPosts = language === "pt" ? ptPosts : enPosts;

  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-4 max-w-2xl">
          <h2 
            className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-zinc-50"
            dangerouslySetInnerHTML={{ __html: t("home.hero_title") }}
          />
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t("home.hero_desc")}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              {link.icon} {link.name}
            </a>
          ))}
          <a
            href="mailto:marcosfw7@outlook.com"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <Send size={16} className="text-sky-500" /> {t("home.contact")}
          </a>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Rocket size={16} /> {t("home.blog_notes")}
          </h3>
          <Link href="/blog" className="text-xs font-semibold text-sky-500 hover:underline flex items-center gap-1">
            {t("home.view_all")} <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-800/30 transition-all hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/50"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">
                  {post.categories?.[0] || "Post"}
                </span>
                <h4 className="font-bold group-hover:text-sky-500 transition-colors line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {moment(post.date).format("MMM YYYY")}
                  </span>
                  <div className="size-6 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
