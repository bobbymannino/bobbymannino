<script lang="ts">
  import { textToId } from "$lib/headings";
  import { HeartIcon } from "$lib/icons";
  import { getPostLikeCount } from "$lib/post-likes.remote";
  import type { PostMeta } from "$lib/posts";
  import { onMount } from "svelte";

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

<a href="/blog/{meta.slug}" tabindex="0" class="group ring-on-focus-visible @container block">
  <div class="flex-wrap items-start justify-between @lg:flex">
    <h2 class="group-hover:underline" style:--vtn="post-title-{textToId(meta.title)}">
      {meta.title}
    </h2>
    <p style:--vtn="post-{meta.slug}-meta">
      <small class="inline-flex items-center gap-1">
        {meta.publishedOn?.toLocaleDateString()} • {meta.readingTime} min read •
        <HeartIcon class="size-4" />
        {likeCount ?? "…"}
      </small>
    </p>
  </div>

  <div class="flex-wrap items-end justify-between @lg:flex">
    <p>{meta.tagline}</p>
    <ul class="flex flex-wrap gap-1" aria-label="Blog post tags">
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
