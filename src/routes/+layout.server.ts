import { listPostMetas } from "#lib/posts/index.js";

export const prerender = true;

export const load = () => ({ posts: listPostMetas() });
