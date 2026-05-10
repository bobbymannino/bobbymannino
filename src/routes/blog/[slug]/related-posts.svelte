<script lang="ts">
  import BlogPostCard from "$components/blog-post-card.svelte";

  type Post = App.PageData["posts"][number];

  type Props = { posts: Post[] };

  let { posts }: Props = $props();
</script>

{#if posts.length > 0}
  <section class="card space-y-4">
    <h2 id="related-posts"><a href="#related-posts" class="hover:underline">Related posts</a></h2>

    <ul class="grid gap-4">
      {#each posts as post}
        <li>
          <BlogPostCard {...post} />
        </li>
      {/each}
    </ul>
  </section>
{/if}
