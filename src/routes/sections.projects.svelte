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
                    <a {href} target="_blank" class="pile group">
                        <Picture alt={title} {src} />
                        <div
                            class="p-2 text-center bg-white/50 backdrop-blur w-full h-full not-group-hover:opacity-0 transition-opacity pile"
                        >
                            <h2>{title}</h2>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</section>
