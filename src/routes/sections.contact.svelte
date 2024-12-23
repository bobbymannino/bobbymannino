<script lang="ts">
  import { hacker } from "$lib/hacker";
  import { inview } from "svelte-inview";

  const links = [
    ["github", "https://www.github.com/bobbymannino"],
    ["email", "mailto:manninobobby@icloud.com"],
    ["linkedin", "https://www.linkedin.com/in/bobbymannino/"],
  ];
</script>

<section class="container" id="contact">
  <div class="card">
    <h1
      use:inview
      on:inview_enter={(e) => {
        const { node } = e.detail;

        const clean = hacker(node);

        return () => clean();
      }}
    >
      contact
    </h1>

    <ul class="space-x-4">
      {#each links as [text, href]}
        <li class="inline-block">
          <a {href} target="_blank" class="group">
            <h2 class="group-hover:underline">#{text}</h2>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>
