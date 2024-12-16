<script lang="ts">
    import Meta from "$components/meta.svelte";
    import type { PageData } from "./$types";
    import MD from "svelte-markdown";

    let { data }: { data: PageData } = $props();
</script>

<Meta
    title="{data.post.meta.title} | Bobby Mannino"
    description="Read a blog post written by Bobby Mannino"
/>

<div class="container">
    <div class="card">
        <div class="flex justify-between">
            <h2>{data.post.meta.title}</h2>
            <p>{data.post.meta.publishedOn.toLocaleDateString()}</p>
        </div>
        <hr />
        <MD source={data.post.content} />
    </div>
</div>
