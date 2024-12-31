<script lang="ts">
  type Props = {
    text: string;
  };

  let { text }: Props = $props();
</script>

<li class="text-zinc-800 dark:text-zinc-200">{text}</li>
