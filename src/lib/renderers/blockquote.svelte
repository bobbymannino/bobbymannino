<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = { children: Snippet };

  let { children }: Props = $props();
</script>

<blockquote class="bg-gray-100 p-4 dark:bg-zinc-800">
  {@render children()}
</blockquote>
