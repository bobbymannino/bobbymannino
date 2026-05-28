import { listPostsMeta } from "$lib/posts";

export const prerender = true;

export const load = async () => ({ posts: await listPostsMeta() });
