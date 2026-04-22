import { getPostBySlug } from "../../../lib/blog";
import { notFound } from "next/navigation";
import PostClient from "./PostClient";

export default function PostPage({ params }: { params: { slug: string } }) {
  const ptPost = getPostBySlug(params.slug, "pt");
  const enPost = getPostBySlug(params.slug, "en");

  if (!ptPost && !enPost) {
    notFound();
  }

  return <PostClient ptPost={ptPost} enPost={enPost} />;
}
