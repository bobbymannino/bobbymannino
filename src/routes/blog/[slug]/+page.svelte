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
  import Code from "$lib/renderers/code.svelte";
  import Codespan from "$lib/renderers/codespan.svelte";
  import ListItem from "$lib/renderers/list-item.svelte";
  import List from "$lib/renderers/list.svelte";
  import Table from "$lib/renderers/table.svelte";
  import type { PageProps } from "./$types";
  import MD from "svelte-markdown";
  import Toc from "./toc.svelte";
  import { PUBLIC_URL } from "$env/static/public";

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
      <MD
        on:parsed={(e) => {
          const _headings = e.detail.tokens.filter(
            (obj) => obj.type == "heading",
          );

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
        source={data.post.content}
        renderers={{
          listitem: ListItem,
          list: List,
          table: Table,
          code: Code,
          codespan: Codespan,
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
