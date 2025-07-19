<script lang="ts">
  import { hacker } from "$lib/hacker";
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
  ];
</script>

<section class="container" id="technologies">
  <div class="card">
    <h1
      use:inview={{ unobserveOnEnter: true }}
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean?.();
      }}
    >
      technologies
    </h1>

    <p>
      these are technologies i have an interest in or have some amount of
      knowledge in; <b>{new Intl.ListFormat().format(techs)}</b>
    </p>

    <p>
      at the moment i am focusing my attention of learning rust at a level where
      i would be able to write a full api backend with websockets.
    </p>

    <p>
      my favorite language to type out would be typescript or sql, i enjoy the
      complexity of relational databases as well as the simplicity and type
      safety of typescript. i am also currently really enjoying rust, its strict
      types and unusual syntax is refreshing and so far i am enjoying it deeply
    </p>
  </div>
</section>
