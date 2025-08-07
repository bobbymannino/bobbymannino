<script lang="ts">
  import { hacker } from "$lib/hacker";
  import { inview } from "svelte-inview";
</script>

<section class="container" id="about">
  <div class="card group/highlight">
    <h1
      use:inview={{ unobserveOnEnter: true }}
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean?.();
      }}
    >
      about bob
    </h1>

    <enhanced:img
      src="$lib/images/lego-me.png?w=256"
      alt="Bobby Mannino"
      loading="eager"
      fetchpriority="high"
      class="mt-4 size-32"
    />

    <p>
      hey, <span class="highlight">im <b>bob</b></span>, i study software
      engineering in a university in the south of england. i am
      <span class="highlight group-hover/highlight:delay-200">21 years old</span
      >
      and absolutely
      <span class="highlight group-hover/highlight:delay-400"
        >love programming!</span
      > my goal is spend this academic year learning the most out of my placement
      so when the time comes (post uni) i am prepared to get a fulltime job
    </p>

    <p>
      for now i spend my spare time making mini projects and improving my
      skills. the current project im working on is an online bingo project using
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://svelte.dev/docs/kit">sveltekit</a
      >
      as the frontend and
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.rust-lang.org">rust</a
      > as the backend
    </p>
  </div>
</section>
