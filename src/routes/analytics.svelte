<script lang="ts">
  import { dev } from "$app/environment";
</script>

<svelte:head>
  {#if !dev}
    <script
      src="https://tracking.bobman.dev/api/script.js"
      data-site-id="1"
      defer
    ></script>
  {/if}
</svelte:head>
