<script lang="ts">
  import ProjectCardGrid from "$components/project-card-grid.svelte";
  import { hacker } from "$lib/hacker";
  import { inview } from "svelte-inview";
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
      projects
    </h1>

    <ProjectCardGrid />
  </div>
</section>
