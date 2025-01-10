import { listPosts } from "$lib/posts";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;

export const load: LayoutServerLoad = () => {
  const posts = listPosts();

  return { posts };
};
