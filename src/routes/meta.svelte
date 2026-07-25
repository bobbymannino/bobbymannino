<script>
  import { URL } from "$app/env/public";
  import { page } from "$app/state";
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta name="author" content="Bobby Mannino" />
  <meta property="og:site_name" content="Bobby Mannino" />
  <meta name="robots" content="index, follow" />
  <meta property="og:url" content="{URL}{page.url.pathname}" />
  <meta property="og:locale" content="en_GB" />
  <meta name="twitter:site" content="@bobbymannin0" />
  <link rel="canonical" href="{URL}{page.url.pathname}" />
</svelte:head>
