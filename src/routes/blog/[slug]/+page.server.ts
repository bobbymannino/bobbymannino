import { getPost, listPosts } from "$lib/posts";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const posts = listPosts().map(getPost);
  const post = posts.find((p) => p.meta.slug === params.slug);
  if (!post) error(404, "Sorry, we couldn't find that post");

  return { post };
};

export const entries: EntryGenerator = () => {
  const posts = listPosts().map(getPost);

  return posts.map((p) => ({ slug: p.meta.slug }));
};
