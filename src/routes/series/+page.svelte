<script lang="ts">
  import Meta from "$components/meta.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Meta title="Series | Bobby Mannino" description="Read blog post series." />

<div class="container">
  <div class="card">
    <h1>series</h1>

    <ul class="grid gap-4">
      {#each data.series as series}
        <li>
          <a href="/series/{series.slug}" tabindex="0" class="group ring-on-focus-visible block">
            <h2 class="group-hover:underline">{series.title}</h2>
            <p>{series.description}</p>
            <p class="text-zinc-500">
              <small>{series.postCount} {series.postCount === 1 ? "post" : "posts"}</small>
            </p>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
