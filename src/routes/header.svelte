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
    { func: () => openSearchModal(), icon: SearchIcon },
  ];
</script>

<header class="sticky top-0 z-10 bg-white dark:bg-zinc-900">
  <div
    class="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
  >
    <a
      href="#main-content"
      class="bg-accent-600 absolute z-50 px-2 py-1 text-white not-focus:pointer-events-none not-focus:opacity-0"
      >Skip to main content</a
    >
    <Logo />
    <nav>
      <ul class="flex flex-wrap items-stretch">
        {#each links as link}
          <li>
            {#if !!link["func"]}
              <button
                onclick={() => link.func()}
                class="after:bg-accent-600 relative isolate block size-8 cursor-pointer overflow-hidden p-2 text-zinc-800 transition-colors after:absolute after:inset-0 after:-z-10 after:origin-bottom after:scale-y-0 after:transition-transform after:content-[''] hover:text-white hover:after:origin-top hover:after:scale-y-100 dark:text-zinc-100"
              >
                <link.icon class="size-4" />
              </button>
            {:else}
              <a
                href={link.href}
                class="after:bg-accent-600 relative isolate block overflow-hidden px-3 py-1 text-zinc-800 transition-colors after:absolute after:inset-0 after:-z-10 after:origin-bottom after:scale-y-0 after:transition-transform after:content-[''] hover:text-white hover:after:origin-top hover:after:scale-y-100 dark:text-zinc-100"
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
