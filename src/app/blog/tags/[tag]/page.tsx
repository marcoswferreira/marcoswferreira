import { getAllPosts, getAllTags } from "../../../../lib/blog";
import TagClient from "./TagClient";

export default function TagPage({ params }: { params: { tag: string } }) {
  const ptPosts = getAllPosts("pt");
  const enPosts = getAllPosts("en");
  const ptTags = getAllTags("pt");
  const enTags = getAllTags("en");

  return (
    <TagClient 
      tag={params.tag}
      ptPosts={ptPosts}
      enPosts={enPosts}
      ptTags={ptTags}
      enTags={enTags}
    />
  );
}
