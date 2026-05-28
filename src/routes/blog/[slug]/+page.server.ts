import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";
import { getPost, listPostsMeta } from "$lib/posts";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { posts } = await parent();

  const postIdx = posts.findIndex((p) => p.meta.slug === params.slug);
  if (postIdx < 0) error(404, "Sorry, we couldn't find that post");

  const post = await getPost(params.slug);
  if (!post) error(404, "Sorry, we couldn't find that post");

  const prevPost = posts[postIdx + 1] ?? null;
  const nextPost = posts[postIdx - 1] ?? null;

  const relatedPosts = posts
    .filter((p, i) => i !== postIdx && p.meta.tags.some((t) => post.meta.tags.includes(t)))
    .slice(0, 2);

  return { post, prevPost, nextPost, relatedPosts };
};

export const entries: EntryGenerator = async () => {
  return (await listPostsMeta()).map((p) => ({ slug: p.meta.slug }));
};
