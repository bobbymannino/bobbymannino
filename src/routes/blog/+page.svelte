<script lang="ts">
  import ChipSelection from "$components/chip-selection.svelte";
  import Meta from "$components/meta.svelte";
  import Select from "$components/select.svelte";
  import type { PageData } from "./$types";
  import { page } from "$app/state";

  let { data }: { data: PageData } = $props();

  let sortBy = $state("date-desc");
  let tags: string[] = $state([]);

  $effect.pre(() => {
    sortBy = page.url.searchParams.get("sortBy") || "date-desc";
    tags = page.url.searchParams.get("tags")?.split(",") || [];
  });

  let sortedPosts = $derived(
    [...data.posts].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.meta.title.localeCompare(b.meta.title);
        case "title-desc":
          return b.meta.title.localeCompare(a.meta.title);
        case "date-asc":
          return a.meta.publishedOn.getTime() - b.meta.publishedOn.getTime();
        case "date-desc":
        default:
          return b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime();
      }
    }),
  );

  let filteredPosts = $derived.by(() => {
    if (tags.length < 1) return sortedPosts;

    return sortedPosts.filter((p) => {
      for (const postTag of p.meta.tags) {
        if (tags.includes(postTag)) return true;
      }

      return false;
    });
  });

  let chips = $derived.by(() => {
    const allTags = data.posts.flatMap((p) =>
      p.meta.tags.map((t) => ({ value: t, name: t, text: `#${t}` })),
    );

    return allTags.filter(
      (tag, i, tags) => i === tags.findIndex((t) => tag.value === t.value),
    );
  });
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
          { value: "date-desc", text: "Date (New-Old)" },
          { value: "date-asc", text: "Date (Old-New)" },
          { value: "title-desc", text: "Title (Z-A)" },
          { value: "title-asc", text: "Title (A-Z)" },
        ]}
      />
    </div>

    <ChipSelection {chips} bind:selection={tags} />

    <ul class="grid gap-4" id="main-content">
      {#each filteredPosts as post}
        <li>
          <a
            href="/blog/{post.meta.slug}"
            class="group ring-accent-600 block ring-offset-2 focus-visible:ring-2 focus-visible:outline-none"
          >
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
              <ul class="hidden flex-wrap gap-1 md:flex">
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
