<script lang="ts">
  import { page } from "$app/state";
  import { m } from "#lib/paraglide/messages.js";
  import { getLocale, localizeHref, locales } from "#lib/paraglide/runtime.js";
</script>

<nav aria-label={m.language()}>
  <ul class="flex items-center gap-1 bg-zinc-100 p-1 dark:bg-zinc-800">
    {#each locales as locale (locale)}
      <li>
        <a
          href={localizeHref(page.url.pathname, { locale })}
          hreflang={locale}
          lang={locale}
          title={m.locale_name({}, { locale })}
          aria-current={locale === getLocale() ? "page" : undefined}
          data-sveltekit-reload
          tabindex="0"
          class="ring-on-focus-visible aria-[current=page]:bg-accent-600 block px-2 py-1 text-sm text-zinc-700 uppercase hover:opacity-70 aria-[current=page]:text-white dark:text-zinc-300"
        >
          {locale}
        </a>
      </li>
    {/each}
  </ul>
</nav>
