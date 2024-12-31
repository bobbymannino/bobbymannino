<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import hljs from "highlight.js";
  import "./code.css";

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

<pre><code class="hljs">{@html html}</code></pre>
