export const prerender = true;

import type { PageLoad } from "./$types";
import { listPosts } from "$lib/posts";
import { error } from "@sveltejs/kit";

export const load: PageLoad = ({ params }) => {
	const { series } = params;

	const posts = listPosts();

	// Oldest first so a series reads in order (part 1, part 2, ...)
	const seriesPosts = posts
		.filter((post) => post.meta.series === series)
		.sort((a, b) => a.meta.publishedOn.getTime() - b.meta.publishedOn.getTime());

	if (seriesPosts.length === 0) {
		error(404, `No posts found for series: ${series}`);
	}

	return { series, posts: seriesPosts };
};
