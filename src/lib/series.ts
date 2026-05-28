export const seriesList = [
  {
    title: "Which Editor",
    slug: "which-editor",
    description: "Comparing editor choices over time and what I use day to day.",
  },
] as const;

export type Series = (typeof seriesList)[number];

export function findSeries(slug: string) {
  return seriesList.find((series) => series.slug === slug);
}
