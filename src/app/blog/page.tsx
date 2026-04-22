import { getAllPosts, getAllTags } from "../../lib/blog";
import BlogIndexClient from "./BlogIndexClient";

export default function BlogIndex() {
  const ptPosts = getAllPosts("pt");
  const enPosts = getAllPosts("en");
  const ptTags = getAllTags("pt");
  const enTags = getAllTags("en");

  return (
    <BlogIndexClient 
      ptPosts={ptPosts} 
      enPosts={enPosts}
      ptTags={ptTags}
      enTags={enTags}
    />
  );
}
