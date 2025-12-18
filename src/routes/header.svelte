<script lang="ts">
  import Logo from "./logo.svelte";
  import SearchIcon from "$lib/icons/search.svelte";

  type Props = {
    openSearchModal: () => void;
  };

  let { openSearchModal }: Props = $props();

  const links = [
    { href: "/#about", text: "about" },
    { href: "/blog", text: "blog" },
    { href: "/#technologies", text: "technologies" },
    { href: "/#projects", text: "projects" },
    { href: "/#contact", text: "contact" },
    { func: () => openSearchModal(), icon: SearchIcon, text: "Search" },
  ];
</script>

<header
  class="sticky top-0 z-10 border-b border-zinc-200 bg-white dark:border-zinc-950 dark:bg-zinc-900"
>
  <div
    class="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
  >
    <a
      tabindex="0"
      href="#main-content"
      class="bg-accent-600 ring-on-focus-visible absolute z-50 px-2 py-1 text-white not-focus-visible:pointer-events-none not-focus-visible:opacity-0"
      >Skip to main content</a
    >
    <Logo />
    <nav>
      <ul class="flex flex-wrap items-stretch">
        {#each links as link}
          <li>
            {#if "func" in link}
              <button
                tabindex="0"
                onclick={() => link.func?.()}
                class="ring-on-focus-visible after:bg-accent-600 relative isolate block size-8 cursor-pointer overflow-hidden p-2 text-zinc-800 not-motion-reduce:transition-colors after:absolute after:inset-0 after:-z-10 after:origin-bottom after:scale-y-0 after:content-[''] not-motion-reduce:after:transition-transform hover:text-white hover:after:origin-top hover:after:scale-y-100 dark:text-zinc-100"
              >
                <span class="sr-only">{link.text}</span>
                <link.icon class="size-4" />
              </button>
            {:else}
              <a
                tabindex="0"
                href={link.href}
                class="ring-on-focus-visible after:bg-accent-600 relative isolate block overflow-hidden px-3 py-1 text-zinc-800 not-motion-reduce:transition-colors after:absolute after:inset-0 after:-z-10 after:origin-bottom after:scale-y-0 after:content-[''] not-motion-reduce:after:transition-transform hover:text-white hover:after:origin-top hover:after:scale-y-100 dark:text-zinc-100"
              >
                {link.text}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>
