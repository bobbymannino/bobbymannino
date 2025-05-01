<script>
  import { page } from "$app/state";
  import { PUBLIC_URL } from "$env/static/public";
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta name="author" content="Bobby Mannino" />
  <meta property="og:site_name" content="Bobby Mannino" />
  <meta name="robots" content="index, follow" />
  <meta property="og:url" content="{PUBLIC_URL}{page.url.pathname}" />
  <meta property="og:locale" content="en_GB" />
  <meta name="twitter:site" content="@bobbymannin0" />
  <link rel="canonical" href="{PUBLIC_URL}{page.url.pathname}" />
</svelte:head>
