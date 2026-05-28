import { seriesList } from "$lib/series";

export const load = async ({ parent }) => {
  const { posts } = await parent();

  const series = seriesList.map((item) => ({
    ...item,
    postCount: posts.filter((post) => post.meta.series === item.slug).length,
  }));

  return { series };
};
