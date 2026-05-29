<script lang="ts">
	import BlogPostCard from "$components/blog-post-card.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	const { series, posts } = data;
</script>

<svelte:head>
	<title>Series: {series}</title>
	<meta name="description" content="All blog posts in the {series} series" />
</svelte:head>

<main class="wrapper">
	<h1>Series: {series}</h1>

	<div class="posts">
		{#each posts as post (post.meta.slug)}
			<BlogPostCard {...post} />
		{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
