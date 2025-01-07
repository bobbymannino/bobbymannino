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
      at the moment i am focusing my attention of learning more postgres/sql as
      well as staying on top web technologies such as svelte and next.
    </p>

    <p>
      my favourite language to type out would be typescript or sql, i enjoy the
      complexity of relational databases as well as the simplicity of
      typescript.
    </p>
  </div>
</section>
