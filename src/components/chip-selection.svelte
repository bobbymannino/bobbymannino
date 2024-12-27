<script lang="ts">
  type Chip = {
    text: string;
    value: string;
    name: string;
  };

  type Props = {
    chips: Chip[];
    selection: string[];
  };

  let { chips, selection = $bindable() }: Props = $props();
</script>

<div class="flex flex-wrap gap-1">
  {#each chips as { text, value, name }}
    <label
      class="has-checked:bg-accent-600 cursor-pointer bg-zinc-100 p-1 text-sm text-zinc-700 hover:opacity-70 has-checked:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-400"
    >
      <input
        type="checkbox"
        {name}
        {value}
        class="sr-only"
        bind:group={selection}
      />
      {text}
    </label>
  {/each}
</div>
