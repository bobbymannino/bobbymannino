<script>
  import ChevronUpIcon from "$lib/icons/chevron-up-icon.svelte";
  import { scrollY, innerHeight } from "svelte/reactivity/window";

  const scrolled = $derived(
    (scrollY.current || 0) > (innerHeight.current || 0) / 2,
  );
</script>

<button
  onclick={() => window.scrollTo({ top: 0 })}
  class={[
    "active:text-accent-700 text-accent-600 ring-on-focus-visible sticky bottom-2 left-2 mb-2 w-fit cursor-pointer bg-white p-1 not-motion-reduce:transition-opacity hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800",
    ,
    {
      "pointer-events-none opacity-0": !scrolled,
    },
  ]}
  tabindex="0"
>
  <span class="sr-only">Scroll to top</span>
  <ChevronUpIcon />
</button>
