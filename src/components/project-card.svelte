<script lang="ts">
  import { BeakerIcon, CogIcon, EyeCrossedOutIcon, RocketIcon } from "$lib/icons";
  import { m } from "$lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime";
  import type { Project } from "$lib/projects";

  let { status, thumbnail, title, href, languages, year }: Project = $props();

  const label: string = $derived.by(() => {
    if (status == "Beta") return m.project_beta_label({ title });
    if (status == "Released") return m.project_released_label({ title });
    if (status == "Private") return m.project_private_label({ title });
    return m.project_development_label({ title });
  });
</script>

<a
  {href}
  target="_blank"
  rel="noopener"
  class="group/pc ring-on-focus-visible hoverable:group-has-[a:hover]/pcg:not-hover:opacity-25 relative block bg-gray-50 p-2 transition-opacity dark:bg-zinc-800"
  tabindex="0"
>
  <enhanced:img
    alt={title}
    src={thumbnail}
    loading="lazy"
    class="aspect-thumbnail mb-2 h-auto w-full object-cover select-none"
  />

  <div>
    <span class="text-xl font-semibold text-zinc-950 dark:text-white">
      {title}
      <span class="opacity-33">{year}</span>
    </span>
    <br />
    <span class="font-xs text-zinc-600 dark:text-zinc-400">{new Intl.ListFormat(getLocale()).format(languages)}</span>
  </div>

  <div
    title={label}
    class="text-accent-600/50 group-hover/pc:text-accent-600 absolute top-0 right-0 p-2 group-hover/pc:bg-white [&>svg]:size-6"
  >
    {#if status == "Development"}
      <span class="sr-only">{m.project_status_development()}</span>
      <CogIcon />
    {:else if status == "Released"}
      <span class="sr-only">{m.project_status_released()}</span>
      <RocketIcon />
    {:else if status == "Beta"}
      <span class="sr-only">{m.project_status_beta()}</span>
      <BeakerIcon />
    {:else if status == "Private"}
      <span class="sr-only">{m.project_status_private()}</span>
      <EyeCrossedOutIcon />
    {/if}
  </div>
</a>
