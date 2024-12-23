<script lang="ts">
    import type { Snippet } from "svelte";
    import "../app.css";
    import Header from "./header.svelte";
    import Analytics from "./analytics.svelte";
    import Footer from "./footer.svelte";
    import Fonts from "./fonts.svelte";
    import Meta from "./meta.svelte";
    import SearchModal from "./search-modal.svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<Analytics />
<Fonts />
<Meta />

<SearchModal />
<Header />
<main id="main-content">
    {@render children()}
</main>
<Footer />
