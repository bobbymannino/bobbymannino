import { listPosts } from "$lib/posts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => {
  const posts = listPosts().sort(
    (a, b) => b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime(),
  );

  return { posts };
};

export const prerender = true;
