<script lang="ts">
  import { browser } from "$app/environment";
  import GithubIcon from "$lib/icons/github.svelte";

  const cmdOrCtrl = $derived(
    browser && navigator.platform.includes("Mac") ? "⌘" : "Ctrl",
  );
</script>

<footer class="bg-white dark:bg-zinc-900">
  <div class="wrap container flex items-center justify-between">
    <div class="flex items-center gap-2">
      <a
        target="_blank"
        href="https://www.github.com/bobbymannino/bobbymannino"
        class="hover:text-accent-600 text-zinc-800 dark:text-zinc-100"
        title="See this repo on GitHub"
      >
        <GithubIcon class="size-6" />
      </a>
      <p>
        <small>&copy; bobman.dev 2024</small>
      </p>
    </div>
    <div class="not-hoverable:hidden">
      <kbd>{cmdOrCtrl}</kbd>
      <kbd>K</kbd>
    </div>
  </div>
</footer>
