import { URL as URLS } from "$app/env/public";
import { localizeHref, locales } from "$lib/paraglide/runtime";
import { listPosts } from "$lib/posts";
import { series } from "$lib/posts/series";

export const GET = () => {
  const URL = URLS.split(",")[0];
  const posts = listPosts();

  const pages: { path: string; priority: string }[] = [
    { path: "/", priority: "1.0" },
    { path: "/blog/", priority: "0.8" },
    { path: "/blog/series/", priority: "0.7" },
    { path: "/blog/tags/", priority: "0.7" },
    ...series.map((s) => ({ path: `/blog/series/${s.slug}/`, priority: "0.6" })),
    ...posts.map((p) => ({ path: `/blog/${p.meta.slug}/`, priority: "0.8" })),
    ...[...new Set(posts.flatMap((p) => p.meta.tags))].map((t) => ({ path: `/blog/tags/${t}/`, priority: "0.6" })),
  ];

  const alternates = (path: string) =>
    locales
      .map(
        (locale) => `
				<xhtml:link rel="alternate" hreflang="${locale}" href="${URL}${localizeHref(path, { locale })}" />`,
      )
      .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>${pages
      .flatMap(({ path, priority }) =>
        locales.map(
          (locale) => `
			<url>
				<loc>${URL}${localizeHref(path, { locale })}</loc>
				<priority>${priority}</priority>${alternates(path)}
			</url>`,
        ),
      )
      .join("")}
		</urlset>`.trim(),
    { headers: { "Content-Type": "application/xml" } },
  );
};
