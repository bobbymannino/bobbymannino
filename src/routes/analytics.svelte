<script lang="ts">
    import { dev } from "$app/environment";
</script>

<svelte:head>
    {#if !dev}
        <script
            defer
            src="https://analytics.bobman.dev/script.js"
            data-website-id="5657dfa2-18a6-45d4-8ff6-1bd7ed17dd90"
        ></script>
    {/if}
</svelte:head>
