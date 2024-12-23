<script lang="ts">
  import { hacker } from "$lib/hacker";
  import { inview } from "svelte-inview";
</script>

<section class="container" id="about">
  <div class="card">
    <h1
      use:inview
      on:inview_enter={(e) => {
        const clean = hacker(e.detail.node);
        return () => clean();
      }}
    >
      about bob
    </h1>

    <br />
    <enhanced:img
      src="$lib/images/lego-me.png"
      alt="Bobby Mannino"
      class="w-32"
    />

    <p>
      hey, im bob, i study software engineering in a university in the south of
      england. im 20 years old and absolutely in love with programming. my goal
      is to get a placement year in university and then when the time comes to
      graduate i can call upon the experience to help me land a job
    </p>

    <p>
      for now i spend my spare time making mini projects and improving my
      skills. the current project im working on is a gym tracker. it will be
      able to track your workouts, create routines and give you statistics on
      how you are doing
    </p>
  </div>
</section>
