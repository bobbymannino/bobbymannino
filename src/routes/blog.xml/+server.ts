import { EMAIL, URL } from "$app/env/public";
import { listPosts } from "$lib/posts";
import type { Post } from "$lib/posts";

const title = escapeXml("Bobby Mannino's Blog");
const description = escapeXml("Some things I have learnt and would like to remember");

const preXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${title}</title>
    <description>${description}</description>
    <language>en-gb</language>
    <link>${URL}/blog</link>
    <atom:link href="${URL}/blog.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${URL}/favicon.png</url>
      <title>${title}</title>
      <link>${URL}/blog</link>
      <width>144</width>
      <height>144</height>
    </image>`;

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

/**
 * Wraps raw text in a CDATA section, splitting any `]]>` so it cannot end the
 * section early
 *
 * @param raw The text to wrap
 * @returns A CDATA section containing the text
 */
function toCdata(raw: string) {
  return `<![CDATA[${raw.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function postToXml(post: Post) {
  const { title, tagline, publishedOn, slug } = post.meta;
  const url = `${URL}/blog/${slug}`;

  return `
        <item>
          <title>${escapeXml(title)}</title>
          <description>${escapeXml(tagline)}</description>
          <content:encoded>${toCdata(post.content)}</content:encoded>
          <pubDate>${publishedOn.toUTCString()}</pubDate>
          <link>${url}</link>
          <guid>${url}</guid>
          <author>${EMAIL}</author>
          <enclosure url="${url}/og" length="0" type="image/jpeg" />
          <media:content url="${url}/og" width="738" height="360" medium="image" xmlns:media="http://search.yahoo.com/mrss/" />
        </item>
      `;
}

export const GET = () => {
  return new Response(insertXml(listPosts().map(postToXml).join("")), {
    headers: { "Content-Type": "application/rss+xml" },
  });
};
