<script lang="ts" module>
  export type Heading = {
    text: string;
    id: string;
    level: number;
  };

  export function textToId(text: string) {
    return text
      .replace(/[^\w\s-]/g, "")
      .replace(/\s/g, "-")
      .toLowerCase();
  }
</script>

<script lang="ts">
  import { page } from "$app/state";
  import Markdown from "$components/markdown.svelte";
  import Meta from "$components/meta.svelte";
  import { PUBLIC_URL } from "$env/static/public";
  import type { Picture } from "@sveltejs/enhanced-img";
  import type { PageProps } from "./$types";
  import Comments from "./comments.svelte";
  import Info from "./info.svelte";
  import NextPrev from "./next-prev.svelte";
  import RelatedPosts from "./related-posts.svelte";
  import Timeline from "./timeline.svelte";
  import Toc from "./toc.svelte";

  let { data }: PageProps = $props();

  let headings: Heading[] = $state([]);

  const url = $derived(PUBLIC_URL + page.url.pathname);

  const thumbnails = import.meta.glob<{ default: Picture }>(
    "/src/lib/images/blog/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
    { eager: true, query: { enhanced: true, w: "640;1280" } },
  );

  const thumbnailUrls = import.meta.glob<string>("/src/lib/images/blog/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}", {
    eager: true,
    // query: "?url",
    import: "default",
  });

  const thumbnailPlaceholders = import.meta.glob<string>(
    "/src/lib/images/blog/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
    { eager: true, query: { w: "60", blur: "2", format: "webp", inline: true }, import: "default" },
  );

  const thumbnail = $derived.by(() => {
    const src = data.post.meta.thumbnailSrc;
    if (!src) return null;
    const key = Object.keys(thumbnails).find((k) => k.endsWith(`/${src}`));
    if (!key) return null;
    return {
      picture: thumbnails[key].default,
      url: thumbnailUrls[key],
      placeholder: thumbnailPlaceholders[key],
    };
  });
</script>

<svelte:head>
  <meta property="article:author" content="Bobby Mannino" />
  <meta property="article:published_time" content={data.post.meta.publishedOn.toString()} />
  <meta property="article:tag" content={data.post.meta.tags.join(", ")} />
</svelte:head>

<Meta
  title="{data.post.meta.title} | Bobby Mannino"
  description={data.post.meta.tagline}
  type="article"
  img="{url}/og"
  imgDark="{url}/og?dark"
  tags={data.post.meta.tags}
/>

<Timeline />
<div class="container grid-cols-[17rem_1fr] gap-6 lg:grid">
  <aside class="top-22 h-fit lg:sticky">
    <Toc {headings} showRelatedPostsLink={data.relatedPosts.length > 0} />
  </aside>

  <div class="space-y-6">
    <div class="card">
      <Info post={data.post} />

      <hr />

      <article class="space-y-4 md:space-y-6">
        {#if thumbnail}
          <a href={thumbnail.url} target="_blank" rel="noopener noreferrer" class="block" title="Open image in new tab">
            <enhanced:img
              src={thumbnail.picture}
              alt={data.post.meta.thumbnailAlt}
              sizes="(max-width: 768px) 100vw, 1280px"
              style="background-image:url({thumbnail.placeholder});background-size:cover;background-position:center;"
              class="aspect-blog-img w-full object-cover"
              fetchpriority="high"
            />
          </a>
        {/if}
        <Markdown
          markdown={data.post.content}
          onparsed={(tokens) => {
            const _headings = tokens.filter((obj) => obj.type == "heading");

            headings = _headings.map((h) => ({
              text: h.text,
              level: h.depth,
              id: textToId(h.text),
            }));
          }}
        />
        <NextPrev nextPost={data.nextPost} prevPost={data.prevPost} />
      </article>
    </div>

    <RelatedPosts posts={data.relatedPosts} />

    <Comments />
  </div>
</div>
