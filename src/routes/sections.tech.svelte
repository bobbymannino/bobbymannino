<script lang="ts">
    const techs = [
        "typescript",
        "git/github",
        "html/css",
        "svelte/kit",
        "react/next",
        "postgres/sql",
        "rust",
        "c/c#",
    ];

    const tech = new Intl.ListFormat().format(techs);
</script>

<section class="container" id="technologies">
    <div class="card">
        <h1>technologies</h1>

        <p>
            these are technologies i have an interest in personally or have some
            knowledge of <b>{tech}</b>
        </p>

        <p>
            i am at the moment learning <b>swift</b> to help my ability to
            develops ios apps as well as as taking on <b>rust</b> to learn an incredibly
            effiencent and rapily growing language
        </p>
    </div>
</section>
