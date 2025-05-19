<script lang="ts">
  import ChipSelection from "$components/chip-selection.svelte";
  import Meta from "$components/meta.svelte";
  import Select from "$components/select.svelte";
  import type { PageData } from "./$types";
  import BlogPostCard from "$components/blog-post-card.svelte";
  import { page } from "$app/state";
  import { onMount } from "svelte";

  let { data }: { data: PageData } = $props();

  let sortBy = $state("date-desc");
  let tags = $state([]);

  onMount(() => {
    sortBy = page.url.searchParams.get("sortBy") || "-date";
    tags = page.url.searchParams.get("tags")?.split(",") || [];
  });

  let sortedPosts = $derived(
    [...data.posts].sort((a, b) => {
      switch (sortBy) {
        // A-Z
        case "title":
          return a.meta.title.localeCompare(b.meta.title);
        // Z-A
        case "-title":
          return b.meta.title.localeCompare(a.meta.title);
        // Shortest-Longest
        case "readingTime":
          return a.meta.readingTime - b.meta.readingTime;
        // Longest-Shortest
        case "-readingTime":
          return b.meta.readingTime - a.meta.readingTime;
        // Old-New
        case "date":
          return a.meta.publishedOn.getTime() - b.meta.publishedOn.getTime();
        // New-Old
        case "-date":
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

  type PostTag = {
    text: string;
    value: string;
  };

  const chips = $derived.by(() => {
    const allTags = data.posts.flatMap((p) => p.meta.tags);

    const map = new Map<string, PostTag>();

    for (const tag of allTags) {
      map.set(tag, { text: `#${tag}`, value: tag });
    }

    return Array.from(map.values()).sort((a, b) =>
      a.text.localeCompare(b.text),
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
        name="sortBy"
        bind:value={sortBy}
        options={[
          { value: "-date", text: "Newest to Oldest" },
          { value: "date", text: "Oldest to Newest" },
          { value: "title", text: "A to Z" },
          { value: "-title", text: "Z to A" },
          { value: "readingTime", text: "Shortest to Longest" },
          { value: "-readingTime", text: "Longest to Shortest" },
        ]}
      />
    </div>

    <a
      tabindex="0"
      href="#blog-list"
      class="bg-accent-600 ring-on-focus-visible absolute z-50 px-2 py-1 text-white not-focus-visible:pointer-events-none not-focus-visible:opacity-0"
      >Skip tags</a
    >

    <ChipSelection
      {chips}
      bind:selection={tags}
      name="tags"
      legend="Filter by tags"
    />

    <ul
      class="grid scroll-mt-36 gap-4 sm:scroll-mt-30 md:scroll-mt-26"
      id="blog-list"
    >
      {#each filteredPosts as post}
        <li>
          <BlogPostCard {...post} />
        </li>
      {/each}
    </ul>
  </div>
</div>
