import type { EntryGenerator } from "./$types";
import { listPosts } from "$lib/posts";

export const entries: EntryGenerator = () => {
	const posts = listPosts();

	const series = new Set<string>();

	for (const post of posts) {
		if (post.meta.series) series.add(post.meta.series);
	}

	return Array.from(series).map((series) => ({ series }));
};
