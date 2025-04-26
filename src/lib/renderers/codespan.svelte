<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    text: string;
  };

  let { text }: Props = $props();
</script>

<code class="inline-block bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">
  {text}
</code>
