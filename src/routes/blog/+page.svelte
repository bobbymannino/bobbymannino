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
          <a href="/blog/{post.meta.slug}" class="group">
            <div class="flex items-start justify-between">
              <h2 class="group-hover:underline">{post.meta.title}</h2>
              <p>
                <small>
                  {post.meta.publishedOn.toLocaleDateString()}
                </small>
              </p>
            </div>

            <div class="mt-2 flex items-end justify-between">
              <p>{post.meta.tagline}</p>
              <ul class="flex flex-wrap gap-1">
                {#each post.meta.tags as tag}
                  <li>
                    <p class="text-accent-600">
                      <small>
                        #{tag}
                      </small>
                    </p>
                  </li>
                {/each}
              </ul>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
