<script lang="ts">
  import { scramble } from "$lib/actions/scramble";
  import { socials } from "$lib/socials";
</script>

<section class="container" id="contact">
  <div class="card">
    <h1 use:scramble>contact</h1>

    <ul class="flex flex-wrap gap-4">
      {#each socials as { platform, href }}
        <li>
          <h2>
            <a {href} target="_blank" class="ring-on-focus-visible hover:underline" tabindex="0">
              #{platform}
            </a>
          </h2>
        </li>
      {/each}
    </ul>
  </div>
</section>
