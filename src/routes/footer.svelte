<script lang="ts">
  import { browser } from "$app/environment";

  const cmdOrCtrl = $derived(
    browser && navigator.platform.includes("Mac") ? "⌘" : "Ctrl",
  );
</script>

<footer class="bg-white dark:bg-zinc-900">
  <div class="wrap container flex items-center justify-between">
    <p>
      <small>&copy; bobman.dev 2024</small>
    </p>
    <div>
      <kbd>{cmdOrCtrl}</kbd>
      <kbd>K</kbd>
    </div>
  </div>
</footer>
