<script lang="ts">
    import Picture from "$components/picture.svelte";
    const projects = [
        {
            title: "CPC Travel",
            href: "https://www.cpc-travel.co.uk",
            src: "/images/cpc-travel",
        },
        {
            title: "CPC Bureau de Change",
            href: "https://www.cpc-bureau-de-change.co.uk",
            src: "/images/cpc-bureau",
        },
    ];
</script>

<section class="container" id="projects">
    <div class="card">
        <h1>projects</h1>

        <ul class="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {#each projects as { href, src, title }}
                <li>
                    <a {href} target="_blank" class="group pile">
                        <Picture alt={title} {src} />
                        <div
                            class="bg-white/80 p-2 justify-self-start place-self-end transition-opacity md:not-group-hover:opacity-0"
                        >
                            <h2 class="dark:text-zinc-900">{title}</h2>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</section>
