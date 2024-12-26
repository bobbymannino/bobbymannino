<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();
</script>

<ul class="list-inside list-disc marker:text-zinc-400">
  {@render children()}
</ul>
