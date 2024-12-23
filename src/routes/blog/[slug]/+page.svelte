<script lang="ts">
  import Meta from "$components/meta.svelte";
  import ListItem from "$lib/renderers/list-item.svelte";
  import List from "$lib/renderers/list.svelte";
  import type { PageData } from "./$types";
  import MD from "svelte-markdown";

  let { data }: { data: PageData } = $props();
</script>

<Meta
  title="{data.post.meta.title} | Bobby Mannino"
  description="Read a blog post written by Bobby Mannino"
  tags={data.post.meta.tags}
/>

<div class="container">
  <article>
    <div class="card">
      <MD
        source={data.post.content}
        renderers={{ listitem: ListItem, list: List }}
      />

      <hr />

      <div class="flex flex-wrap items-center justify-between">
        <ul>
          {#each data.post.meta.tags as tag}
            <li class="mr-2 inline-block">
              <p class="text-accent-600">
                #{tag}
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
