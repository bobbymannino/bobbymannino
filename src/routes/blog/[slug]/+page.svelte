<script lang="ts">
    import Meta from "$components/meta.svelte";
    import ListItem from "$lib/renderers/list-item.svelte";
    import List from "$lib/renderers/list.svelte";
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
        <MD
            source={data.post.content}
            renderers={{ listitem: ListItem, list: List }}
        />

        <hr />

        <div class="flex justify-end">
            <p>Published {data.post.meta.publishedOn.toLocaleDateString()}</p>
        </div>
    </div>
</div>
