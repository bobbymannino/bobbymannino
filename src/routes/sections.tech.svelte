<script lang="ts">
  import { hacker } from "$lib/hacker";
  import { inview } from "svelte-inview";

  const techs = [
    "js/ts",
    "git/github",
    "html/css",
    "svelte/kit",
    "react/next",
    "postgres/sql",
    "rust",
    "c/c#",
  ];
</script>

<section class="container" id="technologies">
  <div class="card">
    <h1
      use:inview={{ unobserveOnEnter: true }}
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean();
      }}
    >
      technologies
    </h1>

    <p>
      these are technologies i have an interest in or have some amount of
      knowledge in; <b>{new Intl.ListFormat().format(techs)}</b>
    </p>

    <p>
      at the moment i am learning java for android apps as well as limited xml
      for the same reason.
    </p>

    <p>
      my favourite language to type out would be typescript or rust although
      admittedly my rust is...a little rusty, but thats nothing that cannot be
      fixed with some practice.
    </p>
  </div>
</section>
