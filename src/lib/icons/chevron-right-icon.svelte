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
  <path fill="currentColor" d="M22 16L12 26l-1.4-1.4l8.6-8.6l-8.6-8.6L12 6z" />
</svg>
