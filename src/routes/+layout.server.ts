import { listPosts } from "$lib/posts";

export const prerender = true;

export const load = () => ({ posts: listPosts() });
