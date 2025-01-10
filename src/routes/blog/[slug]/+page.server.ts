import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";
import { listPosts } from "$lib/posts";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { posts } = await parent();

  const post = posts.find((p) => p.meta.slug === params.slug);
  if (!post) error(404, "Sorry, we couldn't find that post");

  return { post };
};

export const entries: EntryGenerator = () => {
  return listPosts().map((p) => ({ slug: p.meta.slug }));
};
