<script lang="ts">
  import ChevronDownIcon from "$lib/icons/chevron-down-icon.svelte";
  import type { Heading } from "./+page.svelte";
  import { MediaQuery } from "svelte/reactivity";

  type Props = {
    headings: Heading[];
  };

  type TocHeading = Heading & {
    tocLevel: number;
  };

  let { headings }: Props = $props();

  const lg = new MediaQuery("width >= 64rem", false);

  let isOpen = $state(false);
</script>

<div class="toc bg-white p-2 md:p-3 dark:bg-zinc-900 dark:text-white">
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

    {@render list(headings.map((h) => ({ ...h, tocLevel: h.level })))}
  {/if}
</div>

{#snippet heading(heading: TocHeading)}
  <a
    href="#{heading.id}"
    tabindex="0"
    style={`--toc-level:${heading.tocLevel};`}
    class="toc-link ring-on-focus-visible block w-full p-1 group-hover:not-hover:opacity-75 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >{heading.text}</a
  >
{/snippet}

{#snippet list(headings: TocHeading[])}
  <ol class="group grid">
    {#each headings as h}
      {#if h.level > 1}
        {@render list([{ ...h, level: h.level - 1 }])}
      {:else}
        {@render heading(h)}
      {/if}
    {/each}
  </ol>
{/snippet}

<style>
  .toc {
    --toc-indent: 0.75rem;
    --toc-line-color: rgb(228 228 231);
  }

  :global(.dark) .toc {
    --toc-line-color: rgb(63 63 70);
  }

  .toc-link {
    position: relative;
    padding-left: calc(0.25rem + (var(--toc-level, 1) - 1) * var(--toc-indent));
  }

  .toc-link::before {
    content: "";
    position: absolute;
    left: 0.25rem;
    top: 0;
    bottom: 0;
    width: calc((var(--toc-level, 1) - 1) * var(--toc-indent));
    background-image: repeating-linear-gradient(
      to right,
      var(--toc-line-color) 0 1px,
      transparent 1px var(--toc-indent)
    );
    pointer-events: none;
  }

  .toc-link:first-child::before {
    top: 25%;
  }

  .toc-link:last-child::before {
    bottom: 25%;
  }

  .toc-link:first-child:last-child::before {
    top: 25%;
    bottom: 25%;
  }
</style>
