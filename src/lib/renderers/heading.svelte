<script lang="ts">
  import { copyTextToClipboard } from "$lib/utils";
  import type { Snippet } from "svelte";
  import { textToId } from "../../routes/blog/[slug]/+page.svelte";

  type Props = {
    children: Snippet;
    depth: number;
    text: string;
  };

  let { children, depth, text }: Props = $props();

  const id = $derived(textToId(text));

  function copyLink() {
    copyTextToClipboard(`${window.location.origin}${window.location.pathname}#${id}`);
  }
</script>

<svelte:element this={`h${depth}`} {id} style={depth == 1 ? `--vtn: post-title-${id}` : ""}>
  <a
    href="#{id}"
    onclick={copyLink}
    class="ring-on-focus-visible relative before:opacity-50 before:absolute before:right-[calc(100%+.25rem)] hover:underline hover:before:content-['#']"
    tabindex="0"
  >
    {@render children()}
  </a>
</svelte:element>
