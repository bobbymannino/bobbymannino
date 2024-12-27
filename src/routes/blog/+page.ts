import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {
  const sortBy = url.searchParams.get("sortBy");

  return { sortBy };
};
