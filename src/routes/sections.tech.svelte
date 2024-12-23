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

  const tech = new Intl.ListFormat().format(techs);
</script>

<section class="container" id="technologies">
  <div class="card">
    <h1
      use:inview
      on:inview_enter={(e) => {
        const { node } = e.detail;

        const clean = hacker(node);

        return () => clean();
      }}
    >
      technologies
    </h1>

    <p>
      these are technologies i have an interest in personally or have various
      amounts of knowledge in; <b>{tech}</b>
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
