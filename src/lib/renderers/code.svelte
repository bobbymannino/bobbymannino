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

  let html = $state(text);

  onMount(() => {
    const code = hljs.highlight(text, { language: lang });
    html = code.value;
  });
</script>

<div>
  <div
    class="flex items-center justify-between bg-zinc-200 p-2 text-xs font-medium dark:bg-zinc-950 dark:text-zinc-100"
  >
    <span class="uppercase">{lang}</span>
    <button
      onclick={() => copyTextToClipboard(text)}
      class="hover:text-accent-600 flex cursor-pointer items-center gap-1"
    >
      <DuplicateIcon class="size-4" />
      <span>Copy</span>
    </button>
  </div>
  <pre><code class="hljs">{@html html}</code></pre>
</div>
