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
  import Image from "$components/image.svelte";
  import Markdown from "$components/markdown.svelte";
  import Meta from "$components/meta.svelte";
  import { PUBLIC_URL } from "$env/static/public";
  import type { PageProps } from "./$types";
  import Info from "./info.svelte";
  import NextPrev from "./next-prev.svelte";
  import Timeline from "./timeline.svelte";
  import Toc from "./toc.svelte";

  let { data }: PageProps = $props();

  let headings: Heading[] = $state([]);

  const url = $derived(PUBLIC_URL + page.url.pathname);
</script>

<svelte:head>
  <meta property="article:author" content="Bobby Mannino" />
  <meta
    property="article:published_time"
    content={data.post.meta.publishedOn.toString()}
  />
  <meta property="article:tag" content={data.post.meta.tags.join(", ")} />
</svelte:head>

<Meta
  title="{data.post.meta.title} | Bobby Mannino"
  description={data.post.meta.tagline}
  type="article"
  img="{url}/og"
  tags={data.post.meta.tags}
/>

<Timeline />
<div class="container grid-cols-[17rem_1fr] gap-6 lg:grid">
  <aside class="top-22 h-fit lg:sticky">
    <Toc {headings} />
  </aside>

  <div class="card">
    <Info post={data.post} />

    <hr />

    <article class="space-y-4 md:space-y-6">
      {#if data.post.meta.thumbnailSrc}
        <a
          href={data.post.meta.thumbnailSrc}
          target="_blank"
          class="block"
          title="Open image in new tab"
        >
          <Image
            src="/blog/{data.post.meta.thumbnailSrc}"
            alt={data.post.meta.thumbnailAlt}
            class="aspect-blog-img object-cover"
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
</div>
