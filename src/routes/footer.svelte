<script lang="ts">
  import { browser } from "$app/env";
  import { formatDateRelative } from "$lib/date-utils";
  import { socials } from "$lib/socials";
  import ThemeButtonGroup from "./theme-button-group.svelte";

  const cmdOrCtrl = $derived(browser && navigator.platform.startsWith("Mac") ? "⌘" : "Ctrl");
  const builtAt = new Date(__BUILD_DATE__);
</script>

<footer class="bg-white dark:bg-zinc-900">
  <div class="wrap container flex flex-wrap items-center justify-between gap-4">
    <div class="flex items-center gap-2">
      {#each socials as { href, icon: Icon, title }}
        <a
          tabindex="0"
          target="_blank"
          rel="noopener noreferrer"
          class="ring-on-focus-visible hover:text-accent-600 text-zinc-800 dark:text-zinc-100"
          {href}
          {title}
        >
          <Icon class="size-6" />
        </a>
      {/each}
      <p>
        <small>&copy; bobman.dev {new Date().getFullYear()}</small>
      </p>
    </div>
    <ThemeButtonGroup />
    <div class="flex items-center gap-4">
      <small class="text-zinc-500 dark:text-zinc-400" title="{builtAt.toUTCString()} ({formatDateRelative(builtAt)})">
        Built {builtAt.toLocaleDateString()} {builtAt.toLocaleTimeString()}
      </small>
      <div class="not-hoverable:hidden">
        <kbd>{cmdOrCtrl}</kbd>
        <kbd>K</kbd>
      </div>
    </div>
  </div>
</footer>
