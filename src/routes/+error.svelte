<script lang="ts">
  import { page } from "$app/state";
  import Meta from "$components/meta.svelte";
</script>

<Meta
  title="Error {page.status} | Bobby Mannino"
  description="Something has gone wrong"
/>

<div class="container">
  <div class="card">
    <h1>Oh No :(</h1>

    <p>
      It seems we've encountered an error. Try refreshing the page or head <a
        href="/"
        tabindex="0"
        class="text-accent-600 hover:underline">home</a
      >.
    </p>
  </div>
</div>
