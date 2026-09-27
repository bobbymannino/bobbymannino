<script lang="ts">
  import { hacker } from "$lib/hacker";
  import { m } from "$lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime";
  import { inview } from "svelte-inview";

  const techs = [
    "js/ts",
    "git/github",
    "html/css",
    "svelte/kit",
    "pascal/delphi",
    "react/next",
    "postgres/sql",
    "rust",
    "c/c#",
    "docker/kubernetes",
    "nginx",
  ];
</script>

<section class="container" id="technologies">
  <div class="group/highlight card">
    <h1
      use:inview={{ unobserveOnEnter: true }}
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean?.();
      }}
    >
      {m.technologies_heading()}
    </h1>

    <p>
      {m.technologies_p1()}
      <b class="motion-safe:highlight">{new Intl.ListFormat(getLocale()).format(techs)}</b>
    </p>

    <p>
      {m.technologies_p2()}
    </p>

    <p>
      {m.technologies_p3()}
    </p>
  </div>
</section>
