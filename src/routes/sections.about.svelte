<script lang="ts">
  import { scramble } from "$lib/actions/scramble";
</script>

<section class="container" id="about">
  <div class="group/highlight card">
    <h1 use:scramble>about bob</h1>

    <enhanced:img
      src="$lib/images/lego-me.png?w=256"
      alt="Bobby Mannino"
      loading="eager"
      fetchpriority="high"
      class="mt-4 size-32"
    />

    <p>
      hey, <span class="motion-safe:highlight">im <b>bob</b></span>, i study software engineering in a university in the
      south of england. i am
      <span class="motion-safe:highlight group-hover/highlight:delay-200">22 years old</span>
      and absolutely
      <span class="motion-safe:highlight group-hover/highlight:delay-400">love programming!</span> my goal is spend this academic
      year learning the most out of my placement so when the time comes (post uni) i am prepared to get a fulltime job
    </p>

    <p>
      for now i spend my spare time making mini projects and improving my skills. the current project im working on is
      called <a target="_blank" rel="noopener noreferrer" href="https://github.com/bobbymannino/sapere">Sapere</a>, it
      is aimed at being something i can and will use in my daily life to track projects, issues and store documents
    </p>
  </div>
</section>
