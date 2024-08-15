<script lang="ts">
    const techs = [
        "typescript",
        "git/github",
        "html",
        "css",
        "svelte/kit",
        "react/next",
        "postgres",
        "stripe",
    ];
</script>

<section class="container" id="about">
    <div class="card">
        <h1>technologies</h1>

        <p>
            these are technologies i have an interest in personally or have some
            knowledge of {#each techs as tech, i}<b>{tech}</b
                >{#if i !== techs.length - 1},&nbsp;
                {/if}{/each}
        </p>

        <p>
            i am at the moment learning <b>swift</b> to help my ability to develops
            ios apps as well as developing my own wrapper for a s3 bucket alternative,
            as a university student i look for ways to save money and one way i found
            was by creating my own solutions for next to nothing instead of paying
            for a service
        </p>
    </div>
</section>
