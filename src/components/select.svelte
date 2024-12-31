<script lang="ts">
  type Option = {
    value: string;
    text: string;
  };

  type Props = {
    options: Option[];
    value: string;
    label: string;
    id: string;
  };

  let { id, options, value = $bindable(), label }: Props = $props();
</script>

<label for={id} class="sr-only">{label}</label>
<select
  bind:value
  {id}
  class="ring-accent-600 cursor-pointer appearance-none bg-zinc-100 p-2 text-zinc-800 ring-offset-2 hover:bg-zinc-200 focus-visible:ring-2 focus-visible:outline-none dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
  title={label}
>
  {#each options as opt}
    <option value={opt.value}>{opt.text}</option>
  {/each}
</select>
