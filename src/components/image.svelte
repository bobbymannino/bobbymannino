<script lang="ts">
  import LoaderIcon from "$lib/icons/loader.svelte";
  import PictureCrossedOutIcon from "$lib/icons/picture-crossed-out.svelte";
  import { useIntersectionObserver } from "runed";

  type Props = {
    src: string;
    alt?: string;
    class?: App.Clsx;
  };

  let { src, alt, class: klass }: Props = $props();

  let target: HTMLDivElement | undefined = $state();
  let isIntersecting = $state(false);

  async function loadImage() {
    const res = await fetch(src!);
    if (!res.ok) throw new Error("Failed to get img src");

    const blob = await res.blob();

    return URL.createObjectURL(blob);
  }

  const observer = useIntersectionObserver(
    () => target,
    (entries) => {
      const entry = entries[0];
      if (!entry) return;

      if (entry.isIntersecting) {
        isIntersecting = entry.isIntersecting;
        observer.stop();
      }
    },
  );
</script>

<div class="w-full" bind:this={target}>
  {#if isIntersecting}
    {#await loadImage()}
      {@render loading()}
    {:then src}
      <img {src} {alt} class={["w-full", klass]} />
    {:catch error}
      <div
        class={["flex-center w-full bg-gray-200", klass]}
        aria-label="Failed to load image"
      >
        <PictureCrossedOutIcon />
      </div>
    {/await}
  {:else}
    {@render loading()}
  {/if}
</div>

{#snippet loading()}
  <div
    class={["flex-center w-full animate-pulse bg-gray-200", klass]}
    aria-busy="true"
    aria-label="Loading image..."
  >
    <LoaderIcon class="animate-spin" />
  </div>
{/snippet}
