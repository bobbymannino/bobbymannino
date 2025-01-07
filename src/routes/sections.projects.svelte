<script lang="ts">
  import { hacker } from "$lib/hacker";
  import { inview } from "svelte-inview";
  import CPCTravel from "$lib/images/cpc-travel.png?enhanced";
  import CPCBureau from "$lib/images/cpc-bureau.png?enhanced";

  const projects = [
    {
      title: "CPC Travel",
      href: "https://www.cpc-travel.co.uk",
      src: CPCTravel,
    },
    {
      title: "CPC Bureau de Change",
      href: "https://www.cpc-bureau-de-change.co.uk",
      src: CPCBureau,
    },
  ];
</script>

<section class="container" id="projects">
  <div class="card">
    <h1
      use:inview={{ unobserveOnEnter: true }}
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean();
      }}
    >
      projects
    </h1>

    <ul class="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
      {#each projects as { href, src, title }}
        <li>
          <a
            {href}
            target="_blank"
            class="pile ring-on-focus-visible"
            tabindex="0"
          >
            <enhanced:img alt={title} {src} />
            <div>
              <h2 class="bg-white/75 p-2 text-center dark:text-zinc-900">
                {title}
              </h2>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>
