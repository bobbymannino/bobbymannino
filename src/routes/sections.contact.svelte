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
      use:inview={{ unobserveOnEnter: true }}
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean();
      }}
    >
      contact
    </h1>

    <ul class="flex flex-wrap gap-4">
      {#each links as [text, href]}
        <li>
          <h2>
            <a
              {href}
              target="_blank"
              class="ring-on-focus-visible hover:underline"
              tabindex="0"
            >
              #{text}
            </a>
          </h2>
        </li>
      {/each}
    </ul>
  </div>
</section>
