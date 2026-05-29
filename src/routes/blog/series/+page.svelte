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
          <a
            href={resolve("/blog/series/[slug]", { slug })}
            tabindex="0"
            class="ring-on-focus-visible block hover:underline"
          >
            <h3>
              {title}
            </h3>
            <p>{description}</p>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>
