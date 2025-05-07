<script lang="ts">
  type Props = { class?: App.Clsx };

  let { class: klass }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 32 32"
  class={klass}
>
  <path fill="currentColor" d="m16 10l10 10l-1.4 1.4l-8.6-8.6l-8.6 8.6L6 20z" />
</svg>
