import { error } from "@sveltejs/kit";
import { listPosts } from "$lib/posts";
import { findSeries, seriesList } from "$lib/series";

export const load = async ({ params, parent }) => {
  const { posts } = await parent();
  const series = findSeries(params.slug);

  if (!series) error(404, `No series found for "${params.slug}"`);

  const seriesPosts = posts.filter((post) => post.meta.series === params.slug);

  if (seriesPosts.length === 0) error(404, `No posts found for series "${params.slug}"`);

  return { series, posts: seriesPosts };
};

export const entries = () => {
  const posts = listPosts();

  return seriesList
    .filter((series) => posts.some((post) => post.meta.series === series.slug))
    .map((series) => ({ slug: series.slug }));
};
