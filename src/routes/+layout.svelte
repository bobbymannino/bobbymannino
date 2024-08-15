<script lang='ts'>
    import type { Snippet } from 'svelte';
    import '../app.css'
    import Header from './header.svelte';
    import Fonts from './fonts.svelte';
    import Footer from './footer.svelte';

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<Fonts />

<Header />

<main>
    {@render children()}
</main>

<Footer/>
