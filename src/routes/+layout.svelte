<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import "../app.css";
  import Header from "./header.svelte";
  import Analytics from "./analytics.svelte";
  import Footer from "./footer.svelte";
  import Fonts from "./fonts.svelte";
  import Meta from "./meta.svelte";
  import SearchModal from "./search-modal.svelte";

  onMount(() => {
    console.log(
      "%cbobman.dev",
      "font-weight:900;font-size:2.5rem;color:#0675ff",
    );
    console.log("%cyou found me 👋", "font-size:1rem;color:green");
  });

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();

  let searchModal: { open: () => void } = $state({});
</script>

<Analytics />
<Fonts />
<Meta />

<SearchModal bind:this={searchModal} />
<Header openSearchModal={searchModal.open} />
<main id="main-content">
  {@render children()}
</main>
<Footer />
