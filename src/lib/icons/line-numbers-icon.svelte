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
    d="M3 10H7V14H3V10ZM3 6H7V8H3V6ZM3 16H7V18H3V16ZM9 10H21V14H9V10ZM9 6H21V8H9V6ZM9 16H21V18H9V16Z"
    fill="currentColor"
  />
</svg>
