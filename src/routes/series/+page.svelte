<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	const { series } = data;
</script>

<svelte:head>
	<title>Blog Series</title>
	<meta name="description" content="All blog post series" />
</svelte:head>

<main class="wrapper">
	<h1>Blog Series</h1>

	{#if series.length > 0}
		<ul>
			{#each series as s (s.slug)}
				<li>
					<a href="/series/{s.slug}">
						<span class="title">{s.slug}</span>
						<span class="count">
							{s.count} post{s.count === 1 ? "" : "s"}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No series yet.</p>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	li a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
	}

	.count {
		color: var(--text-muted);
		font-size: 0.875rem;
	}
</style>
