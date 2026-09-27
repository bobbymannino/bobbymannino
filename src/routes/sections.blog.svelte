<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { hacker } from "$lib/hacker";
  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";
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
        href={localizeHref(resolve("/blog"))}
        tabindex="-1"
        rel="noopener noreferrer">{m.blog_heading()}</a
      >
    </h1>

    <p>
      {m.blog_intro_before()}
      <a
        href={localizeHref(resolve("/blog"))}
        class="text-accent-600 ring-on-focus-visible hover:underline"
        tabindex="0">{m.blog_intro_link()}</a
      >
      {m.blog_intro_after()}
    </p>

    <div>
      <h4 class="opacity-40">{m.latest_post()}</h4>
      <a
        href={localizeHref(resolve("/blog/[slug]", { slug: latestBlogPost.meta.slug }))}
        class="group ring-on-focus-visible mt-2 block"
      >
        <h3 class="group-hover:underline">{latestBlogPost.meta.title}</h3>
      </a>
    </div>
  </div>
</section>
