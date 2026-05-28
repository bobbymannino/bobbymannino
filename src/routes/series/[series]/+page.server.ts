import type { EntryGenerator } from "./$types";
import { getPosts } from "$lib/posts";

export const entries: EntryGenerator = async () => {
	const posts = await getPosts();

	const series = new Set<string>();

	for (const post of posts) {
		if (post.series) series.add(post.series);
	}

	return Array.from(series).map((series) => ({ series }));
};
