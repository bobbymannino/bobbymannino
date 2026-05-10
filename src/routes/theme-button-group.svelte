<script lang="ts">
  import MoonIcon from "$lib/icons/moon-icon.svelte";
  import SunIcon from "$lib/icons/sun-icon.svelte";
  import ThemeIcon from "$lib/icons/theme-icon.svelte";
  import type { Component } from "svelte";

  type Theme = "light" | "dark" | "system";

  type Option = {
    value: Theme;
    label: string;
    icon: Component;
  };

  const options: Option[] = [
    { value: "light", label: "Light", icon: SunIcon },
    { value: "dark", label: "Dark", icon: MoonIcon },
    { value: "system", label: "System", icon: ThemeIcon },
  ];

  let theme: Theme = $state("system");

  function applyTheme(next: Theme) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = next === "dark" || (next === "system" && prefersDark);
    const toggle = () =>
      document.documentElement.classList.toggle("dark", isDark);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !document.startViewTransition) {
      toggle();
      return;
    }

    document.startViewTransition(toggle);
  }

  function selectTheme(next: Theme) {
    theme = next;
    if (next === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", next);
    applyTheme(next);
  }

  $effect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    theme = stored === "light" || stored === "dark" ? stored : "system";

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") applyTheme("system");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  });
</script>

<fieldset
  class="flex items-center gap-1 bg-zinc-100 p-1 dark:bg-zinc-800"
  aria-label="Theme"
>
  <legend class="sr-only">Theme</legend>
  {#each options as { value, label, icon: Icon } (value)}
    <label
      class="ring-on-has-focus-visible has-checked:bg-accent-600 has-checked:text-white flex cursor-pointer items-center gap-1 px-2 py-1 text-sm text-zinc-700 hover:opacity-70 dark:text-zinc-300"
      title={label}
    >
      <input
        type="radio"
        name="theme"
        {value}
        class="sr-only"
        checked={theme === value}
        onchange={() => selectTheme(value)}
      />
      <Icon class="size-4" />
      <span>{label}</span>
    </label>
  {/each}
</fieldset>
