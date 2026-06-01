<script lang="ts">
  import BlogPostCard from "$components/blog-post-card.svelte";
  import Meta from "$components/meta.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Meta title="{data.series.title} | Bobby Mannino" description={data.series.description} />

<div class="container">
  <div class="card">
    <h1>{data.series.title}</h1>
    <p>{data.series.description}</p>

    {#if data.seriesPosts.length > 0}
      <ol class="grid gap-4">
        {#each data.seriesPosts as post (post.meta.slug)}
          <li>
            <BlogPostCard {...post} />
          </li>
        {/each}
      </ol>
    {:else}
      <p>No posts in this series yet.</p>
    {/if}
  </div>
</div>
