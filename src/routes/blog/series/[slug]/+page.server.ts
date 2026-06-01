import { getSeries, series } from "$lib/posts/series";
import { error } from "@sveltejs/kit";

export const load = async ({ parent, params }) => {
  const { posts } = await parent();
  const { slug } = params;

  const matchedSeries = getSeries(slug);
  if (!matchedSeries) error(404, `No series found for "${slug}"`);

  const seriesPosts = posts
    .filter((p) => p.meta.series === slug)
    .sort((a, b) => b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime());

  return { series: matchedSeries, seriesPosts };
};

export const entries = () => {
  return series.map((s) => ({ slug: s.slug }));
};
