<script lang="ts">
  type Props = {
    title: string;
    description: string;
    tags?: string[];
    img?: string;
  };

  let { img, title, description, tags }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="og:title" content={title} />
  <meta name="twitter:title" content={title} />

  {#if tags?.length}
    <meta name="keywords" content={tags.join(", ")} />
  {/if}

  {#if img}
    <meta name="og:image" content={img} />
    <meta name="twitter:image" content={img} />
  {/if}

  <meta name="description" content={description} />
  <meta name="og:description" content={description} />
  <meta name="twitter:description" content={description} />
</svelte:head>
