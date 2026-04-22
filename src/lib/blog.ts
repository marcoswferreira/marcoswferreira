import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

const postsDirectory = path.join(process.cwd(), 'content');

export function getPostBySlug(slug: string, lang: 'pt' | 'en' = 'pt'): Post | null {
  try {
    const postPath = path.join(postsDirectory, lang, 'posts', slug);
    let fullPath = '';
    
    if (fs.existsSync(postPath) && fs.statSync(postPath).isDirectory()) {
      fullPath = path.join(postPath, 'index.md');
    } else {
      fullPath = path.join(postsDirectory, lang, 'posts', `${slug}.md`);
    }

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      content,
      excerpt: data.excerpt || content.slice(0, 160) + '...',
      lang,
      tags: data.tags || [],
      categories: data.categories || [],
    };
  } catch (e) {
    console.error(`Error reading post ${slug}:`, e);
    return null;
  }
}

export function getAllPosts(lang: 'pt' | 'en' = 'pt'): Post[] {
  const langDir = path.join(postsDirectory, lang, 'posts');
  if (!fs.existsSync(langDir)) return [];

  const slugs = fs.readdirSync(langDir);
  const posts = slugs
    .map((slug) => {
      const realSlug = slug.replace(/\.md$/, '');
      return getPostBySlug(realSlug, lang);
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export function getAllTags(lang: 'pt' | 'en' = 'pt'): { name: string; count: number }[] {
  const posts = getAllPosts(lang);
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
