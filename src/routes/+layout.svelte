<script lang='ts'>
    import type { Snippet } from 'svelte';
    import '../app.css'
    import Header from './header.svelte';
    import Analytics from './analytics.svelte';
    import Footer from './footer.svelte';
    import Fonts from './fonts.svelte';

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
  </script>

<Analytics />
<Fonts />

<Header />
<main>
    {@render children()}
</main>
<Footer />
