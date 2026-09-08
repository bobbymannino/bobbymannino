import { URL } from "$app/env/public";
import { listPosts } from "$lib/posts";
import type { Post } from "$lib/posts";

const title = escapeXml("Bobby Mannino's Blog");
const description = escapeXml("Some things I have learnt and would like to remember");

const preXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <description>${description}</description>
    <language>en-gb</language>
    <link>${URL}/blog</link>
    <atom:link href="${URL}/blog.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

const postXml = `  </channel>
</rss>`;

const insertXml = (xml: string) => preXml + xml + postXml;

function escapeXml(raw: string) {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function postToXml(post: Post) {
  const { title, publishedOn, slug } = post.meta;
  const url = `${URL}/blog/${slug}`;

  return `
        <item>
          <title>${escapeXml(title)}</title>
          <link>${url}</link>
          <guid isPermaLink="false">bobmandev:blog:${slug}</guid>
          <pubDate>${publishedOn.toUTCString()}</pubDate>
          <description>${escapeXml(post.content)}</description>
        </item>
      `;
}

export const GET = () => {
  return new Response(insertXml(listPosts().map(postToXml).join("")), {
    headers: { "Content-Type": "application/rss+xml" },
  });
};
