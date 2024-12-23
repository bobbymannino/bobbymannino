<script lang="ts">
    type Props = {
        title: string;
        description: string;
        tags?: string[];
    };

    let { title, description, tags }: Props = $props();
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="og:title" content={title} />
    <meta name="twitter:title" content={title} />

    {#if tags?.length}
        <meta name="keywords" content={tags.join(", ")} />
    {/if}

    <meta name="description" content={description} />
    <meta name="og:description" content={description} />
    <meta name="twitter:description" content={description} />
</svelte:head>
