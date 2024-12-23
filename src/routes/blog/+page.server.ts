import { listPosts } from "$lib/posts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const posts = listPosts().sort(
    (a, b) => b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime(),
  );

  return { posts };
};
