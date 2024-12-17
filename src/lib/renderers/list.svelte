<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<ul class="list-disc list-inside marker:text-accent-600">
    {@render children()}
</ul>
