<script lang="ts">
  import type { Post } from "$lib/posts";

  type Props = Post;

  let { meta }: Props = $props();
</script>

<a
  href="/blog/{meta.slug}"
  tabindex="0"
  class="group ring-on-focus-visible @container block"
>
  <div class="flex-wrap items-start justify-between @lg:flex">
    <h2 class="group-hover:underline">{meta.title}</h2>
    <p>
      <small>
        {meta.publishedOn.toLocaleDateString()}
      </small>
    </p>
  </div>

  <div class="flex-wrap items-end justify-between @lg:flex">
    <p>{meta.tagline}</p>
    <ul class="flex flex-wrap gap-1" aria-label="Blog post tags">
      {#each meta.tags as tag}
        <li>
          <p class="text-accent-600">
            <small>
              #{tag}
            </small>
          </p>
        </li>
      {/each}
    </ul>
  </div>
</a>
