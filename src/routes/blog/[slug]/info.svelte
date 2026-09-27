<script lang="ts">
  import { URL as URLS } from "$app/env/public";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import PostLikeButton from "$components/post-like-button.svelte";
  import { CalendarIcon, CheckIcon, ClockIcon, DuplicateIcon, ShareIcon } from "$lib/icons";
  import { m } from "$lib/paraglide/messages";
  import { getLocale, localizeHref } from "$lib/paraglide/runtime";
  import { getSeries } from "$lib/posts/series";

  type Post = App.PageData["posts"][number];

  type Props = {
    post: Post;
  };

  let { post }: Props = $props();

  const URL = URLS.split(",")[0];

  const series = $derived(post.meta.series ? getSeries(post.meta.series) : null);

  const canShare = $derived(typeof navigator !== "undefined" && "share" in navigator);

  let copied = $state(false);

  async function share() {
    const url = URL + page.url.pathname;

    const payload = {
      title: post.meta.title,
      text: post.meta.tagline,
      url,
    };

    if (canShare) {
      try {
        await navigator.share(payload);
      } catch {
        // User cancelled or error occurred
      }
    } else {
      await navigator.clipboard.writeText(url);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    }
  }
</script>

<div class="space-y-3">
  {#if series}
    <a
      href={localizeHref(resolve("/blog/series/[slug]", { slug: series.slug }))}
      tabindex="0"
      class="bg-accent-600 ring-on-focus-visible hover:bg-accent-700 inline-block w-fit px-2 py-1 text-sm text-white focus-visible:ring-offset-2 active:scale-95"
    >
      {m.part_of_series({ series: series.title })}
    </a>
  {/if}

  <div class="flex flex-wrap items-center justify-between gap-2">
    <ul class="flex flex-wrap gap-2">
      {#each post.meta.tags.sort((a, b) => a.localeCompare(b)) as tag}
        <li>
          <p>
            <a
              rel="noopener noreferrer"
              tabindex="0"
              style:--vtn="post-{post.meta.slug}-tags-{tag}"
              href={localizeHref(`/blog/tags/${tag.replace(/\//g, "-")}`)}
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
          aria-label={m.published_on()}
          class="inline-flex items-center gap-1"
          datetime={post.meta.publishedOn.toISOString().slice(0, 10)}
        >
          <CalendarIcon class="size-5" />
          {post.meta.publishedOn?.toLocaleDateString(getLocale(), { dateStyle: "medium" })}
          •
        </time>
        <span aria-label={m.reading_duration()} class="inline-flex items-center gap-1">
          <ClockIcon class="size-5" />
          {m.minutes_short({ minutes: post.meta.readingTime })} •
        </span>
      </span>
      <span class="inline-flex items-center gap-1">
        <PostLikeButton slug={post.meta.slug} />
        •
      </span>
      <button
        class="ring-on-focus-visible hover:text-accent-600 active:text-accent-700 inline-flex cursor-pointer items-center gap-1 active:scale-95"
        onclick={share}
        tabindex="0"
        title={m.share_this_post()}
      >
        {#if canShare}
          <ShareIcon class="size-5" />
          <span>{m.share()}</span>
        {:else if copied}
          <CheckIcon class="size-5" />
          <span>{m.copied()}</span>
        {:else}
          <DuplicateIcon class="size-5" />
          <span>{m.copy()}</span>
        {/if}
      </button>
    </div>
  </div>
</div>
