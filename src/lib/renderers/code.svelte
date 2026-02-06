<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import hljs from "highlight.js";
  import DuplicateIcon from "$lib/icons/dupliate-icon.svelte";
  import CheckIcon from "$lib/icons/check-icon.svelte";
  import LineNumbersIcon from "$lib/icons/line-numbers-icon.svelte";
  import "./code.css";
  import { copyTextToClipboard } from "$lib/utils";

  type Props = {
    children: Snippet;
    lang: string;
    raw: string;
    text: string;
  };

  let { text, lang }: Props = $props();

  let html = $state("");
  let showLineNumbers = $state(false);
  let copied = $state(false);

  function handleCopy() {
    copyTextToClipboard(text);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  function toggleLineNumbers() {
    showLineNumbers = !showLineNumbers;
  }

  function addLineNumbers(highlightedCode: string): string {
    const lines = highlightedCode.split('\n');
    return lines.map((line, index) => {
      const lineNum = (index + 1).toString().padStart(3, ' ');
      return `<span class="hljs-ln"><span class="hljs-ln-numbers">${lineNum}</span><span class="hljs-ln-code">${line}</span></span>`;
    }).join('\n');
  }

  let displayHtml = $derived(showLineNumbers ? addLineNumbers(html) : html);

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
    <div class="flex items-center gap-2">
      <button
        onclick={toggleLineNumbers}
        tabindex="0"
        class="hover:text-accent-600 ring-on-focus-visible active:text-accent-700 flex cursor-pointer items-center gap-1 active:scale-95"
        aria-label="Toggle line numbers"
      >
        <LineNumbersIcon class="size-4" />
        <span>Lines</span>
      </button>
      <button
        onclick={handleCopy}
        tabindex="0"
        class="hover:text-accent-600 ring-on-focus-visible active:text-accent-700 flex cursor-pointer items-center gap-1 active:scale-95"
      >
        {#if copied}
          <CheckIcon class="size-4" />
          <span>Copied!</span>
        {:else}
          <DuplicateIcon class="size-4" />
          <span>Copy</span>
        {/if}
      </button>
    </div>
  </div>
  <pre class={showLineNumbers ? 'with-line-numbers' : ''}><code class="hljs">{@html displayHtml}</code></pre>
</div>
