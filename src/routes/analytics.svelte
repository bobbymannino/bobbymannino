<script lang="ts">
  import { dev } from "$app/environment";
</script>

<svelte:head>
  {#if !dev}
    <script
      defer
      src="https://analytics.bobman.dev/script.js"
      data-website-id="fce882d9-9d6c-4d56-bdca-961f6fe56745"
    ></script>
  {/if}
</svelte:head>
