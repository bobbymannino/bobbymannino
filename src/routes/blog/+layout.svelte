<script>
  let { children } = $props();
</script>

<svelte:head>
  <link
    rel="alternate"
    type="application/rss+xml"
    title="Bobby Mannino's Blog RSS Feed"
    href="/rss"
  />
</svelte:head>

{@render children()}
