<script lang="ts">
  import { hacker } from "$lib/hacker";
  import { m } from "$lib/paraglide/messages";
  import { inview } from "svelte-inview";
</script>

<section class="container" id="about">
  <div class="group/highlight card">
    <h1
      use:inview={{ unobserveOnEnter: true }}
      oninview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean?.();
      }}
    >
      {m.about_heading()}
    </h1>

    <enhanced:img
      src="$lib/images/lego-me.png?w=256"
      alt="Bobby Mannino"
      loading="eager"
      fetchpriority="high"
      class="mt-4 size-32"
    />

    <p>
      {@html m.about_p1()}
    </p>

    <p>
      {m.about_p2()}
    </p>
  </div>
</section>
