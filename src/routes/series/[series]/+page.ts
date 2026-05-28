export const prerender = true;

import type { PageLoad } from "./$types";
import { getPosts } from "$lib/posts";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
	const { series } = params;

	const posts = await getPosts();

	// Oldest first so a series reads in order (part 1, part 2, ...)
	const seriesPosts = posts
		.filter((post) => post.series === series)
		.sort((a, b) => a.publishedOn.getTime() - b.publishedOn.getTime());

	if (seriesPosts.length === 0) {
		error(404, `No posts found for series: ${series}`);
	}

	return { series, posts: seriesPosts };
};
