import { getAllPosts } from "../lib/blog";
import HomeClient from "./HomeClient";

export default function HomePage() {
  const ptPosts = getAllPosts("pt").slice(0, 2);
  const enPosts = getAllPosts("en").slice(0, 2);

  return <HomeClient ptPosts={ptPosts} enPosts={enPosts} />;
}
