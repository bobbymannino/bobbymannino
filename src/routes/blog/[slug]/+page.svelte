<script lang="ts" module>
  export type Heading = {
    text: string;
    id: string;
    level: number;
  };
</script>

<script lang="ts">
  import { page } from "$app/state";
  import Image from "$components/image.svelte";
  import Markdown from "$components/markdown.svelte";
  import Meta from "$components/meta.svelte";
  import { PUBLIC_URL } from "$env/static/public";
  import ShareIcon from "$lib/icons/share-icon.svelte";
  import type { PageProps } from "./$types";
  import Toc from "./toc.svelte";

  let { data }: PageProps = $props();

  let headings: Heading[] = $state([]);

  const url = $derived(PUBLIC_URL + page.url.pathname);

  async function share() {
    const url = PUBLIC_URL + page.url.pathname;

    const payload = {
      title: data.post.meta.title,
      text: data.post.meta.tagline,
      url,
    };

    try {
      await navigator.share(payload);
    } catch {
      await navigator.clipboard.writeText(url);
    }
  }
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
  tags={data.post.meta.tags}
  type="article"
  img="{url}/og"
/>

<div class="container grid-cols-[17rem_1fr] gap-6 lg:grid">
  <aside class="top-22 h-fit lg:sticky">
    <Toc {headings} />
  </aside>

  <div class="card">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <ul class="flex flex-wrap gap-2">
        {#each data.post.meta.tags as tag}
          <li>
            <p>
              <a
                rel="noopener noreferrer"
                tabindex="0"
                href="/blog?tags={tag}"
                class="text-accent-600 ring-on-focus-visible hover:underline"
              >
                #{tag}
              </a>
            </p>
          </li>
        {/each}
      </ul>
      <div class="flex items-center gap-2">
        <button
          class="hover:text-accent-600 cursor-pointer text-zinc-400 dark:text-zinc-600"
          onclick={share}
        >
          <span class="sr-only">Share Post</span>
          <ShareIcon class="size-5" />
        </button>
        <p>
          Published {data.post.meta.publishedOn.toLocaleDateString()} • {data
            .post.meta.readingTime} min read
        </p>
      </div>
    </div>

    <hr />

    <article class="space-y-4 md:space-y-6">
      {#if data.post.meta.thumbnailSrc}
        <Image
          src="/blog/{data.post.meta.thumbnailSrc}"
          alt={data.post.meta.thumbnailAlt}
          class="aspect-blog-img object-cover"
        />
      {/if}
      <Markdown
        markdown={data.post.content}
        onparsed={(tokens) => {
          const _headings = tokens.filter((obj) => obj.type == "heading");

          headings = _headings.map((h) => ({
            text: h.text,
            level: h.depth,
            id: h.text
              .replace(/[^\w\s-]/g, "")
              .replace(/\s/g, "-")
              .toLowerCase(),
          }));
        }}
      />
    </article>
  </div>
</div>
