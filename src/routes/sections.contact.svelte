<script lang="ts">
  import { inview } from "svelte-inview";
  import { hacker } from "#lib/hacker.js";
  import { m } from "#lib/paraglide/messages.js";
  import { socials } from "#lib/socials.js";
</script>

<section class="container" id="contact">
  <div class="card">
    <h1
      use:inview={{ unobserveOnEnter: true }}
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean();
      }}
    >
      {m.contact_heading()}
    </h1>

    <ul class="flex flex-wrap gap-4">
      {#each socials as { platform, href }}
        <li>
          <h2>
            <a {href} target="_blank" class="ring-on-focus-visible hover:underline" tabindex="0">
              #{platform}
            </a>
          </h2>
        </li>
      {/each}
    </ul>
  </div>
</section>
