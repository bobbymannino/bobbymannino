import { URL as URLS } from "$app/env/public";
import { listPosts } from "$lib/posts";
import type { Post } from "$lib/posts";
import { marked } from "marked";

const title = escapeXml("Bobby Mannino's Blog");
const description = escapeXml("Some things I have learnt and would like to remember");
const URL = URLS.split(",")[0];

const preXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
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

/** Wraps content in CDATA so readers receive it as markup, not escaped text */
function cdata(raw: string) {
  return `<![CDATA[${raw.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

/** Renders a post's markdown to HTML, with root-relative URLs made absolute */
function renderContent(content: string) {
  const html = marked.parse(content, { async: false, gfm: true });

  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${URL}/`);
}

function postToXml(post: Post) {
  const { title, tagline, publishedOn, slug } = post.meta;
  const url = `${URL}/blog/${slug}`;

  return `
        <item>
          <title>${escapeXml(title)}</title>
          <link>${url}</link>
          <guid isPermaLink="false">bobmandev:blog:${slug}</guid>
          <pubDate>${publishedOn.toUTCString()}</pubDate>
          <description>${escapeXml(tagline)}</description>
          <content:encoded>${cdata(renderContent(post.content))}</content:encoded>
        </item>
      `;
}

export const GET = () => {
  return new Response(insertXml(listPosts().map(postToXml).join("")), {
    headers: {
      "Content-Type": "application/rss+xml",
      // "Cache-Control": "public, max-age=600",
    },
  });
};
