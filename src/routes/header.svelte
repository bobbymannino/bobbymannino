<script lang="ts">
    import Logo from "./logo.svelte";

    const links = [
        ["#about", "about"],
        ["#technologies", "technologies"],
        ["#projects", "projects"],
        ["#contact", "contact"],
    ];
</script>

<header class="bg-white sticky top-0 z-10 dark:bg-zinc-900">
    <div
        class="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
    >
        <Logo />
        <nav>
            <ul class="flex">
                {#each links as [href, text]}
                    <li>
                        <a
                            {href}
                            class="dark:text-zinc-100 text-zinc-800 transition-colors px-3 py-1 relative hover:text-white after:content-[''] after:-z-10 isolate after:scale-y-0 hover:after:scale-y-100 after:transition-transform overflow-hidden hover:after:origin-top after:origin-bottom after:bg-accent-600 after:absolute after:inset-0"
                            >{text}</a
                        >
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
</header>
