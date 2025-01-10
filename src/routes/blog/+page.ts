import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
  const sortBy = url.searchParams.get("sortBy") || "date-desc";
  const tags = url.searchParams.get("tags")?.split(",") || [];

  return { sortBy, tags };
}) satisfies PageLoad;
