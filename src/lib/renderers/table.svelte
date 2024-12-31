<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();
</script>

<div class="overflow-x-auto">
  <table class="blog-post-table">
    {@render children()}
  </table>
</div>
