<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import hljs from "highlight.js";
  import DuplicateIcon from "$lib/icons/dupliate-icon.svelte";
  import "./code.css";
  import { copyTextToClipboard } from "$lib/utils";

  type Props = {
    children: Snippet;
    lang: string;
    raw: string;
    text: string;
  };

  let { text, lang }: Props = $props();

  let html = $derived(text);

  onMount(() => {
    const code = hljs.highlight(text, { language: lang });
    html = code.value;
  });
</script>

<div>
  <div
    class="flex items-center justify-between border-b border-zinc-300 bg-zinc-200 p-2 text-xs font-medium dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
  >
    <span class="uppercase">{lang}</span>
    <button
      onclick={() => copyTextToClipboard(text)}
      tabindex="0"
      class="hover:text-accent-600 ring-on-focus-visible active:text-accent-700 flex cursor-pointer items-center gap-1 active:scale-95"
    >
      <DuplicateIcon class="size-4" />
      <span>Copy</span>
    </button>
  </div>
  <pre><code class="hljs">{@html html}</code></pre>
</div>
