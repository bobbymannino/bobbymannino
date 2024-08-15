<script lang='ts'>
    import type { Snippet } from 'svelte';
    import '../app.css'
    import Header from './header.svelte';

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
    </script>

<Header />
{@render children()}
