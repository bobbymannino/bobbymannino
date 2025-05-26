<script lang="ts">
  import { browser } from "$app/environment";
  import EnvelopeIcon from "$lib/icons/envelope-icon.svelte";
  import GithubIcon from "$lib/icons/github.svelte";
  import LinkedinIcon from "$lib/icons/linkedin-icon.svelte";

  const cmdOrCtrl = $derived(
    browser && navigator.platform.includes("Mac") ? "⌘" : "Ctrl",
  );
</script>

<footer class="bg-white dark:bg-zinc-900">
  <div class="wrap container flex items-center justify-between">
    <div class="flex items-center gap-2">
      <a
        tabindex="0"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.github.com/bobbymannino/bobbymannino"
        class="hover:text-accent-600 ring-on-focus-visible text-zinc-800 dark:text-zinc-100"
        title="See this repo on GitHub"
      >
        <GithubIcon class="size-6" />
      </a>
      <a
        tabindex="0"
        target="_blank"
        href="mailto:manninobobby@icloud.com"
        class="hover:text-accent-600 ring-on-focus-visible text-zinc-800 dark:text-zinc-100"
        title="Email me"
      >
        <EnvelopeIcon class="size-6" />
      </a>
      <a
        tabindex="0"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/bobbymannino"
        class="hover:text-accent-600 ring-on-focus-visible text-zinc-800 dark:text-zinc-100"
        title="See me on LinkedIn"
      >
        <LinkedinIcon class="size-6" />
      </a>
      <p>
        <small>&copy; bobman.dev {new Date().getFullYear()}</small>
      </p>
    </div>
    <div class="not-hoverable:hidden">
      <kbd>{cmdOrCtrl}</kbd>
      <kbd>K</kbd>
    </div>
  </div>
</footer>
