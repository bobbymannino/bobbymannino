import { listPosts } from "$lib/posts/index.js";
import { error } from "@sveltejs/kit";

export const load = async ({ parent, params }) => {
  const { posts } = await parent();
  const { tag } = params;

  const filtered = posts.filter((p) => p.meta.tags.map((tag) => tag.replace(/\//g, "-")).includes(tag));
  if (filtered.length === 0) error(404, `No posts found for tag "${tag}"`);

  return { posts: filtered, tag };
};

export const entries = () => {
  const posts = listPosts();
  const tags = [...new Set(posts.map((p) => p.meta.tags).flat())];

  return tags.map((tag) => ({ tag: tag.replace(/\//g, "-") }));
};
