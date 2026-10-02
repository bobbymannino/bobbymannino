<script lang="ts">
  import { onMount } from "svelte";
  import { textToId } from "#lib/headings.js";
  import { HeartIcon } from "#lib/icons.js";
  import { m } from "#lib/paraglide/messages.js";
  import { getLocale, localizeHref } from "#lib/paraglide/runtime.js";
  import { getPostLikeCount } from "#lib/post-likes.remote.js";
  import type { PostMeta } from "#lib/posts/index.js";

  type Props = PostMeta;

  let { meta }: Props = $props();
  let likeCount = $state<number | null>(null);

  onMount(() => {
    let mounted = true;

    getPostLikeCount({ slug: meta.slug })
      .then((count) => {
        if (mounted) likeCount = count;
      })
      .catch(() => {
        if (mounted) likeCount = null;
      });

    return () => {
      mounted = false;
    };
  });
</script>

<a href={localizeHref(`/blog/${meta.slug}`)} tabindex="0" class="group ring-on-focus-visible @container block">
  <div class="flex-wrap items-start justify-between @lg:flex">
    <h2 class="group-hover:underline" style:--vtn="post-title-{textToId(meta.title)}">
      {meta.title}
    </h2>
    <p style:--vtn="post-{meta.slug}-meta">
      <small class="inline-flex items-center gap-1">
        {meta.publishedOn?.toLocaleDateString(getLocale())} • {m.min_read({ minutes: meta.readingTime })} •
        <HeartIcon class="size-4" />
        {likeCount ?? "…"}
      </small>
    </p>
  </div>

  <div class="flex-wrap items-end justify-between @lg:flex">
    <p>{meta.tagline}</p>
    <ul class="flex flex-wrap gap-1" aria-label={m.blog_post_tags()}>
      {#each meta.tags as tag}
        <li>
          <p class="text-accent-600" style:--vtn="post-{meta.slug}-tags-{tag}">
            <small>
              #{tag}
            </small>
          </p>
        </li>
      {/each}
    </ul>
  </div>
</a>
