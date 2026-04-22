import { getAllPosts } from "../../../../lib/blog";
import CategoryClient from "./CategoryClient";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const ptPosts = getAllPosts("pt");
  const enPosts = getAllPosts("en");

  return (
    <CategoryClient 
      category={params.category}
      ptPosts={ptPosts}
      enPosts={enPosts}
    />
  );
}
