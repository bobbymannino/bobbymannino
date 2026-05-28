<script lang="ts">
  type Chip = {
    text: string;
    value: string;
  };

  type Props = {
    chips: Chip[];
    selection?: string[];
    name: string;
    /** @default "Tags" */
    legend: string;
    valuesAsHref?: boolean;
  };

  let { chips, legend = "Tags", selection = $bindable([]), name, valuesAsHref = false }: Props = $props();
</script>

<fieldset class="flex flex-wrap gap-1">
  <legend class="sr-only">{legend}</legend>
  {#if valuesAsHref}
    {#each chips as { text, value }}
      <a
        href={value}
        tabindex="0"
        class="ring-on-focus-visible bg-zinc-100 p-1 text-sm text-zinc-700 hover:opacity-70 dark:bg-zinc-800 dark:text-zinc-400"
        >{text}</a
      >
    {/each}
  {:else}
    {#each chips as { text, value }}
      <label
        class="ring-on-has-focus-visible has-checked:bg-accent-600 cursor-pointer bg-zinc-100 p-1 text-sm text-zinc-700 hover:opacity-70 has-checked:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-400"
      >
        <input type="checkbox" tabindex="0" {name} {value} class="sr-only" bind:group={selection} />
        {text}
      </label>
    {/each}
  {/if}
</fieldset>
