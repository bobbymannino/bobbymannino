<script lang="ts">
  import { PUBLIC_URL } from "$env/static/public";

  type Props = {
    title: string;
    description: string;
    tags?: string[];
    /** @default `${PUBLIC_URL}/favicon.png` */
    img?: string;
    imgDark?: string;
    /** @default "website" */
    type?: "website" | "article";
  };

  let { img = `${PUBLIC_URL}/favicon.png`, imgDark, title, description, tags, type = "website" }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta name="twitter:title" content={title} />

  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  <meta name="twitter:description" content={description} />

  {#if tags?.length}
    <meta name="keywords" content={tags.join(", ")} />
  {/if}

  <meta property="og:image" content={img} />
  {#if imgDark}
    <meta name="twitter:image" content={img} media="(prefers-color-scheme: light)" />
    <meta name="twitter:image" content={imgDark} media="(prefers-color-scheme: dark)" />
  {:else}
    <meta name="twitter:image" content={img} />
  {/if}
  <meta name="twitter:card" content="summary_large_image" />

  <meta property="og:type" content={type} />
</svelte:head>
