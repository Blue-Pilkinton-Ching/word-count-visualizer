<script lang="ts">
	import { RENDER_PAGES_WITH_WORD_COUNT } from '$lib/config';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>Quick Preview - Word Count Visualizer</title>
	<meta
		name="description"
		content="Browse word count previews — see what 50, 100, 500, 1000 words and more look like on a page."
	/>
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<link rel="canonical" href="https://wordcountvisualizer.com/quick-preview" />
</svelte:head>

<Header title="Word Count Visualizer" />

<main class="container mx-auto p-4">
	<div class="mx-auto max-w-2xl space-y-6">
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-1 text-lg font-semibold">Quick Preview</h2>
			<p class="mb-4 text-sm text-gray-500">
				Browse all available word count previews. Click any count to see what it looks like on a
				page.
			</p>
			<ul class="grid grid-cols-3 gap-2 sm:grid-cols-4">
				{#each RENDER_PAGES_WITH_WORD_COUNT as count (count)}
					<li>
						<a
							href="/words/{count}"
							class="block rounded-md border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
						>
							{count.toLocaleString()} words
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</main>
