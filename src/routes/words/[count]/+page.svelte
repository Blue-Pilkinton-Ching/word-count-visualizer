<script lang="ts">
	import App from '$lib/components/App.svelte';
	import { page } from '$app/state';

	$effect(() => {
		if (page.params.count) {
			page.url.searchParams.set('count', page.params.count);
		}
	});
</script>

<App
	title="Word Count Visualizer - {page.params.count} words"
	searchTitle="What does {page.params.count} words look like?"
	description="Visual examples of what {page.params.count} words look like on a page."
	wordCount={Number(page.params.count)}
/>
