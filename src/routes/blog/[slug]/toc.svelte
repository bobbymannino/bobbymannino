<script lang="ts">
  import ChevronDownIcon from "$lib/icons/chevron-down-icon.svelte";
  import type { Heading } from "./+page.svelte";
  import { MediaQuery } from "svelte/reactivity";

  type Props = {
    headings: Heading[];
  };

  let { headings }: Props = $props();

  const lg = new MediaQuery("width >= 64rem");

  let isOpen = $state(false);
</script>

<div class="bg-white p-2 md:p-3 dark:bg-zinc-900 dark:text-white">
  <button
    disabled={lg.current}
    onclick={() => (isOpen = !isOpen)}
    class="ring-on-focus-visible block w-full"
    tabindex="0"
    aria-label="{isOpen ? 'Close' : 'Open'} table of contents"
  >
    <h6 class="flex items-center gap-1">
      <ChevronDownIcon
        class={[
          "transition-transform",
          {
            hidden: lg.current,
            "rotate-x-180": isOpen,
          },
        ]}
      />
      Table of Contents
    </h6>
  </button>

  {#if isOpen || lg.current}
    <br />

    {@render list(headings)}
  {/if}
</div>

{#snippet heading(heading: Heading)}
  <a
    href="#{heading.id}"
    tabindex="0"
    class="ring-on-focus-visible p-1 group-hover:not-hover:opacity-75 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >{heading.text}</a
  >
{/snippet}

{#snippet list(headings: Heading[])}
  <ol class="group grid [*>ol]:ml-2 md:[*>ol]:ml-3">
    {#each headings as h}
      {#if h.level > 1}
        {@render list([{ ...h, level: h.level - 1 }])}
      {:else}
        {@render heading(h)}
      {/if}
    {/each}
  </ol>
{/snippet}
