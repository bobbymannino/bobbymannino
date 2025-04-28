<script lang="ts">
  import RocketIcon from "$lib/icons/rocket-icon.svelte";
  import CogIcon from "$lib/icons/cog-icon.svelte";
  import BeakerIcon from "$lib/icons/beaker-icon.svelte";
  import type { Project } from "$lib/projects";

  let { status, thumbnail, title, href }: Project = $props();

  const label: string = $derived.by(() => {
    if (status == "Beta") return `${title} is in beta`;
    if (status == "Released") return `${title} has been released`;
    return `${title} is in development`;
  });
</script>

<a
  {href}
  target="_blank"
  rel="noopener"
  class="ring-on-focus-visible group/pc relative block bg-gray-50 p-2 transition-opacity group-has-[a:hover]/pcg:not-hover:opacity-25 dark:bg-zinc-800"
  tabindex="0"
>
  <enhanced:img
    alt={title}
    src={thumbnail}
    class="aspect-thumbnail mb-2 h-auto w-full object-cover"
  />

  <span class="text-xl font-semibold text-zinc-950 dark:text-white"
    >{title}</span
  >

  <div
    title={label}
    class="text-accent-600/50 group-hover/pc:text-accent-600 absolute top-0 right-0 p-2 group-hover/pc:bg-white [&>svg]:size-6"
  >
    {#if status == "Development"}
      <span class="sr-only">In development</span>
      <CogIcon />
    {:else if status == "Released"}
      <span class="sr-only">Released</span>
      <RocketIcon />
    {:else if status == "Beta"}
      <span class="sr-only">In beta</span>
      <BeakerIcon />
    {/if}
  </div>
</a>
