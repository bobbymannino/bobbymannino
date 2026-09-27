<script lang="ts">
  import { page } from "$app/state";
  import Meta from "$components/meta.svelte";
  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  const status = $derived(page.status);
  const message = $derived(page.error?.message);

  const headline = $derived.by(() => {
    if (status === 404) return m.error_404_headline();
    if (status === 403) return m.error_403_headline();
    if (status >= 500) return m.error_500_headline();
    return m.error_headline();
  });

  const subtext = $derived.by(() => {
    if (status === 404) return m.error_404_subtext();
    if (status === 403) return m.error_403_subtext();
    if (status >= 500) return m.error_500_subtext();
    return m.error_subtext();
  });
</script>

<Meta title="{m.error_title({ status })} | Bobby Mannino" description={m.error_description()} />

<section class="container" id="error">
  <div class="group/highlight card">
    <p
      class="text-accent-600 font-mono text-7xl leading-none font-black tracking-tighter md:text-9xl"
      aria-hidden="true"
    >
      {status}
    </p>

    <h1>{headline}</h1>

    <p>{subtext}</p>

    {#if message && message !== "Not Found"}
      <p>
        {message}
      </p>
    {/if}

    <div class="flex flex-wrap gap-3 pt-2">
      <a
        href={localizeHref("/blog")}
        tabindex="0"
        class="bg-accent-700 ring-on-focus-visible hover:bg-accent-800 px-3 py-2 text-white ring-white"
      >
        {m.error_read_blog()}
      </a>
      <a href={localizeHref("/")} tabindex="0" class="text-accent-700 ring-on-focus-visible px-3 py-2 hover:underline"
        >{m.error_head_home()}</a
      >
    </div>
  </div>
</section>
