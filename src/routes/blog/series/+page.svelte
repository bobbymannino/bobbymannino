<script lang="ts">
  import { resolve } from "$app/paths";
  import Meta from "#components/meta.svelte";
  import { m } from "#lib/paraglide/messages.js";
  import { localizeHref } from "#lib/paraglide/runtime.js";
  import { series } from "#lib/posts/series.js";
</script>

<Meta title={m.series_meta_title()} description={m.series_meta_description()} />

<section class="container" id="series">
  <div class="card">
    <h1>{m.series_heading()}</h1>

    <ul class="space-y-4">
      {#each series as { title, slug, description } (slug)}
        <li>
          <a
            href={localizeHref(resolve("/blog/series/[slug]", { slug }))}
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
