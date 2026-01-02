<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import "../app.css";
  import type { LayoutProps } from "./$types";
  import BackToTop from "./back-to-top.svelte";
  import Footer from "./footer.svelte";
  import Header from "./header.svelte";
  import Meta from "./meta.svelte";
  import SearchModal from "./search-modal.svelte";

  let { children }: LayoutProps = $props();

  onMount(() => {
    console.log(
      "%cbobman.dev",
      "font-weight:900;font-size:2.5rem;color:#0675ff",
    );
    console.log("%cyou found me 👋", "font-size:1rem;color:green");

    if (page.url.searchParams.has("query"))
      searchModal.open(page.url.searchParams.get("query"));
  });

  let searchModal: { open: (query?: string | null) => void } = $state({
    open: () => {},
  });
</script>

<!-- <Analytics /> -->
<Meta />
<!-- <ViewTransitions /> -->

<SearchModal bind:this={searchModal} />
<Header openSearchModal={searchModal.open} />
<main id="main-content">
  {@render children()}
</main>
<BackToTop />
<Footer />
