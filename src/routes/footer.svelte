<script lang="ts">
  import { browser } from "$app/environment";
  import { socials } from "$lib/socials";

  const cmdOrCtrl = $derived(
    browser && navigator.platform.includes("Mac") ? "⌘" : "Ctrl",
  );
</script>

<footer class="bg-white dark:bg-zinc-900">
  <div class="wrap container flex items-center justify-between">
    <div class="flex items-center gap-2">
      {#each socials as { href, icon: Icon, title }}
        <a
          tabindex="0"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-accent-600 ring-on-focus-visible text-zinc-800 dark:text-zinc-100"
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
    <div class="not-hoverable:hidden">
      <kbd>{cmdOrCtrl}</kbd>
      <kbd>K</kbd>
    </div>
  </div>
</footer>
