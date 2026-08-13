<script lang="ts">
  import ProjectCardGrid from "$components/project-card-grid.svelte";
  import { scramble } from "$lib/actions/scramble";
</script>

<section class="container" id="projects">
  <div class="card">
    <h1 use:scramble>projects</h1>

    <ProjectCardGrid />
  </div>
</section>
