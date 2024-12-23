<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();
</script>

<ul class="marker:text-accent-600 list-inside list-disc">
  {@render children()}
</ul>
