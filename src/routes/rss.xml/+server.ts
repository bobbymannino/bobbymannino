import { PUBLIC_EMAIL, PUBLIC_URL } from "$env/static/public";
import { listPostsMeta } from "$lib/posts";
import type { PostPreview } from "$lib/posts";

export const prerender = true;

const title = escapeXml("Bobby Mannino's Blog");
const description = escapeXml("Some things I have learnt and would like to remember");

const preXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <description>${description}</description>
    <language>en-gb</language>
    <link>${PUBLIC_URL}/blog</link>
    <atom:link href="${PUBLIC_URL}/rss.xml" rel="self" type="application/rss+xml"/>`;

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

function postToXml(post: PostPreview) {
  const { title, tagline, slug } = post.meta;
  const publishedOn = post.meta.publishedOn ?? new Date();
  const url = `${PUBLIC_URL}/blog/${slug}`;

  return `
        <item>
          <title>${escapeXml(title)}</title>
          <description>${escapeXml(tagline)}</description>
          <pubDate>${publishedOn.toUTCString()}</pubDate>
          <link>${url}</link>
          <guid>${url}</guid>
          <author>${PUBLIC_EMAIL}</author>
          <enclosure url="${url}/og" length="0" type="image/jpeg" />
          <media:content url="${url}/og" width="738" height="360" medium="image" xmlns:media="http://search.yahoo.com/mrss/" />
        </item>
      `;
}

export const GET = async () => {
  const posts = await listPostsMeta();

  return new Response(insertXml(posts.map(postToXml).join("")), {
    headers: { "Content-Type": "application/rss+xml" },
  });
};
