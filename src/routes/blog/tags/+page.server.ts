export const load = async ({ parent }) => {
  const { posts } = await parent();
  const tags = [...new Set(posts.map((p) => p.meta.tags).flat())];
  return { tags: tags.map((tag) => tag.replace(/\//g, "-")) };
};
