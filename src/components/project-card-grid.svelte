<script lang="ts">
  import ProjectCard from "$components/project-card.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { projects } from "$lib/projects";
</script>

<ul use:reveal class="group/pcg grid gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
  {#each projects as project (project.title)}
    <li>
      <ProjectCard {...project} />
    </li>
  {/each}
</ul>
