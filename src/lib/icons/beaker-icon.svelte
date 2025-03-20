<script lang="ts">
  type Props = { class?: App.Clsx };

  let { class: klass }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 16 16"
  class={klass}
>
  <path
    fill="currentColor"
    d="M12.56 11.74L10.95 9l-.61-1.05c-.22-.38-.34-.82-.34-1.26V3h.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-5c-.28 0-.5.22-.5.5s.22.5.5.5H6v3.69c0 .44-.12.88-.34 1.26L5.05 9l-1.61 2.74c-.58 1 .14 2.26 1.3 2.26h6.52c1.16 0 1.88-1.26 1.3-2.26"
  />
</svg>
