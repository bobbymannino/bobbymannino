<script lang="ts">
  import ChipSelection from "$components/chip-selection.svelte";
  import Meta from "$components/meta.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const chips = $derived(data.tags.map((t) => ({ text: `#${t}`, value: `/blog/tags/${t}` })));
</script>

<Meta title="Blog Tags | Bobby Mannino" description="Filter blog posts by tags" />

<section class="container" id="tags">
  <div class="card">
    <h1>tags</h1>

    <ChipSelection {chips} name="tags" legend="Filter by tags" valuesAsHref />
  </div>
</section>
