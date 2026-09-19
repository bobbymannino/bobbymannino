<script lang="ts">
  import { HeartIcon, LoadingIcon } from "$lib/icons";
  import { getPostLikeStatus, updatePostLike } from "$lib/post-likes.remote";
  import { onMount } from "svelte";

  type Props = {
    slug: string;
  };

  let { slug }: Props = $props();

  let count = $state<number | null>(null);
  let liked = $state(false);
  let loading = $state(true);
  let errorMessage = $state("");

  onMount(() => {
    let mounted = true;

    getPostLikeStatus({ slug })
      .then((status) => {
        if (!mounted) return;
        count = status.count;
        liked = status.liked;
      })
      .catch(() => {
        if (mounted) errorMessage = "Likes are unavailable right now";
      })
      .finally(() => {
        if (mounted) loading = false;
      });

    return () => {
      mounted = false;
    };
  });

  async function toggleLike() {
    if (loading || updatePostLike.pending) return;

    errorMessage = "";

    try {
      const status = await updatePostLike({ slug, liked: !liked });
      count = status.count;
      liked = status.liked;
    } catch {
      errorMessage = "Couldn't update your like";
    }
  }
</script>

<div class="inline-flex items-center gap-1">
  <button
    class="ring-on-focus-visible hover:text-accent-600 active:text-accent-700 inline-flex cursor-pointer items-center gap-1 active:scale-95 disabled:cursor-wait disabled:opacity-60"
    class:text-accent-600={liked}
    type="button"
    onclick={toggleLike}
    disabled={loading || updatePostLike.pending > 0}
    aria-pressed={liked}
    aria-label={liked ? "Unlike this post" : "Like this post"}
    title={liked ? "Unlike this post" : "Like this post"}
  >
    {#if updatePostLike.pending > 0}
      <LoadingIcon class="size-5 animate-spin" />
    {:else}
      <HeartIcon class="size-5" />
    {/if}
    <span>{liked ? "Liked" : "Like"}{count === null ? "" : ` (${count})`}</span>
  </button>
  {#if errorMessage}
    <span class="sr-only" role="status">{errorMessage}</span>
  {/if}
</div>
