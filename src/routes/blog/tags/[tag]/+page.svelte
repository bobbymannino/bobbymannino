<script lang="ts">
  import BlogPostCard from "#components/blog-post-card.svelte";
  import Meta from "#components/meta.svelte";
  import Select from "#components/select.svelte";
  import { m } from "#lib/paraglide/messages.js";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let sortBy = $state("-date");

  let sortedPosts = $derived(
    [...data.filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.meta.title.localeCompare(b.meta.title);
        case "-title":
          return b.meta.title.localeCompare(a.meta.title);
        case "readingTime":
          return a.meta.readingTime - b.meta.readingTime;
        case "-readingTime":
          return b.meta.readingTime - a.meta.readingTime;
        case "date":
          return a.meta.publishedOn.getTime() - b.meta.publishedOn.getTime();
        case "-date":
        default:
          return b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime();
      }
    }),
  );
</script>

<Meta title="#{data.tag} | Bobby Mannino" description={m.tag_meta_description({ tag: data.tag })} />

<div class="container">
  <div class="card">
    <div class="flex flex-wrap items-start justify-between">
      <h1>#{data.tag}</h1>

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

    <ul class="grid gap-4">
      {#each sortedPosts as post}
        <li>
          <BlogPostCard {...post} />
        </li>
      {/each}
    </ul>
  </div>
</div>
