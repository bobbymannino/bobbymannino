<script lang="ts">
    const links = [["#projects", "Projects"]];
</script>

<header class="backdrop-blur sticky top-0">
    <div class="container">
        <a href="/">bobman</a>
        <nav>
            <ul>
                {#each links as [href, text]}
                    <li>
                        <a {href}>{text}</a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
</header>
