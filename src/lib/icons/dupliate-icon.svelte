<script lang="ts">
  type Props = { class?: App.Clsx };

  let { class: klass }: Props = $props();
</script>

<svg
  class={klass}
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M8 8V5.25C8 3.45508 9.45507 2 11.25 2H18.75C20.5449 2 22 3.45507 22 5.25V12.75C22 14.5449 20.5449 16 18.75 16H16V18.75C16 20.5449 14.5449 22 12.75 22H5.25C3.45507 22 2 20.5449 2 18.75V11.25C2 9.45508 3.45507 8 5.25 8H8ZM11.25 16C9.45507 16 8 14.5449 8 12.75V10H5.25C4.55964 10 4 10.5596 4 11.25V18.75C4 19.4404 4.55964 20 5.25 20H12.75C13.4404 20 14 19.4404 14 18.75V16H11.25Z"
    fill="currentColor"
  />
</svg>
