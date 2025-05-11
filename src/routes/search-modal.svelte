<script lang="ts">
  import { goto } from "$app/navigation";
  import { navigating, page } from "$app/state";
  import Modal from "$components/modal.svelte";
  import XIcon from "$lib/icons/x.svelte";
  import Fuse from "fuse.js";

  let query = $state("");
  let modal: { close: () => void; open: (query?: string | null) => void };

  const fuse = new Fuse(page.data.posts, {
    keys: ["meta.title", "meta.tags", "meta.tagline"],
    threshold: 0.4,
  });

  const filteredPosts = $derived(fuse.search(query).map((p) => p.item));

  export function open(q?: string | null) {
    if (q) query = q;

    modal.open();
  }

  function handleInputKeyDown(
    event: KeyboardEvent & { currentTarget: HTMLInputElement },
  ) {
    if (event.key == "Escape") {
      event.preventDefault();
      modal.close();
    } else if (event.key == "Enter") {
      if (filteredPosts.length) {
        goto(`/blog/${filteredPosts[0].meta.slug}`);
      }
    }
  }

  function handleWindowKeyDown(
    event: KeyboardEvent & { currentTarget: Window },
  ) {
    if (!document.querySelector<HTMLDialogElement>("#search-modal")?.open)
      return;

    const results = document.querySelectorAll("#search-modal-results li");

    if (!results.length) return;

    if (document.querySelector("#query") == document.activeElement) {
      if (event.key == "ArrowUp") {
        event.preventDefault();

        results[results.length - 1].querySelector("a").focus();
      } else if (event.key == "ArrowDown") {
        event.preventDefault();

        results[0].querySelector("a").focus();
      }
    } else {
      const current = [...results].find((result) =>
        result.querySelector("a")?.matches(":focus"),
      );

      if (current) {
        if (event.key == "ArrowUp") {
          event.preventDefault();

          const prev = current.previousElementSibling;

          if (prev) {
            prev.querySelector("a").focus();
          } else {
            document.querySelector("#query").focus();
          }
        } else if (event.key == "ArrowDown") {
          event.preventDefault();

          const next = current.nextElementSibling;

          if (next) {
            next.querySelector("a").focus();
          } else {
            document.querySelector("#query").focus();
          }
        }
      }
    }
  }

  $effect(() => {
    if (navigating.to) modal.close();
  });
</script>

<svelte:window onkeydown={handleWindowKeyDown} />

<Modal onclose={() => (query = "")} bind:this={modal} id="search-modal">
  <div class="flex flex-wrap items-center justify-between">
    <h2>
      search <span class="text-accent-600">blog</span>
    </h2>
    <button
      tabindex="0"
      onclick={() => modal.close()}
      class="ring-on-focus-visible cursor-pointer bg-zinc-200 p-1 text-lg font-bold text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
    >
      <XIcon class="size-6" />
    </button>
  </div>
  <search class="py-3">
    <label for="query" class="sr-only">Query</label>
    <input
      tabindex="0"
      autofocus
      onkeydown={handleInputKeyDown}
      bind:value={query}
      name="query"
      type="search"
      id="query"
      class="input ring-on-focus-visible"
      placeholder="databases"
    />
  </search>
  <ul class="grid gap-3" id="search-modal-results">
    {#each filteredPosts as post}
      <li>
        <a
          tabindex="0"
          href="/blog/{post.meta.slug}"
          class="group ring-on-focus-visible flex flex-wrap items-center justify-between"
        >
          <p class="group-hover:underline">
            <b>
              {post.meta.title}
            </b>
          </p>
          <p class="group-hover:underline">
            {post.meta.publishedOn.toLocaleDateString()} • {post.meta
              .readingTime} min read
          </p>
        </a>
      </li>
    {/each}
  </ul>
  {#if filteredPosts.length}
    <div class="not-hoverable:hidden">
      <br />
      <kbd>&uarr;</kbd>
      <kbd>&darr;</kbd>
    </div>
  {/if}
</Modal>
