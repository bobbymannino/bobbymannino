<script lang="ts" module>
  export type Heading = {
    text: string;
    id: string;
    level: number;
  };
</script>

<script lang="ts">
  import Image from "$components/image.svelte";
  import Meta from "$components/meta.svelte";
  import type { PageProps } from "./$types";
  import Toc from "./toc.svelte";
  import { PUBLIC_URL } from "$env/static/public";
  import Markdown from "$components/markdown.svelte";

  let { data }: PageProps = $props();

  let headings: Heading[] = $state([]);
</script>

<Meta
  title="{data.post.meta.title} | Bobby Mannino"
  description="Read a blog post written by Bobby Mannino"
  tags={data.post.meta.tags}
  img={data.post.meta.thumbnailSrc
    ? `${PUBLIC_URL}/blog/${data.post.meta.thumbnailSrc}`
    : undefined}
/>

<div class="container grid-cols-[18rem_1fr] gap-6 lg:grid">
  <aside class="top-22 h-fit lg:sticky">
    <Toc {headings} />
  </aside>

  <article>
    {#if data.post.meta.thumbnailSrc}
      <Image
        src="/blog/{data.post.meta.thumbnailSrc}"
        alt={data.post.meta.thumbnailAlt}
        class="aspect-blog-img object-cover"
      />
    {/if}
    <div class="card">
      <Markdown
        markdown={data.post.content}
        onparsed={(tokens) => {
          const _headings = tokens.filter((obj) => obj.type == "heading");

          headings = _headings.map((h) => ({
            text: h.text,
            level: h.depth,
            id: h.text
              .replace(/[^\w\s]/g, "")
              .replace(/\s\s/g, " ")
              .replace(/\s/g, "-")
              .toLowerCase(),
          }));
        }}
      />

      <hr />

      <div class="flex flex-wrap items-center justify-between">
        <ul class="flex flex-wrap gap-2">
          {#each data.post.meta.tags as tag}
            <li>
              <p>
                <a
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
        <p>
          Published {data.post.meta.publishedOn.toLocaleDateString()}
        </p>
      </div>
    </div>
  </article>
</div>
