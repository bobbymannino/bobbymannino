<script lang="ts">
  import Modal from "$components/modal.svelte";
  import { navigating, page } from "$app/state";
  import { goto } from "$app/navigation";
  import XIcon from "$lib/icons/x.svelte";

  let query = $state("");
  let modal: { close: () => void; open: () => void };

  const filteredPosts = $derived.by(() => {
    if (!query.trim()) return [];

    return page.data.posts.filter((p) => {
      const exp = new RegExp(query.trim(), "i");
      return (
        exp.test(p.meta.title) ||
        exp.test(p.meta.tagline) ||
        exp.test(p.meta.tags.join(" "))
      );
    });
  });

  export function open() {
    modal.open();
  }

  function handleKeyPress(
    event: KeyboardEvent & { currentTarget: HTMLInputElement },
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.currentTarget.blur();
    }

    if (event.key === "Enter") {
      if (filteredPosts.length) {
        goto(`/blog/${filteredPosts[0].meta.slug}`);
      }
    }
  }

  $effect(() => {
    if (!!navigating.to) modal.close();
  });
</script>

<Modal onclose={() => (query = "")} bind:this={modal}>
  <div class="flex flex-wrap items-center justify-between">
    <h2>search <span class="text-accent-600">blog</span></h2>
    <button
      onclick={() => modal.close()}
      class="cursor-pointer bg-zinc-200 p-1 text-lg font-bold text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
    >
      <XIcon class="size-6" />
    </button>
  </div>
  <search class="py-3">
    <label for="query" class="sr-only">Query</label>
    <input
      autofocus
      onkeydown={handleKeyPress}
      bind:value={query}
      name="query"
      type="search"
      id="query"
      class="input"
      placeholder="databases"
    />
  </search>
  <ul class="grid gap-3">
    {#each filteredPosts as post}
      <li>
        <a
          href="/blog/{post.meta.slug}"
          class="group flex flex-wrap items-center justify-between"
        >
          <p class="group-hover:underline">
            <b>
              {post.meta.title}
            </b>
          </p>
          <p class="group-hover:underline">
            {post.meta.publishedOn.toLocaleDateString()}
          </p>
        </a>
      </li>
    {/each}
  </ul>
</Modal>
