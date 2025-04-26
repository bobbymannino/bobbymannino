import { listPosts } from "$lib/posts";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.posts = listPosts();

  return resolve(event);
};
