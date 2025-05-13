import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";
import { listPosts } from "$lib/posts";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { posts } = await parent();

  const postIdx = posts.findIndex((p) => p.meta.slug === params.slug);
  if (postIdx < 0) error(404, "Sorry, we couldn't find that post");

  const prevPost = posts[postIdx - 1];
  const nextPost = posts[postIdx + 1];

  return { post: posts[postIdx], prevPost, nextPost };
};

export const entries: EntryGenerator = () => {
  return listPosts().map((p) => ({ slug: p.meta.slug }));
};
