<script lang="ts">
  import Meta from "$components/meta.svelte";
  import Code from "$lib/renderers/code.svelte";
  import Codespan from "$lib/renderers/codespan.svelte";
  import ListItem from "$lib/renderers/list-item.svelte";
  import List from "$lib/renderers/list.svelte";
  import Table from "$lib/renderers/table.svelte";
  import type { PageProps } from "./$types";
  import MD from "svelte-markdown";

  let { data }: PageProps = $props();
</script>

<Meta
  title="{data.post.meta.title} | Bobby Mannino"
  description="Read a blog post written by Bobby Mannino"
  tags={data.post.meta.tags}
/>

<div class="container">
  {#if data.post.meta.thumbnailSrc}
    <img
      src="/blog/{data.post.meta.thumbnailSrc}"
      alt={data.post.meta.thumbnailAlt}
      class="aspect-blog-img w-full object-cover"
    />
  {/if}
  <article class="card">
    <MD
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
  </article>
</div>
