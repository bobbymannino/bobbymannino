<script lang="ts">
  import { onMount } from "svelte";
  import "../app.css";
  import type { LayoutProps } from "./$types";
  import Analytics from "./analytics.svelte";
  import Fonts from "./fonts.svelte";
  import Footer from "./footer.svelte";
  import Header from "./header.svelte";
  import Meta from "./meta.svelte";
  import SearchModal from "./search-modal.svelte";

  let { children, data }: LayoutProps = $props();

  onMount(() => {
    console.log(
      "%cbobman.dev",
      "font-weight:900;font-size:2.5rem;color:#0675ff",
    );
    console.log("%cyou found me 👋", "font-size:1rem;color:green");

    if (data.q) searchModal.open(data.q);
  });

  let searchModal: { open: (query?: string) => void } = $state({
    open: () => {},
  });
</script>

<!-- BTS  -->
<Analytics />
<Fonts />
<Meta />

<SearchModal bind:this={searchModal} />
<Header openSearchModal={searchModal.open} />
<main id="main-content" class="scroll-mt-16">
  {@render children()}
</main>
<Footer />
