<script lang="ts">
  import { projects } from "$lib/projects";
  import ProjectCard from "$components/project-card.svelte";
</script>

<!-- <ul role="list">
  {#each people as person}
    <li class="group/item">
      <a class="group/edit invisible group-hover/item:visible ..." href="tel:{person.phone}">
        <span class="group-hover/edit:text-gray-700 ...">Call</span>
      </a>
    </li>
  {/each}
</ul> -->

<ul class="group/pcg grid gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
  {#each projects as project (project.title)}
    <li>
      <ProjectCard {...project} />
    </li>
  {/each}
</ul>
