<script>
  import ChevronUpIcon from "$lib/icons/chevron-up-icon.svelte";
  import { scrollY, innerHeight } from "svelte/reactivity/window";
  import { fly } from "svelte/transition";
</script>

{#if (scrollY.current || 0) > (innerHeight.current || 0) * 0.5}
  <button
    in:fly={{ y: 16 }}
    out:fly={{ y: -16 }}
    onclick={() => window.scrollTo({ top: 0 })}
    class="text-accent-600 fixed bottom-4 left-4 cursor-pointer bg-white p-1 hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
  >
    <span class="sr-only">Scroll to top</span>
    <ChevronUpIcon />
  </button>
{/if}
