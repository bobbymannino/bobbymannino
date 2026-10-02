<script lang="ts">
  import type { Component } from "svelte";
  import { MoonIcon, SunIcon, ThemeIcon } from "#lib/icons.js";
  import { m } from "#lib/paraglide/messages.js";

  type Theme = "light" | "dark" | "system";

  type Option = {
    value: Theme;
    label: string;
    icon: Component;
  };

  const options: Option[] = [
    { value: "light", label: m.theme_light(), icon: SunIcon },
    { value: "dark", label: m.theme_dark(), icon: MoonIcon },
    { value: "system", label: m.theme_system(), icon: ThemeIcon },
  ];

  let theme: Theme = $state("system");

  function applyTheme(next: Theme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = next === "dark" || (next === "system" && prefersDark);
    const toggle = () => document.documentElement.classList.toggle("dark", isDark);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

<fieldset class="flex items-center gap-1 bg-zinc-100 p-1 dark:bg-zinc-800" aria-label={m.theme()}>
  <legend class="sr-only">{m.theme()}</legend>
  {#each options as { value, label, icon: Icon } (value)}
    <label
      class="ring-on-has-focus-visible has-checked:bg-accent-600 flex cursor-pointer items-center gap-1 px-2 py-1 text-sm text-zinc-700 hover:opacity-70 has-checked:text-white dark:text-zinc-300"
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
