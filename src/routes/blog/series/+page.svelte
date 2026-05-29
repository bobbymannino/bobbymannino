<script lang="ts">
  import { resolve } from "$app/paths";
  import Meta from "$components/meta.svelte";
  import { series } from "$lib/posts/series";
</script>

<Meta title="Blog Series | Bobby Mannino" description="Read my blog series" />

<section class="container" id="series">
  <div class="card">
    <h1>series</h1>

    <ul class="space-y-4">
      {#each series as { title, slug, description } (slug)}
        <li>
          <h3>
            <a
              href={resolve("/blog/series/[slug]", { slug })}
              tabindex="0"
              class="ring-on-focus-visible hover:underline"
            >
              {title}
            </a>
          </h3>
          <p>{description}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>
