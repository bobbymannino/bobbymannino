<script lang="ts">
  import Meta from "$components/meta.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Meta
  title="Blog | Bobby Mannino"
  description="Read posts about what I have learnt"
/>

<div class="container">
  <div class="card">
    <h1>blog</h1>

    <ul class="grid gap-4" id="main-content">
      {#each data.posts as post}
        <li>
          <a href="/blog/{post.meta.slug}" class="hover:underline">
            <div class="flex justify-between">
              <h2>{post.meta.title}</h2>
              <p>
                <small>
                  {post.meta.publishedOn.toLocaleDateString()}
                </small>
              </p>
            </div>
            <p class="line-clamp-2 pt-2">{post.meta.tagline}</p>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
