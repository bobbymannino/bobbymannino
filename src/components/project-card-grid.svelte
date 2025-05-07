<script lang="ts">
  import { projects } from "$lib/projects";
  import ProjectCard from "$components/project-card.svelte";
</script>

<ul class="group/pcg grid gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
  {#each projects as project (project.title)}
    <li>
      <ProjectCard {...project} />
    </li>
  {/each}
</ul>
