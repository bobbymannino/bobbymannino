import { listPostMetas } from "$lib/posts";

export const prerender = true;

export const load = () => ({ posts: listPostMetas() });
