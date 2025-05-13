<script lang="ts">
  import ChevronLeftIcon from "$lib/icons/chevron-left-icon.svelte";
  import ChevronRightIcon from "$lib/icons/chevron-right-icon.svelte";

  type Post = App.PageData["posts"][number];

  type Props = { prevPost: Post | null; nextPost: Post | null };

  let { prevPost, nextPost }: Props = $props();
</script>

{#if prevPost || nextPost}
  <hr />
{/if}

{#if nextPost}
  <a
    class="active:text-accent-700 text-accent-600 ring-on-focus-visible group flex cursor-pointer items-center gap-2 bg-white p-1 hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
    tabindex="0"
    href="/blog/{nextPost.meta.slug}"
    rel="noreferrer noopener"
  >
    <ChevronLeftIcon
      class="size-6 translate-x-2 transition-transform group-hover:translate-x-0"
    />
    <span>{nextPost.meta.title}</span>
  </a>
{/if}
{#if prevPost}
  <a
    class="active:text-accent-700 text-accent-600 ring-on-focus-visible group flex cursor-pointer items-center justify-end gap-2 bg-white p-1 hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
    tabindex="0"
    href="/blog/{prevPost.meta.slug}"
    rel="noreferrer noopener"
  >
    <span>{prevPost.meta.title}</span>
    <ChevronRightIcon
      class="size-6 transition-transform not-motion-reduce:-translate-x-2 group-hover:translate-x-0"
    />
  </a>
{/if}
