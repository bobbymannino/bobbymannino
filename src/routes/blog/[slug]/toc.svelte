<script lang="ts">
  import ChevronDownIcon from "$lib/icons/chevron-down-icon.svelte";
  import type { Heading } from "./+page.svelte";
  import { MediaQuery } from "svelte/reactivity";

  type Props = {
    headings: Heading[];
    showRelatedPostsLink: boolean;
  };

  let props: Props = $props();
  const headings = $derived.by(() => {
    let { headings } = props;
    if (props.showRelatedPostsLink) headings = [...headings, { id: "related-posts", level: 1, text: "Related Posts" }];
    headings = [...headings, { id: "comments", level: 1, text: "Comments" }];
    return headings;
  });

  const lg = new MediaQuery("width >= 64rem", false);
  let isOpen = $state(false);
  let activeId = $state<string | null>(null);

  const ITEM_H = 32;
  const INDENT = 12;
  const BASE_X = 7;
  const TEXT_GAP = 12;

  const minLevel = $derived(headings.length ? Math.min(...headings.map((h) => h.level)) : 1);

  const flatHeadings = $derived(headings.map((h) => ({ ...h, tocLevel: h.level - minLevel })));

  const maxTocLevel = $derived(flatHeadings.length ? Math.max(...flatHeadings.map((h) => h.tocLevel)) : 0);

  const svgWidth = $derived(BASE_X + maxTocLevel * INDENT + BASE_X + 2);
  const svgHeight = $derived(flatHeadings.length * ITEM_H);

  const activeIndex = $derived(flatHeadings.findIndex((h) => h.id === activeId));

  function xOf(tocLevel: number) {
    return BASE_X + tocLevel * INDENT;
  }

  type PathInfo = { d: string; lengths: number[]; total: number };

  function buildTreePath(fh: typeof flatHeadings): PathInfo {
    if (!fh.length) return { d: "", lengths: [], total: 0 };

    let d = "";
    let length = 0;
    const lengths: number[] = [];
    let prevX = xOf(fh[0].tocLevel);
    let prevY = 0;

    for (let i = 0; i < fh.length; i++) {
      const x = xOf(fh[i].tocLevel);
      const yMid = i * ITEM_H + ITEM_H / 2;

      if (i === 0) {
        d += `M ${x} 0 V ${yMid}`;
        length += yMid;
      } else if (x !== prevX) {
        const yBoundary = i * ITEM_H;
        d += ` V ${yBoundary} H ${x} V ${yMid}`;
        length += yBoundary - prevY + Math.abs(x - prevX) + (yMid - yBoundary);
      } else {
        d += ` V ${yMid}`;
        length += yMid - prevY;
      }

      lengths.push(length);
      prevX = x;
      prevY = yMid;
    }

    const finalY = fh.length * ITEM_H;
    d += ` V ${finalY}`;
    const total = length + (finalY - prevY);

    return { d, lengths, total };
  }

  const pathInfo = $derived(buildTreePath(flatHeadings));

  const activeLength = $derived(
    activeIndex < 0
      ? 0
      : activeIndex === flatHeadings.length - 1
        ? pathInfo.total
        : (pathInfo.lengths[activeIndex] ?? 0),
  );

  $effect(() => {
    if (!headings.length) return;

    const update = () => {
      const threshold = window.innerHeight * 0.67; // higher = more inclusive
      let best: string | null = null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) best = h.id;
      }
      activeId = best ?? headings[0]?.id ?? null;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  });
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
    <div class="relative mt-3">
      {#if flatHeadings.length > 0}
        <svg
          width={svgWidth}
          height={svgHeight}
          class="pointer-events-none absolute top-0 left-0 overflow-visible"
          aria-hidden="true"
        >
          {#if pathInfo.d}
            <path
              d={pathInfo.d}
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-zinc-300 dark:stroke-zinc-600"
            />

            <path
              d={pathInfo.d}
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-accent-600 transition-[stroke-dashoffset] duration-500 ease-out"
              style:stroke-dasharray={pathInfo.total}
              style:stroke-dashoffset={pathInfo.total - activeLength}
            />
          {/if}
        </svg>
      {/if}

      <ol class="min-w-0">
        {#each flatHeadings as h}
          <li style:height="{ITEM_H}px" class="flex items-center">
            <a
              href="#{h.id}"
              style:padding-left="{xOf(h.tocLevel) + TEXT_GAP}px"
              class={[
                "ring-on-focus-visible block w-full truncate pr-2 text-sm transition-colors duration-300",
                activeId === h.id ? "text-accent-600 opacity-100" : "opacity-50 hover:opacity-80",
              ]}
            >
              {h.text.replace(/`/g, "")}
            </a>
          </li>
        {/each}
      </ol>
    </div>
  {/if}
</div>
