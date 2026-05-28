import { error } from "@sveltejs/kit";

export const load = async ({ parent, params }) => {
  const { posts } = await parent();
  const { tag } = params;

  const filtered = posts.filter((p) => p.meta.tags.includes(tag));
  if (filtered.length === 0) error(404, `No posts found for tag "${tag}"`);

  return { posts: filtered, tag };
};
