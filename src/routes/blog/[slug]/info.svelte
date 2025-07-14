<script lang="ts">
  import { page } from "$app/state";
  import { PUBLIC_URL } from "$env/static/public";
  import CalendarIcon from "$lib/icons/calendar-icon.svelte";
  import ClockIcon from "$lib/icons/clock-icon.svelte";
  import ShareIcon from "$lib/icons/share-icon.svelte";

  type Post = App.PageData["posts"][number];

  type Props = {
    post: Post;
  };

  let { post }: Props = $props();

  async function share() {
    const url = PUBLIC_URL + page.url.pathname;

    const payload = {
      title: post.meta.title,
      text: post.meta.tagline,
      url,
    };

    try {
      await navigator.share(payload);
    } catch {
      await navigator.clipboard.writeText(url);
    }
  }
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
  <ul class="flex flex-wrap gap-2">
    {#each post.meta.tags as tag}
      <li>
        <p>
          <a
            rel="noopener noreferrer"
            tabindex="0"
            style:--vtn="post-{post.meta.slug}-tags-{tag}"
            href="/blog?tags={tag}"
            class="text-accent-600 ring-on-focus-visible active:text-accent-700 inline-block hover:underline active:scale-95"
          >
            #{tag}
          </a>
        </p>
      </li>
    {/each}
  </ul>
  <div class="flex items-center gap-2 text-zinc-500">
    <span style:--vtn="post-{post.meta.slug}-meta">
      <time
        title={post.meta.publishedOn.toUTCString()}
        aria-label="Published on"
        class="inline-flex items-center gap-1"
        datetime="{post.meta.publishedOn.getFullYear()}-{(
          post.meta.publishedOn.getMonth() + 1
        )
          .toFixed()
          .padStart(2, '0')}-{post.meta.publishedOn
          .getDate()
          .toFixed()
          .padStart(2, '0')}"
      >
        <CalendarIcon class="size-5" />
        {post.meta.publishedOn?.toDateString()}
        •
      </time>
      <span
        aria-label="Reading duration"
        class="inline-flex items-center gap-1"
      >
        <ClockIcon class="size-5" />
        {post.meta.readingTime} min •
      </span>
    </span>
    <button
      class="hover:text-accent-600 ring-on-focus-visible active:text-accent-700 inline-flex cursor-pointer items-center gap-1 active:scale-95"
      onclick={share}
      tabindex="0"
    >
      <ShareIcon class="size-5" />
      <span>Share</span>
    </button>
  </div>
</div>
