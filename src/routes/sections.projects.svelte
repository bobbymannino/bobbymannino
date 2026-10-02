<script lang="ts">
  import { inview } from "svelte-inview";
  import ProjectCardGrid from "#components/project-card-grid.svelte";
  import { hacker } from "#lib/hacker.js";
  import { m } from "#lib/paraglide/messages.js";
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
      {m.projects_heading()}
    </h1>

    <ProjectCardGrid />
  </div>
</section>
