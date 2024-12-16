import { getPost, listPosts } from "$lib/posts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const posts = listPosts()
    .map(getPost)
    .sort(
      (a, b) => b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime(),
    );

  return { posts };
};
