import { listPosts } from "$lib/posts";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;

export const load: LayoutServerLoad = ({ url }) => {
  const posts = listPosts();

  const q = url.searchParams.get("q");

  return { posts, q };
};
