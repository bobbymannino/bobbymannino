<script lang='ts'>
    import type { Snippet } from 'svelte';
    import '../app.css'
    import Header from './header.svelte';
    import Fonts from './fonts.svelte';
    import Footer from './footer.svelte';
    import Analytics from './analytics.svelte';

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<Fonts />
<Analytics />

<Header />

<main>
    {@render children()}
</main>

<Footer/>
