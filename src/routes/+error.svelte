<script lang="ts">
    import { hacker } from "$lib/hacker";
    import { inview } from "svelte-inview";
</script>

<div class="container">
    <div class="card">
        <h1
            use:inview
            on:inview_enter={(e) => {
                const { node } = e.detail;

                const clean = hacker(node);

                return () => clean();
            }}
        >
            Oh No :(
        </h1>

        <p>
            It seems we've encountered an error. Try refreshing the page or head <a
                href="/"
                class="text-accent-600 hover:underline">home</a
            >.
        </p>
    </div>
</div>
