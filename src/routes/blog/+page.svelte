<script lang="ts">
  import ChipSelection from "$components/chip-selection.svelte";
  import Meta from "$components/meta.svelte";
  import Select from "$components/select.svelte";
  import type { PageData } from "./$types";
  import BlogPostCard from "$components/blog-post-card.svelte";

  let { data }: { data: PageData } = $props();

  let sortBy = $state(data.sortBy);
  let tags = $state(data.tags);

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
    if (tags.length < 2) return sortedPosts;

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
          { value: "date-desc", text: "Date (New-Old)" },
          { value: "date-asc", text: "Date (Old-New)" },
          { value: "title-desc", text: "Title (Z-A)" },
          { value: "title-asc", text: "Title (A-Z)" },
        ]}
      />
    </div>

    <ChipSelection
      {chips}
      bind:selection={tags}
      name="tags"
      legend="Filter by tags"
    />

    <ul class="grid gap-4">
      {#each filteredPosts as post}
        <li>
          <BlogPostCard {...post} />
        </li>
      {/each}
    </ul>
  </div>
</div>
