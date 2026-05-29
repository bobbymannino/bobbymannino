export type Series = {
  title: string;
  slug: string;
  description: string;
};

/** Finds a series by its slug */
export function getSeries(slug: string) {
  return series.find((s) => s.slug === slug) ?? null;
}

/** A list of blog series */
export const series: Series[] = [
  {
    title: "Which Editor",
    slug: "which-editor",
    description: "Every year or so I compare the most popular IDEs out there and explain what i'm currently using",
  },
];
