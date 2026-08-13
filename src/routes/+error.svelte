<script lang="ts">
  import { page } from "$app/state";
  import Meta from "$components/meta.svelte";
  import { scramble } from "$lib/actions/scramble";

  const status = $derived(page.status);
  const message = $derived(page.error?.message);

  const headline = $derived.by(() => {
    if (status === 404) return "lost in space";
    if (status === 403) return "no entry";
    if (status >= 500) return "something broke";
    return "well, this is awkward";
  });

  const subtext = $derived.by(() => {
    if (status === 404) return "the page you're looking for doesn't exist (or never did).";
    if (status === 403) return "you don't have permission to view this page.";
    if (status >= 500) return "something went wrong on my end. try again in a moment.";
    return "an unexpected error occurred.";
  });
</script>

<Meta title="Error {status} | Bobby Mannino" description="Something has gone wrong" />

<section class="container" id="error">
  <div class="group/highlight card">
    <p
      class="text-accent-600 font-mono text-7xl leading-none font-black tracking-tighter md:text-9xl"
      aria-hidden="true"
      use:scramble
    >
      {status}
    </p>

    <h1 use:scramble>{headline}</h1>

    <p>{subtext}</p>

    {#if message && message !== "Not Found"}
      <p>
        {message}
      </p>
    {/if}

    <div class="flex flex-wrap gap-3 pt-2">
      <a
        href="/blog"
        tabindex="0"
        class="bg-accent-700 ring-on-focus-visible hover:bg-accent-800 px-3 py-2 text-white ring-white"
      >
        read the blog
      </a>
      <a href="/" tabindex="0" class="text-accent-700 ring-on-focus-visible px-3 py-2 hover:underline">head home</a>
    </div>
  </div>
</section>
