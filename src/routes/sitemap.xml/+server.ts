import { PUBLIC_URL } from "$env/static/public";
import { listPosts } from "$lib/posts";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
		  <url>
				<loc>${PUBLIC_URL}/</loc>
				<priority>1.0</priority>
			</url>
			<url>
			  <loc>${PUBLIC_URL}/blog/</loc>
				<priority>0.8</priority>
			</url>${listPosts()
        .map(
          (p) =>
            `
			<url>
			  <loc>${PUBLIC_URL}/blog/${p.meta.slug}/</loc>
				<priority>0.8</priority>
			</url>`,
        )
        .join("")}
		</urlset>`.trim(),
    { headers: { "Content-Type": "application/xml" } },
  );
};
