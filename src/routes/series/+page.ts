export const prerender = true;

import type { PageLoad } from "./$types";
import { getPosts } from "$lib/posts";

export const load: PageLoad = async () => {
	const posts = await getPosts();

	const counts = new Map<string, number>();

	for (const post of posts) {
		if (!post.series) continue;
		counts.set(post.series, (counts.get(post.series) ?? 0) + 1);
	}

	const series = Array.from(counts.entries())
		.map(([slug, count]) => ({ slug, count }))
		.sort((a, b) => a.slug.localeCompare(b.slug));

	return { series };
};
