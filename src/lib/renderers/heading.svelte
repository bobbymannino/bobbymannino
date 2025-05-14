<script lang="ts">
  import type { Snippet } from "svelte";
  import { textToId } from "../../routes/blog/[slug]/+page.svelte";

  type Props = {
    children: Snippet;
    depth: number;
    text: string;
  };

  let { children, depth, text }: Props = $props();

  const id = $derived(textToId(text));
</script>

<svelte:element
  this={`h${depth}`}
  {id}
  style={depth == 1 ? `--vtn: post-title-${id}` : ""}
>
  <a href="#{id}">
    {@render children()}
  </a>
</svelte:element>
