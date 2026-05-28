<script lang="ts">
	import '../app.css';

	import './firebase';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Word Count Visualizer Tool',
		url: 'https://wordcountvisualizer.com'
	};

	let { children } = $props();
</script>

<svelte:head>
	<!-- eslint-disable-next-line no-useless-escape eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}<\/script>`}
</svelte:head>

<div class="min-h-screen bg-gray-50" lang="en" dir="ltr">
	{@render children()}
</div>
