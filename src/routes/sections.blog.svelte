<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { hacker } from "$lib/hacker";
  import { inview } from "svelte-inview";

  const latestBlogPost = page.data.posts[0];
</script>

<section class="container" id="blog">
  <div class="card">
    <h1>
      <a
        use:inview={{ unobserveOnEnter: true }}
        on:inview_enter={(e) => {
          const clean = hacker(e.detail.node);
          return () => clean?.();
        }}
        href={resolve("/blog")}
        tabindex="-1"
        rel="noopener noreferrer">blog</a
      >
    </h1>

    <p>
      i also keep a <a
        href={resolve("/blog")}
        class="text-accent-600 ring-on-focus-visible hover:underline"
        tabindex="0">blog</a
      > for things or projects that have interested me, to me its like a notebook
      of sorts, written in such a way that i can understand and revise quicker then
      i could reading somebody elses blog.
    </p>

    <div>
      <h4 class="opacity-40">Latest Post</h4>
      <a
        href={resolve("/blog/[slug]", { slug:latestBlogPost.meta.slug })}
        class="ring-on-focus-visible group mt-2 block"
      >
        <h3 class="group-hover:underline">{latestBlogPost.meta.title}</h3>
      </a>
    </div>
  </div>
</section>
