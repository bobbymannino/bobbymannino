export const prerender = true;

import type { PageLoad } from "./$types";
import { listPosts } from "$lib/posts";

export const load: PageLoad = () => {
	const posts = listPosts();

	const counts = new Map<string, number>();

	for (const post of posts) {
		if (!post.meta.series) continue;
		counts.set(post.meta.series, (counts.get(post.meta.series) ?? 0) + 1);
	}

	const series = Array.from(counts.entries())
		.map(([slug, count]) => ({ slug, count }))
		.sort((a, b) => a.slug.localeCompare(b.slug));

	return { series };
};
