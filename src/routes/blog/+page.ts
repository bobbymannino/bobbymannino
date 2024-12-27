import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {
  const sortBy = url.searchParams.get("sortBy");
  const tags = url.searchParams.get("tags")?.split(",") || [];

  return { sortBy, tags };
};
