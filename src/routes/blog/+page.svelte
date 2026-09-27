<script lang="ts">
  import { page } from "$app/state";
  import BlogPostCard from "$components/blog-post-card.svelte";
  import ChipSelection from "$components/chip-selection.svelte";
  import Meta from "$components/meta.svelte";
  import Select from "$components/select.svelte";
  import { m } from "$lib/paraglide/messages";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

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

    return Array.from(map.values()).sort((a, b) => a.text.localeCompare(b.text));
  });
</script>

<Meta title={m.blog_meta_title()} description={m.blog_meta_description()} />

<div class="container">
  <div class="card">
    <div class="flex flex-wrap items-start justify-between">
      <h1>{m.blog_heading()}</h1>
      <Select
        id="sort-by"
        label={m.sort_by()}
        name="sortBy"
        bind:value={sortBy}
        options={[
          { value: "-date", text: m.sort_newest() },
          { value: "date", text: m.sort_oldest() },
          { value: "title", text: m.sort_a_z() },
          { value: "-title", text: m.sort_z_a() },
          { value: "readingTime", text: m.sort_shortest() },
          { value: "-readingTime", text: m.sort_longest() },
        ]}
      />
    </div>

    <a
      tabindex="0"
      href="#blog-list"
      class="bg-accent-600 ring-on-focus-visible absolute z-50 px-2 py-1 text-white not-focus-visible:pointer-events-none not-focus-visible:opacity-0"
      >{m.skip_tags()}</a
    >

    <ChipSelection {chips} bind:selection={tags} name="tags" legend={m.filter_by_tags()} />

    <ul class="grid scroll-mt-36 gap-4 sm:scroll-mt-30 md:scroll-mt-26" id="blog-list">
      {#each filteredPosts as post}
        <li>
          <BlogPostCard {...post} />
        </li>
      {/each}
    </ul>
  </div>
</div>
