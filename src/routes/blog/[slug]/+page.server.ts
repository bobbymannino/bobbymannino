import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { posts } = await parent();

  const post = posts.find((p) => p.meta.slug === params.slug);
  if (!post) error(404, "Sorry, we couldn't find that post");

  return { post };
};
