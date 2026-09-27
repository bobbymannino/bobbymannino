<script lang="ts">
  import { URL as URLS } from "$app/env/public";
  import { page } from "$app/state";
  import { baseLocale, getLocale, localizeHref, locales } from "$lib/paraglide/runtime";

  const URL = URLS.split(",")[0];

  const ogLocales: Record<(typeof locales)[number], string> = {
    en: "en_GB",
    de: "de_DE",
    fr: "fr_FR",
    it: "it_IT",
    es: "es_ES",
  };
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta name="author" content="Bobby Mannino" />
  <meta property="og:site_name" content="Bobby Mannino" />
  <meta name="robots" content="index, follow" />
  <meta property="og:url" content="{URL}{page.url.pathname}" />
  <meta property="og:locale" content={ogLocales[getLocale()]} />
  {#each locales as locale (locale)}
    {#if locale !== getLocale()}
      <meta property="og:locale:alternate" content={ogLocales[locale]} />
    {/if}
    <link rel="alternate" hreflang={locale} href="{URL}{localizeHref(page.url.pathname, { locale })}" />
  {/each}
  <link rel="alternate" hreflang="x-default" href="{URL}{localizeHref(page.url.pathname, { locale: baseLocale })}" />
  <meta name="twitter:site" content="@bobbymannin0" />
  <link rel="canonical" href="{URL}{page.url.pathname}" />
</svelte:head>
