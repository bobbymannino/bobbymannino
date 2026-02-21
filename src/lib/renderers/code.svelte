<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import hljs from "highlight.js";
  import DuplicateIcon from "$lib/icons/dupliate-icon.svelte";
  import "./code.css";
  import { copyTextToClipboard } from "$lib/utils";
  import CheckIcon from "$lib/icons/check-icon.svelte";

  type Props = {
    children: Snippet;
    lang: string;
    raw: string;
    text: string;
  };

  let { text, lang }: Props = $props();

  let html = $derived(text);
  let copied = $state(false);
  let timer: null | NodeJS.Timeout = $state(null);

  onMount(() => {
    const code = hljs.highlight(text, { language: lang });
    html = code.value;
  });

  function copy() {
    copied = true;
    copyTextToClipboard(text);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div>
  <div
    class="flex items-center justify-between border-b border-zinc-300 bg-zinc-200 p-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
  >
    <span class="uppercase">{lang}</span>
    <button
      onclick={copy}
      tabindex="0"
      class="hover:text-accent-600 ring-on-focus-visible active:text-accent-700 flex cursor-pointer items-center gap-1 active:scale-95"
    >
      {#if copied}
        <CheckIcon class="size-4" />
        <span>Copied</span>
      {:else}
        <DuplicateIcon class="size-4" />
        <span>Copy</span>
      {/if}
    </button>
  </div>
  <pre><code class="hljs">{@html html}</code></pre>
</div>
