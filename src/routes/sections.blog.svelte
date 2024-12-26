<script lang="ts">
  import { hacker } from "$lib/hacker";
  import { inview } from "svelte-inview";
</script>

<section class="container" id="blog">
  <div class="card">
    <h1
      use:inview
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean();
      }}
    >
      blog
    </h1>

    <p>
      i also keep a <a href="/blog" class="text-accent-600 hover:underline"
        >blog</a
      > for things or projects that have interested me, to me its like a notebook
      of sorts, written in such a way that i can understand and revise quicker then
      i could reading somebody elses blog.
    </p>
  </div>
</section>
