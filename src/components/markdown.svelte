<script lang="ts">
  import Code from "$lib/renderers/code.svelte";
  import Codespan from "$lib/renderers/codespan.svelte";
  import ListItem from "$lib/renderers/list-item.svelte";
  import List from "$lib/renderers/list.svelte";
  import Table from "$lib/renderers/table.svelte";
  import MD from "svelte-markdown";

  type Token = {
    type: string;
    text: string;
    depth: number;
  };

  type Props = {
    onparsed?: (tokens: Token[]) => void;
    markdown: string;
  };

  let { onparsed, markdown }: Props = $props();
</script>

<MD
  on:parsed={(e) => onparsed?.(e.detail.tokens)}
  source={markdown}
  renderers={{
    listitem: ListItem,
    list: List,
    table: Table,
    code: Code,
    codespan: Codespan,
  }}
/>
