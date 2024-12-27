<script lang="ts">
  import Meta from "$components/meta.svelte";
  import Select from "$components/select.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let sortBy = $state(data.sortBy || "date-desc");

  let sortedPosts = $derived(
    data.posts.toSorted((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return a.meta.publishedOn.getTime() - b.meta.publishedOn.getTime();
        case "date-desc":
        default:
          return b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime();
      }
    }),
  );
</script>

<Meta
  title="Blog | Bobby Mannino"
  description="Read posts about what I have learnt or enjoy"
/>

<div class="container">
  <div class="card">
    <div class="flex flex-wrap items-start justify-between">
      <h1>blog</h1>
      <Select
        id="sort-by"
        label="Sort by"
        bind:value={sortBy}
        options={[
          { value: "date-desc", text: "Date (Desc)" },
          { value: "date-asc", text: "Date (Asc)" },
        ]}
      />
    </div>

    <ul class="grid gap-4" id="main-content">
      {#each sortedPosts as post}
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
