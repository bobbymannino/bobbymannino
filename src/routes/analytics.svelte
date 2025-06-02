<script lang="ts">
  import { dev } from "$app/environment";
</script>

<svelte:head>
  {#if !dev}
    <script
      defer
      data-domain="bobman.dev"
      src="https://tracking.bobman.dev/js/script.js"
    ></script>
  {/if}
</svelte:head>
