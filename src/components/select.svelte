<script lang="ts">
  type Option = {
    value: string;
    text: string;
  };

  type Props = {
    options: Option[];
    value: string;
    name: string;
    label: string;
    id: string;
  };

  let { id, name, options, value = $bindable(), label }: Props = $props();
</script>

<label for={id} class="sr-only">{label}</label>
<select
  {name}
  tabindex="0"
  bind:value
  {id}
  class="ring-on-focus-visible cursor-pointer appearance-none bg-zinc-100 p-2 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
  title={label}
>
  {#each options as opt}
    <option value={opt.value}>{opt.text}</option>
  {/each}
</select>
