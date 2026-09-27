<script lang="ts">
  import ChipSelection from "$components/chip-selection.svelte";
  import Meta from "$components/meta.svelte";
  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const chips = $derived(data.tags.map((t) => ({ text: `#${t}`, value: localizeHref(`/blog/tags/${t}`) })));
</script>

<Meta title={m.tags_meta_title()} description={m.tags_meta_description()} />

<section class="container" id="tags">
  <div class="card">
    <h1>{m.tags_heading()}</h1>

    <ChipSelection {chips} name="tags" legend={m.filter_by_tags()} valuesAsHref />
  </div>
</section>
