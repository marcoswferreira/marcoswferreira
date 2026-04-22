export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  lang: 'pt' | 'en';
  tags?: string[];
  categories?: string[];
};
